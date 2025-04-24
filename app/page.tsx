<<<<<<< HEAD
"use client"

import  from "../frontend/js/theme"

export default function SyntheticV0PageForDeployment() {
  return < />
}
=======
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { FileText, Search, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">ClauseGuard</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#features" className="transition-colors hover:text-foreground/80">
                Features
              </Link>
              <Link href="#pricing" className="transition-colors hover:text-foreground/80">
                Pricing
              </Link>
              <Link href="#faq" className="transition-colors hover:text-foreground/80">
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    AI-Powered Legal Contract Analysis
                  </h1>
                  <p className="max-w-[600px] text-slate-500 dark:text-slate-400 md:text-xl">
                    ClauseGuard helps legal professionals and businesses analyze contracts faster and more accurately
                    with advanced AI.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative h-full w-full">
                  <div className="bg-muted rounded-lg p-8 h-full flex items-center justify-center">
                    <div className="text-4xl font-bold">ClauseGuard</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Key Features</h2>
                <p className="max-w-[900px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ClauseGuard uses advanced AI to help you analyze legal contracts quickly and accurately.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Contract Analysis</h3>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Extract key clauses, identify risks, and get summaries of legal documents.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Legal Research</h3>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Research legal topics and precedents to strengthen your legal arguments.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                <div className="rounded-full bg-primary p-2 text-primary-foreground">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Risk Assessment</h3>
                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Identify potential legal risks and get suggestions for mitigation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          © 2023 ClauseGuard. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
>>>>>>> 2989183 (chore: Initial commit with line ending normalization)
