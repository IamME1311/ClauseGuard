"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  Sidebar,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { FileText, Search, Home, LogOut, Sun, Moon, User, Menu, X } from "lucide-react"
import { useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const supabase = createClient()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/auth/login"
  }

  return (
    <SidebarProvider>
      <div className="relative min-h-screen">
        {/* Mobile menu button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <Sidebar className={mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}>
          <div className="p-2">
            <h2 className="text-xl font-bold">ClauseGuard</h2>
          </div>
          <SidebarMenu>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/contract-analysis"}>
              <Link href="/dashboard/contract-analysis" onClick={() => setMobileMenuOpen(false)}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Contract Analysis</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/legal-research"}>
              <Link href="/dashboard/legal-research" onClick={() => setMobileMenuOpen(false)}>
                <Search className="mr-2 h-4 w-4" />
                <span>Legal Research</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/profile" onClick={() => setMobileMenuOpen(false)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuButton onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenu>
        </Sidebar>
        <SidebarInset>
          <main className="min-h-screen flex-1">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
