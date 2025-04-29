"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Search, Eye, BookOpen, Scale, FileText } from "lucide-react"
import { mockLegalResearch } from "@/lib/mock-data/legal-research"

export default function LegalResearchForm() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResult, setSearchResult] = useState<any>(null)
  const [previewResult, setPreviewResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("search")
  const [isAIMode, setIsAIMode] = useState(true)

  const handlePreview = () => {
    if (!query.trim()) {
      setError("Please enter a search query")
      return
    }

    // Use mock research for preview
    const mockResult = mockLegalResearch(query)
    setPreviewResult(mockResult)
    setActiveTab("preview")
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) {
      setError("Please enter a search query")
      return
    }

    setIsSearching(true)
    setError(null)

    try {
      // Call the FastAPI backend for legal research
      const response = await fetch("/api/legal-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, useAI: isAIMode }),
      })

      if (!response.ok) {
        throw new Error("Failed to perform legal research")
      }

      const data = await response.json()
      setSearchResult(data)
      setActiveTab("results")
    } catch (error: any) {
      setError(error.message || "An error occurred during research")
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="preview" disabled={!query.trim()}>
            Preview
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!searchResult}>
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="query">Research Query</Label>
                  <Input
                    id="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="E.g., What are the key provisions of the Computer Fraud and Abuse Act?"
                    disabled={isSearching}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="ai-mode"
                    checked={isAIMode}
                    onChange={(e) => setIsAIMode(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor="ai-mode"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Use AI-powered research (LlamaIndex)
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreview}
                    disabled={isSearching || !query.trim()}
                    className="flex-1"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>

                  <Button type="submit" disabled={isSearching || !query.trim()} className="flex-1">
                    {isSearching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Researching...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Comprehensive Research</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Access legal information from a wide range of sources including statutes, case law, and legal
                  commentary.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Scale className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Legal Precedents</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Find relevant case law and precedents to strengthen your legal arguments and contract positions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <FileText className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">AI-Powered Analysis</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Leverage advanced AI to analyze complex legal questions and provide comprehensive answers.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          {previewResult && (
            <>
              <Alert>
                <AlertDescription>
                  This is a preview based on basic pattern matching. For accurate research, click "Search".
                </AlertDescription>
              </Alert>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Preview Results</h2>

                  <div className="space-y-4">
                    {previewResult.summary && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Summary</h3>
                        <p>{previewResult.summary}</p>
                      </div>
                    )}

                    {previewResult.references && previewResult.references.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">References</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {previewResult.references.map((reference: any, index: number) => (
                            <li key={index}>
                              <p>
                                <span className="font-medium">{reference.title}</span>
                              </p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{reference.description}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {previewResult.precedents && previewResult.precedents.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Related Cases</h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {previewResult.precedents.map((precedent: any, index: number) => (
                            <li key={index}>
                              <p>
                                <span className="font-medium">{precedent.case}</span>
                              </p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{precedent.relevance}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          {searchResult && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Research Results</h2>

                <div className="space-y-4">
                  {searchResult.summary && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Summary</h3>
                      <p className="whitespace-pre-line">{searchResult.summary}</p>
                    </div>
                  )}

                  {searchResult.references && searchResult.references.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">References</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {searchResult.references.map((reference: any, index: number) => (
                          <li key={index}>
                            <p>
                              <span className="font-medium">{reference.title}</span>
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{reference.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {searchResult.precedents && searchResult.precedents.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Related Cases</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {searchResult.precedents.map((precedent: any, index: number) => (
                          <li key={index}>
                            <p>
                              <span className="font-medium">{precedent.case}</span>
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{precedent.relevance}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
