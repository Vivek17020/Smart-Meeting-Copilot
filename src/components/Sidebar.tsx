
import { Calendar, Users, FileText, CheckSquare, Clock, Settings, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside className={cn("hidden md:flex flex-col w-64 border-r bg-slate-50", className)}>
      <div className="flex flex-col flex-1 p-4">
        <div className="space-y-1">
          <Button variant="ghost" className="flex items-center justify-start w-full gap-2 text-lg">
            <Calendar className="w-5 h-5 text-microsoft-blue" />
            <span>Dashboard</span>
          </Button>
          <Button variant="ghost" className="flex items-center justify-start w-full gap-2 text-lg font-semibold text-microsoft-blue">
            <Users className="w-5 h-5" />
            <span>Meetings</span>
          </Button>
          <Button variant="ghost" className="flex items-center justify-start w-full gap-2 text-lg">
            <FileText className="w-5 h-5 text-microsoft-purple" />
            <span>Notes</span>
          </Button>
          <Button variant="ghost" className="flex items-center justify-start w-full gap-2 text-lg">
            <CheckSquare className="w-5 h-5 text-microsoft-green" />
            <span>Action Items</span>
          </Button>
          <Button variant="ghost" className="flex items-center justify-start w-full gap-2 text-lg">
            <Clock className="w-5 h-5 text-microsoft-yellow" />
            <span>Reminders</span>
          </Button>
        </div>
        
        <div className="flex flex-col justify-end flex-1 space-y-1">
          <Button variant="ghost" className="flex items-center justify-start w-full gap-2">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Button>
          <Button variant="ghost" className="flex items-center justify-start w-full gap-2">
            <HelpCircle className="w-5 h-5" />
            <span>Help</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
