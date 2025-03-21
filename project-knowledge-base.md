# Murph Project Knowledge Base

## Core Project Files

- `project-overview.md`: High-level project description, goals, and vision
- `agent-roles.md`: Each agent's responsibilities and collaboration points
- `technical-specifications.md`: Technical requirements and architecture
- `ui-design-guidelines.md`: Design principles, color schemes, and components
- `content-guidelines.md`: Mock data structure and content requirements
- `development-workflow.md`: Development process and collaboration patterns
- `deployment-guide.md`: Vercel deployment process and feedback collection
- `project-timeline.md`: Detailed timeline with tasks, milestones, and dependencies

## Knowledge Exchange Workflow

1. **GitHub Repository**: All markdown files are maintained in the GitHub repository
2. **Claude Knowledge Base**: GitHub repository is imported into Claude's project knowledge base
3. **Agent Access**: Each agent directly references documents in the knowledge base by name
4. **Automatic Knowledge Updates**: After completing tasks, agents provide updated markdown files
5. **Synchronization**: Updated files are pushed to GitHub and automatically synchronized with Claude's knowledge base
6. **Context Sharing**: All agents access the same knowledge base documents for consistency

## Project Status Tracking

| Component                 | Status        | Assigned To      | Last Updated |
| ------------------------- | ------------- | ---------------- | ------------ |
| Project Timeline          | 🟢 Complete    | Project Manager  | 2025-03-21   |
| Project Setup             | 🟢 Complete    | Frontend Dev     | 2025-03-21   |
| Design System             | 🟢 Complete    | UI/UX Design     | 2025-03-21   |
| UI Component Library      | 🟠 In Progress | Frontend Dev     | 2025-03-21   |
| Mock Data                 | 🟠 In Progress | Content & Loc    | 2025-03-21   |
| Landing Page              | 🟡 Planned     | UI/UX + Frontend | YYYY-MM-DD   |
| Authentication            | 🟡 Planned     | Frontend Dev     | YYYY-MM-DD   |
| Patient Dashboard         | 🟡 Planned     | Frontend Dev     | YYYY-MM-DD   |
| Consultation Flow         | 🟡 Planned     | Frontend Dev     | YYYY-MM-DD   |
| Medical Student Dashboard | 🟡 Planned     | Frontend Dev     | YYYY-MM-DD   |
| Communication Interfaces  | 🟡 Planned     | Frontend Dev     | YYYY-MM-DD   |
| Localization              | 🟡 Planned     | Content & Loc    | YYYY-MM-DD   |
| Deployment                | 🟡 Planned     | Testing & Deploy | YYYY-MM-DD   |

Status: 🟢 Complete | 🟠 In Progress | 🟡 Planned | 🔴 Blocked

## Current Milestone

**MILESTONE 1: Project Foundation Complete ✅**

We have successfully completed the project initialization phase. The Project Manager has created a detailed project timeline with specific tasks, dependencies, and milestones. The UI/UX Design Agent has created a comprehensive design system with detailed component guidelines, color palette, typography, spacing system, and animation principles following Apple-like design principles. The Frontend Development Agent has set up the Next.js 15 project structure with TypeScript, Tailwind CSS configuration according to the design system specifications, and created the full folder structure with basic component placeholders.

**Moving to MILESTONE 2: Core Building Blocks Ready**

We are now working on Week 2 tasks which include:
1. Task 2.1: Mock Data Creation (Content & Localization Agent)
2. Task 2.2: UI Component Implementation (Frontend Development Agent)
3. Task 2.3: Internationalization Setup (Content & Localization Agent)

## Project Structure

The Next.js project has been initialized with the following structure:

```
murph-website/
│
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage component
│   ├── layout.tsx                # Root layout component
│   ├── globals.css               # Global CSS with Tailwind
│   ├── auth/                     # Authentication routes
│   │   ├── login/                # Login page
│   │   └── register/             # Registration page
│   ├── patient/                  # Patient-specific routes
│   │   └── dashboard/            # Patient dashboard
│   ├── medical-student/          # Medical student routes
│   │   └── dashboard/            # Medical student dashboard
│   ├── chat/                     # Chat interface
│   ├── video-call/               # Video call interface
│   └── about/                    # Informational pages
│
├── components/                   # React components
│   ├── ui/                       # UI components
│   │   ├── buttons/              # Button components
│   │   ├── cards/                # Card components
│   │   ├── forms/                # Form components
│   │   ├── layout/               # Layout components
│   │   ├── navigation/           # Navigation components
│   │   └── feedback/             # Feedback components
│   ├── core/                     # Core application components
│   ├── animations/               # Animation components
│   ├── patient/                  # Patient-specific components
│   └── medical-student/          # Medical student components
│
├── lib/                          # Utility functions
│   └── utils/                    # Utility functions
│       ├── formatters.ts         # Data formatting utilities
│       └── validators.ts         # Form validation utilities
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication hook
│   ├── useConsultations.ts       # Consultations data hook
│   └── useDocuments.ts           # Documents data hook
│
├── providers/                    # React context providers
│   ├── AuthProvider.tsx          # Authentication context
│   └── ThemeProvider.tsx         # Theme context
│
├── mock-data/                    # Mock data JSON files
│   ├── users/                    # User mock data
│   │   ├── patients.json         # Patient user data
│   │   └── medical-students.json # Medical student user data
│   ├── consultations/            # Consultation mock data
│   │   └── consultations.json    # Consultation data
│   ├── documents/                # Document mock data
│   │   └── documents.json        # Document data
│   └── messages/                 # Message mock data
│       └── messages.json         # Message data
│
├── styles/                       # Additional styles
├── public/                       # Static assets
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Technology Setup

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **TypeScript**: Configured with strict type checking
- **Styling**: Tailwind CSS v3 with custom theme extending the design system
- **Form Handling**: Using react-hook-form for forms
- **State Management**: Zustand for client-side state
- **Animations**: Set up with Framer Motion

## Upcoming Tasks

1. **UI Component Implementation** (Frontend Development Agent)
   - Build core UI components based on design system
   - Due: Day 9 (Priority: High)

2. **Mock Data Creation** (Content & Localization Agent)
   - Develop comprehensive mock data
   - Due: Day 7 (Priority: High)

3. **Internationalization Setup** (Content & Localization Agent)
   - Configure internationalization for German and English
   - Due: Day 10 (Priority: Medium)

## Weekly Review Schedule

- **Week 1 Review:** Completed on Day 5 - MILESTONE 1 achieved ✅
- **Week 2 Review:** Scheduled for Day 10
- **Week 3 Review:** Scheduled for Day 15
- **Week 4 Review:** Scheduled for Day 20
- **Final Review:** Scheduled for Day 25