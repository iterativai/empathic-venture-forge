import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const BusinessPlanUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files);
      setSelectedFiles(files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (!user || selectedFiles.length === 0) return;

    setUploading(true);
    
    try {
      for (const file of selectedFiles) {
        // Upload file to storage
        const filePath = `${user.id}/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('business-plans')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Read file content for analysis
        const fileContent = await file.text();

        // Create analysis record
        const { data: analysisData, error: insertError } = await supabase
          .from('business_plan_analyses')
          .insert({
            user_id: user.id,
            file_name: file.name,
            file_path: filePath,
            file_size: file.size,
            file_type: file.type,
            status: 'processing'
          })
          .select()
          .single();

        if (insertError) throw insertError;

        // Trigger AI analysis
        const { error: functionError } = await supabase.functions.invoke('analyze-business-plan', {
          body: {
            analysisId: analysisData.id,
            fileContent: fileContent.substring(0, 50000) // Limit content length
          }
        });

        if (functionError) throw functionError;

        toast.success(`Analysis started for ${file.name}`);
        
        // Navigate to analysis page
        setTimeout(() => {
          navigate(`/business-plan-analysis/${analysisData.id}`);
        }, 1000);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload and analyze files');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Transform Your Business Plan</h1>
          <p className="text-muted-foreground text-lg">
            Upload your business plan, pitch deck, or financial model for AI-powered analysis and investor readiness scoring
          </p>
        </div>

        <Card className="p-8">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer bg-gradient-to-br from-primary/5 to-transparent"
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileSelect}
              multiple
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.md"
            />
            
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Upload className="w-12 h-12 text-primary" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Drop your business plan, pitch deck, or financial model here
                  </h3>
                  <p className="text-muted-foreground mb-4">or click to browse</p>
                  <p className="text-sm text-muted-foreground">
                    Multiple files supported • Max 50MB per file
                  </p>
                </div>
              </div>
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-6 space-y-3">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full"
                size="lg"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Uploading & Analyzing...
                  </>
                ) : (
                  'Start Analysis'
                )}
              </Button>
            </div>
          )}

          <div className="mt-8 pt-8 border-t">
            <h4 className="font-semibold mb-4">What happens next?</h4>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold">1</span>
                </div>
                <p className="text-sm font-medium">Document Analysis</p>
                <p className="text-xs text-muted-foreground mt-1">AI extracts key information</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold">2</span>
                </div>
                <p className="text-sm font-medium">Gap Analysis</p>
                <p className="text-xs text-muted-foreground mt-1">15-dimension scoring</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold">3</span>
                </div>
                <p className="text-sm font-medium">Action Plan</p>
                <p className="text-xs text-muted-foreground mt-1">Prioritized improvements</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-8 p-6 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-3">Supported Formats</h4>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-medium mb-1">Documents</p>
              <p className="text-muted-foreground">PDF, Word (.docx), Text, Markdown</p>
            </div>
            <div>
              <p className="font-medium mb-1">Spreadsheets & Presentations</p>
              <p className="text-muted-foreground">Excel (.xlsx), PowerPoint (.pptx)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPlanUpload;