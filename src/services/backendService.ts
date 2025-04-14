import backendData from '../data/backendSchema.json';
import { Meeting, AgendaItem, ActionItem } from '../data/meetingData';

// Environment configuration - would be set based on your deployment
const USE_REAL_SEMANTIC_KERNEL = false; // Set to true to use the real API
const SEMANTIC_KERNEL_API = 'http://localhost:5000/api'; // Change to your actual API URL

// Simulate network delay for realistic API behavior
const simulateNetworkDelay = (min = 500, max = 1500) => {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Simulated API error
class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Check if the real Semantic Kernel API is available
const checkApiAvailability = async (): Promise<boolean> => {
  if (!USE_REAL_SEMANTIC_KERNEL) return false;
  
  try {
    const response = await fetch(`${SEMANTIC_KERNEL_API}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error checking API availability:', error);
    return false;
  }
};

// Mock Semantic Kernel execution for agenda generation
const simulateSemanticKernelExecution = async (promptType: string, meetingData: any) => {
  console.log(`Simulating Semantic Kernel execution for: ${promptType}`);
  console.log(`Using prompt template: ${backendData.systemSettings[`default${promptType}Prompt`]}`);
  console.log(`Meeting data:`, meetingData);
  
  await simulateNetworkDelay(1000, 3000); // AI operations take longer
  
  // This would be where the actual Semantic Kernel code would run in C#/.NET
  // Using the prompt template and meeting data to generate content
  
  return {
    executionId: `exec-${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: 'Completed',
    result: null // Will be populated with actual data by the specific methods
  };
};

// Real Semantic Kernel API call for agenda generation
const callRealSemanticKernelAPI = async (endpoint: string, data: any) => {
  try {
    console.log(`Calling real Semantic Kernel API: ${endpoint}`);
    console.log(`Data:`, data);
    
    const response = await fetch(`${SEMANTIC_KERNEL_API}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}): ${errorText}`);
      throw new ApiError(`API error: ${response.statusText}`, response.status);
    }
    
    const result = await response.json();
    console.log(`API response:`, result);
    return result;
  } catch (error) {
    console.error('Error calling Semantic Kernel API:', error);
    throw error instanceof ApiError ? error : new ApiError('Failed to call Semantic Kernel API');
  }
};

// Backend Service to simulate API calls
export const backendService = {
  // Check if real Semantic Kernel is being used
  isUsingRealSemanticKernel: async (): Promise<boolean> => {
    if (USE_REAL_SEMANTIC_KERNEL) {
      return await checkApiAvailability();
    }
    return false;
  },
  
  // Get all meetings
  getMeetings: async (): Promise<Meeting[]> => {
    await simulateNetworkDelay();
    
    try {
      return backendData.meetings as Meeting[];
    } catch (error) {
      console.error('Error fetching meetings:', error);
      throw new ApiError('Failed to fetch meetings');
    }
  },
  
  // Get single meeting by ID
  getMeeting: async (id: string): Promise<Meeting> => {
    await simulateNetworkDelay();
    
    try {
      const meeting = backendData.meetings.find(m => m.id === id);
      if (!meeting) {
        throw new ApiError(`Meeting with ID ${id} not found`, 404);
      }
      return meeting as Meeting;
    } catch (error) {
      console.error(`Error fetching meeting ${id}:`, error);
      throw error instanceof ApiError ? error : new ApiError('Failed to fetch meeting');
    }
  },
  
  // Generate agenda using Semantic Kernel
  generateAgenda: async (meetingId: string): Promise<AgendaItem[]> => {
    try {
      const meeting = await backendService.getMeeting(meetingId);
      
      // If real Semantic Kernel API is enabled, call it
      if (USE_REAL_SEMANTIC_KERNEL) {
        const isAvailable = await checkApiAvailability();
        if (isAvailable) {
          const result = await callRealSemanticKernelAPI('agenda/generate', meeting);
          console.log(`Generated agenda from real API for meeting ${meetingId}:`, result);
          return result as AgendaItem[];
        } else {
          console.warn('Real Semantic Kernel API is enabled but not available. Falling back to simulation.');
        }
      }
      
      // Otherwise, use the simulated version
      const skResult = await simulateSemanticKernelExecution('AgendaGeneration', meeting);
      
      // Mock response that would come from Semantic Kernel
      const mockAgenda: AgendaItem[] = [
        {
          id: `agenda-${Date.now()}-1`,
          title: "Project Overview",
          duration: "15min",
          presenter: meeting.participants[0]?.name || "Lead",
          description: "Introduction to the project goals and scope"
        },
        {
          id: `agenda-${Date.now()}-2`,
          title: "Technical Architecture Discussion",
          duration: "20min",
          presenter: meeting.participants.length > 1 ? meeting.participants[1].name : meeting.participants[0].name,
          description: "Review of the proposed multi-agent architecture using Semantic Kernel"
        },
        {
          id: `agenda-${Date.now()}-3`,
          title: "Implementation Timeline",
          duration: "15min", 
          presenter: meeting.participants[0]?.name || "Lead",
          description: "Discussion of key milestones and deadlines"
        },
        {
          id: `agenda-${Date.now()}-4`,
          title: "Q&A and Next Steps",
          duration: "10min",
          presenter: "All",
          description: "Open discussion and action item assignment"
        }
      ];
      
      // Update meeting with generated agenda
      // In a real implementation, this would save to the backend
      console.log(`Generated agenda for meeting ${meetingId}:`, mockAgenda);
      
      return mockAgenda;
    } catch (error) {
      console.error(`Error generating agenda for meeting ${meetingId}:`, error);
      throw error instanceof ApiError ? error : new ApiError('Failed to generate agenda');
    }
  },
  
  // Generate meeting notes using Semantic Kernel
  generateNotes: async (meetingId: string): Promise<string> => {
    try {
      const meeting = await backendService.getMeeting(meetingId);
      
      // If real Semantic Kernel API is enabled, call it (if implemented)
      if (USE_REAL_SEMANTIC_KERNEL) {
        // This endpoint would need to be implemented in your C# API
        // const result = await callRealSemanticKernelAPI('notes/generate', meeting);
        // return result.notes;
      }
      
      const skResult = await simulateSemanticKernelExecution('NotesGeneration', meeting);
      
      // Mock response that would come from Semantic Kernel
      const mockNotes = `# ${meeting.title} - Meeting Notes\n\n` +
        `**Date:** ${meeting.date}\n` +
        `**Time:** ${meeting.startTime} - ${meeting.endTime}\n` +
        `**Location:** ${meeting.location}\n\n` +
        `## Participants\n` +
        meeting.participants.map(p => `- ${p.name} (${p.role})`).join('\n') + 
        `\n\n## Discussion\n\n` +
        `The team discussed the implementation of the SmartMeeting Copilot integration. ` +
        `${meeting.participants[0]?.name} presented the project overview and goals. ` +
        `${meeting.participants.length > 1 ? meeting.participants[1].name : 'The team'} outlined the technical architecture using Microsoft's Semantic Kernel. ` +
        `The team agreed on a phased approach for implementation with the first release targeted for next quarter.\n\n` +
        `## Key Decisions\n\n` +
        `1. Use Semantic Kernel for orchestrating the AI agents\n` +
        `2. Start with agenda generation and notes summarization features\n` +
        `3. Implement action item extraction as phase 2\n` +
        `4. Conduct bi-weekly progress reviews\n\n` +
        `## Next Steps\n\n` +
        `- Set up development environment with Semantic Kernel\n` +
        `- Create initial prompt templates for AI generation\n` +
        `- Review data schema and storage options\n`;
      
      console.log(`Generated notes for meeting ${meetingId}`);
      
      return mockNotes;
    } catch (error) {
      console.error(`Error generating notes for meeting ${meetingId}:`, error);
      throw error instanceof ApiError ? error : new ApiError('Failed to generate notes');
    }
  },
  
  // Extract action items using Semantic Kernel
  extractActionItems: async (meetingId: string, notes: string): Promise<ActionItem[]> => {
    try {
      const meeting = await backendService.getMeeting(meetingId);
      
      // If real Semantic Kernel API is enabled, call it (if implemented)
      if (USE_REAL_SEMANTIC_KERNEL) {
        // This endpoint would need to be implemented in your C# API
        // const result = await callRealSemanticKernelAPI('actionItems/extract', { meeting, notes });
        // return result as ActionItem[];
      }
      
      const skResult = await simulateSemanticKernelExecution('ActionItemExtraction', { meeting, notes });
      
      // Mock response that would come from Semantic Kernel
      const mockActionItems: ActionItem[] = [
        {
          id: `action-${Date.now()}-1`,
          description: "Set up development environment with Semantic Kernel",
          assignee: meeting.participants.length > 1 ? meeting.participants[1].name : meeting.participants[0].name,
          dueDate: "2025-04-22",
          status: "pending"
        },
        {
          id: `action-${Date.now()}-2`,
          description: "Create initial prompt templates for AI generation",
          assignee: meeting.participants.length > 2 ? meeting.participants[2].name : meeting.participants[0].name,
          dueDate: "2025-04-20",
          status: "pending"
        },
        {
          id: `action-${Date.now()}-3`,
          description: "Schedule technical review meeting with architecture team",
          assignee: meeting.participants[0]?.name || "Team Lead",
          dueDate: "2025-04-18",
          status: "pending"
        }
      ];
      
      console.log(`Extracted action items for meeting ${meetingId}:`, mockActionItems);
      
      return mockActionItems;
    } catch (error) {
      console.error(`Error extracting action items for meeting ${meetingId}:`, error);
      throw error instanceof ApiError ? error : new ApiError('Failed to extract action items');
    }
  },
  
  // Schedule reminder (simulated)
  scheduleReminder: async (meetingId: string, reminderType: 'agenda' | 'attendance' | 'followup', 
                           minutes: number): Promise<boolean> => {
    await simulateNetworkDelay();
    
    try {
      const meeting = await backendService.getMeeting(meetingId);
      
      // This would trigger the C#/.NET backend to schedule an actual reminder
      console.log(`REMINDER SCHEDULED: ${reminderType} for meeting "${meeting.title}"`);
      console.log(`Will trigger ${minutes} minutes before the meeting`);
      console.log(`Would notify: ${meeting.participants.map(p => p.email).join(', ')}`);
      
      return true;
    } catch (error) {
      console.error(`Error scheduling reminder for meeting ${meetingId}:`, error);
      throw error instanceof ApiError ? error : new ApiError('Failed to schedule reminder');
    }
  }
};
