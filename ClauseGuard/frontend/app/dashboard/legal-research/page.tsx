import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import LegalResearchForm from "./legal-research-form"

export const metadata: Metadata = {
  title: "Legal Research",
  description: "Research legal topics and precedents",
}

export default async function LegalResearchPage() {
  const supabase = createClient()
  const { data } = await supabase.auth.getSession()

  // If user is not logged in, redirect to login
  if (!data.session) {
    redirect("/auth/login")
  }

  return (
    <DashboardLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Legal Research</h1>
        <LegalResearchForm />
      </div>
    </DashboardLayout>
  )
}
