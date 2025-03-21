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

| Component                 | Status     | Assigned To      | Last Updated |
| ------------------------- | ---------- | ---------------- | ------------ |
| Project Timeline          | 🟢 Complete | Project Manager  | 2025-03-21   |
| Project Setup             | 🟢 Complete | Frontend Dev     | 2025-03-21   |
| Design System             | 🟢 Complete | UI/UX Design     | 2025-03-21   |
| UI Component Library      | 🟢 Complete | Frontend Dev     | 2025-03-21   |
| Mock Data                 | 🟢 Complete | Content & Loc    | 2025-03-21   |
| Landing Page              | 🟡 Planned  | UI/UX + Frontend | YYYY-MM-DD   |
| Authentication            | 🟡 Planned  | Frontend Dev     | YYYY-MM-DD   |
| Patient Dashboard         | 🟡 Planned  | Frontend Dev     | YYYY-MM-DD   |
| Consultation Flow         | 🟡 Planned  | Frontend Dev     | YYYY-MM-DD   |
| Medical Student Dashboard | 🟡 Planned  | Frontend Dev     | YYYY-MM-DD   |
| Communication Interfaces  | 🟡 Planned  | Frontend Dev     | YYYY-MM-DD   |
| Localization              | 🟡 Planned  | Content & Loc    | YYYY-MM-DD   |
| Deployment                | 🟡 Planned  | Testing & Deploy | YYYY-MM-DD   |

Status: 🟢 Complete | 🟠 In Progress | 🟡 Planned | 🔴 Blocked

## Current Milestone

**MILESTONE 1: Project Foundation Complete ✅**

We have successfully completed the project initialization phase. The Project Manager has created a detailed project timeline with specific tasks, dependencies, and milestones. The UI/UX Design Agent has created a comprehensive design system with detailed component guidelines, color palette, typography, spacing system, and animation principles following Apple-like design principles. The Frontend Development Agent has set up the Next.js 15 project structure with TypeScript, Tailwind CSS configuration according to the design system specifications, and created the full folder structure with basic component placeholders.

**MILESTONE 2: Core Building Blocks Progress ✅**

We have completed the Week 2 tasks:
1. Task 2.1: Mock Data Creation (Content & Localization Agent) ✅ - Completed on 2025-03-21
   - Developed comprehensive mock data for 10 patients, 8 medical students, 20 consultations, 15 documents, and 30 messages
   - Created realistic German profiles with diverse demographics and medical scenarios
   - Ensured data consistency across all related entities

2. Task 2.2: UI Component Implementation (Frontend Development Agent) ✅ - Completed on 2025-03-21
   - Implemented 9 core component categories following the design system specifications
   - Created 40+ individual components with proper TypeScript typing and responsive design
   - Implemented components including buttons, cards, forms, modals, navigation elements, and feedback collection
   - Ensured accessibility and keyboard navigation support
   - Added special components for communication interfaces (chat, video, audio)
   - Created a test page for verifying component functionality

3. Task 2.3: Internationalization Setup (Content & Localization Agent) - Planned

## Project Structure

Based on the current tree output, the Next.js project has the following structure:

