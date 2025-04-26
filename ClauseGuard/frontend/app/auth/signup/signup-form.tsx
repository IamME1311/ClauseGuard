"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

import React from "react"

function PasswordStrengthMeter({ password }: { password: string }) {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  let color = ["bg-gray-200", "bg-red-400", "bg-yellow-400", "bg-green-400", "bg-green-600"][score]
  let label = ["Too short", "Weak", "Fair", "Good", "Strong"][score]
  return (
    <div className="mt-2">
      <div className="w-full h-2 rounded bg-gray-200">
        <div className={`h-2 rounded ${color}`} style={{ width: `calc(${score}/4*100%)` }} />
      </div>
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  )
}

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const supabase = createClient()

  function validateEmail(email: string) {
    // Simple email regex
    return /^\S+@\S+\.\S+$/.test(email)
  }

  function validatePassword(password: string) {
    // At least 8 chars, 1 letter, 1 number
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)
    setEmailError(null)
    setPasswordError(null)
    setConfirmPasswordError(null)

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
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.")
      setIsSubmitting(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      setSuccess("Check your email for a link to confirm your account.")
    } catch (error: any) {
      setError(error.message || "An error occurred during signup")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
            aria-invalid={!!passwordError}
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-xs text-gray-500 hover:text-gray-700"
            tabIndex={0}
            onClick={() => setShowPassword(v => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <PasswordStrengthMeter password={password} />
        {passwordError && (
          <p className="text-xs text-red-600 mt-1">{passwordError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isSubmitting}
            aria-invalid={!!confirmPasswordError}
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-xs text-gray-500 hover:text-gray-700"
            tabIndex={0}
            onClick={() => setShowConfirmPassword(v => !v)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {confirmPasswordError && (
          <p className="text-xs text-red-600 mt-1">{confirmPasswordError}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  )
}
