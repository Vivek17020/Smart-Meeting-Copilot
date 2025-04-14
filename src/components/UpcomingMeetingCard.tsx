
import { CalendarClock, Users, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, formatTime } from '@/lib/dateUtils';
import { Meeting } from '@/data/meetingData';

interface UpcomingMeetingCardProps {
  meeting: Meeting;
  onClick: (meeting: Meeting) => void;
}

const UpcomingMeetingCard = ({ meeting, onClick }: UpcomingMeetingCardProps) => {
  const { title, date, startTime, endTime, participants, location } = meeting;
  
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 mb-2 text-sm">
          <CalendarClock className="w-4 h-4 text-microsoft-blue" />
          <span>{formatDate(date)} · {formatTime(startTime)} - {formatTime(endTime)}</span>
        </div>
        
        {location && (
          <div className="flex items-center gap-2 mb-3 text-sm">
            <MapPin className="w-4 h-4 text-microsoft-purple" />
            <span>{location}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm">
          <Users className="flex-shrink-0 w-4 h-4 text-microsoft-green" />
          <div className="flex flex-wrap items-center gap-1">
            <div className="flex -space-x-2">
              {participants.slice(0, 3).map((participant) => (
                <Avatar key={participant.id} className="w-6 h-6 border border-white">
                  <AvatarImage src={participant.avatarUrl} alt={participant.name} />
                  <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            {participants.length > 3 && (
              <span className="text-sm text-muted-foreground">
                +{participants.length - 3} more
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full text-microsoft-blue hover:bg-microsoft-blue hover:text-white"
          onClick={() => onClick(meeting)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UpcomingMeetingCard;
