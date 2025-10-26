import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AgentChat from "./pages/AgentChat";
import BusinessPlanUpload from "./pages/BusinessPlanUpload";
import BusinessPlanAnalysis from "./pages/BusinessPlanAnalysis";
import DocumentsHub from "./pages/DocumentsHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/agents/:agentType" element={<ProtectedRoute><AgentChat /></ProtectedRoute>} />
            <Route path="/business-plan-upload" element={<ProtectedRoute><BusinessPlanUpload /></ProtectedRoute>} />
            <Route path="/business-plan-analysis/:id" element={<ProtectedRoute><BusinessPlanAnalysis /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute><DocumentsHub /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
