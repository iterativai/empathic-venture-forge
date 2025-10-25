import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Heart, Brain } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-warm-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 md:w-96 md:h-96 bg-success/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 md:mb-8 glass rounded-full elevation-2 transition-all duration-smooth hover:elevation-3">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" aria-hidden="true" />
          <span className="text-sm font-medium">Human-AI Partnership Platform v4.0</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight tracking-tight">
          Beyond AI Assistance.
          <br />
          <span className="gradient-text-primary">True Partnership.</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          IterativStartups creates authentic human-AI partnerships with emotional intelligence, 
          vulnerability, and proactive care for your entire startup ecosystem.
        </p>

        {/* Key Features Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 glass-strong rounded-full">
            <Heart className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium">Emotional Intelligence</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass-strong rounded-full">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Proactive Pattern Recognition</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 glass-strong rounded-full">
            <Sparkles className="w-4 h-4 text-warm-accent" />
            <span className="text-sm font-medium">Authentic Vulnerability</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all group"
            asChild
          >
            <a href="/auth">
              Get Early Access
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="glass-strong border-border hover:border-primary/50 transition-all"
            asChild
          >
            <a href="#features">Watch Demo</a>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass p-6 rounded-2xl">
            <div className="text-3xl font-bold gradient-text-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">AI Agents with Emotional Intelligence</div>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-3xl font-bold gradient-text-warm mb-2">99.9%</div>
            <div className="text-sm text-muted-foreground">Partnership Authenticity Score</div>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="text-3xl font-bold text-success mb-2">-40%</div>
            <div className="text-sm text-muted-foreground">Time to Product-Market Fit</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
