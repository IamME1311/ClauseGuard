// ClauseGuard API Service

const ClauseGuardAPI = (() => {
  // Supabase configuration
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Create a single supabase client for interacting with your database
  const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey)

  // Search precedents
  async function searchPrecedents(query) {
    try {
      // In a real implementation, we would use Supabase full-text search
      // For now, we'll fetch all precedents and filter client-side
      const { data, error } = await supabase.from("precedents").select("*")

      if (error) throw error

      // Simple client-side search (in production, use server-side search)
      const results = data.filter((precedent) => {
        const searchableText = `${precedent.title} ${precedent.summary} ${precedent.content}`.toLowerCase()
        return searchableText.includes(query.toLowerCase())
      })

      // Add a mock relevance score (in production, this would come from the search engine)
      return results.map((precedent) => ({
        ...precedent,
        relevance: Math.random() * 0.5 + 0.5, // Random score between 0.5 and 1
      }))
    } catch (error) {
      console.error("Error searching precedents:", error)
      throw error
    }
  }

  // Get precedent by ID
  async function getPrecedent(id) {
    try {
      const { data, error } = await supabase.from("precedents").select("*").eq("id", id).single()

      if (error) throw error

      return data
    } catch (error) {
      console.error("Error getting precedent:", error)
      throw error
    }
  }

  // Analyze contract
  async function analyzeContract(text) {
    try {
      // In a real implementation, we would send the text to the backend for analysis
      // For now, we'll return mock data

      // Save the search to the database if user is logged in
      const user = supabase.auth.getUser()

      if (user) {
        await supabase.from("user_contracts").insert({
          user_id: user.id,
          title: "Contract Analysis",
          content: text.substring(0, 100) + "...",
          risk_score: Math.floor(Math.random() * 100),
          analysis: JSON.stringify({
            issues: [
              {
                clause: "Termination",
                severity: "high",
                issue: "No clear termination process defined",
              },
              {
                clause: "Liability",
                severity: "medium",
                issue: "Broad limitation of liability clause",
              },
            ],
            recommendations: ["Add specific termination procedures", "Limit the scope of the liability clause"],
          }),
        })
      }

      // Mock analysis result
      return {
        risk_score: Math.floor(Math.random() * 100),
        issues: [
          {
            clause: "Termination (Section 7)",
            severity: "high",
            issue:
              "The termination clause allows either party to terminate with only 30 days notice, which may not provide sufficient time to transition services.",
          },
          {
            clause: "Limitation of Liability (Section 6)",
            severity: "medium",
            issue:
              "The limitation of liability clause excludes all indirect damages, which may limit your ability to recover certain types of losses.",
          },
          {
            clause: "Intellectual Property (Section 5)",
            severity: "low",
            issue:
              "The intellectual property clause grants all rights to the Company, which may be broader than necessary.",
          },
        ],
        recommendations: [
          "Negotiate a longer notice period for termination, such as 60 or 90 days.",
          "Modify the limitation of liability clause to allow for recovery of certain indirect damages.",
          "Consider narrowing the intellectual property assignment to only work product directly related to the services.",
        ],
      }
    } catch (error) {
      console.error("Error analyzing contract:", error)
      throw error
    }
  }

  // Save user search
  async function saveUserSearch(query) {
    try {
      const user = supabase.auth.getUser()

      if (!user) {
        throw new Error("User not authenticated")
      }

      const { error } = await supabase.from("user_searches").insert({
        user_id: user.id,
        query,
      })

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error("Error saving user search:", error)
      throw error
    }
  }

  // Get user searches
  async function getUserSearches() {
    try {
      const user = supabase.auth.getUser()

      if (!user) {
        throw new Error("User not authenticated")
      }

      const { data, error } = await supabase
        .from("user_searches")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      return data
    } catch (error) {
      console.error("Error getting user searches:", error)
      throw error
    }
  }

  // Get user contracts
  async function getUserContracts() {
    try {
      const user = supabase.auth.getUser()

      if (!user) {
        throw new Error("User not authenticated")
      }

      const { data, error } = await supabase
        .from("user_contracts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      return data
    } catch (error) {
      console.error("Error getting user contracts:", error)
      throw error
    }
  }

  // Authentication check (mock implementation)
  function isAuthenticated() {
    // Replace with actual authentication check using Supabase auth
    return true // Assuming user is always authenticated for now
  }

  return {
    searchPrecedents,
    getPrecedent,
    analyzeContract,
    saveUserSearch,
    getUserSearches,
    getUserContracts,
    isAuthenticated,
  }
})()

// Check authentication on protected pages
document.addEventListener("DOMContentLoaded", () => {
  // Skip auth check on login and signup pages
  if (window.location.pathname.includes("/auth/")) {
    return
  }

  // Redirect to login if not authenticated
  if (!ClauseGuardAPI.isAuthenticated()) {
    window.location.href = "/auth/login.html"
  }
})
