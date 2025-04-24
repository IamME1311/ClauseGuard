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
from logger.logger import logger

# --- Loading Environment Variable ---
load_dotenv()


# --- 1. Configure API Keys and IDs ---
google_api_key = os.getenv("GEMINI_API_KEY") # Gemini API key
llama_cloud_api_key = os.getenv("LLAMAINDEX_API_KEY") # Llama Cloud API key
org_id = os.getenv("ORGANIZATION_ID")
project_name = "AI Agents hackathon"
if not org_id:
    raise ValueError("ORGANIZATION_ID not found in enviorment variables")
if not google_api_key:
    raise ValueError("GEMINI_API_KEY not found in environment variables.")
if not llama_cloud_api_key:
    raise ValueError("LLAMAINDEX_API_KEY (for Llama Cloud) not found in environment variables.")
logger.debug("loaded all the enviroment variables")

# --- 2. Configure LLM ---
llm = GoogleGenAI(model="models/gemini-2.0-flash-thinking-exp-1219", api_key=google_api_key)
Settings.llm = llm


# --- 3. Define LLamaCloud Index ---
index_1 = LlamaCloudIndex(
    name="AI agents documents",
    project_name=project_name,
    organization_id=org_id,
    api_key=llama_cloud_api_key,
)
logger.debug("Loaded Index_1")

index_2 = LlamaCloudIndex(
    name="witty-minnow-2025-04-22",
    project_name=project_name,
    organization_id=org_id,
    api_key=llama_cloud_api_key,
)
logger.debug("Loaded Index_2")

# --- 4. Setup Composite Retriever ---

composite_retriever = LlamaCloudCompositeRetriever(
    name="IT Law Retriever",
    project_name=project_name,
    organization_id=org_id,
    create_if_not_exists=True,
    mode=CompositeRetrievalMode.FULL,
    rerank_top_n=5, api_key=llama_cloud_api_key
)
logger.debug("Setup complete for composite retriever")
# Add Indices to the retriever
composite_retriever.add_index(
    index_1,
    description="Information from United States of America IT Laws"
)
composite_retriever.add_index(
    index_2,
    description="Information from United States of America IT Laws"
)
logger.debug("added indices to the retriever")

# For Testing
# nodes = composite_retriever.retrieve("DDOS realted Laws")
# print(nodes)


# --- 5. Define the Tool for the Agent ---
query_engine = RetrieverQueryEngine.from_args(
    composite_retriever,
    llm=llm
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
system_prompt = """
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
llm_agent = GoogleGenAI(model="models/gemini-2.0-flash-thinking-exp-1219", system_prompt=system_prompt, api_key=google_api_key)
agent = FunctionCallingAgentWorker.from_tools(
    [legal_tool], llm=llm_agent, verbose=True
).as_agent()

# --- 8. Interact with the Agent ---
print("\n" + "="*30)
print("Agent Ready! Ask questions about the documents in your Llama Cloud pipeline.")
print("Using Llama Cloud Pipeline Retriever.")
print("="*30)

while True:
    try:
        user_query = input("Ask your question (or type 'quit'): ")
        logger.info(f"User query : {user_query}")
        if user_query.lower() == 'quit':
            break
        if not user_query:
            continue

        response = agent.chat(user_query)
        print("\nAgent Response:")
        print(response)
        print("-" * 30)
        logger.info(f"Agent Response : {response}")

    except Exception as e:
        print(f"\nAn error occurred: {e}")
        logger.exception("Detailed error:") # Log traceback for debugging
        print("-" * 30)

print("Exiting.")
logger.info("Exited the agent")