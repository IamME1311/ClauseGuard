
'use client';
import { useUser } from "../../context/UserContext";
import StatsCards from "../components/StatsCards";
import DocumentChart from "../components/DocumentChart";
import RecentDocuments from "../components/RecentDocuments";
import FeaturesSection from "../components/FeaturesSection";
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useUser();

  if (loading) return <div className="p-8 text-center text-gray-400">Loading...</div>;

  return (
    <>
      {!user && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
          <div className="flex justify-between items-center">
            <span>
              You are using ClauseGuard in free trial mode. <b>Sign up or log in</b> to access premium features.
            </span>
            <Link href="/auth/signup" className="ml-4 px-3 py-1 bg-primary text-white rounded hover:bg-primary/80 transition">Sign Up</Link>
          </div>
        </div>
      )}
      {user && (
        <div className="flex justify-end items-center gap-3 mb-4">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg">
            <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center font-bold text-blue-900">
              {user.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="font-semibold text-slate-800 dark:text-white">{user.email}</span>
          </div>
        </div>
      )}
      <StatsCards />
      <div className="mb-6">
        <div className="flex gap-4 border-b mb-4">
          <button className="px-4 py-2 font-semibold border-b-2 border-blue-600 text-blue-600 bg-transparent dark:text-blue-400">Overview</button>
          <button className="px-4 py-2 font-semibold text-slate-500 dark:text-slate-400">Analytics</button>
          <button className="px-4 py-2 font-semibold text-slate-500 dark:text-slate-400">Timeline</button>
        </div>
        <DocumentChart />
      </div>
      <RecentDocuments />
      <FeaturesSection />
    </>
  );
}

