
import { useState } from 'react';
import { ClipboardCheck, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Meeting, ActionItem } from '@/data/meetingData';
import { formatDate } from '@/lib/dateUtils';
import { useToast } from "@/components/ui/use-toast";
import { backendService } from '@/services/backendService';

interface ActionItemsGeneratorProps {
  meeting: Meeting;
}

const ActionItemsGenerator = ({ meeting }: ActionItemsGeneratorProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItems, setGeneratedItems] = useState<ActionItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerateItems = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // First, we need to generate or fetch notes to extract action items from
      // In a real implementation, we might check if notes exist already
      const notes = await backendService.generateNotes(meeting.id);
      
      // Then extract action items from the notes
      const actionItems = await backendService.extractActionItems(meeting.id, notes);
      
      setGeneratedItems(actionItems);
      
      toast({
        title: "Action Items Generated",
        description: "AI-generated action items are now available for review.",
      });
    } catch (err) {
      console.error("Error generating action items:", err);
      setError("Failed to generate action items. Please try again.");
      
      toast({
        title: "Generation Failed",
        description: "There was an error generating the action items.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const renderActionItem = (item: ActionItem) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800'
    };
    
    return (
      <div key={item.id} className="p-3 border rounded-md mb-3">
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium">{item.description}</p>
          <Badge className={statusColors[item.status]} variant="outline">
            {item.status}
          </Badge>
        </div>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <span>Assignee: {item.assignee}</span>
          {item.dueDate && (
            <>
              <span className="mx-2">·</span>
              <span>Due: {formatDate(item.dueDate)}</span>
            </>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-microsoft-green" />
          AI Action Items Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isGenerating ? (
          <div className="flex flex-col items-center p-8 text-center">
            <Loader2 className="w-8 h-8 mb-4 text-microsoft-blue animate-spin" />
            <p className="text-lg font-medium">Generating Action Items...</p>
            <p className="text-sm text-muted-foreground">
              Using AI to extract relevant action items based on meeting context
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
        ) : generatedItems ? (
          <div className="space-y-1">
            {generatedItems.map(renderActionItem)}
          </div>
        ) : (
          <div className="flex flex-col items-center p-8 text-center">
            <p className="mb-2 text-lg font-medium">No Action Items Available</p>
            <p className="mb-4 text-sm text-muted-foreground">
              Generate AI-powered action items based on the meeting context
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!generatedItems && (
          <Button 
            className="w-full"
            onClick={handleGenerateItems}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Action Items"
            )}
          </Button>
        )}
        
        {generatedItems && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setGeneratedItems(null)}
          >
            Reset & Regenerate
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ActionItemsGenerator;
