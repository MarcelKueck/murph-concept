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
- `landing-page-design.md`: Detailed specifications for landing page layout and animations
- `patient-experience-implementation.md`: Detailed overview of patient dashboard and workflows
- `medical-student-experience-implementation.md`: Detailed overview of medical student dashboard and workflows
- `communication-interfaces-implementation.md`: Detailed specifications for communication channels

## Project Directory Structure

```
.
├── app
│   ├── favicon.ico
│   ├── globals.css
│   └── [locale]
│       ├── about
│       │   └── page.tsx
│       ├── auth
│       │   ├── login
│       │   │   └── page.tsx
│       │   └── register
│       │       └── page.tsx
│       ├── communication-test
│       │   └── page.tsx
│       ├── layout.tsx
│       ├── medical-student
│       │   ├── availability
│       │   │   └── page.tsx
│       │   ├── consultations
│       │   │   ├── [id]
│       │   │   │   └── page.tsx
│       │   │   └── page.tsx
│       │   ├── dashboard
│       │   │   └── page.tsx
│       │   └── profile
│       │       ├── expertise
│       │       │   └── page.tsx
│       │       └── page.tsx
│       ├── not-found.tsx
│       ├── page.tsx
│       ├── patient
│       │   ├── consultations
│       │   │   ├── [id]
│       │   │   │   └── page.tsx
│       │   │   ├── new
│       │   │   │   └── page.tsx
│       │   │   └── page.tsx
│       │   ├── dashboard
│       │   │   └── page.tsx
│       │   ├── documents
│       │   │   ├── page.tsx
│       │   │   └── upload
│       │   │       └── page.tsx
│       │   └── profile
│       │       └── page.tsx
│       └── test
│           └── page.tsx
├── components
│   ├── UnifiedCommunicationInterface.tsx
│   ├── medical-student
│   │   ├── availability
│   │   │   ├── CommunicationPreferences.tsx
│   │   │   ├── ExpertiseSettings.tsx
│   │   │   ├── SpecificDatesEditor.tsx
│   │   │   ├── WeeklyAvailabilityView.tsx
│   │   │   └── WeeklyScheduleEditor.tsx
│   │   └── consultations
│   │       ├── AssignedConsultationCard.tsx
│   │       ├── CompletedConsultationCard.tsx
│   │       ├── ConsultationRequestCard.tsx
│   │       └── MedicalStudentChatContainer.tsx
│   ├── patient
│   │   └── consultations
│   │       ├── ConsultationChatContainer.tsx
│   │       ├── ConsultationTypeCard.tsx
│   │       ├── DocumentList.tsx
│   │       └── DocumentUploader.tsx
│   └── ui
│       ├── avatar
│       │   ├── AvatarGroup.tsx
│       │   ├── Avatar.tsx
│       │   ├── UserInfo.tsx
│       │   └── UserListItem.tsx
│       ├── buttons
│       │   ├── Button.tsx
│       │   └── IconButton.tsx
│       ├── cards
│       │   ├── Card.tsx
│       │   ├── ConsultationCard.tsx
│       │   ├── DocumentCard.tsx
│       │   └── ProfileCard.tsx
│       ├── communication
│       │   ├── AsyncMessageContainer.tsx
│       │   ├── AsyncMessagingDemo.tsx
│       │   ├── AudioCallContainer.tsx
│       │   ├── AudioDemo.tsx
│       │   ├── ChatBubble.tsx
│       │   ├── ChatContainer.tsx
│       │   ├── ChatInput.tsx
│       │   ├── ConsultationRequestSummary.tsx
│       │   ├── DocumentShare.tsx
│       │   ├── MessageInput.tsx
│       │   ├── VideoCallButton.tsx
│       │   ├── VideoCallContainer.tsx
│       │   └── VideoDemo.tsx
│       ├── elements
│       │   ├── Divider.tsx
│       │   ├── EmptyState.tsx
│       │   ├── StatsGroup.tsx
│       │   ├── Stat.tsx
│       │   └── Tag.tsx
│       ├── feedback
│       │   ├── FeedbackForm.tsx
│       │   ├── FeedbackWidget.tsx
│       │   ├── NPSSurvey.tsx
│       │   ├── SatisfactionSurvey.tsx
│       │   └── StarRating.tsx
│       ├── forms
│       │   ├── Checkbox.tsx
│       │   ├── FormGroup.tsx
│       │   ├── Input.tsx
│       │   ├── RadioGroup.tsx
│       │   ├── Radio.tsx
│       │   ├── Select.tsx
│       │   └── TextArea.tsx
│       ├── layout
│       │   ├── AuthLayout.tsx
│       │   ├── ContentSection.tsx
│       │   ├── DashboardLayout.tsx
│       │   ├── GridLayout.tsx
│       │   ├── MainLayout.tsx
│       │   ├── PageContainer.tsx
│       │   ├── PageHeader.tsx
│       │   ├── ResponsiveContainer.tsx
│       │   └── SplitLayout.tsx
│       ├── modal
│       │   ├── Alert.tsx
│       │   ├── Drawer.tsx
│       │   ├── ModalBody.tsx
│       │   ├── ModalFooter.tsx
│       │   ├── Modal.tsx
│       │   ├── ToastContainer.tsx
│       │   └── Toast.tsx
│       ├── navigation
│       │   ├── Breadcrumbs.tsx
│       │   ├── LanguageSwitcher.tsx
│       │   ├── NavItem.tsx
│       │   ├── Pagination.tsx
│       │   ├── Sidebar.tsx
│       │   └── TabNavigation.tsx
│       └── status
│           ├── Badge.tsx
│           ├── LinearProgress.tsx
│           ├── Skeleton.tsx
│           ├── Spinner.tsx
│           └── StatusBadge.tsx
├── hooks
│   ├── useAuth.ts
│   ├── useConsultations.ts
│   ├── useDocuments.ts
│   ├── useCommunication.ts
│   └── useMedicalStudentConsultations.ts
├── i18n
│   ├── navigation.ts
│   ├── request.ts
│   └── routing.ts
├── lib
│   └── utils
│       ├── formatters.ts
│       ├── i18n-formatters.ts
│       └── validators.ts
├── messages
│   ├── de.json
│   └── en.json
├── middleware.ts
├── mock-data
│   ├── consultations
│   │   └── consultations.json
│   ├── documents
│   │   └── documents.json
│   ├── messages
│   │   └── messages.json
│   └── users
│       ├── medical-students.json
│       └── patients.json
├── providers
│   ├── AuthProvider.tsx
│   ├── IntlProvider.tsx
│   └── ThemeProvider.tsx
└── public
    ├── file.svg
    ├── globe.svg
    ├── next.svg
    ├── vercel.svg
    └── window.svg
```

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
| Internationalization      | 🟢 Complete | Content & Loc    | 2025-03-22   |
| Week 2 Review             | 🟢 Complete | Project Manager  | 2025-03-22   |
| Landing Page Design       | 🟢 Complete | UI/UX Design     | 2025-03-23   |
| Landing Page              | 🟢 Complete | Frontend Dev     | 2025-03-24   |
| Authentication            | 🟢 Complete | Frontend Dev     | 2025-03-22   |
| Patient Dashboard         | 🟢 Complete | Frontend Dev     | 2025-03-26   |
| Consultation Flow         | 🟢 Complete | Frontend Dev     | 2025-03-26   |
| Document Management       | 🟢 Complete | Frontend Dev     | 2025-03-26   |
| Patient Profile           | 🟢 Complete | Frontend Dev     | 2025-03-26   |
| Directory Structure       | 🟢 Complete | Frontend Dev     | 2025-03-27   |
| Medical Student Dashboard | 🟢 Complete | Frontend Dev     | 2025-03-29   |
| Availability Management   | 🟢 Complete | Frontend Dev     | 2025-03-29   |
| Consultation Assignment   | 🟢 Complete | Frontend Dev     | 2025-03-29   |
| Communication Interfaces  | 🟢 Complete | Frontend Dev     | 2025-03-31   |
| Deployment                | 🟡 Planned  | Testing & Deploy | YYYY-MM-DD   |

