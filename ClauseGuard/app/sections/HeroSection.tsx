import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Search, Shield } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero hero-bg py-0 md:py-8 flex flex-col items-center justify-center relative min-h-[480px]">
      <div className="container flex flex-col md:flex-row items-center justify-center gap-10 py-12 md:py-20">
        {/* Hero Image */}
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <img
            src="/team-meeting.jpg"
            alt="Business team meeting with advisor in modern office"
            className="rounded-3xl shadow-2xl w-full max-w-md object-cover border-4 border-white dark:border-slate-800"
            style={{ minHeight: 320 }}
          />
        </div>
        {/* Headline and CTA */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="card bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl">
            <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4 text-primary">
              Legal Research & Contract Analysis Simplified
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-8 max-w-xl">
              ClauseGuard combines AI with legal expertise to help you research case law and analyze contracts with confidence, saving you time and reducing risk.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="btn-primary">
                <Link href="/auth/signup">
                  <FileText className="mr-2 h-5 w-5" /> Get Started
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#ai-services">
                  <Search className="mr-2 h-5 w-5" /> See How It Works
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
