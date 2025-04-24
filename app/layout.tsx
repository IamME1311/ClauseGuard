<<<<<<< HEAD
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
=======
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "ClauseGuard - AI-Powered Legal Contract Analysis",
    template: "%s | ClauseGuard",
  },
  description: "ClauseGuard helps you analyze legal contracts using AI technology",
  keywords: ["legal tech", "contract analysis", "AI", "legal documents"],
    generator: 'v0.dev'
>>>>>>> 2989183 (chore: Initial commit with line ending normalization)
}

export default function RootLayout({
  children,
<<<<<<< HEAD
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
=======
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
>>>>>>> 2989183 (chore: Initial commit with line ending normalization)
    </html>
  )
}
