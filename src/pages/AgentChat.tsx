import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, TrendingUp, DollarSign, Wrench, ArrowLeft, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const agentConfig: Record<string, { icon: any; name: string; color: string }> = {
  co_founder: { icon: Users, name: "Co-Founder Agent", color: "primary" },
  co_investor: { icon: TrendingUp, name: "Co-Investor Agent", color: "success" },
  co_lender: { icon: DollarSign, name: "Co-Lender Agent", color: "warning" },
  co_builder: { icon: Wrench, name: "Co-Builder Agent", color: "warm-accent" },
};

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

const AgentChat = () => {
  const { agentType } = useParams<{ agentType: string }>();
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get('conversation');
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [input, setInput] = useState("");
  const [currentConversationId, setCurrentConversationId] = useState(conversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agent = agentConfig[agentType || 'co_founder'];
  const Icon = agent?.icon || Users;

  // Fetch or create conversation
  const { data: conversation, isLoading: conversationLoading } = useQuery({
    queryKey: ['conversation', currentConversationId, agentType],
    queryFn: async () => {
      if (currentConversationId) {
        const { data, error } = await supabase
          .from('agent_conversations')
          .select('*')
          .eq('id', currentConversationId)
          .single();
        
        if (error) throw error;
        return data;
      }
      
      // Create new conversation
      const { data, error } = await supabase
        .from('agent_conversations')
        .insert({
          user_id: user?.id,
          agent_type: agentType,
          title: `${agent.name} Chat`
        })
        .select()
        .single();
      
      if (error) throw error;
      setCurrentConversationId(data.id);
      return data;
    },
    enabled: !!user && !!agentType
  });

  // Fetch messages
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', currentConversationId],
    queryFn: async () => {
      if (!currentConversationId) return [];
      
      const { data, error } = await supabase
        .from('agent_messages')
        .select('*')
        .eq('conversation_id', currentConversationId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Message[];
    },
    enabled: !!currentConversationId
  });

  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      if (!currentConversationId || !user) throw new Error("No conversation");

      // Save user message
      const { error: userMsgError } = await supabase
        .from('agent_messages')
        .insert({
          conversation_id: currentConversationId,
          role: 'user',
          content
        });

      if (userMsgError) throw userMsgError;

      // Get all messages for context
      const allMessages = [
        ...(messages || []),
        { role: 'user', content }
      ].map(m => ({ role: m.role, content: m.content }));

      // Call AI agent
      const { data: aiResponse, error: aiError } = await supabase.functions.invoke('chat-agent', {
        body: {
          messages: allMessages,
          agentType
        }
      });

      if (aiError) throw aiError;

      // Save AI response
      const { error: aiMsgError } = await supabase
        .from('agent_messages')
        .insert({
          conversation_id: currentConversationId,
          role: 'assistant',
          content: aiResponse.message
        });

      if (aiMsgError) throw aiMsgError;

      return aiResponse.message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', currentConversationId] });
      setInput("");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send message");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !sendMessage.isPending) {
      sendMessage.mutate(input.trim());
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isLoading = conversationLoading || messagesLoading;

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-surface/50 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className={`w-10 h-10 rounded-xl bg-${agent.color}/10 flex items-center justify-center`}>
                <Icon className={`w-5 h-5 text-${agent.color}`} />
              </div>
              <div>
                <h1 className="font-bold">{agent.name}</h1>
                <p className="text-xs text-muted-foreground">AI Partnership Agent</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : messages && messages.length > 0 ? (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-3xl rounded-br-lg'
                        : 'glass rounded-3xl rounded-bl-lg'
                    } p-4`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon className={`w-16 h-16 text-${agent.color} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold mb-2">Start Your Partnership</h3>
                <p className="text-muted-foreground">Ask me anything about your business journey!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border/50 bg-surface/50 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={sendMessage.isPending}
              className="bg-background border-border"
            />
            <Button
              type="submit"
              disabled={!input.trim() || sendMessage.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {sendMessage.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentChat;
