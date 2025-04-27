"use client";
import { useState } from "react";

export default function ContractIntelligencePage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);
    const selected = e.target.files?.[0] || null;
    if (selected) {
      // Validate file type
      const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
      if (!allowed.includes(selected.type)) {
        setError("Invalid file type. Please upload a PDF, DOC, DOCX, or TXT file.");
        setFile(null);
        return;
      }
      setFile(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!file) {
      setError("Please select a contract file to upload.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      // Call backend API (placeholder URL)
      const response = await fetch("/api/contract-intelligence", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to analyze contract.");
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Contract Intelligence Assistant</h2>
      <form className="mb-4" onSubmit={handleSubmit}>
        <label htmlFor="contract-file" className="block mb-1 font-medium">Contract File</label>
        <input
          id="contract-file"
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          className="input input-bordered w-full mb-2"
          onChange={handleFileChange}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50 dark:bg-gray-900">
          <h3 className="font-semibold mb-4">Analysis Result</h3>
          {/* Summary Card */}
          {result.summary && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded">
              <h4 className="font-semibold mb-1 text-blue-900 dark:text-blue-100">Summary</h4>
              <p className="text-blue-800 dark:text-blue-200">{result.summary}</p>
            </div>
          )}
          {/* Extracted Text Section */}
          {result.extractedText && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Extracted Contract Text</h4>
              <pre className="overflow-x-auto whitespace-pre-wrap text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded max-h-48">{result.extractedText}</pre>
            </div>
          )}
          {/* Risk Analysis Section */}
          {result.risks && result.risks.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1 text-red-700 dark:text-red-400">Identified Risks</h4>
              <ul className="list-disc pl-5 space-y-1">
                {result.risks.map((risk: any, idx: number) => (
                  <li key={idx} className="text-red-800 dark:text-red-300">
                    <span className="font-medium">{risk.title}:</span> {risk.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Fallback for unknown structure */}
          {!result.summary && !result.extractedText && !result.risks && (
            <pre className="overflow-x-auto whitespace-pre-wrap text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">{JSON.stringify(result, null, 2)}</pre>
          )}
          <div className="flex gap-2 mt-4">
            <button className="btn btn-outline" disabled={!result}>Export as PDF</button>
            <button className="btn btn-outline" disabled={!result}>Save to History</button>
          </div>
        </div>
      )}
      <div className="mt-8 text-gray-500 text-sm">Upload a contract to get started. Supported formats: PDF, DOC, DOCX, TXT.</div>
    </div>
  );
}
