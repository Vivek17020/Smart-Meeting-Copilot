
import { useState } from 'react';
import { Calendar, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import UpcomingMeetingCard from '@/components/UpcomingMeetingCard';
import MeetingDetailModal from '@/components/MeetingDetailModal';
import { Meeting, mockMeetings } from '@/data/meetingData';
import { getRelativeDateLabel } from '@/lib/dateUtils';

const Index = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleViewMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  // Group meetings by date
  const groupedMeetings = mockMeetings.reduce((acc, meeting) => {
    const dateLabel = getRelativeDateLabel(meeting.date);
    if (!acc[dateLabel]) {
      acc[dateLabel] = [];
    }
    acc[dateLabel].push(meeting);
    return acc;
  }, {} as Record<string, Meeting[]>);
  
  // Sort dates to ensure "Today" and "Tomorrow" come first
  const sortedDates = Object.keys(groupedMeetings).sort((a, b) => {
    if (a === 'Today') return -1;
    if (b === 'Today') return 1;
    if (a === 'Tomorrow') return -1;
    if (b === 'Tomorrow') return 1;
    return 0;
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">SmartMeeting Copilot</h1>
            <Button className="gap-1">
              <Plus className="w-4 h-4" /> New Meeting
            </Button>
          </div>
          
          <div className="grid gap-6 mb-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Welcome back!</CardTitle>
                <CardDescription>Your meetings at a glance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xl font-semibold">
                  <Calendar className="w-5 h-5 text-microsoft-blue" />
                  <span>{mockMeetings.length} Upcoming Meetings</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {mockMeetings.filter(m => getRelativeDateLabel(m.date) === 'Today').length} meetings today
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Next Meeting</CardTitle>
                <CardDescription>Coming up soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xl font-semibold">
                  <Clock className="w-5 h-5 text-microsoft-purple" />
                  <span>{mockMeetings[0].title}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Today at {mockMeetings[0].startTime}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Action Items</CardTitle>
                <CardDescription>Tasks requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xl font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-microsoft-green">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span>3 Pending Tasks</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  2 due today
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="all" className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upcoming Meetings</h2>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all">
              <div className="space-y-6">
                {sortedDates.map((dateLabel) => (
                  <div key={dateLabel}>
                    <h3 className="mb-3 text-lg font-medium">{dateLabel}</h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {groupedMeetings[dateLabel].map((meeting) => (
                        <UpcomingMeetingCard 
                          key={meeting.id} 
                          meeting={meeting}
                          onClick={handleViewMeeting}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="today">
              <div className="space-y-6">
                {groupedMeetings['Today'] && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {groupedMeetings['Today'].map((meeting) => (
                      <UpcomingMeetingCard 
                        key={meeting.id} 
                        meeting={meeting}
                        onClick={handleViewMeeting}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="week">
              <div className="space-y-6">
                {sortedDates
                  .filter(date => ['Today', 'Tomorrow', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(date))
                  .map((dateLabel) => (
                    <div key={dateLabel}>
                      <h3 className="mb-3 text-lg font-medium">{dateLabel}</h3>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {groupedMeetings[dateLabel].map((meeting) => (
                          <UpcomingMeetingCard 
                            key={meeting.id} 
                            meeting={meeting}
                            onClick={handleViewMeeting}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      <MeetingDetailModal 
        meeting={selectedMeeting} 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
