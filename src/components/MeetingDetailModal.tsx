
import { useState } from 'react';
import { X, Users, CalendarClock, MapPin, ClipboardCheck, FileText, Brain } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Meeting, AgendaItem, ActionItem } from '@/data/meetingData';
import { formatDate, formatTime } from '@/lib/dateUtils';
import { useToast } from "@/components/ui/use-toast";
import AgendaGenerator from './skills/AgendaGenerator';
import NotesGenerator from './skills/NotesGenerator';
import ActionItemsGenerator from './skills/ActionItemsGenerator';

interface MeetingDetailModalProps {
  meeting: Meeting | null;
  isOpen: boolean;
  onClose: () => void;
}

const MeetingDetailModal = ({ meeting, isOpen, onClose }: MeetingDetailModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!meeting) return null;
  
  const handleSendReminders = () => {
    toast({
      title: "Reminders Sent",
      description: "Meeting reminders have been sent to all participants.",
    });
  };
  
  const renderAgendaItem = (item: AgendaItem) => (
    <div key={item.id} className="p-3 mb-3 border rounded-md">
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
  );
  
  const renderActionItem = (item: ActionItem) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800'
    };
    
    return (
      <div key={item.id} className="p-3 mb-3 border rounded-md">
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 max-h-[90vh] overflow-hidden">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{meeting.title}</DialogTitle>
              <DialogDescription className="mt-1">
                {meeting.description}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2 right-2">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full p-0 h-11 rounded-none border-b">
            <TabsTrigger value="overview" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Overview
            </TabsTrigger>
            <TabsTrigger value="agenda" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Agenda
            </TabsTrigger>
            <TabsTrigger value="notes" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Notes
            </TabsTrigger>
            <TabsTrigger value="actionItems" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
              Action Items
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[60vh]">
            <TabsContent value="overview" className="p-4 m-0">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                      <CalendarClock className="w-4 h-4 text-microsoft-blue" />
                      Date & Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{formatDate(meeting.date)}</p>
                    <p>{formatTime(meeting.startTime)} - {formatTime(meeting.endTime)}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                      <MapPin className="w-4 h-4 text-microsoft-purple" />
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{meeting.location || "No location specified"}</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base font-medium">
                    <Users className="w-4 h-4 text-microsoft-green" />
                    Participants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {meeting.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                          <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{participant.name}</p>
                          {participant.role && (
                            <p className="text-xs text-muted-foreground">{participant.role}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="agenda" className="p-4 m-0">
              {meeting.agenda && meeting.agenda.length > 0 ? (
                <div className="space-y-1">
                  {meeting.agenda.map(renderAgendaItem)}
                </div>
              ) : (
                <AgendaGenerator meeting={meeting} />
              )}
            </TabsContent>
            
            <TabsContent value="notes" className="p-4 m-0">
              {meeting.notes ? (
                <div className="p-4 border rounded-lg">
                  <h3 className="flex items-center gap-2 mb-2 text-lg font-medium">
                    <FileText className="w-5 h-5 text-microsoft-purple" />
                    Meeting Notes
                  </h3>
                  <p className="whitespace-pre-line">{meeting.notes}</p>
                </div>
              ) : (
                <NotesGenerator meeting={meeting} />
              )}
            </TabsContent>
            
            <TabsContent value="actionItems" className="p-4 m-0">
              {meeting.actionItems && meeting.actionItems.length > 0 ? (
                <div className="space-y-1">
                  {meeting.actionItems.map(renderActionItem)}
                </div>
              ) : (
                <ActionItemsGenerator meeting={meeting} />
              )}
            </TabsContent>
          </ScrollArea>
          
          <DialogFooter className="p-4 border-t">
            <div className="flex flex-wrap items-center justify-between w-full gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" onClick={handleSendReminders}>
                  Send Reminders
                </Button>
                <Button variant="outline">
                  Share Meeting
                </Button>
              </div>
              <Button onClick={onClose}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDetailModal;