```
murph-concept/
│
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage component
│   ├── layout.tsx                # Root layout component
│   ├── globals.css               # Global CSS with Tailwind
│   ├── test/                     # Component testing page
│   │   └── page.tsx              # Test page for UI components
│   ├── auth/                     # Authentication routes
│   │   ├── login/                # Login page
│   │   └── register/             # Registration page
│   ├── patient/                  # Patient-specific routes
│   │   └── dashboard/            # Patient dashboard
│   ├── medical-student/          # Medical student routes
│   │   └── dashboard/            # Medical student dashboard
│   ├── chat/                     # Chat interface
│   └── video-call/               # Video call interface
│
├── components/                   # React components
│   ├── ui/                       # UI components
│   │   ├── avatar/               # Avatar components
│   │   │   ├── Avatar.tsx        # User avatar component
│   │   │   ├── AvatarGroup.tsx   # Group of avatars
│   │   │   ├── UserInfo.tsx      # User info display
│   │   │   └── UserListItem.tsx  # User list item
│   │   ├── buttons/              # Button components
│   │   │   ├── Button.tsx        # Enhanced button component
│   │   │   └── IconButton.tsx    # Icon-only button component
│   │   ├── cards/                # Card components
│   │   │   ├── Card.tsx          # Base card with multiple variants
│   │   │   ├── ConsultationCard.tsx  # Consultation-specific card
│   │   │   ├── DocumentCard.tsx  # Document display card
│   │   │   └── ProfileCard.tsx   # User profile card
│   │   ├── communication/        # Communication components
│   │   │   ├── ChatBubble.tsx    # Chat message bubble
│   │   │   ├── ChatInput.tsx     # Text input for chat
│   │   │   ├── ChatContainer.tsx # Container for chat messages
│   │   │   ├── VideoCallContainer.tsx # Video call interface
│   │   │   ├── VideoCallButton.tsx # Video call control button
│   │   │   ├── AudioCallContainer.tsx # Audio call interface
│   │   │   ├── MessageInput.tsx  # Text input for messages
│   │   │   ├── AsyncMessageContainer.tsx # Async messaging container
│   │   │   ├── DocumentShare.tsx # Document sharing component
│   │   │   └── ConsultationRequestSummary.tsx # Request summary
│   │   ├── elements/             # UI element components
│   │   │   ├── Tag.tsx           # Tag/chip component
│   │   │   ├── Divider.tsx       # Horizontal/vertical divider
│   │   │   ├── EmptyState.tsx    # Empty state message
│   │   │   ├── Stat.tsx          # Statistic display
│   │   │   └── StatsGroup.tsx    # Group of statistics
│   │   ├── feedback/             # Feedback components
│   │   │   ├── StarRating.tsx    # Star rating component
│   │   │   ├── FeedbackForm.tsx  # Feedback form
│   │   │   ├── FeedbackWidget.tsx # Floating feedback widget
│   │   │   ├── SatisfactionSurvey.tsx # Quick satisfaction survey
│   │   │   └── NPSSurvey.tsx     # Net Promoter Score survey
│   │   ├── forms/                # Form components
│   │   │   ├── Input.tsx         # Text input component
│   │   │   ├── TextArea.tsx      # Multi-line input
│   │   │   ├── Select.tsx        # Dropdown component
│   │   │   ├── Checkbox.tsx      # Checkbox component
│   │   │   ├── Radio.tsx         # Radio button component
│   │   │   ├── RadioGroup.tsx    # Group of radio buttons
│   │   │   └── FormGroup.tsx     # Form section container
│   │   ├── layout/               # Layout components
│   │   │   ├── PageContainer.tsx # Page container
│   │   │   ├── PageHeader.tsx    # Page header with title and actions
│   │   │   ├── ContentSection.tsx # Content section container
│   │   │   ├── SplitLayout.tsx   # Two-column layout
│   │   │   ├── GridLayout.tsx    # Responsive grid layout
│   │   │   ├── DashboardLayout.tsx # Layout with sidebar
│   │   │   ├── AuthLayout.tsx    # Authentication page layout
│   │   │   ├── MainLayout.tsx    # Main site layout
│   │   │   └── ResponsiveContainer.tsx # Responsive container
│   │   ├── modal/                # Modal components
│   │   │   ├── Modal.tsx         # Modal dialog component
│   │   │   ├── ModalBody.tsx     # Modal content container
│   │   │   ├── ModalFooter.tsx   # Modal footer with actions
│   │   │   ├── Drawer.tsx        # Side drawer component
│   │   │   ├── Alert.tsx         # Alert message component
│   │   │   ├── Toast.tsx         # Toast notification
│   │   │   └── ToastContainer.tsx # Container for toasts
│   │   ├── navigation/           # Navigation components
│   │   │   ├── NavItem.tsx       # Navigation item
│   │   │   ├── TabNavigation.tsx # Tab navigation
│   │   │   ├── Breadcrumbs.tsx   # Breadcrumb navigation
│   │   │   ├── Sidebar.tsx       # Side navigation
│   │   │   └── Pagination.tsx    # Pagination controls
│   │   └── status/               # Status components
│   │       ├── Badge.tsx         # Badge component
│   │       ├── StatusBadge.tsx   # Status-specific badge
│   │       ├── LinearProgress.tsx # Progress bar
│   │       ├── Spinner.tsx       # Loading spinner
│   │       └── Skeleton.tsx      # Loading skeleton
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
│   │   ├── patients.json         # Patient user data (10 profiles)
│   │   └── medical-students.json # Medical student user data (8 profiles)
│   ├── consultations/            # Consultation mock data
│   │   └── consultations.json    # Consultation data (20 consultations)
│   ├── documents/                # Document mock data
│   │   └── documents.json        # Document data (15 documents)
│   └── messages/                 # Message mock data
│       └── messages.json         # Message data (30 messages)
│
├── public/                       # Static assets
├── styles/                       # Additional styles (if needed)
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

## Testing Approach

A component testing page has been created at `/app/test/page.tsx` to verify the functionality of the UI components before integration into the actual pages. This allows for testing individual components in isolation and ensuring they work correctly with different props and states.

## Upcoming Tasks

1. **Internationalization Setup** (Content & Localization Agent)
   - Configure internationalization for German and English
   - Due: Day 10 (Priority: Medium)

2. **Landing Page Design** (UI/UX Design Agent)
   - Design detailed landing page layout
   - Due: Day 12 (Priority: Medium)

3. **Landing Page Implementation** (Frontend Development Agent)
   - Develop responsive landing page with animations
   - Due: Day 14 (Priority: Medium)

## Weekly Review Schedule

- **Week 1 Review:** Completed on Day 5 - MILESTONE 1 achieved ✅
- **Week 2 Review:** Scheduled for Day 10 - MILESTONE 2 achieved ✅
- **Week 3 Review:** Scheduled for Day 15
- **Week 4 Review:** Scheduled for Day 20
- **Final Review:** Scheduled for Day 25