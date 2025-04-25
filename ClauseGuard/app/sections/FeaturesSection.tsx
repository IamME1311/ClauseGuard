import { FaSearch, FaFileContract, FaRobot, FaShieldAlt, FaBolt, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: <FaSearch className="h-8 w-8 text-primary mb-2" />,
    title: "Legal Research",
    description: "Search and analyze case law precedents to build stronger legal arguments and stay up-to-date with relevant rulings."
  },
  {
    icon: <FaFileContract className="h-8 w-8 text-primary mb-2" />,
    title: "Contract Analysis",
    description: "Identify risks and issues in contracts before signing to protect your interests and negotiate better terms."
  },
  {
    icon: <FaRobot className="h-8 w-8 text-primary mb-2" />,
    title: "AI-Powered",
    description: "Leverage cutting-edge AI to get insights and recommendations in seconds, not hours or days."
  },
  {
    icon: <FaShieldAlt className="h-8 w-8 text-primary mb-2" />,
    title: "Risk Mitigation",
    description: "Proactively identify and address legal risks before they become costly problems for your business."
  },
  {
    icon: <FaBolt className="h-8 w-8 text-primary mb-2" />,
    title: "Time Saving",
    description: "Reduce research and review time by up to 80%, allowing you to focus on higher-value legal work."
  },
  {
    icon: <FaChartLine className="h-8 w-8 text-primary mb-2" />,
    title: "Analytics",
    description: "Track your legal research and contract analysis history with detailed analytics and insights."
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="features py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold mb-10 text-center">Features</h2>
        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div className="feature-card bg-background rounded-lg shadow p-6 flex flex-col items-center text-center hover:shadow-lg transition" key={idx}>
              <div className="feature-icon mb-4">{feature.icon}</div>
              <h3 className="feature-title text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="feature-description text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
