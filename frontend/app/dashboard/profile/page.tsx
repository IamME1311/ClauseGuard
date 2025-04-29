import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User, Mail, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your ClauseGuard profile",
}

export default async function ProfilePage() {
  const supabase = createClient()
  const { data: sessionData } = await supabase.auth.getSession()

  // If user is not logged in, redirect to login
  if (!sessionData.session) {
    redirect("/auth/login")
  }

  const user = sessionData.session.user

  // Get user's contracts count
  const { count } = await supabase.from("contracts").select("*", { count: "exact", head: true }).eq("user_id", user.id)

  return (
    <DashboardLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">{user.email?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{user.email}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">User ID: {user.id.substring(0, 8)}...</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span>Joined: {new Date(user.created_at || Date.now()).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-slate-500" />
                  <span>Account Type: Standard</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Your usage information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Contracts</div>
                  <div className="text-2xl font-bold">{count || 0}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Analyses</div>
                  <div className="text-2xl font-bold">{count || 0}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Research Queries</div>
                  <div className="text-2xl font-bold">0</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Plan</div>
                  <div className="text-2xl font-bold">Free</div>
                </div>
              </div>

              <Button className="w-full">Upgrade to Pro</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
