import React from "react";
import { FiShield, FiSearch, FiUsers, FiBarChart2, FiBell, FiSettings } from "react-icons/fi";

const features = [
  {
    icon: <FiShield className="text-blue-600 text-3xl" />,
    title: "Contract Risk Analysis",
    description: "Automatically analyze contracts for risky clauses and compliance issues.",
  },
  {
    icon: <FiSearch className="text-green-600 text-3xl" />,
    title: "Legal Research Assistant",
    description: "Find legal precedents, case law, and research topics instantly.",
  },
  {
    icon: <FiUsers className="text-yellow-600 text-3xl" />,
    title: "Team Collaboration",
    description: "Share documents and insights securely with your legal team.",
  },
  {
    icon: <FiBarChart2 className="text-purple-600 text-3xl" />,
    title: "Analytics Dashboard",
    description: "Visualize your document activity, approvals, and review trends.",
  },
  {
    icon: <FiBell className="text-pink-600 text-3xl" />,
    title: "Smart Notifications",
    description: "Get real-time alerts for pending reviews, approvals, and risks.",
  },
  {
    icon: <FiSettings className="text-slate-600 text-3xl" />,
    title: "Customizable Workflows",
    description: "Adapt ClauseGuard to your organization's unique legal processes.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-8 text-[#133366] dark:text-white">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div key={feature.title} className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 flex flex-col items-start gap-3">
            {feature.icon}
            <div className="font-semibold text-lg text-[#133366] dark:text-white">{feature.title}</div>
            <div className="text-slate-600 dark:text-slate-300 text-sm">{feature.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
