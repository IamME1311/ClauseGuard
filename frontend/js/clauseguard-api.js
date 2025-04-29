/**
 * ClauseGuard API Client
 */
class ClauseGuardAPI {
  static BASE_URL = "http://localhost:8000"

  /**
   * Get the stored authentication token
   */
  static getToken() {
    return localStorage.getItem("clauseguard_token")
  }

  /**
   * Set the authentication token
   */
  static setToken(token) {
    localStorage.setItem("clauseguard_token", token)
  }

  /**
   * Clear the authentication token
   */
  static clearToken() {
    localStorage.removeItem("clauseguard_token")
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated() {
    return !!this.getToken()
  }

  /**
   * Make an API request
   */
  static async request(endpoint, options = {}) {
    const url = `${this.BASE_URL}${endpoint}`

    // Default headers
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    // Add auth token if available
    const token = this.getToken()
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json()

        // Handle API errors
        if (!response.ok) {
          throw new Error(data.detail || "API request failed")
        }

        return data
      } else {
        // Handle non-JSON response
        if (!response.ok) {
          const text = await response.text()
          throw new Error(text || "API request failed")
        }

        return await response.text()
      }
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  /**
   * User signup
   */
  static async signup(email, password) {
    const data = await this.request("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    if (data.access_token) {
      this.setToken(data.access_token)
    }

    return data
  }

  /**
   * User login
   */
  static async login(email, password) {
    const data = await this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })

    if (data.access_token) {
      this.setToken(data.access_token)
    }

    return data
  }

  /**
   * User logout
   */
  static logout() {
    this.clearToken()
    window.location.href = "/auth/login.html"
  }

  /**
   * Search legal precedents
   */
  static async searchPrecedents(query) {
    return await this.request(`/api/precedents?q=${encodeURIComponent(query)}`)
  }

  /**
   * Analyze contract
   */
  static async analyzeContract(contractText) {
    return await this.request("/api/contract-analysis", {
      method: "POST",
      body: JSON.stringify({ contract_text: contractText }),
    })
  }
}

export { ClauseGuardAPI }
