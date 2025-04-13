from llama_index.core import VectorStoreIndex, SimpleDirectoryReader
from llama_index.core.agent.workflow import FunctionAgent
from llama_index.llms.openai import OpenAI
import asyncio



# Create a RAG tool using LlamaIndex
documents = SimpleDirectoryReader("data").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()


async def search_documents(query: str) -> str:
    """Useful for answering natural language questions about any IT Law of UNITED STATES OF AMERICA."""
    response = await query_engine.aquery(query)
    return str(response)


# Create an enhanced workflow with tools*
agent = FunctionAgent(
    tools=[search_documents],
    llm=OpenAI(model="gpt-4o-mini"),
    system_prompt="""You are a helpful assistant that can perform legal advisory
    and search through documents to answer questions related to IT Laws of UNITED STATES OF AMERICA.""",
)

query = "LOREM IPSUM the actual query goes through here"

# Now we can ask questions about the documents or do calculations
async def main():
    response = await agent.run(
        query
    )
    print(response)


# Run the agent, for Testing purposes
if __name__ == "__main__":
    asyncio.run(main())