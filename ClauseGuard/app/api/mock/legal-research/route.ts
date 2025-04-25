import { type NextRequest, NextResponse } from "next/server"
import { mockLegalResearch } from "@/lib/mock-data/legal-research"

export async function POST(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json()

    // Use mock implementation
    const result = mockLegalResearch(body.query)

    // If AI mode is requested, enhance the response
    if (body.useAI) {
      // Simulate AI-enhanced response
      result.summary = `[AI-Enhanced] ${result.summary}\n\nThis response was generated using simulated AI capabilities. In production, this would use LlamaIndex with real-time document retrieval.`

      // Add AI reference
      result.references.unshift({
        title: "AI-Enhanced Legal Research",
        description:
          "This response was generated using advanced AI techniques to analyze legal documents and precedents.",
      })
    }

    // Add a small delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Mock legal research error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
