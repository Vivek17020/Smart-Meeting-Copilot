import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Play, Pause, RefreshCw, Brain, FileText, ClipboardCheck, ArrowRight, Calendar, Bell, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DemoStep {
  title: string;
  description: string;
  componentLabel: string;
  functionality: string;
  action?: () => void;
}

interface DemoVideoProps {
  onShowReminderUI?: () => void;
  onStepChange?: (step: number) => void;
}

const DemoVideo = ({ onShowReminderUI, onStepChange }: DemoVideoProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const demoSteps: DemoStep[] = [
    {
      title: "Welcome to SmartMeeting Copilot",
      description: "An AI-powered meeting assistant that helps you prepare, conduct, and follow up on meetings efficiently.",
      componentLabel: "SmartMeeting Copilot",
      functionality: "AI-powered meeting assistant that streamlines your entire meeting workflow from preparation to follow-up."
    },
    {
      title: "Calendar Integration",
      description: "Seamlessly integrates with your calendar system to manage meetings and schedule follow-ups.",
      componentLabel: "CalendarIntegration",
      functionality: "Synchronizes with Microsoft Outlook, Google Calendar, and other calendar systems to track meetings and availability."
    },
    {
      title: "Agent Orchestration",
      description: "Multiple specialized AI agents work together to handle different aspects of your meetings.",
      componentLabel: "AgentOrchestration",
      functionality: "Coordinates multiple AI agents through Semantic Kernel, each focused on different meeting tasks like agenda creation, note-taking, and action item extraction."
    },
    {
      title: "AI Agenda Generator",
      description: "Let our AI create a structured agenda based on the meeting purpose and participants, saving you preparation time.",
      componentLabel: "AgendaGenerator",
      functionality: "Analyzes meeting purpose and participants to automatically generate relevant agenda items with appropriate timing."
    },
    {
      title: "Automatic Meeting Notes",
      description: "During the meeting, our AI takes notes for you, capturing key points and decisions so you can focus on the discussion.",
      componentLabel: "NotesGenerator",
      functionality: "Transcribes and organizes meeting content into structured notes, highlighting key topics and decisions."
    },
    {
      title: "Action Item Extraction",
      description: "After the meeting, the AI identifies and extracts action items, assigns them to participants, and sets deadlines.",
      componentLabel: "ActionItemsGenerator",
      functionality: "Parses meeting notes to identify tasks, assign them to appropriate team members, and suggest reasonable deadlines."
    },
    {
      title: "Reminder Scheduling",
      description: "Set up automated reminders for meetings and action item deadlines to keep everyone on track.",
      componentLabel: "ReminderScheduler",
      functionality: "Creates customizable reminders that can be sent before meetings or as follow-ups for action items.",
      action: onShowReminderUI
    },
    {
      title: "Real-time Collaboration",
      description: "Collaborate with your team in real-time on agendas, notes, and action items during meetings.",
      componentLabel: "Collaboration",
      functionality: "Enables multiple team members to view and contribute to meeting materials simultaneously, with instant updates visible to all participants."
    },
    {
      title: "Semantic Kernel Integration",
      description: "Our AI agent uses Microsoft's Semantic Kernel to deliver intelligent processing of meeting data.",
      componentLabel: "SemanticKernel",
      functionality: "Leverages Microsoft's Semantic Kernel to perform natural language processing, semantic understanding, and intelligent content generation."
    },
    {
      title: "Complete Meeting Workflow",
      description: "From preparation to follow-up, SmartMeeting Copilot streamlines the entire meeting process.",
      componentLabel: "IntegratedWorkflow",
      functionality: "Connects all components into a seamless experience, ensuring meetings are productive and actionable from start to finish."
    }
  ];
  
  const SampleComponents = {
    Dashboard: () => (
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <h3 className="font-semibold mb-3">SmartMeeting Dashboard</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 bg-slate-50 rounded border">
            <p className="font-medium">Upcoming Meetings</p>
            <p className="text-xs text-muted-foreground">3 today</p>
          </div>
          <div className="p-2 bg-slate-50 rounded border">
            <p className="font-medium">Action Items</p>
            <p className="text-xs text-muted-foreground">7 pending</p>
          </div>
          <div className="p-2 bg-slate-50 rounded border">
            <p className="font-medium">Recent Notes</p>
            <p className="text-xs text-muted-foreground">2 generated</p>
          </div>
          <div className="p-2 bg-slate-50 rounded border">
            <p className="font-medium">Teams</p>
            <p className="text-xs text-muted-foreground">4 active</p>
          </div>
        </div>
      </div>
    ),
    CalendarIntegration: () => (
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="text-microsoft-blue h-5 w-5" />
          <h3 className="font-semibold">Calendar Integration</h3>
        </div>
        <div className="space-y-2">
          <div className="bg-slate-50 p-2 rounded border">
            <p className="font-medium">Project Review</p>
            <p className="text-xs text-muted-foreground">Today, 10:00 AM - 11:00 AM</p>
          </div>
          <div className="bg-slate-50 p-2 rounded border">
            <p className="font-medium">Sprint Planning</p>
            <p className="text-xs text-muted-foreground">Tomorrow, 9:00 AM - 10:30 AM</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-microsoft-blue font-medium">Connected to: Microsoft Outlook</p>
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    ),
    AgentOrchestration: () => (
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="text-microsoft-purple h-5 w-5" />
          <h3 className="font-semibold">Agent Orchestration</h3>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-microsoft-blue/20 flex items-center justify-center z-10">
            <Brain className="w-8 h-8 text-microsoft-blue" />
          </div>
          
          <div className="grid grid-cols-4 gap-1 pt-16 pb-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-microsoft-purple/20 flex items-center justify-center mb-1">
                <Calendar className="w-5 h-5 text-microsoft-purple" />
              </div>
              <span className="text-xs">Calendar</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-microsoft-purple/20 flex items-center justify-center mb-1">
                <FileText className="w-5 h-5 text-microsoft-purple" />
              </div>
              <span className="text-xs">Notes</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-microsoft-purple/20 flex items-center justify-center mb-1">
                <ClipboardCheck className="w-5 h-5 text-microsoft-purple" />
              </div>
              <span className="text-xs">Actions</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-microsoft-purple/20 flex items-center justify-center mb-1">
                <Bell className="w-5 h-5 text-microsoft-purple" />
              </div>
              <span className="text-xs">Reminders</span>
            </div>
          </div>
          
          <svg className="absolute top-0 left-0 w-full h-full -z-0" viewBox="0 0 250 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M125 60 L60 100" stroke="#8866CC" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M125 60 L125 100" stroke="#8866CC" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M125 60 L190 100" stroke="#8866CC" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M125 60 L250 100" stroke="#8866CC" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
    ),
    AgendaGenerator: () => (
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="text-microsoft-purple h-5 w-5" />
          <h3 className="font-semibold">AI Agenda Generator</h3>
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-slate-50 rounded border">
            <p className="font-medium">Introduction</p>
            <p className="text-xs text-muted-foreground">John Doe · 5 min</p>
          </div>
          <div className="p-2 bg-slate-50 rounded border">
            <p className="font-medium">Project Status Update</p>
            <p className="text-xs text-muted-foreground">Jane Smith · 15 min</p>
          </div>
          <div className="p-2 bg-slate-50 rounded border">
            <p className="font-medium">Discussion</p>
            <p className="text-xs text-muted-foreground">All · 20 min</p>
          </div>
        </div>
      </div>
    ),
    NotesGenerator: () => (
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="text-microsoft-blue h-5 w-5" />
          <h3 className="font-semibold">AI Notes Generator</h3>
        </div>
        <div className="bg-slate-50 p-3 rounded border text-sm space-y-2">
          <p className="font-medium">Meeting Notes: Project Review</p>
          <p>John presented the latest sales figures showing a 15% increase.</p>
          <p>Team discussed the new marketing strategy for Q3.</p>
          <p>Decision made to launch new feature by August 15th.</p>
        </div>
      </div>
    ),
    ActionItemsGenerator: () => (
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <ClipboardCheck className="text-microsoft-green h-5 w-5" />
          <h3 className="font-semibold">AI Action Items Generator</h3>
        </div>
        <div className="space-y-2">
          <div className="p-2 bg-slate-50 rounded border">
            <p className="font-medium">Create wireframes for new dashboard</p>
            <div className="flex text-xs text-muted-foreground justify-between">
              <span>Assignee: Jane Smith</span>
              <span>Due: 04/25/2025</span>
            </div>
          </div>
          <div className="p-2 bg-slate-50 rounded border">
            <p className="font-medium">Prepare Q3 budget projection</p>
            <div className="flex text-xs text-muted-foreground justify-between">
              <span>Assignee: John Doe</span>
              <span>Due: 04/30/2025</span>
            </div>
          </div>
        </div>
      </div>
    ),
    ReminderScheduler: () => (
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Bell className="text-microsoft-purple h-5 w-5" />
          <h3 className="font-semibold">Reminder Scheduler</h3>
        </div>
        <div className="space-y-3">
          <div className="bg-slate-50 p-2 rounded border">
            <p className="font-medium text-sm">Meeting Reminder</p>
            <p className="text-xs text-muted-foreground">15 minutes before start</p>
          </div>
          <div className="bg-slate-50 p-2 rounded border">
            <p className="font-medium text-sm">Follow-up Reminder</p>
            <p className="text-xs text-muted-foreground">24 hours after meeting</p>
          </div>
          <Button size="sm" className="w-full" onClick={onShowReminderUI}>
            Schedule New Reminder
          </Button>
        </div>
      </div>
    ),
    Collaboration: () => (
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Users className="text-microsoft-green h-5 w-5" />
          <h3 className="font-semibold">Real-time Collaboration</h3>
        </div>
        <div className="space-y-2">
          <div className="bg-slate-50 p-2 rounded border">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-sm">Shared Agenda</p>
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border border-white">J</div>
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs border border-white">S</div>
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs border border-white">M</div>
              </div>
            </div>
            <div className="text-xs text-green-600 animate-pulse">
              Sarah is editing...
            </div>
          </div>
          <div className="bg-slate-50 p-2 rounded border">
            <div className="flex items-center justify-between mb-1">
              <p className="font-medium text-sm">Action Items</p>
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs border border-white">J</div>
              </div>
            </div>
            <div className="text-xs">
              Last updated 2 minutes ago
            </div>
          </div>
        </div>
      </div>
    ),
    SemanticKernel: () => (
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="text-microsoft-blue h-5 w-5" />
          <h3 className="font-semibold">Semantic Kernel Processing</h3>
        </div>
        <div className="bg-slate-50 p-3 rounded border">
          <div className="flex flex-col gap-2">
            <div className="bg-black/10 p-2 rounded">
              <p className="text-xs font-mono">{"Intent: Extract action items"}</p>
            </div>
            <div className="bg-black/10 p-2 rounded">
              <p className="text-xs font-mono">{"Processing meeting transcript..."}</p>
            </div>
            <div className="bg-black/10 p-2 rounded">
              <p className="text-xs font-mono">{"Generating: 3 action items found"}</p>
            </div>
          </div>
        </div>
      </div>
    ),
    IntegratedWorkflow: () => (
      <div className="border p-4 rounded-lg bg-white shadow-sm">
        <h3 className="font-semibold mb-3">Complete Meeting Workflow</h3>
        <div className="flex items-center justify-between text-sm">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-microsoft-blue/20 flex items-center justify-center mb-1">
              <Brain className="w-5 h-5 text-microsoft-blue" />
            </div>
            <span>Agenda</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-microsoft-blue/20 flex items-center justify-center mb-1">
              <FileText className="w-5 h-5 text-microsoft-blue" />
            </div>
            <span>Notes</span>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-microsoft-green/20 flex items-center justify-center mb-1">
              <ClipboardCheck className="w-5 h-5 text-microsoft-green" />
            </div>
            <span>Actions</span>
          </div>
        </div>
      </div>
    )
  };
  
  const renderComponent = (componentLabel: string) => {
    switch (componentLabel) {
      case "CalendarIntegration":
        return <SampleComponents.CalendarIntegration />;
      case "AgentOrchestration":
        return <SampleComponents.AgentOrchestration />;
      case "AgendaGenerator":
        return <SampleComponents.AgendaGenerator />;
      case "NotesGenerator":
        return <SampleComponents.NotesGenerator />;
      case "ActionItemsGenerator":
        return <SampleComponents.ActionItemsGenerator />;
      case "ReminderScheduler":
        return <SampleComponents.ReminderScheduler />;
      case "Collaboration":
        return <SampleComponents.Collaboration />;
      case "SemanticKernel":
        return <SampleComponents.SemanticKernel />;
      case "IntegratedWorkflow":
        return <SampleComponents.IntegratedWorkflow />;
      default:
        return <SampleComponents.Dashboard />;
    }
  };
  
  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      setProgress((newStep / (demoSteps.length - 1)) * 100);
      
      if (demoSteps[newStep].action) {
        demoSteps[newStep].action?.();
      }
      
      if (onStepChange) {
        onStepChange(newStep);
      }
    } else {
      setIsPlaying(false);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      setProgress((newStep / (demoSteps.length - 1)) * 100);
      
      if (onStepChange) {
        onStepChange(newStep);
      }
    }
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const resetDemo = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    
    if (onStepChange) {
      onStepChange(0);
    }
  };
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentStep < demoSteps.length - 1) {
          nextStep();
        } else {
          setIsPlaying(false);
        }
      }, 6000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep]);
  
  const currentStepData = demoSteps[currentStep];
  
  const getComponentIcon = (label: string) => {
    switch (label) {
      case "CalendarIntegration":
        return <Calendar className="w-5 h-5 text-microsoft-blue" />;
      case "AgentOrchestration":
        return <Zap className="w-5 h-5 text-microsoft-purple" />;
      case "AgendaGenerator":
        return <Brain className="w-5 h-5 text-microsoft-purple" />;
      case "NotesGenerator":
        return <FileText className="w-5 h-5 text-microsoft-blue" />;
      case "ActionItemsGenerator":
        return <ClipboardCheck className="w-5 h-5 text-microsoft-green" />;
      case "ReminderScheduler":
        return <Bell className="w-5 h-5 text-microsoft-purple" />;
      case "Collaboration":
        return <Users className="w-5 h-5 text-microsoft-green" />;
      case "SemanticKernel":
        return <Brain className="w-5 h-5 text-microsoft-blue" />;
      default:
        return <Play className="w-5 h-5 text-microsoft-blue" />;
    }
  };
  
  return (
    <div className="mx-auto max-w-4xl p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">SmartMeeting Copilot Demo</h2>
      
      <Card className="overflow-hidden mb-6 shadow-lg">
        <div className="relative bg-slate-50 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            {renderComponent(currentStepData.componentLabel)}
          </div>
          
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-md flex items-center gap-2">
            {getComponentIcon(currentStepData.componentLabel)}
            <span className="font-medium">{currentStepData.componentLabel}</span>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <div 
              className="h-full bg-microsoft-blue transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">{currentStepData.title}</h3>
          <p className="text-muted-foreground mb-4">{currentStepData.description}</p>
          
          <div className="bg-slate-50 p-4 rounded-md border border-slate-100">
            <h4 className="font-medium text-sm text-slate-500 uppercase mb-1">Main Functionality:</h4>
            <p className="text-sm">{currentStepData.functionality}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          size="icon"
          onClick={prevStep}
          disabled={currentStep === 0}
          className={cn(currentStep === 0 ? "opacity-50" : "")}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Button 
            onClick={togglePlayPause}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play
              </>
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={resetDemo}
            title="Restart demo"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={nextStep}
          disabled={currentStep === demoSteps.length - 1}
          className={cn(currentStep === demoSteps.length - 1 ? "opacity-50" : "")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex justify-center mt-4">
        <div className="flex gap-1">
          {demoSteps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep ? "bg-microsoft-blue" : "bg-gray-300"
              }`}
              onClick={() => {
                setCurrentStep(index);
                setProgress((index / (demoSteps.length - 1)) * 100);
                if (onStepChange) {
                  onStepChange(index);
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoVideo;
