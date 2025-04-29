"use client";
import { BarChart } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";

interface AnalyticsData {
  total_documents: number;
  risk_documents: number;
  pending_review: number;
  approved: number;
}

export default function AnalyticsPage() {
  const { user, accessToken, loading: userLoading } = useUser();
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user || !accessToken) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/user/analytics", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!res.ok) throw new Error("Failed to fetch analytics");
        const data = await res.json();
        setStats(data);
      } catch (e: any) {
        setError(e.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    if (user && accessToken) fetchAnalytics();
  }, [user, accessToken]);

  if (userLoading || loading) return <div className="p-8 text-center text-gray-400">Loading analytics...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <BarChart className="w-7 h-7 text-green-600" />
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>
      {!stats ? (
        <div className="rounded-xl bg-white shadow p-8 text-center text-gray-500 dark:bg-slate-900">
          <p>No analytics data found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm">Total Documents</span>
            <span className="text-2xl font-bold text-blue-700 mt-2">{stats.total_documents}</span>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm">Risk Documents</span>
            <span className="text-2xl font-bold text-red-600 mt-2">{stats.risk_documents}</span>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm">Pending Review</span>
            <span className="text-2xl font-bold text-yellow-600 mt-2">{stats.pending_review}</span>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-gray-500 text-sm">Approved</span>
            <span className="text-2xl font-bold text-green-600 mt-2">{stats.approved}</span>
          </div>
        </div>
      )}
    </div>
  );
}
