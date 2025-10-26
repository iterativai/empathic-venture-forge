import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, DollarSign, Wrench, Plus, MessageSquare, LogOut, FileText, Target } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const agents = [
  {
    icon: Users,
    name: "Co-Founder Agent",
    type: "co_founder",
    color: "primary",
    description: "Strategic partner for business planning and growth"
  },
  {
    icon: TrendingUp,
    name: "Co-Investor Agent",
    type: "co_investor",
    color: "success",
    description: "Investment analysis and portfolio management"
  },
  {
    icon: DollarSign,
    name: "Co-Lender Agent",
    type: "co_lender",
    color: "warning",
    description: "Credit assessment and lending insights"
  },
  {
    icon: Wrench,
    name: "Co-Builder Agent",
    type: "co_builder",
    color: "warm-accent",
    description: "Technical guidance and product development"
  }
];

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const { data: conversations } = useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agent_conversations')
        .select('*')
        .eq('user_id', user?.id)
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const { data: analyses } = useQuery({
    queryKey: ['analyses', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('business_plan_analyses')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-surface/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <span className="text-white font-bold text-sm">IS</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">Dashboard</h1>
                <p className="text-xs text-muted-foreground">Welcome back, {profile?.full_name || 'there'}!</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Conversations</h3>
            </div>
            <p className="text-3xl font-bold">{conversations?.length || 0}</p>
            <p className="text-sm text-muted-foreground mt-1">Active agent chats</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-success" />
              <h3 className="font-semibold">Business Plan Analyses</h3>
            </div>
            <p className="text-3xl font-bold">{analyses?.length || 0}</p>
            <p className="text-sm text-muted-foreground mt-1">Plans analyzed</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-warm-accent" />
              <h3 className="font-semibold">Active Agents</h3>
            </div>
            <p className="text-3xl font-bold">4</p>
            <p className="text-sm text-muted-foreground mt-1">Ready to help</p>
          </div>
        </div>

        {/* Business Plan Analysis Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Business Plan Analysis</h2>
            <Button onClick={() => navigate('/business-plan-upload')}>
              <FileText className="mr-2 h-4 w-4" />
              Upload Business Plan
            </Button>
          </div>
          
          <div className="glass p-6 rounded-3xl mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Transform Your Business Plan</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get AI-powered analysis across 15 critical dimensions, investor readiness scoring, 
                  and actionable recommendations to make your plan investor-ready.
                </p>
                <Button onClick={() => navigate('/business-plan-upload')} size="sm">
                  Get Started
                </Button>
              </div>
            </div>
          </div>

          {analyses && analyses.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold mb-3">Recent Analyses</h3>
              {analyses.map((analysis) => (
                <Link
                  key={analysis.id}
                  to={`/business-plan-analysis/${analysis.id}`}
                  className="glass p-4 rounded-2xl flex items-center justify-between hover:glass-strong transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <h4 className="font-semibold">{analysis.file_name}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{new Date(analysis.created_at).toLocaleDateString()}</span>
                        {analysis.overall_score && (
                          <span className="font-medium">Score: {analysis.overall_score}/100</span>
                        )}
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          analysis.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                          analysis.status === 'processing' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {analysis.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    View →
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* AI Agents Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your AI Partners</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <Link
                  key={index}
                  to={`/agents/${agent.type}`}
                  className="group card-premium p-6 rounded-3xl hover:scale-105 transition-all"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-${agent.color}/10 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${agent.color}`} />
                  </div>
                  <h3 className="font-bold mb-2">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                  <Button size="sm" variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent Conversations */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Conversations</h2>
          {conversations && conversations.length > 0 ? (
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  to={`/agents/${conversation.agent_type}?conversation=${conversation.id}`}
                  className="glass p-4 rounded-2xl flex items-center justify-between hover:glass-strong transition-all"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="font-semibold">{conversation.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(conversation.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    Continue →
                  </Button>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass p-12 rounded-3xl text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
              <p className="text-muted-foreground mb-6">Start chatting with your AI partners to begin your journey</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
