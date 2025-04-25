import { FaKeyboard, FaSearch, FaUpload, FaCogs, FaRobot, FaBrain, FaCodeBranch, FaFilter, FaSortAmountDown, FaFileAlt, FaFileContract, FaSearchPlus, FaShieldAlt, FaBolt } from "react-icons/fa";

export default function AIServicesSection() {
  return (
    <section id="ai-services" className="ai-services py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold mb-10 text-center">How ClauseGuard Works</h2>
        <div className="flow-container flex flex-col gap-12">
          {/* Step 1: Input */}
          <div className="flow-step flex flex-col md:flex-row items-center gap-8">
            <div className="step-number text-3xl font-bold bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 md:mb-0">1</div>
            <div className="step-content flex-1">
              <h3 className="step-title text-xl font-semibold mb-2 flex items-center gap-2">
                <FaKeyboard /> Input Your Query or Document
              </h3>
              <p className="step-description text-muted-foreground mb-4">Start by entering your legal research query or uploading a contract document for analysis. ClauseGuard supports various file formats including PDF, DOCX, and plain text.</p>
              <div className="step-actions flex gap-2">
                <button className="btn btn-sm btn-primary flex items-center gap-2">
                  <FaSearch /> Research Query
                </button>
                <button className="btn btn-sm btn-primary flex items-center gap-2">
                  <FaUpload /> Upload Contract
                </button>
              </div>
            </div>
          </div>
          {/* Step 2: AI Processing */}
          <div className="flow-step flex flex-col md:flex-row items-center gap-8">
            <div className="step-number text-3xl font-bold bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 md:mb-0">2</div>
            <div className="step-content flex-1">
              <h3 className="step-title text-xl font-semibold mb-2 flex items-center gap-2">
                <FaCogs /> AI Processing
              </h3>
              <p className="step-description text-muted-foreground mb-4">Our advanced AI analyzes your input, processing the information through specialized legal models trained on millions of legal documents and precedents.</p>
              <div className="step-actions flex gap-2">
                <span className="badge badge-info flex items-center gap-1">
                  <FaRobot /> Natural Language Processing
                </span>
                <span className="badge badge-info flex items-center gap-1">
                  <FaBrain /> Machine Learning
                </span>
              </div>
            </div>
          </div>
          {/* Step 3: Choose Path */}
          <div className="flow-step flex flex-col md:flex-row items-center gap-8">
            <div className="step-number text-3xl font-bold bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 md:mb-0">3</div>
            <div className="step-content flex-1">
              <h3 className="step-title text-xl font-semibold mb-2 flex items-center gap-2">
                <FaCodeBranch /> Analysis Path
              </h3>
              <p className="step-description text-muted-foreground mb-4">Based on your input, ClauseGuard follows one of two specialized analysis paths to deliver the most relevant results.</p>
            </div>
          </div>
          {/* Branches */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Legal Research Path */}
            <div className="flow-branch bg-background rounded-lg shadow p-6">
              <h4 className="branch-title text-lg font-bold mb-4 flex items-center gap-2">
                <FaSearch /> Legal Research Path
              </h4>
              <div className="branch-steps flex flex-col gap-4">
                <div className="branch-step">
                  <h5 className="font-semibold flex items-center gap-2"><FaFilter /> Precedent Matching</h5>
                  <p className="text-muted-foreground">Identifies relevant case law and legal precedents that match your research query.</p>
                </div>
                <div className="branch-step">
                  <h5 className="font-semibold flex items-center gap-2"><FaSortAmountDown /> Relevance Ranking</h5>
                  <p className="text-muted-foreground">Ranks results by relevance, highlighting the most applicable precedents for your specific situation.</p>
                </div>
                <div className="branch-step">
                  <h5 className="font-semibold flex items-center gap-2"><FaFileAlt /> Summary Generation</h5>
                  <p className="text-muted-foreground">Creates concise summaries of key findings and legal principles from the identified precedents.</p>
                </div>
              </div>
            </div>
            {/* Contract Analysis Path */}
            <div className="flow-branch bg-background rounded-lg shadow p-6">
              <h4 className="branch-title text-lg font-bold mb-4 flex items-center gap-2">
                <FaFileContract /> Contract Analysis Path
              </h4>
              <div className="branch-steps flex flex-col gap-4">
                <div className="branch-step">
                  <h5 className="font-semibold flex items-center gap-2"><FaSearchPlus /> Clause Identification</h5>
                  <p className="text-muted-foreground">Identifies and categorizes all clauses in the contract, focusing on high-risk areas.</p>
                </div>
                <div className="branch-step">
                  <h5 className="font-semibold flex items-center gap-2"><FaShieldAlt /> Risk Assessment</h5>
                  <p className="text-muted-foreground">Assesses the risk level of each clause and highlights potential issues for review.</p>
                </div>
                <div className="branch-step">
                  <h5 className="font-semibold flex items-center gap-2"><FaBolt /> Recommendations</h5>
                  <p className="text-muted-foreground">Provides actionable recommendations to mitigate risks and improve contract terms.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
