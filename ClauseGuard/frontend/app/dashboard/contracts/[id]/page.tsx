import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, FileText, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Contract Details",
  description: "View detailed contract analysis",
}

export default async function ContractDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createClient()
  const { data: sessionData } = await supabase.auth.getSession()

  // If user is not logged in, redirect to login
  if (!sessionData.session) {
    redirect("/auth/login")
  }

  // Get contract details
  const { data: contract, error } = await supabase
    .from("contracts")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", sessionData.session.user.id)
    .single()

  if (error || !contract) {
    notFound()
  }

  // Parse analysis JSON if it exists
  const analysis = contract.analysis ? contract.analysis : null

  return (
    <DashboardLayout>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">{contract.title}</h1>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>

        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="content">Contract Content</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4 mt-6">
            {analysis ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{analysis.summary}</p>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Key Clauses</CardTitle>
                      <CardDescription>Important clauses identified in the contract</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {analysis.clauses && analysis.clauses.length > 0 ? (
                        <ul className="space-y-2">
                          {analysis.clauses.map((clause: any, index: number) => (
                            <li key={index} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                              <div className="font-medium">{clause.title}</div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">{clause.description}</div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-500 dark:text-slate-400">No key clauses identified.</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        Potential Risks
                      </CardTitle>
                      <CardDescription>Issues that may require attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {analysis.risks && analysis.risks.length > 0 ? (
                        <ul className="space-y-2">
                          {analysis.risks.map((risk: string, index: number) => (
                            <li
                              key={index}
                              className="p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-md"
                            >
                              {risk}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-green-600 dark:text-green-400">No significant risks identified.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center justify-center text-center">
                    <FileText className="h-12 w-12 text-slate-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Analysis Available</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-4">This contract hasn't been analyzed yet.</p>
                    <Button asChild>
                      <Link href="/dashboard/contract-analysis">Analyze Contract</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract Content</CardTitle>
                <CardDescription>Full text of the contract</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-wrap font-mono text-sm bg-slate-50 dark:bg-slate-800 p-4 rounded-md overflow-auto max-h-[600px]">
                  {contract.content}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Contract History</CardTitle>
                <CardDescription>Timeline of changes and analyses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Contract created</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(contract.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {contract.analysis && (
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Contract analyzed</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {new Date(contract.updated_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
