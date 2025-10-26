import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, AlertCircle, Loader2, TrendingUp, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BusinessPlanAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAnalysis = async () => {
      try {
        const { data, error } = await supabase
          .from('business_plan_analyses')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setAnalysis(data);
      } catch (error: any) {
        console.error('Error fetching analysis:', error);
        toast.error('Failed to load analysis');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();

    // Set up realtime subscription for status updates
    const channel = supabase
      .channel('analysis-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'business_plan_analyses',
          filter: `id=eq.${id}`
        },
        (payload) => {
          setAnalysis(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 6) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBadge = (score: number): "default" | "destructive" | "outline" | "secondary" => {
    if (score >= 8) return "default";
    if (score >= 6) return "secondary";
    return "destructive";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Analysis not found</p>
      </div>
    );
  }

  if (analysis.status === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Analyzing Your Business Plan</h2>
          <p className="text-muted-foreground mb-4">
            Our AI is conducting a comprehensive analysis across 15 critical dimensions...
          </p>
          <Progress value={65} className="w-full" />
          <p className="text-sm text-muted-foreground mt-4">This usually takes 1-2 minutes</p>
        </Card>
      </div>
    );
  }

  const dimensionalScores = analysis.dimensional_scores || {};
  const strengths = analysis.strengths || [];
  const gaps = analysis.gaps || [];
  const recommendations = analysis.recommendations || {};
  const financialAnalysis = analysis.financial_analysis || {};
  const marketAnalysis = analysis.market_analysis || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="container max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Business Plan Analysis</h1>
          <p className="text-muted-foreground">{analysis.file_name}</p>
        </div>

        {/* Overall Score Card */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Investor Readiness Score</p>
              <h2 className="text-5xl font-bold">{analysis.overall_score}/100</h2>
              <p className="text-muted-foreground mt-2">
                {analysis.overall_score >= 80 && "Investor-ready with minor refinements"}
                {analysis.overall_score >= 60 && analysis.overall_score < 80 && "Solid foundation, needs improvement"}
                {analysis.overall_score < 60 && "Requires significant development"}
              </p>
            </div>
            <div className="text-right">
              <Target className="w-16 h-16 text-primary mb-2" />
              <p className="text-sm text-muted-foreground">Target: 80+</p>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strengths">Strengths</TabsTrigger>
            <TabsTrigger value="gaps">Gaps</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="action">Action Plan</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Dimensional Scores</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(dimensionalScores).map(([key, score]: [string, any]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium capitalize">
                        {key.replace(/_/g, ' ')}
                      </p>
                      <Progress value={score * 10} className="mt-2" />
                    </div>
                    <span className={`ml-3 text-2xl font-bold ${getScoreColor(score)}`}>
                      {score}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Strengths Tab */}
          <TabsContent value="strengths" className="space-y-4">
            {strengths.map((strength: any, index: number) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{strength.title}</h3>
                      <Badge variant={getScoreBadge(strength.score)}>
                        {strength.score}/10
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{strength.description}</p>
                    <p className="text-sm">{strength.details}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Gaps Tab */}
          <TabsContent value="gaps" className="space-y-4">
            {gaps.map((gap: any, index: number) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${
                    gap.severity === 'critical' ? 'text-red-500' : 
                    gap.severity === 'important' ? 'text-yellow-500' : 
                    'text-blue-500'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{gap.title}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant={gap.severity === 'critical' ? 'destructive' : 'secondary'}>
                          {gap.severity}
                        </Badge>
                        <Badge variant="outline">{gap.score}/10</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2"><strong>Issue:</strong> {gap.issue}</p>
                    <p className="text-muted-foreground mb-2"><strong>Impact:</strong> {gap.impact}</p>
                    {gap.missing_elements && gap.missing_elements.length > 0 && (
                      <div className="mb-2">
                        <p className="font-medium text-sm mb-1">Missing Elements:</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          {gap.missing_elements.map((element: string, i: number) => (
                            <li key={i}>{element}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex gap-4 text-sm mt-3">
                      <p><strong>Time to Fix:</strong> {gap.time_to_fix}</p>
                      <p><strong>Priority:</strong> {gap.priority}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Financial Tab */}
          <TabsContent value="financial" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Financial Model Analysis</h3>
                <Badge variant={getScoreBadge(financialAnalysis.overall_score || 0)}>
                  {financialAnalysis.overall_score}/10
                </Badge>
              </div>

              {financialAnalysis.strengths && financialAnalysis.strengths.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-green-600">Strengths</h4>
                  <ul className="space-y-2">
                    {financialAnalysis.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {financialAnalysis.concerns && financialAnalysis.concerns.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 text-yellow-600">Concerns</h4>
                  <div className="space-y-4">
                    {financialAnalysis.concerns.map((concern: any, index: number) => (
                      <div key={index} className="p-4 bg-muted rounded-lg">
                        <h5 className="font-medium mb-1">{concern.title}</h5>
                        <p className="text-sm text-muted-foreground mb-2">{concern.issue}</p>
                        <p className="text-sm"><strong>Impact:</strong> {concern.impact}</p>
                        <p className="text-sm mt-2"><strong>Recommendation:</strong> {concern.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Action Plan Tab */}
          <TabsContent value="action" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Recommended Action Plan</h3>
              
              {recommendations.this_week && recommendations.this_week.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-red-600">This Week (HIGH Priority)</h4>
                  <ul className="space-y-2">
                    {recommendations.this_week.map((action: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-sm pt-0.5">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendations.next_week && recommendations.next_week.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-yellow-600">Next Week (MEDIUM Priority)</h4>
                  <ul className="space-y-2">
                    {recommendations.next_week.map((action: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-sm pt-0.5">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {recommendations.following_week && recommendations.following_week.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Following Week (LOW Priority)</h4>
                  <ul className="space-y-2">
                    {recommendations.following_week.map((action: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="text-sm pt-0.5">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessPlanAnalysis;