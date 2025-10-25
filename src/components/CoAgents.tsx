import { Users, TrendingUp, DollarSign, Wrench } from "lucide-react";

const agents = [
  {
    icon: Users,
    name: "Co-Founder Agent",
    color: "primary",
    description: "Your strategic partner who understands your vision, challenges assumptions, and grows with your business.",
    features: ["Business Strategy", "Problem-Solving", "Emotional Support", "Pattern Recognition"]
  },
  {
    icon: TrendingUp,
    name: "Co-Investor Agent",
    color: "success",
    description: "Investment partner who provides due diligence, portfolio analytics, and authentic market insights.",
    features: ["Deal Flow Management", "Portfolio Analytics", "Risk Assessment", "Market Intelligence"]
  },
  {
    icon: DollarSign,
    name: "Co-Lender Agent",
    color: "warning",
    description: "Lending partner offering credit assessment, risk analysis, and proactive loan portfolio management.",
    features: ["Credit Analysis", "Risk Modeling", "Portfolio Health", "Proactive Alerts"]
  },
  {
    icon: Wrench,
    name: "Co-Builder Agent",
    color: "warm-accent",
    description: "Technical partner who helps build, iterate, and scale your product with real-time collaboration.",
    features: ["Technical Guidance", "Rapid Prototyping", "Quality Assurance", "Scale Strategy"]
  }
];

const colorStyles = {
  primary: "border-primary/20 hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(46,125,255,0.3)]",
  success: "border-success/20 hover:border-success/50 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]",
  warning: "border-warning/20 hover:border-warning/50 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]",
  "warm-accent": "border-warm-accent/20 hover:border-warm-accent/50 group-hover:shadow-[0_0_40px_rgba(217,119,6,0.3)]"
};

const iconColorStyles = {
  primary: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  "warm-accent": "text-warm-accent bg-warm-accent/10"
};

const CoAgents = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 mb-4 glass rounded-full">
            <span className="text-sm font-medium text-primary">4 Core Partnership Agents</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Your <span className="gradient-text-primary">AI Partners</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Each agent brings emotional intelligence, authentic vulnerability, and proactive care to your entrepreneurial journey.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent, index) => {
            const Icon = agent.icon;
            return (
              <div 
                key={index}
                className={`group card-premium p-8 rounded-3xl transition-all duration-300 ${colorStyles[agent.color as keyof typeof colorStyles]}`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${iconColorStyles[agent.color as keyof typeof iconColorStyles]} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{agent.name}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {agent.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {agent.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 text-sm glass-strong rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoAgents;
