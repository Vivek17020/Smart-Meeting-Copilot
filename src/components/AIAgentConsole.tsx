
import { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AIAgentConsoleProps {
  currentStep: number;
}

const AIAgentConsole = ({ currentStep }: AIAgentConsoleProps) => {
  const [agentLogs, setAgentLogs] = useState<string[]>([]);
  
  // Add agent logs as the demo progresses
  useEffect(() => {
    const stepLogs: Record<number, string[]> = {
      1: ["AgendaGenerator agent activated", "Analyzing meeting context and participants", "Generating agenda items based on meeting purpose"],
      2: ["NotesGenerator agent activated", "Initializing real-time transcription", "Identifying key discussion points"],
      3: ["ActionItemsGenerator agent activated", "Parsing meeting notes", "Identifying tasks and assigning to participants"],
      4: ["ReminderScheduler agent activated", "Configuring reminder settings", "Scheduling notifications for participants"],
      5: ["Collaboration service initialized", "Syncing data with connected clients", "Setting up shared editing space"],
      6: ["Semantic Kernel plugins loaded", "Memory service connected", "Natural language processing initialized"]
    };
    
    // Clear previous logs when step changes
    setAgentLogs([]);
    
    const logs = stepLogs[currentStep];
    if (logs) {
      // Add a slight delay between logs to simulate real-time processing
      logs.forEach((log, index) => {
        setTimeout(() => {
          setAgentLogs(prev => [...prev, log]);
        }, index * 800);
      });
    }
  }, [currentStep]);
  
  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="w-5 h-5 text-microsoft-purple" />
          AI Agent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-black/90 p-3 rounded-md border border-slate-700 text-green-400 font-mono text-xs">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white text-xs">Agent Console</h4>
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="max-h-24 overflow-y-auto scrollbar-hide">
            {agentLogs.map((log, index) => (
              <div key={index} className="mb-1">&gt; [{new Date().toLocaleTimeString()}] {log}</div>
            ))}
            <div className="animate-pulse">&gt; _</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentConsole;
