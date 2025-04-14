
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell, Users, FileText, ClipboardCheck, X, CalendarClock } from 'lucide-react';
import { backendService } from '@/services/backendService';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ReminderSchedulerProps {
  meetingId: string;
  onClose: () => void;
}

const ReminderScheduler = ({ meetingId, onClose }: ReminderSchedulerProps) => {
  const { toast } = useToast();
  const [reminderType, setReminderType] = useState<'agenda' | 'attendance' | 'followup'>('agenda');
  const [minutesBefore, setMinutesBefore] = useState(15);
  const [reminderDate, setReminderDate] = useState<Date | undefined>(new Date());
  const [sendToAll, setSendToAll] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleScheduleReminder = async () => {
    setIsLoading(true);
    try {
      await backendService.scheduleReminder(meetingId, reminderType, minutesBefore);
      
      toast({
        title: "Reminder Scheduled",
        description: `${reminderType.charAt(0).toUpperCase() + reminderType.slice(1)} reminder set for ${minutesBefore} minutes before the meeting.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule reminder. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-microsoft-purple" />
            Reminder Scheduler
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Reminder Type</Label>
          <Select value={reminderType} onValueChange={(value: 'agenda' | 'attendance' | 'followup') => setReminderType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select reminder type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="agenda">Agenda Preparation</SelectItem>
              <SelectItem value="attendance">Meeting Attendance</SelectItem>
              <SelectItem value="followup">Action Item Follow-up</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Minutes Before Meeting</Label>
            <span className="text-sm font-medium">{minutesBefore} minutes</span>
          </div>
          <Slider 
            value={[minutesBefore]} 
            min={5} 
            max={60} 
            step={5} 
            onValueChange={(values) => setMinutesBefore(values[0])}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Scheduled Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !reminderDate && "text-muted-foreground"
                )}
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                {reminderDate ? format(reminderDate, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={reminderDate}
                onSelect={setReminderDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="send-to-all" checked={sendToAll} onCheckedChange={setSendToAll} />
          <Label htmlFor="send-to-all">Send to all participants</Label>
        </div>
        
        <div className="bg-slate-50 p-3 rounded border">
          <h4 className="text-sm font-medium mb-2">Reminder Preview</h4>
          <div className="text-sm text-muted-foreground">
            <p>Type: {reminderType.charAt(0).toUpperCase() + reminderType.slice(1)}</p>
            <p>Timing: {minutesBefore} minutes before meeting</p>
            <p>Recipients: {sendToAll ? 'All participants' : 'Meeting organizer only'}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleScheduleReminder} disabled={isLoading} className="w-full">
          {isLoading ? "Scheduling..." : "Schedule Reminder"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReminderScheduler;
