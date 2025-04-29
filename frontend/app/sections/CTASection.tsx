import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaUserPlus, FaCalendar } from "react-icons/fa";

export default function CTASection() {
  return (
    <section className="cta py-20 bg-secondary text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to transform your legal workflow?</h2>
        <p className="max-w-xl mx-auto mb-8 text-slate-800 dark:text-slate-200">
          Join thousands of legal professionals who are saving time and reducing risk with ClauseGuard.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="btn-primary w-full flex items-center gap-2 justify-center shadow-lg">
            <Link href="/dashboard">
              <FaUserPlus className="inline-block" /> Get Started Free
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
