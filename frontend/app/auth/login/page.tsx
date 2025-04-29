import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "./login-form"

export const metadata: Metadata = {
  title: "Login | ClauseGuard",
  description: "Login to your ClauseGuard account",
}

export default async function LoginPage() {
  const supabase = createClient()
  const { data } = await supabase.auth.getSession()

  // If user is already logged in, redirect to dashboard
  if (data.session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="font-medium text-primary underline-offset-4 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
