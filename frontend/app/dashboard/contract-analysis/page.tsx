import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import ContractAnalysisForm from "./contract-analysis-form"
import { Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Contract Analysis",
  description: "Analyze your legal contracts with AI",
}

export default async function ContractAnalysisPage() {
  const supabase = createClient()
  const { data } = await supabase.auth.getSession()

  // If user is not logged in, redirect to login
  if (!data.session) {
    redirect("/auth/login")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-7 h-7 text-purple-600" />
          <h1 className="text-2xl font-bold">Contract Analysis</h1>
        </div>
        <div className="rounded-xl bg-white shadow p-8 text-center text-gray-500 dark:bg-slate-900">
          <p>Run AI-powered analysis on your contracts and clauses here.</p>
          <p className="mt-2 text-xs text-gray-400">(Connect to backend for real data)</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
