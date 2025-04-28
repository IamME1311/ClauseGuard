'use client';
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";

export default function DocumentsPage() {
  const { user, accessToken, loading: userLoading } = useUser();
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocs = async () => {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/user/contracts", {
          headers: { Authorization: `Bearer ${accessToken || ""}` },
        });
        if (!res.ok) throw new Error("Failed to fetch documents");
        const data = await res.json();
        setDocuments(data || []);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    if (user && accessToken) fetchDocs();
  }, [user, accessToken]);

  if (userLoading || loading) return <div className="p-8 text-center text-gray-400">Loading documents...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-7 h-7 text-blue-600" />
        <h1 className="text-2xl font-bold">Documents</h1>
      </div>
      {documents.length === 0 ? (
        <div className="rounded-xl bg-white shadow p-8 text-center text-gray-500 dark:bg-slate-900">
          <p>No documents found. Upload or create a new contract to get started.</p>
        </div>
      ) : (
        <div className="rounded-xl bg-white shadow p-4 dark:bg-slate-900">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Title</th>
                <th className="py-2">Risk Score</th>
                <th className="py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, i) => (
                <tr key={doc.id || i} className="border-b hover:bg-slate-100 dark:hover:bg-slate-800">
                  <td className="flex items-center gap-2 py-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    {doc.title || "Untitled"}
                  </td>
                  <td className="py-2">{doc.risk_score ?? "-"}</td>
                  <td className="py-2">{doc.created_at ? new Date(doc.created_at).toLocaleString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
