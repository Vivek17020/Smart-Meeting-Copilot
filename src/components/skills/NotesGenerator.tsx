
import { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Meeting } from '@/data/meetingData';
import { useToast } from "@/components/ui/use-toast";
import { backendService } from '@/services/backendService';

interface NotesGeneratorProps {
  meeting: Meeting;
}

const NotesGenerator = ({ meeting }: NotesGeneratorProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState<string | null>(null);
  const [generateStep, setGenerateStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerateNotes = async () => {
    setIsGenerating(true);
    setGenerateStep(1);
    setError(null);
    
    try {
      // Simulate processing steps to show the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGenerateStep(2);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGenerateStep(3);
      
      // Call our simulated backend service
      const notes = await backendService.generateNotes(meeting.id);
      
      setGeneratedNotes(notes);
      
      toast({
        title: "Notes Generated",
        description: "AI-generated meeting notes are now available.",
      });
    } catch (err) {
      console.error("Error generating notes:", err);
      setError("Failed to generate notes. Please try again.");
      
      toast({
        title: "Generation Failed",
        description: "There was an error generating the meeting notes.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const renderGeneratingState = () => {
    const steps = [
      "Processing meeting information...",
      "Analyzing participant roles and meeting context...",
      "Generating comprehensive notes..."
    ];
    
    return (
      <div className="flex flex-col items-center p-8 text-center">
        <Loader2 className="w-8 h-8 mb-4 text-microsoft-blue animate-spin" />
        <p className="text-lg font-medium">{steps[generateStep-1]}</p>
        <div className="flex items-center justify-center gap-1 mt-4">
          <div className={`w-2 h-2 rounded-full ${generateStep >= 1 ? 'bg-microsoft-blue' : 'bg-gray-300'}`}></div>
          <div className={`w-2 h-2 rounded-full ${generateStep >= 2 ? 'bg-microsoft-blue' : 'bg-gray-300'}`}></div>
          <div className={`w-2 h-2 rounded-full ${generateStep >= 3 ? 'bg-microsoft-blue' : 'bg-gray-300'}`}></div>
        </div>
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-microsoft-blue" />
          AI Notes Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          renderGeneratingState()
        ) : error ? (
          <div className="p-4 text-center">
            <p className="text-red-500">{error}</p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => setError(null)}
            >
              Try Again
            </Button>
          </div>
        ) : generatedNotes ? (
          <div className="p-4 border rounded-lg">
            <pre className="p-4 overflow-auto text-sm whitespace-pre-wrap bg-slate-50 rounded-md">{generatedNotes}</pre>
          </div>
        ) : (
          <div className="flex flex-col items-center p-8 text-center">
            <p className="mb-2 text-lg font-medium">No Meeting Notes Available</p>
            <p className="mb-4 text-sm text-muted-foreground">
              Generate AI-powered meeting notes based on the meeting context and participants
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!generatedNotes && (
          <Button 
            className="w-full"
            onClick={handleGenerateNotes}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Meeting Notes"
            )}
          </Button>
        )}
        
        {generatedNotes && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setGeneratedNotes(null)}
          >
            Reset & Regenerate
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default NotesGenerator;
