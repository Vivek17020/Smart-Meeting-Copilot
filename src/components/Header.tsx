
import { useState } from 'react';
import { Menu, Bell, User, Search, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo and title */}
        <div className="flex items-center space-x-2">
          <div className="p-2 text-white rounded-md bg-microsoft-blue">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect width="10" height="10" x="2" y="2" rx="2" />
              <rect width="10" height="10" x="12" y="2" rx="2" />
              <rect width="10" height="10" x="2" y="12" rx="2" />
              <rect width="10" height="10" x="12" y="12" rx="2" />
            </svg>
          </div>
          <Link to="/" className="text-xl font-semibold">SmartMeeting Copilot</Link>
        </div>
        
        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex md:w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search meetings..." 
              className="w-full pl-8" 
            />
          </div>
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild className="hidden md:flex items-center gap-1">
            <Link to="/demo">
              <Play className="w-4 h-4" />
              <span>Watch Demo</span>
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>New action item assigned</DropdownMenuItem>
              <DropdownMenuItem>Meeting reminder: 15 minutes</DropdownMenuItem>
              <DropdownMenuItem>New meeting notes available</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="container px-4 py-3 mx-auto md:hidden">
          <div className="relative w-full mb-3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search meetings..." 
              className="w-full pl-8" 
            />
          </div>
          <nav className="flex flex-col space-y-1">
            <Button variant="ghost" className="justify-start">Dashboard</Button>
            <Button variant="ghost" className="justify-start">Meetings</Button>
            <Button variant="ghost" className="justify-start">Calendar</Button>
            <Button variant="ghost" className="justify-start">Reports</Button>
            <Button variant="ghost" className="justify-start" asChild>
              <Link to="/demo">Watch Demo</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
