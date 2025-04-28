import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import LegalResearchForm from "./legal-research-form"
import { Search } from "lucide-react";

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
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-7 h-7 text-pink-600" />
          <h1 className="text-2xl font-bold">Legal Research</h1>
        </div>
        <div className="rounded-xl bg-white shadow p-8 text-center text-gray-500 dark:bg-slate-900">
          <p>Use AI to research legal questions and get instant answers.</p>
          <p className="mt-2 text-xs text-gray-400">(Connect to backend for real data)</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
