/*
  # Documents Hub Schema

  ## Overview
  This migration creates the database schema for the Documents Hub feature, which includes:
  - Business plans with validation workflows
  - Pitch decks with AI generation tracking
  - Proposals with evidence-based development
  - Application forms with AI-assisted filling

  ## New Tables
  
  ### `documents`
  Core table for all document types
  - `id` (uuid, primary key) - Unique document identifier
  - `user_id` (uuid, foreign key) - References auth.users
  - `type` (text) - Document type: 'plan', 'deck', 'proposal', 'form'
  - `title` (text) - Document title
  - `content` (jsonb) - Document content (flexible structure)
  - `status` (text) - Document status: 'draft', 'in_progress', 'completed'
  - `mode` (text) - Creation mode: 'fast-track', 'validated'
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `document_assumptions`
  Stores assumptions extracted from documents for validation
  - `id` (uuid, primary key) - Unique assumption identifier
  - `document_id` (uuid, foreign key) - References documents table
  - `text` (text) - Assumption text
  - `risk` (text) - Risk level: 'high', 'medium', 'low'
  - `status` (text) - Validation status: 'untested', 'validated', 'invalidated'
  - `source_section` (text) - Section where assumption originated
  - `created_at` (timestamptz) - Creation timestamp

  ### `document_experiments`
  Tracks validation experiments for assumptions
  - `id` (uuid, primary key) - Unique experiment identifier
  - `assumption_id` (uuid, foreign key) - References document_assumptions
  - `hypothesis` (text) - Testable hypothesis
  - `method` (text) - Experiment methodology
  - `results` (jsonb) - Experiment results data
  - `conclusion` (text) - Experiment conclusion
  - `created_at` (timestamptz) - Creation timestamp

  ### `document_pivots`
  Records pivot decisions and their rationale
  - `id` (uuid, primary key) - Unique pivot identifier
  - `document_id` (uuid, foreign key) - References documents table
  - `pivot_type` (text) - Type of pivot from 10-type framework
  - `reason` (text) - Reason for pivoting
  - `changes` (jsonb) - Changes made during pivot
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Users can only access their own documents
  - Users can only manage their own assumptions, experiments, and pivots
*/

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('plan', 'deck', 'proposal', 'form')),
  title text NOT NULL,
  content jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'completed')),
  mode text DEFAULT 'fast-track' CHECK (mode IN ('fast-track', 'validated')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create document_assumptions table
CREATE TABLE IF NOT EXISTS document_assumptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  text text NOT NULL,
  risk text NOT NULL CHECK (risk IN ('high', 'medium', 'low')),
  status text DEFAULT 'untested' CHECK (status IN ('untested', 'validated', 'invalidated')),
  source_section text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create document_experiments table
CREATE TABLE IF NOT EXISTS document_experiments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assumption_id uuid REFERENCES document_assumptions(id) ON DELETE CASCADE NOT NULL,
  hypothesis text NOT NULL,
  method text NOT NULL,
  results jsonb DEFAULT '{}'::jsonb,
  conclusion text,
  created_at timestamptz DEFAULT now()
);

-- Create document_pivots table
CREATE TABLE IF NOT EXISTS document_pivots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES documents(id) ON DELETE CASCADE NOT NULL,
  pivot_type text NOT NULL,
  reason text NOT NULL,
  changes jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_assumptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_pivots ENABLE ROW LEVEL SECURITY;

-- Documents policies
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
  ON documents FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
  ON documents FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Document assumptions policies
CREATE POLICY "Users can view assumptions for own documents"
  ON document_assumptions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_assumptions.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create assumptions for own documents"
  ON document_assumptions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_assumptions.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update assumptions for own documents"
  ON document_assumptions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_assumptions.document_id
      AND documents.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_assumptions.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete assumptions for own documents"
  ON document_assumptions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_assumptions.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Document experiments policies
CREATE POLICY "Users can view experiments for own assumptions"
  ON document_experiments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM document_assumptions
      JOIN documents ON documents.id = document_assumptions.document_id
      WHERE document_assumptions.id = document_experiments.assumption_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create experiments for own assumptions"
  ON document_experiments FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM document_assumptions
      JOIN documents ON documents.id = document_assumptions.document_id
      WHERE document_assumptions.id = document_experiments.assumption_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update experiments for own assumptions"
  ON document_experiments FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM document_assumptions
      JOIN documents ON documents.id = document_assumptions.document_id
      WHERE document_assumptions.id = document_experiments.assumption_id
      AND documents.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM document_assumptions
      JOIN documents ON documents.id = document_assumptions.document_id
      WHERE document_assumptions.id = document_experiments.assumption_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete experiments for own assumptions"
  ON document_experiments FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM document_assumptions
      JOIN documents ON documents.id = document_assumptions.document_id
      WHERE document_assumptions.id = document_experiments.assumption_id
      AND documents.user_id = auth.uid()
    )
  );

-- Document pivots policies
CREATE POLICY "Users can view pivots for own documents"
  ON document_pivots FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_pivots.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create pivots for own documents"
  ON document_pivots FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_pivots.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update pivots for own documents"
  ON document_pivots FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_pivots.document_id
      AND documents.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_pivots.document_id
      AND documents.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete pivots for own documents"
  ON document_pivots FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM documents
      WHERE documents.id = document_pivots.document_id
      AND documents.user_id = auth.uid()
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS documents_user_id_idx ON documents(user_id);
CREATE INDEX IF NOT EXISTS documents_type_idx ON documents(type);
CREATE INDEX IF NOT EXISTS document_assumptions_document_id_idx ON document_assumptions(document_id);
CREATE INDEX IF NOT EXISTS document_experiments_assumption_id_idx ON document_experiments(assumption_id);
CREATE INDEX IF NOT EXISTS document_pivots_document_id_idx ON document_pivots(document_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for documents table
DROP TRIGGER IF EXISTS update_documents_updated_at ON documents;
CREATE TRIGGER update_documents_updated_at
  BEFORE UPDATE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