Status: 🟢 Complete | 🟠 In Progress | 🟡 Planned | 🔴 Blocked

## Current Milestone

**MILESTONE 1: Project Foundation Complete ✅**

We have successfully completed the project initialization phase. The Project Manager has created a detailed project timeline with specific tasks, dependencies, and milestones. The UI/UX Design Agent has created a comprehensive design system with detailed component guidelines, color palette, typography, spacing system, and animation principles following Apple-like design principles. The Frontend Development Agent has set up the Next.js 15 project structure with TypeScript, Tailwind CSS configuration according to the design system specifications, and created the full folder structure with basic component placeholders.

**MILESTONE 2: Core Building Blocks Ready ✅**

We have successfully completed all Week 2 tasks as verified in the review meeting on 2025-03-22.

**MILESTONE 3: Key Pages Implementation Status ✅**

We have successfully completed all Week 3 tasks.

**MILESTONE 4: Core Functionality Implementation Progress ✅**

We have successfully completed all Week 4 tasks:

1. Task 4.1: Patient Experience Implementation (Frontend Development Agent) ✅
   - Completed on 2025-03-26

2. Task 4.2: Medical Student Experience Implementation (Frontend Development Agent) ✅
   - Completed on 2025-03-29
   - All dashboard and consultation management interfaces completed
   - Fixed UI layout issues in ConsultationRequestCard with stacked buttons
   - Implemented separate loading states for accept/decline actions
   - Resolved infinite navigation loops in consultation detail page
   - Added missing profile and expertise placeholder pages
   - Fixed React key errors in WeeklyScheduleEditor component
   - Made available consultation cards clickable for details

