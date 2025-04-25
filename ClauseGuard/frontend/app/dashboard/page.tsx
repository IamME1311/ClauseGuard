import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Search, Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "ClauseGuard Dashboard",
}

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: sessionData } = await supabase.auth.getSession()

  // If user is not logged in, redirect to login
  if (!sessionData.session) {
    redirect("/auth/login")
  }

  // Get recent contracts
  const { data: contracts } = await supabase
    .from("contracts")
    .select("*")
    .eq("user_id", sessionData.session.user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <DashboardLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Contract Analysis</CardTitle>
              <CardDescription>Upload and analyze legal contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Extract key clauses, identify risks, and get summaries of legal documents.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/contract-analysis">
                  <FileText className="mr-2 h-4 w-4" />
                  Analyze Contract
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Legal Research</CardTitle>
              <CardDescription>Research legal topics and precedents</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Search for legal information, case law, and legal precedents.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/legal-research">
                  <Search className="mr-2 h-4 w-4" />
                  Start Research
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">Recent Contracts</h2>
        {contracts && contracts.length > 0 ? (
          <div className="space-y-4">
            {contracts.map((contract) => (
              <Card key={contract.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{contract.title}</CardTitle>
                  <CardDescription>{new Date(contract.created_at).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {contract.content.substring(0, 150)}...
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href={`/dashboard/contracts/${contract.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="mb-4 text-center text-slate-500 dark:text-slate-400">
                No contracts analyzed yet. Start by analyzing your first contract.
              </p>
              <Button asChild>
                <Link href="/dashboard/contract-analysis">
                  <Plus className="mr-2 h-4 w-4" />
                  Analyze Contract
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
