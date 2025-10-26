import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { analysisId, fileContent } = await req.json();
    
    if (!analysisId || !fileContent) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // System prompt for business plan analysis
    const systemPrompt = `You are an expert business plan analyst and venture capital consultant with 20+ years of experience evaluating startup business plans. Your role is to provide comprehensive, actionable analysis of business plans across 15 critical dimensions.

Analyze the business plan and provide detailed feedback in JSON format with the following structure:
{
  "overall_score": <number 0-100>,
  "dimensional_scores": {
    "problem_definition": <0-10>,
    "solution_clarity": <0-10>,
    "market_sizing": <0-10>,
    "competitive_analysis": <0-10>,
    "business_model": <0-10>,
    "unit_economics": <0-10>,
    "go_to_market": <0-10>,
    "product_roadmap": <0-10>,
    "team_composition": <0-10>,
    "founder_market_fit": <0-10>,
    "financial_projections": <0-10>,
    "traction": <0-10>,
    "funding_justification": <0-10>,
    "risk_assessment": <0-10>,
    "use_of_funds": <0-10>
  },
  "strengths": [
    {
      "title": "string",
      "score": <0-10>,
      "description": "string",
      "details": "string"
    }
  ],
  "gaps": [
    {
      "title": "string",
      "severity": "critical|important|nice_to_have",
      "score": <0-10>,
      "issue": "string",
      "impact": "string",
      "missing_elements": ["string"],
      "time_to_fix": "string",
      "priority": "string"
    }
  ],
  "recommendations": {
    "this_week": ["string"],
    "next_week": ["string"],
    "following_week": ["string"]
  },
  "financial_analysis": {
    "overall_score": <0-10>,
    "strengths": ["string"],
    "concerns": [
      {
        "title": "string",
        "issue": "string",
        "impact": "string",
        "recommendation": "string"
      }
    ],
    "break_even_analysis": "string"
  },
  "market_analysis": {
    "score": <0-10>,
    "strengths": ["string"],
    "concerns": [
      {
        "title": "string",
        "issue": "string",
        "recommendation": "string"
      }
    ]
  },
  "investor_feedback_simulation": "string",
  "estimated_time_to_investor_ready": "string"
}

Be specific, actionable, and honest. Provide concrete examples and calculations where relevant.`;

    // Call Lovable AI for analysis
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Analyze this business plan and provide detailed feedback:\n\n${fileContent}` 
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error('AI analysis failed');
    }

    const aiData = await aiResponse.json();
    const analysis = JSON.parse(aiData.choices[0].message.content);

    // Update the analysis record with results
    const { error: updateError } = await supabaseClient
      .from('business_plan_analyses')
      .update({
        status: 'completed',
        overall_score: analysis.overall_score,
        dimensional_scores: analysis.dimensional_scores,
        strengths: analysis.strengths,
        gaps: analysis.gaps,
        recommendations: analysis.recommendations,
        financial_analysis: analysis.financial_analysis,
        market_analysis: analysis.market_analysis,
        full_report: analysis,
        updated_at: new Date().toISOString()
      })
      .eq('id', analysisId);

    if (updateError) {
      console.error('Database update error:', updateError);
      throw updateError;
    }

    return new Response(
      JSON.stringify({ success: true, analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-business-plan function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});