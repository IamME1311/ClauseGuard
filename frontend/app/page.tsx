"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import { FileText, Search, Shield, Menu, X } from "lucide-react"
import HeroSection from "./sections/HeroSection"
import FeaturesSection from "./sections/FeaturesSection"
import AIServicesSection from "./sections/AIServicesSection"
import PricingSection from "./sections/PricingSection"
import CTASection from "./sections/CTASection"
import FAQSection from "./sections/FAQSection"
import Footer from "./components/Footer"

import { useState } from "react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      {/* Overlay Button moved to bottom left */}
      <div className="fixed bottom-4 left-4 z-50">
        
      </div>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          {/* Desktop Nav */}
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
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
            </nav>
          </div>
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              aria-label="Open menu"
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
            </nav>
          </div>
          
        </div>
        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <div
              className="bg-background w-3/4 max-w-xs h-full shadow-lg p-6 flex flex-col gap-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="font-bold text-lg" onClick={() => setMobileMenuOpen(false)}>
                  ClauseGuard
                </Link>
                <button
                  aria-label="Close menu"
                  className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 text-base font-medium">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded hover:bg-primary/10 transition">
                  Home
                </Link>
                <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded hover:bg-primary/10 transition">
                  Features
                </Link>
                <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded hover:bg-primary/10 transition">
                  Pricing
                </Link>
                <Link href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded hover:bg-primary/10 transition">
                  FAQ
                </Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 rounded hover:bg-primary/10 transition">
                  Dashboard
                </Link>
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)} className="mt-4 py-2 px-3 rounded hover:bg-primary/10 transition">
                  Login
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>
      <HeroSection />
      <FeaturesSection />
      <AIServicesSection />
      <PricingSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </div>
  )
}
