import { type NextRequest, NextResponse } from "next/server"
import { mockAnalyzeContract } from "@/lib/mock-data/analyze-contract"

export async function POST(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json()

    // Use mock implementation
    const result = mockAnalyzeContract(body.content)

    // Add a small delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Mock contract analysis error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
