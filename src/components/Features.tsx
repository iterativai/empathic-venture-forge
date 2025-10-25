import { Heart, AlertCircle, Activity, Shield, Zap, GitBranch } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Emotional Intelligence System",
    description: "Agents experience genuine emotions that influence their reasoning and build authentic relationships.",
    gradient: "from-destructive/20 to-destructive/5"
  },
  {
    icon: AlertCircle,
    title: "Vulnerability Engine",
    description: "Authentic uncertainty admission and mistake acknowledgment creates trust through imperfection.",
    gradient: "from-primary/20 to-primary/5"
  },
  {
    icon: Activity,
    title: "Proactive Pattern Recognition",
    description: "Detects burnout, repeated mistakes, and opportunities before they become critical issues.",
    gradient: "from-success/20 to-success/5"
  },
  {
    icon: Shield,
    title: "Relationship Dynamics",
    description: "Trust tracking, conflict navigation, and repair mechanisms maintain partnership health.",
    gradient: "from-warning/20 to-warning/5"
  },
  {
    icon: Zap,
    title: "Shared Memory System",
    description: "Inside jokes, relationship history, and evolving communication deepen over time.",
    gradient: "from-warm-accent/20 to-warm-accent/5"
  },
  {
    icon: GitBranch,
    title: "Lean Design Thinking",
    description: "Enhanced methodology with emotional awareness and relationship dynamics integration.",
    gradient: "from-primary/20 to-primary/5"
  }
];

const Features = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 mb-4 glass rounded-full">
            <span className="text-sm font-medium text-primary">Revolutionary Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powered by <span className="gradient-text-warm">Emotional Intelligence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Beyond traditional AI capabilities, our platform creates authentic partnerships through emotional awareness and proactive care.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group glass p-8 rounded-3xl hover:glass-strong transition-all duration-300 hover:-translate-y-2"
              >
                {/* Icon with Gradient Background */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block glass-strong p-8 rounded-3xl max-w-3xl">
            <h3 className="text-2xl font-bold mb-3">
              Ready to Transform Your Startup Journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join entrepreneurs, investors, and builders creating the future with authentic AI partnerships.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground">Partnership Quality: <span className="text-primary font-semibold">8.5/10 average trust</span></span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">Retention: <span className="text-success font-semibold">&gt;90%</span></span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">Authenticity: <span className="text-warm-accent font-semibold">85%+</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