3. Task 4.3: Communication Interfaces (Frontend Development Agent) ✅
   - Completed on 2025-03-31
   - Implemented enhanced VideoCallContainer with full controls and mock video feeds
   - Created AudioCallContainer with audio visualization and call simulation
   - Enhanced AsyncMessageContainer with templates and priority options
   - Developed UnifiedCommunicationInterface for seamless channel switching
   - Created useCommunication hook for communication state management
   - Integrated communication interfaces with consultation workflows
   - Fixed component path references and missing implementations
   - Added responsive design for all device sizes

## Next Steps

The immediate focus is on preparing for deployment:

1. Prepare for deployment to Vercel
2. Implement feedback collection mechanism
3. Conduct comprehensive testing across devices and browsers
4. Create documentation for stakeholder demonstrations
5. Prepare for the final review meeting

## Communication Interface Implementation

The communication interfaces implementation consists of several key components:

1. **UnifiedCommunicationInterface**: A central component that manages all communication channels and provides a unified interface for switching between them. Located at `components/UnifiedCommunicationInterface.tsx`.

2. **useCommunication Hook**: A custom hook that manages the state and functionality of communication channels. Located at `hooks/useCommunication.ts`.

3. **Video Call Components**:
   - VideoCallContainer: Main container for video calls with controls
   - VideoCallButton: Control buttons for video calls
   - VideoDemo: Mock implementation of video calls

4. **Audio Call Components**:
   - AudioCallContainer: Main container for audio calls
   - AudioDemo: Mock implementation of audio calls

5. **Text Chat Components**:
   - ChatContainer: Main container for text chat
   - ChatBubble: Message bubble for chat messages
   - ChatInput: Input for text messages
   - ConsultationChatContainer: Patient-side chat implementation
   - MedicalStudentChatContainer: Medical student-side chat implementation

6. **Asynchronous Messaging Components**:
   - AsyncMessageContainer: Container for structured asynchronous messaging
   - AsyncMessagingDemo: Demo implementation of asynchronous messaging

All of these components are now fully integrated with the consultation workflow, allowing users to switch between different communication channels based on their needs and the current consultation status.