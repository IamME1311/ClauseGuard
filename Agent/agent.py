# General Imports
import os
from dotenv import load_dotenv

# --- LlamaIndex Core Imports ---
from llama_index.core import Settings
from llama_index.core.tools import QueryEngineTool, ToolMetadata
from llama_index.core.query_engine import RetrieverQueryEngine

# --- LLamaCloud Imports ---
from llama_index.indices.managed.llama_cloud import LlamaCloudIndex, LlamaCloudCompositeRetriever
from llama_cloud import CompositeRetrievalMode

# --- LlamaIndex LLM Integration (Gemini) ---
from llama_index.llms.google_genai import GoogleGenAI

# --- LLamaIndex Agent Imports
from llama_index.core.agent import FunctionCallingAgentWorker, AgentRunner

# --- Import Logger ---
from .logger.logger import logger


class ClauseGuard_Agent:
    
    def __init__(self):
        # --- Loading Environment Variable ---
        load_dotenv()
        # --- 1. Configure API Keys and IDs ---
        self.google_api_key = os.getenv("GEMINI_API_KEY") # Gemini API key
        self.llama_cloud_api_key = os.getenv("LLAMAINDEX_API_KEY") # Llama Cloud API key
        self.org_id = os.getenv("ORGANIZATION_ID")
        self.project_name = "AI Agents hackathon"
        if not self.org_id:
            raise ValueError("ORGANIZATION_ID not found in enviorment variables")
        if not self.google_api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables.")
        if not self.llama_cloud_api_key:
            raise ValueError("LLAMAINDEX_API_KEY (for Llama Cloud) not found in environment variables.")
        logger.debug("loaded all the enviroment variables")

        # --- 2. Configure LLM ---
        self.llm = GoogleGenAI(model="models/gemini-2.0-flash-thinking-exp-1219", api_key=self.google_api_key)
        Settings.llm = self.llm

        self.setup_retriever()
        self.setup_agent()
        logger.debug("ClauseGuard ready for action!!")
    
    def setup_retriever(self):
        # --- 3. Define LLamaCloud Indices ---
        index_1 = LlamaCloudIndex(
            name="AI agents documents",
            project_name=self.project_name,
            organization_id=self.org_id,
            api_key=self.llama_cloud_api_key,
        )
        logger.debug("Loaded Index_1")

        index_2 = LlamaCloudIndex(
            name="witty-minnow-2025-04-22",
            project_name=self.project_name,
            organization_id=self.org_id,
            api_key=self.llama_cloud_api_key,
        )
        logger.debug("Loaded Index_2")


        # --- 4. Setup Composite Retriever ---
        try:
            self.composite_retriever = LlamaCloudCompositeRetriever(
                name="IT Law Retriever",
                project_name=self.project_name,
                organization_id=self.org_id,
                create_if_not_exists=True,
                mode=CompositeRetrievalMode.FULL,
                rerank_top_n=5, api_key=self.llama_cloud_api_key
            )
            logger.debug("Setup complete for composite retriever")
        except Exception as e:
            logger.exception("Exception occured while setting up Composite Retriever")
        # Add Indices to the retriever
        self.composite_retriever.add_index(
            index_1,
            description="Information from United States of America IT Laws"
        )
        self.composite_retriever.add_index(
            index_2,
            description="Information from United States of America IT Laws"
        )
        logger.debug("added indices to the retriever")

    def setup_agent(self):
        # --- 5. Define the Tool for the Agent ---
        query_engine = RetrieverQueryEngine.from_args(
            self.composite_retriever,
            llm=self.llm
        )

        legal_tool = QueryEngineTool(
            query_engine=query_engine,
            metadata=ToolMetadata(
                name="composed_legal_research_retriever",
                description=(
                    "Use this tool to search and retrieve information from parsed legal documents, "
                    "contracts, statutes, and precedents stored in the Llama Cloud knowledge base. "
                    "Input should be a specific question or search query about the documents."
                )
            )
        )

        # --- 6. Define the Agent System Prompt ---
        self.system_prompt = """
        You are an advanced Contract Intelligence Agent and Legal Research Assistant.
        Your primary function is to interact with a knowledge base of parsed legal documents via the 'legal_research_retriever' tool, which connects to a specific Llama Cloud pipeline.

        Your responsibilities include:
        - Answering specific questions about the content of the documents available through the retrieval pipeline.
        - Identifying risks, unusual clauses, and missing protections in contracts based *only* on the retrieved document context.
        - Comparing aspects of documents against retrieved context from industry standards or previous agreements if available in the knowledge base.
        - Providing plain-language summaries of legal text found within the retrieved documents.
        - Searching for relevant statutes, case law, and regulations *within the available document set accessed via the pipeline*.
        - When asked to summarize or analyze a specific contract (e.g., 'this employment contract'), clarify that you need the user to ask specific questions about the contract's content that you can look up using the tool. You cannot analyze external documents directly, only retrieve information from the indexed ones via the pipeline.
        - Use the 'legal_research_retriever' tool whenever you need to fetch information from the document base.
        """

        # --- 7. Create the FunctionCalling Agent ---
        self.llm_agent = GoogleGenAI(model="models/gemini-2.0-flash-thinking-exp-1219", system_prompt=self.system_prompt, api_key=self.google_api_key)
        self.agent = FunctionCallingAgentWorker.from_tools(
            [legal_tool], llm=self.llm_agent, verbose=True
        ).as_agent()



    def agent_execute(self, user_query:str) -> str:
        try:
            logger.info(f"User query : {user_query}")
            if user_query.lower() == 'quit':
                return "Thanks for using ClauseGuard"
            response = self.agent.chat(user_query)
            logger.info(f"Agent Response : {response}")
            return response
        except Exception as e:
            logger.exception(f"Detailed error: {e}") # Log traceback for debugging
        logger.info("Exited the agent")