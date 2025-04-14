
import { useState } from 'react';
import { Brain, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Meeting, AgendaItem } from '@/data/meetingData';
import { useToast } from "@/components/ui/use-toast";
import { backendService } from '@/services/backendService';

interface AgendaGeneratorProps {
  meeting: Meeting;
}

const AgendaGenerator = ({ meeting }: AgendaGeneratorProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAgenda, setGeneratedAgenda] = useState<AgendaItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerateAgenda = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Call our simulated backend service
      const agenda = await backendService.generateAgenda(meeting.id);
      
      setGeneratedAgenda(agenda);
      
      toast({
        title: "Agenda Generated",
        description: "AI-generated agenda is now available for review.",
      });
    } catch (err) {
      console.error("Error generating agenda:", err);
      setError("Failed to generate agenda. Please try again.");
      
      toast({
        title: "Generation Failed",
        description: "There was an error generating the agenda.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-microsoft-purple" />
          AI Agenda Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex flex-col items-center p-8 text-center">
            <Loader2 className="w-8 h-8 mb-4 text-microsoft-blue animate-spin" />
            <p className="text-lg font-medium">Generating Agenda...</p>
            <p className="text-sm text-muted-foreground">
              Using AI to create an optimized agenda based on meeting participants and purpose
            </p>
          </div>
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
        ) : generatedAgenda ? (
          <div className="space-y-3">
            {generatedAgenda.map((item) => (
              <div key={item.id} className="p-3 border rounded-md">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.presenter} · {item.duration}</p>
                  </div>
                </div>
                {item.description && (
                  <p className="mt-2 text-sm">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center p-8 text-center">
            <p className="mb-2 text-lg font-medium">No Agenda Available</p>
            <p className="mb-4 text-sm text-muted-foreground">
              Generate an AI-powered agenda based on meeting purpose and participants
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!generatedAgenda && (
          <Button 
            className="w-full"
            onClick={handleGenerateAgenda}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Agenda"
            )}
          </Button>
        )}
        
        {generatedAgenda && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setGeneratedAgenda(null)}
          >
            Reset & Regenerate
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AgendaGenerator;
