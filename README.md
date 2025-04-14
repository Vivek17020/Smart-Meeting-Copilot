![ChatGPT Image Apr 14, 2025, 09_42_23 AM](https://github.com/user-attachments/assets/1336ae25-ba59-4355-9bd7-02e9233bc706)
# SmartMeeting Copilot

SmartMeeting Copilot is an AI-powered meeting assistant that uses Microsoft's Semantic Kernel framework to orchestrate multiple specialized AI agents. The application streamlines the entire meeting lifecycle, from agenda creation and note-taking to action item extraction and follow-up reminders.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Connecting to Azure OpenAI](#connecting-to-azure-openai)
- [Demo Mode](#demo-mode)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Future Enhancements](#future-enhancements)

## Features

SmartMeeting Copilot offers a comprehensive set of features designed to optimize the meeting experience:

- **AI Agenda Generation**: Automatically creates structured agendas based on meeting context and participants
- **Intelligent Note Taking**: Uses AI to capture comprehensive meeting notes
- **Action Item Extraction**: Identifies and assigns action items with deadlines from meeting discussions
- **Smart Reminders**: Schedules automated reminders for upcoming meetings and action item deadlines
- **Multiple AI Agent Orchestration**: Leverages specialized AI agents for different meeting tasks
- **Calendar Integration**: Syncs with existing calendar systems
- **Participant Management**: Tracks attendance and participant information
- **Real-time Collaboration**: Enables simultaneous contribution to meeting resources

## Architecture

SmartMeeting Copilot follows a modern, scalable architecture designed to leverage the power of Microsoft's Semantic Kernel:

![SmartMeeting Copilot Architecture]()



### Key Architecture Components:

1. **React Frontend**: A responsive web application built with React, TypeScript, and Tailwind CSS.

2. **C# Semantic Kernel Backend**: Powered by Microsoft's Semantic Kernel framework, handling:
   - AI Agent Orchestration
   - Task Distribution
   - LLM Integration
   - Context Management

3. **AI Agent System**:
   - **Agenda Agent**: Specialized in creating meeting agendas
   - **Notes Agent**: Focused on capturing and summarizing meeting content
   - **Action Item Agent**: Extracts and assigns action items
   - **Reminder Agent**: Manages follow-up scheduling

4. **Integration Layer**:
   - Calendar Systems
   - Email Services
   - Notification Systems

5. **Data Storage**:
   - Meeting Information
   - Agenda Data
   - Notes
   - Action Items
   - User Preferences

### Data Flow:

1. User requests are processed by the React frontend
2. Requests are routed to the C# Semantic Kernel backend
3. The backend orchestrates the appropriate AI agents
4. Agents interact with the LLM through Semantic Kernel
5. Results are returned to the frontend for display
6. Data is persisted for future reference

## Technology Stack

### Frontend
- React 18+
- TypeScript
- Tailwind CSS
- Shadcn/UI Components
- React Router for navigation
- React Query for data fetching
- Recharts for data visualization

### Backend
- C# .NET 7+
- Microsoft Semantic Kernel
- Azure OpenAI integration
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js 18+
- .NET 7 SDK
- Azure OpenAI subscription (for full functionality)

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/smartmeeting-copilot.git
   cd smartmeeting-copilot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The application will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd SmartMeetingApi
   ```

2. Restore dependencies:
   ```bash
   dotnet restore
   ```

3. Update the configuration in `appsettings.json` with your Azure OpenAI credentials:
   ```json
   "SemanticKernel": {
     "DeploymentName": "YOUR_DEPLOYMENT_NAME",
     "Endpoint": "https://YOUR_AZURE_OPENAI_SERVICE.openai.azure.com/",
     "ApiKey": "YOUR_AZURE_OPENAI_API_KEY"
   }
   ```

4. Run the backend:
   ```bash
   dotnet run
   ```

5. The API will be available at `http://localhost:5000/api`

## Connecting to Azure OpenAI

For full functionality, SmartMeeting Copilot requires a connection to Azure OpenAI services:

1. Create an Azure OpenAI resource in your Azure portal
2. Deploy a model (GPT-4 recommended for best results)
3. Copy the endpoint, deployment name, and API key
4. Update the `appsettings.json` file with these credentials
5. Set `USE_REAL_SEMANTIC_KERNEL` to `true` in `src/services/backendService.ts`

## Demo Mode

For easy evaluation and demonstration, SmartMeeting Copilot includes a simulation mode that doesn't require Azure OpenAI credentials:

1. Set `USE_REAL_SEMANTIC_KERNEL` to `false` in `src/services/backendService.ts`
2. The application will use simulated AI responses to showcase the functionality
3. Visit the `/demo` route to see an interactive demonstration of the key features

## Project Structure

```
smartmeeting-copilot/
├── public/                       # Static assets
├── src/
│   ├── components/               # React components
│   │   ├── skills/               # AI skill components
│   │   │   ├── AgendaGenerator.tsx
│   │   │   ├── NotesGenerator.tsx
│   │   │   └── ActionItemsGenerator.tsx
│   │   ├── ui/                   # UI components
│   │   └── ...
│   ├── data/                     # Data models and mock data
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility functions
│   ├── pages/                    # Page components
│   │   ├── Index.tsx             # Dashboard page
│   │   ├── Demo.tsx              # Demo showcase page
│   │   └── ...
│   ├── services/                 # API services
│   │   └── backendService.ts     # Backend connection service
│   └── ...
├── SmartMeetingApi/              # C# Backend
│   ├── Controllers/              # API endpoints
│   ├── Models/                   # Data models
│   ├── Services/                 # Business logic
│   │   └── SemanticKernelService.cs  # Semantic Kernel integration
│   └── ...
└── ...
```

## API Documentation

### Agenda Generation
```
POST /api/agenda/generate
```
Generates a structured meeting agenda based on meeting details and participants.

**Request Body:**
```json
{
  "id": "meeting-123",
  "title": "Project Kickoff",
  "description": "Initial planning for the new product launch",
  "participants": [
    {
      "name": "Jane Smith",
      "role": "Project Manager"
    }
  ]
}
```

**Response:**
```json
[
  {
    "id": "agenda-1",
    "title": "Project Overview",
    "duration": "15min",
    "presenter": "Jane Smith",
    "description": "Introduction to project goals and scope"
  }
]
```

### Meeting Notes Generation
```
POST /api/notes/generate
```
Generates comprehensive meeting notes based on meeting context.

### Action Item Extraction
```
POST /api/actionItems/extract
```
Extracts and assigns action items from meeting notes.

## Future Enhancements

- **Microsoft Teams Integration**: Direct integration with Microsoft Teams
- **Speech-to-Text**: Real-time transcription of meeting discussions
- **Advanced Analytics**: Meeting efficiency metrics and insights
- **Multi-language Support**: Support for multiple languages
- **Custom Agent Creation**: Allow users to create specialized agents for specific meeting types
