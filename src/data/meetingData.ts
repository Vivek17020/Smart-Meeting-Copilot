
export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: Participant[];
  location?: string;
  agenda?: AgendaItem[];
  notes?: string;
  actionItems?: ActionItem[];
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
}

export interface AgendaItem {
  id: string;
  title: string;
  duration: string;
  presenter: string;
  description?: string;
}

export interface ActionItem {
  id: string;
  description: string;
  assignee: string;
  dueDate?: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export const mockMeetings: Meeting[] = [
  {
    id: "m-001",
    title: "Project Kickoff: AI Assistant Integration",
    description: "Initial planning for SmartMeeting Copilot integration into our existing product suite.",
    date: "2025-04-15",
    startTime: "09:00",
    endTime: "10:30",
    participants: [
      {
        id: "p-001",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        role: "Project Manager",
        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: "p-002",
        name: "Michael Chen",
        email: "michael.chen@example.com",
        role: "Lead Developer",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: "p-003",
        name: "Priya Patel",
        email: "priya.patel@example.com",
        role: "Product Owner",
        avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      {
        id: "p-004",
        name: "James Wilson",
        email: "james.wilson@example.com",
        role: "UX Designer",
        avatarUrl: "https://randomuser.me/api/portraits/men/92.jpg"
      }
    ],
    location: "Conference Room A",
  },
  {
    id: "m-002",
    title: "Weekly Sprint Review",
    description: "Review progress on sprint tasks and address any blockers.",
    date: "2025-04-18",
    startTime: "14:00",
    endTime: "15:00",
    participants: [
      {
        id: "p-001",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        role: "Project Manager",
        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: "p-002",
        name: "Michael Chen",
        email: "michael.chen@example.com",
        role: "Lead Developer",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: "p-005",
        name: "Alex Rodriguez",
        email: "alex.rodriguez@example.com",
        role: "Backend Developer",
        avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg"
      },
      {
        id: "p-006",
        name: "Emma Davis",
        email: "emma.davis@example.com",
        role: "Frontend Developer",
        avatarUrl: "https://randomuser.me/api/portraits/women/22.jpg"
      }
    ],
    location: "Virtual (Microsoft Teams)",
    agenda: [
      {
        id: "a-001",
        title: "Sprint Goals Review",
        duration: "15min",
        presenter: "Sarah Johnson",
        description: "Review sprint goals and overall progress"
      },
      {
        id: "a-002",
        title: "Feature Demo",
        duration: "20min",
        presenter: "Michael Chen",
        description: "Demonstrate new AI integration features"
      },
      {
        id: "a-003",
        title: "Blockers & Issues",
        duration: "15min",
        presenter: "Team",
        description: "Discuss any blockers or technical issues"
      },
      {
        id: "a-004",
        title: "Next Sprint Planning",
        duration: "10min",
        presenter: "Priya Patel",
        description: "Initial discussion on next sprint priorities"
      }
    ],
    notes: "The team showcased significant progress on the AI integration framework. Michael demonstrated the prototype for semantic kernel integration which was well-received. There are some concerns about performance issues with the current implementation that need to be addressed. Emma suggested using a different approach for the UI components which will be explored next sprint.",
    actionItems: [
      {
        id: "ai-001",
        description: "Investigate performance issues with Semantic Kernel integration",
        assignee: "Michael Chen",
        dueDate: "2025-04-22",
        status: "pending"
      },
      {
        id: "ai-002",
        description: "Create UI mockups for the new approach",
        assignee: "James Wilson",
        dueDate: "2025-04-20",
        status: "in-progress"
      },
      {
        id: "ai-003",
        description: "Schedule technical review meeting with architecture team",
        assignee: "Sarah Johnson",
        dueDate: "2025-04-19",
        status: "pending"
      }
    ]
  },
  {
    id: "m-003",
    title: "AI Agent Architecture Planning",
    description: "Design session for the multi-agent architecture using Semantic Kernel.",
    date: "2025-04-20",
    startTime: "11:00",
    endTime: "12:30",
    participants: [
      {
        id: "p-002",
        name: "Michael Chen",
        email: "michael.chen@example.com",
        role: "Lead Developer",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: "p-007",
        name: "David Kim",
        email: "david.kim@example.com",
        role: "AI Engineer",
        avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      {
        id: "p-008",
        name: "Sophia Garcia",
        email: "sophia.garcia@example.com",
        role: "Systems Architect",
        avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg"
      }
    ],
    location: "Conference Room B"
  },
  {
    id: "m-004",
    title: "Hackathon Strategy Session",
    description: "Finalize strategy and submission plans for Microsoft AI Agents Hackathon 2025.",
    date: "2025-04-22",
    startTime: "15:30",
    endTime: "17:00",
    participants: [
      {
        id: "p-001",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        role: "Project Manager",
        avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: "p-002",
        name: "Michael Chen",
        email: "michael.chen@example.com",
        role: "Lead Developer",
        avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: "p-003",
        name: "Priya Patel",
        email: "priya.patel@example.com",
        role: "Product Owner",
        avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      {
        id: "p-007",
        name: "David Kim",
        email: "david.kim@example.com",
        role: "AI Engineer",
        avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      {
        id: "p-009",
        name: "Lisa Thompson",
        email: "lisa.thompson@example.com",
        role: "Marketing Manager",
        avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg"
      }
    ],
    location: "Virtual (Microsoft Teams)"
  }
];
