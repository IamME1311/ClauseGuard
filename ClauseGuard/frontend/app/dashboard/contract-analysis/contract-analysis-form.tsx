"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useFileProcessor } from "@/hooks/use-file-processor"
import { mockAnalyzeContract } from "@/lib/mock-data/analyze-contract"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, FileText, Eye, Save } from "lucide-react"

export default function ContractAnalysisForm() {
  const [title, setTitle] = useState("")
  const [contractText, setContractText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [previewAnalysis, setPreviewAnalysis] = useState<any>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("edit")

  const router = useRouter()
  const supabase = createClient()

  const { processFile, isProcessing, progress, error: fileProcessingError } = useFileProcessor()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const result = await processFile(file)

    if (result) {
      setTitle(result.fileName.split(".")[0])
      setContractText(result.text)
    }
  }

  const handlePreview = () => {
    if (!contractText.trim()) {
      setServerError("Please provide contract text to preview")
      return
    }

    // Use mock analysis for preview
    const mockResult = mockAnalyzeContract(contractText)
    setPreviewAnalysis(mockResult)
    setActiveTab("preview")
  }

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!contractText.trim()) {
      setServerError("Please provide contract text to analyze")
      return
    }

    setIsAnalyzing(true)
    setServerError(null)

    try {
      // Call the FastAPI backend for analysis
      const response = await fetch("/api/analyze-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: contractText }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze contract")
      }

      const data = await response.json()
      setAnalysisResult(data)
      setActiveTab("results")
    } catch (error: any) {
      setServerError(error.message || "An error occurred during analysis")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSave = async () => {
    if (!contractText.trim() || !title.trim()) {
      setServerError("Please provide a title and contract text")
      return
    }

    setIsSaving(true)
    setServerError(null)

    try {
      // Save to Supabase
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) {
        throw new Error("User not authenticated")
      }

      const analysis = analysisResult || previewAnalysis

      const { data, error } = await supabase
        .from("contracts")
        .insert({
          title: title,
          content: contractText,
          analysis: analysis,
          user_id: userData.user.id,
        })
        .select()

      if (error) {
        throw error
      }

      // Navigate to the contract detail page
      if (data && data.length > 0) {
        router.push(`/dashboard/contracts/${data[0].id}`)
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      setServerError(error.message || "An error occurred while saving")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {(fileProcessingError || serverError) && (
        <Alert variant="destructive">
          <AlertDescription>{fileProcessingError || serverError}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit">Edit Contract</TabsTrigger>
          <TabsTrigger value="preview" disabled={!contractText.trim()}>
            Preview Analysis
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!analysisResult}>
            Analysis Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-4 mt-6">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleAnalyze} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Upload Contract</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.rtf,image/*"
                      onChange={handleFileUpload}
                      disabled={isProcessing || isAnalyzing}
                      className="file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {isProcessing && (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">{Math.round(progress)}%</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contract Title"
                    disabled={isProcessing || isAnalyzing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contract-text">Contract Text</Label>
                  <Textarea
                    id="contract-text"
                    value={contractText}
                    onChange={(e) => setContractText(e.target.value)}
                    placeholder="Paste or enter contract text here"
                    rows={10}
                    disabled={isProcessing || isAnalyzing}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreview}
                    disabled={isProcessing || isAnalyzing || !contractText.trim()}
                    className="flex-1"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>

                  <Button
                    type="submit"
                    disabled={isProcessing || isAnalyzing || !contractText.trim()}
                    className="flex-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Analyze Contract
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4 mt-6">
          {previewAnalysis && (
            <>
              <Alert>
                <AlertDescription>
                  This is a preview based on basic pattern matching. For accurate analysis, click "Analyze Contract".
                </AlertDescription>
              </Alert>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Preview Analysis</h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Summary</h3>
                      <p>{previewAnalysis.summary}</p>
                    </div>

                    {previewAnalysis.clauses && previewAnalysis.clauses.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Key Clauses</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {previewAnalysis.clauses.map((clause: any, index: number) => (
                            <li key={index}>
                              <span className="font-medium">{clause.title}: </span>
                              {clause.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {previewAnalysis.risks && previewAnalysis.risks.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Potential Risks</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {previewAnalysis.risks.map((risk: string, index: number) => (
                            <li key={index} className="text-red-600 dark:text-red-400">
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Contract
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-4 mt-6">
          {analysisResult && (
            <>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Analysis Results</h2>

                  <div className="space-y-4">
                    {analysisResult.summary && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Summary</h3>
                        <p>{analysisResult.summary}</p>
                      </div>
                    )}

                    {analysisResult.clauses && analysisResult.clauses.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Key Clauses</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {analysisResult.clauses.map((clause: any, index: number) => (
                            <li key={index}>
                              <span className="font-medium">{clause.title}: </span>
                              {clause.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {analysisResult.risks && analysisResult.risks.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Potential Risks</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {analysisResult.risks.map((risk: string, index: number) => (
                            <li key={index} className="text-red-600 dark:text-red-400">
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Contract
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
