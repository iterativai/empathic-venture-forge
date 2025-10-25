import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CoAgents from "@/components/CoAgents";
import Features from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <CoAgents />
      <Features />
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <span className="text-white font-bold text-sm">IS</span>
            </div>
            <span className="text-lg font-bold">IterativStartups</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Human-AI Partnership Platform v4.0
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 IterativStartups. Creating authentic partnerships for the startup ecosystem.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
