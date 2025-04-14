
import { useState, useEffect } from 'react';
import DemoVideo from '@/components/DemoVideo';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Info, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReminderScheduler from '@/components/ReminderScheduler';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { backendService } from '@/services/backendService';
import AIAgentConsole from '@/components/AIAgentConsole';

const Demo = () => {
  const [showReminderUI, setShowReminderUI] = useState(false);
  const [usingRealBackend, setUsingRealBackend] = useState(false);
  const [currentDemoStep, setCurrentDemoStep] = useState(0);
  
  useEffect(() => {
    // Check if we're using the real Semantic Kernel backend
    const checkBackendStatus = async () => {
      const status = await backendService.isUsingRealSemanticKernel();
      setUsingRealBackend(status);
    };
    
    checkBackendStatus();
  }, []);
  
  const handleStepChange = (step: number) => {
    setCurrentDemoStep(step);
  };
  
  // Using a valid meeting ID from the meetingData
  const demoMeetingId = "meeting-123";
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <Button variant="ghost" asChild className="mr-2">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3">SmartMeeting Copilot Demo</h1>
            <p className="text-muted-foreground">
              This interactive demonstration showcases the key components of our AI-powered meeting assistant.
              Instead of static images, you can see how each component actually works within the application.
            </p>
          </div>
          
          <Alert className="mb-6" variant={usingRealBackend ? "default" : "destructive"}>
            {usingRealBackend ? 
              <Check className="h-4 w-4 text-green-500" /> : 
              <Info className="h-4 w-4" />
            }
            <AlertTitle>
              {usingRealBackend ? 
                "Connected to C# Semantic Kernel API" : 
                "Semantic Kernel Integration"
              }
            </AlertTitle>
            <AlertDescription>
              {usingRealBackend ? 
                "Currently using the real C# Semantic Kernel backend for agenda generation." : 
                "This demo can use a real C# Semantic Kernel integration for agenda generation. Set USE_REAL_SEMANTIC_KERNEL to true in backendService.ts to enable it."}
            </AlertDescription>
          </Alert>
          
          <DemoVideo 
            onShowReminderUI={() => setShowReminderUI(true)}
            onStepChange={handleStepChange}
          />
          
          {showReminderUI && (
            <div className="mt-6 mb-8">
              <ReminderScheduler meetingId={demoMeetingId} onClose={() => setShowReminderUI(false)} />
            </div>
          )}
          
          <AIAgentConsole currentStep={currentDemoStep} />
          
          <div className="mt-12 border-t pt-6">
            <h2 className="text-xl font-semibold mb-3">About SmartMeeting Copilot</h2>
            <p className="mb-4">
              SmartMeeting Copilot uses advanced AI capabilities powered by Microsoft's Semantic Kernel
              to help teams make their meetings more productive. The AI agent integrates with your
              calendar and communication tools to provide assistance throughout the meeting lifecycle.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Key Components:</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li><strong>AI Agenda Generator:</strong> Automatically creates structured meeting agendas based on participants and meeting purpose.</li>
              <li><strong>Meeting Notes Generator:</strong> Takes comprehensive notes during meetings, capturing all important points.</li>
              <li><strong>Action Items Extractor:</strong> Identifies and assigns action items from meeting discussions with deadlines.</li>
              <li><strong>Calendar Integration:</strong> Syncs with your existing calendar system to schedule and track meetings.</li>
              <li><strong>Reminder Scheduling:</strong> Sets automated reminders for meetings and action item deadlines.</li>
              <li><strong>Multi-Agent Orchestration:</strong> Coordinates multiple specialized AI agents to handle different aspects of the meeting process.</li>
              <li><strong>Real-time Collaboration:</strong> Enables team members to contribute to agendas and notes simultaneously.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demo;
