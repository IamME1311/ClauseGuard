export default function ContractIntelligencePage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Contract Intelligence Assistant</h2>
      <form className="mb-4">
        <label htmlFor="contract-file" className="block mb-1 font-medium">Contract File</label>
        <input
          id="contract-file"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="input input-bordered w-full mb-2"
        />
        <button type="submit" className="btn btn-primary w-full">Upload & Analyze</button>
      </form>
      {/* Extraction, analysis, and dashboard would go here */}
      <div className="mt-8 text-gray-500 text-sm">Upload a contract to get started. Supported formats: PDF, DOC, DOCX, TXT.</div>
    </div>
  );
}
