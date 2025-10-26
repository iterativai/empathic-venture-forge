-- Create storage bucket for business plan documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'business-plans',
  'business-plans',
  false,
  52428800, -- 50MB limit
  ARRAY[
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/msword',
    'text/plain',
    'text/markdown'
  ]
);

-- RLS policies for business plans bucket
CREATE POLICY "Users can upload their own business plans"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'business-plans' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own business plans"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'business-plans' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own business plans"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'business-plans' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create business_plan_analyses table
CREATE TABLE public.business_plan_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'processing', -- processing, completed, failed
  overall_score INTEGER,
  dimensional_scores JSONB,
  strengths JSONB,
  gaps JSONB,
  recommendations JSONB,
  financial_analysis JSONB,
  market_analysis JSONB,
  full_report JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.business_plan_analyses ENABLE ROW LEVEL SECURITY;

-- RLS policies for business_plan_analyses
CREATE POLICY "Users can view own analyses"
ON public.business_plan_analyses
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own analyses"
ON public.business_plan_analyses
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own analyses"
ON public.business_plan_analyses
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses"
ON public.business_plan_analyses
FOR DELETE
USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_business_plan_analyses_updated_at
BEFORE UPDATE ON public.business_plan_analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();