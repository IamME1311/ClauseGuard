"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

import { FaGoogle, FaGithub } from "react-icons/fa"

import { useEffect } from "react"
import { useSession } from "@/lib/supabase/session-context"

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showReset, setShowReset] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetMessage, setResetMessage] = useState<string | null>(null)
  const [resetError, setResetError] = useState<string | null>(null)
  const supabase = createClient()

  // Redirect authenticated users away from login page
  useEffect(() => {
    if (session) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  function validateEmail(email: string) {
    // Simple email regex
    return /^\S+@\S+\.\S+$/.test(email)
  }
  function validatePassword(password: string) {
    // At least 8 chars, 1 letter, 1 number, allows special characters
    return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(password);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)
    setEmailError(null)
    setPasswordError(null)

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.")
      setIsSubmitting(false)
      return
    }
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters and contain at least one letter and one number.")
      setIsSubmitting(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        throw error
      }
      setSuccess("Login successful! Redirecting...");
      toast({
        title: "Login successful!",
        description: "Welcome back! Redirecting to dashboard...",
        duration: 2000,
      });
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "An error occurred during login");
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
        duration: 2500,
      });
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    setResetMessage(null)
    setResetError(null)
    if (!validateEmail(resetEmail)) {
      setResetError("Please enter a valid email address.")
      return
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
          : `${window.location.origin}/auth/callback`,
      })
      if (error) throw error
      setResetMessage("If this email is registered, you will receive a password reset link.")
    } catch (err: any) {
      setResetError(err.message || "An error occurred while sending reset email.")
    }
  }

  async function handleSocialLogin(provider: "google" | "github") {
    await supabase.auth.signInWithOAuth({ provider, options: {
    redirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
      : `${window.location.origin}/auth/callback`
  } })
  }

  return (
    <>
      {showReset ? (
        <form onSubmit={handleResetPassword} className="space-y-4 bg-muted/50 p-4 rounded">
          <h2 className="text-lg font-semibold">Reset Password</h2>
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email</Label>
            <Input
              id="reset-email"
              type="email"
              placeholder="youremail@example.com"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              required
              aria-invalid={!!resetError}
            />
            {resetError && <p className="text-xs text-red-600 mt-1">{resetError}</p>}
            {resetMessage && <p className="text-xs text-green-600 mt-1">{resetMessage}</p>}
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="w-full">Send Reset Link</Button>
            <Button type="button" variant="outline" onClick={() => setShowReset(false)}>Back</Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              aria-invalid={!!emailError}
            />
            {emailError && (
              <p className="text-xs text-red-600 mt-1">{emailError}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
                aria-invalid={!!passwordError}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-xs text-gray-500 hover:text-gray-700"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {passwordError && (
              <p className="text-xs text-red-600 mt-1">{passwordError}</p>
            )}
            <button
              type="button"
              className="text-xs text-primary underline mt-2 hover:text-primary/80"
              onClick={() => setShowReset(true)}
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <div className="flex flex-col gap-2 mt-4">
            <Button type="button" variant="outline" className="flex items-center gap-2 justify-center" onClick={() => handleSocialLogin("google")}> <FaGoogle /> Continue with Google </Button>
            <Button type="button" variant="outline" className="flex items-center gap-2 justify-center" onClick={() => handleSocialLogin("github")}> <FaGithub /> Continue with GitHub </Button>
          </div>
        </form>
      )}
    </>
  )
}
