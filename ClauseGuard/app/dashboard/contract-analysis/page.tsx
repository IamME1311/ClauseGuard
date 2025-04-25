import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import ContractAnalysisForm from "./contract-analysis-form"

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
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Contract Analysis</h1>
        <ContractAnalysisForm />
      </div>
    </DashboardLayout>
  )
}
