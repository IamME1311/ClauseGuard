// ClauseGuard Authentication Service

const ClauseGuardAuth = (() => {
  // Supabase configuration
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Create a single supabase client for interacting with your database
  const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey)

  // Check if user is logged in
  function isLoggedIn() {
    const session = supabase.auth.getSession()
    return !!session
  }

  // Get current user
  function getCurrentUser() {
    const user = supabase.auth.getUser()
    return user
  }

  // Login
  async function login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { success: true, user: data.user }
    } catch (error) {
      console.error("Error logging in:", error)
      return { success: false, message: error.message }
    }
  }

  // Signup
  async function signup(name, email, password) {
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) throw error

      // Insert user into users table
      const { error: insertError } = await supabase.from("users").insert({
        id: data.user.id,
        email: email,
      })

      if (insertError) throw insertError

      return { success: true, user: data.user }
    } catch (error) {
      console.error("Error signing up:", error)
      return { success: false, message: error.message }
    }
  }

  // Logout
  async function logout() {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error("Error logging out:", error)
      return { success: false, message: error.message }
    }
  }

  // Reset password
  async function resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error("Error resetting password:", error)
      return { success: false, message: error.message }
    }
  }

  // Update password
  async function updatePassword(password) {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) throw error

      return { success: true }
    } catch (error) {
      console.error("Error updating password:", error)
      return { success: false, message: error.message }
    }
  }

  // Check auth state and redirect if needed
  function checkAuth() {
    const publicPages = ["/", "/auth/login.html", "/auth/signup.html"]
    const currentPath = window.location.pathname

    if (!isLoggedIn() && !publicPages.includes(currentPath)) {
      // Redirect to login if not logged in and trying to access protected page
      window.location.href = "/auth/login.html"
    } else if (isLoggedIn() && publicPages.includes(currentPath) && currentPath !== "/") {
      // Redirect to dashboard if logged in and trying to access auth pages
      window.location.href = "/dashboard/index.html"
    }
  }

  // Initialize auth
  function init() {
    // Check auth state on page load
    checkAuth()

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        const publicPages = ["/", "/auth/login.html", "/auth/signup.html"]
        const currentPath = window.location.pathname

        if (publicPages.includes(currentPath) && currentPath !== "/") {
          window.location.href = "/dashboard/index.html"
        }
      } else if (event === "SIGNED_OUT") {
        const publicPages = ["/", "/auth/login.html", "/auth/signup.html"]
        const currentPath = window.location.pathname

        if (!publicPages.includes(currentPath)) {
          window.location.href = "/auth/login.html"
        }
      }
    })
  }

  // Initialize auth on script load
  init()

  return {
    isLoggedIn,
    getCurrentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
  }
})()

document.addEventListener("DOMContentLoaded", () => {
  // Login form handler
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const errorMsg = document.getElementById("error-message")

      try {
        errorMsg.textContent = ""
        const result = await ClauseGuardAuth.login(email, password)
        window.location.href = "/dashboard/index.html"
      } catch (error) {
        errorMsg.textContent = error.message || "Login failed. Please check your credentials."
      }
    })
  }

  // Signup form handler
  const signupForm = document.getElementById("signup-form")
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value
      const errorMsg = document.getElementById("error-message")

      if (password !== confirmPassword) {
        errorMsg.textContent = "Passwords do not match"
        return
      }

      try {
        errorMsg.textContent = ""
        const result = await ClauseGuardAuth.signup(document.getElementById("name").value, email, password)
        window.location.href = "/dashboard/index.html"
      } catch (error) {
        errorMsg.textContent = error.message || "Signup failed. Please try again."
      }
    })
  }

  // Logout handler
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      ClauseGuardAuth.logout()
    })
  }
})
