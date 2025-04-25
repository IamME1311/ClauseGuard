import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: 29,
    period: "/month",
    features: [
      "50 searches/month",
      "10 contract analyses",
      "Email support",
      "Basic analytics"
    ],
    cta: {
      label: "Get Started",
      href: "/auth/signup",
      variant: "outline"
    }
  },
  {
    name: "Pro",
    price: 79,
    period: "/month",
    features: [
      "Unlimited searches",
      "50 contract analyses",
      "Priority support",
      "Advanced analytics",
      "Team collaboration"
    ],
    cta: {
      label: "Get Started",
      href: "/auth/signup",
      variant: "primary"
    },
    popular: true
  },
  {
    name: "Enterprise",
    price: 199,
    period: "/month",
    features: [
      "Unlimited searches",
      "Unlimited contract analyses",
      "Dedicated account manager",
      "Custom integrations",
      "Premium analytics",
      "Team collaboration"
    ],
    cta: {
      label: "Contact Sales",
      href: "/contact",
      variant: "secondary"
    }
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="pricing py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold mb-10 text-center">Pricing</h2>
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              className={`pricing-card bg-background rounded-lg shadow p-8 flex flex-col items-center text-center border transition hover:shadow-lg ${plan.popular ? 'border-primary scale-105 z-10' : 'border-muted'}`}
              key={idx}
            >
              {plan.popular && (
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">Most Popular</div>
              )}
              <h3 className="pricing-title text-2xl font-semibold mb-2">{plan.name}</h3>
              <div className="pricing-price text-4xl font-bold mb-4">
                ${plan.price}
                <span className="pricing-period text-base font-normal text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="pricing-features text-left mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li className="pricing-feature flex items-center gap-2" key={i}>
                    <FaCheck className="text-green-500" /> {feature}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className={`w-full ${plan.cta.variant === 'primary' ? 'btn-primary shadow-lg' : (plan.cta.variant === 'outline' ? 'btn-outline border-2 border-primary text-primary hover:bg-primary hover:text-white transition' : 'btn-secondary shadow-lg')}`}
              variant={plan.cta.variant === 'primary' ? 'default' : plan.cta.variant}>
                <Link href={plan.cta.href}>{plan.cta.label}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
