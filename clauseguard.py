import requests
import base64
import streamlit as st
from Agent.agent import ClauseGuard_Agent

#Config
BACKEND_URL = "https://your-backend-endpoint.com/api"

st.set_page_config(page_title="ClauseGuard", page_icon="💂‍♂️", layout="wide", initial_sidebar_state="expanded")

#For the sidebar
with st.sidebar:
    st.title("ClauseGuard💂‍♂️")
    st.markdown("""
    Your AI-powered legal agent for U.S. IT Law.
    """)

    st.header("Navigation")
    page = st.radio("Go to:", ["Welcome", "Contract Analysis", "Legal Research"])

    st.header("Settings")
    theme = st.radio("Choose Theme:", ("Light", "Dark"))
    st.session_state.dark_mode = theme == "Dark"

#Welcome page
if page == "Welcome":
    st.title("Welcome to ClauseGuard💂‍♂️")
    st.markdown("""
    ClauseGuard💂‍♂️ is a smart, AI-powered legal assistant purpose-built for professionals working in tech, law, and compliance. Our current release focuses on the regulatory and contractual frameworks under **U.S. Information Technology Law**.

    #### Why ClauseGuard is Different:
    While general-purpose AI tools offer broad responses, ClauseGuard is:
    - 🔗 **Context-aware**: Designed for real contract data, legal structure, and clause semantics
    - 🪨 **Compliance-focused**: Built around IT legal frameworks and practical risks
    - 🔹 **Workflow-ready**: Answers with structured insight, clause tagging, and actionable outputs

    #### How to Use ClauseGuard:

    1. Navigate to **Contract Analysis** to upload a PDF, DOCX, or scanned image. ClauseGuard will extract clauses and flag IT law concerns.
    2. Visit **Legal Research** to explore legal questions. Instead of general answers, ClauseGuard draws from IT-specific statutes, cases, and compliance patterns.

    _This agent is ideal for startup founders, tech lawyers, procurement officers, and IT compliance teams._
    """)

#Contract analysis page
elif page == "Contract Analysis":
    st.title("📂 Contract Analysis")
    st.markdown("""
    Upload a contract file below (PDF, DOCX, PNG, JPG). ClauseGuard will:

    - Extract relevant legal clauses
    - Highlight compliance gaps or risks
    - Map insights to U.S. IT regulatory standards

    Supported use cases: NDAs, SaaS agreements, IP licensing, Terms of Service, Data Use policies.
    """)

    uploaded_file = st.file_uploader("Choose a contract file", type=["pdf", "docx", "png", "jpg", "jpeg"])

    if uploaded_file is not None:
        file_bytes = uploaded_file.read()
        encoded_file = base64.b64encode(file_bytes).decode('utf-8')

        st.info("Uploading and analyzing your contract...")
        response = requests.post(
            f"{BACKEND_URL}/analyze",
            json={"file_name": uploaded_file.name, "file_data": encoded_file}
        )

        if response.status_code == 200:
            result = response.json()
            st.success("Analysis Complete!")
            st.json(result)
        else:
            st.error("Failed to analyze contract. Please try again.")

#Legal research page
elif page == "Legal Research":
    st.title("🔍 Legal Research")
    st.markdown("""
    Ask focused legal research questions related to **U.S. Information Technology Law**.

    This includes:
    - Data privacy (e.g., CCPA, HIPAA, sectoral regulation)
    - Software licensing frameworks
    - IP rights for tech products
    - Legal requirements for cloud providers, platforms, and APIs

    ClauseGuard delivers IT-specific insights by filtering out general noise, making it a powerful tool for:
    - Drafting or reviewing tech contracts
    - Building compliance checklists
    - Answering complex legal concerns that general tools might oversimplify
    """)

    query = st.text_input("Enter your legal research prompt:")

    if st.button("Submit Query") and query:
        # response = requests.post(f"{BACKEND_URL}/legal_research", json={"query": query})
        agent_obj = ClauseGuard_Agent()
        research_result = agent_obj.agent_execute(user_query=query)
        if research_result:
            st.success("Here is your legal insight:")
            # st.write(st.markdown(research_result))
            # print(f"\n\n DEBUG :  {research_result}")
            st.markdown(research_result)
        else:
            st.error("Failed to fetch legal research. Please try again.")

# --- DARK MODE STYLING ---
if st.session_state.dark_mode:
    st.markdown("""
        <style>
        body { background-color: #0e1117; color: white; }
        .stButton>button { background-color: #333; color: white; }
        </style>
    """, unsafe_allow_html=True)
