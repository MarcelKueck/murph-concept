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
│       │   ├── AudioCallContainer.tsx
│       │   ├── ChatBubble.tsx
│       │   ├── ChatContainer.tsx
│       │   ├── ChatInput.tsx
│       │   ├── ConsultationRequestSummary.tsx
│       │   ├── DocumentShare.tsx
│       │   ├── MessageInput.tsx
│       │   ├── VideoCallButton.tsx
│       │   └── VideoCallContainer.tsx
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

| Component                 | Status        | Assigned To      | Last Updated |
| ------------------------- | ------------- | ---------------- | ------------ |
| Project Timeline          | 🟢 Complete    | Project Manager  | 2025-03-21   |
| Project Setup             | 🟢 Complete    | Frontend Dev     | 2025-03-21   |
| Design System             | 🟢 Complete    | UI/UX Design     | 2025-03-21   |
| UI Component Library      | 🟢 Complete    | Frontend Dev     | 2025-03-21   |
| Mock Data                 | 🟢 Complete    | Content & Loc    | 2025-03-21   |
| Internationalization      | 🟢 Complete    | Content & Loc    | 2025-03-22   |
| Week 2 Review             | 🟢 Complete    | Project Manager  | 2025-03-22   |
| Landing Page Design       | 🟢 Complete    | UI/UX Design     | 2025-03-23   |
| Landing Page              | 🟢 Complete    | Frontend Dev     | 2025-03-24   |
| Authentication            | 🟢 Complete    | Frontend Dev     | 2025-03-22   |
| Patient Dashboard         | 🟢 Complete    | Frontend Dev     | 2025-03-26   |
| Consultation Flow         | 🟢 Complete    | Frontend Dev     | 2025-03-26   |
| Document Management       | 🟢 Complete    | Frontend Dev     | 2025-03-26   |
| Patient Profile           | 🟢 Complete    | Frontend Dev     | 2025-03-26   |
| Directory Structure       | 🟢 Complete    | Frontend Dev     | 2025-03-27   |
| Medical Student Dashboard | 🟢 Complete    | Frontend Dev     | 2025-03-29   |
| Availability Management   | 🟢 Complete    | Frontend Dev     | 2025-03-29   |
| Consultation Assignment   | 🟢 Complete    | Frontend Dev     | 2025-03-29   |
| Communication Interfaces  | 🟠 In Progress | Frontend Dev     | 2025-03-29   |
| Deployment                | 🟡 Planned     | Testing & Deploy | YYYY-MM-DD   |

Status: 🟢 Complete | 🟠 In Progress | 🟡 Planned | 🔴 Blocked

## Current Milestone

**MILESTONE 1: Project Foundation Complete ✅**

We have successfully completed the project initialization phase. The Project Manager has created a detailed project timeline with specific tasks, dependencies, and milestones. The UI/UX Design Agent has created a comprehensive design system with detailed component guidelines, color palette, typography, spacing system, and animation principles following Apple-like design principles. The Frontend Development Agent has set up the Next.js 15 project structure with TypeScript, Tailwind CSS configuration according to the design system specifications, and created the full folder structure with basic component placeholders.

**MILESTONE 2: Core Building Blocks Ready ✅**

We have successfully completed all Week 2 tasks as verified in the review meeting on 2025-03-22.

**MILESTONE 3: Key Pages Implementation Status ✅**

We have successfully completed all Week 3 tasks.

**MILESTONE 4: Core Functionality Implementation Progress 🟠**

We have made significant progress on Week 4 tasks:

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

3. Task 4.3: Communication Interfaces (Frontend Development Agent) 🟠
   - In Progress (Due by End of Day 20)
   - Basic chat interface for text communication implemented
   - Still need to implement video, audio, and asynchronous communication interfaces
   - Components in the UI/communication directory need to be connected to the consultation workflows

## Weekly Review Schedule

- **Week 1 Review:** Completed on Day 5 - MILESTONE 1 achieved ✅
- **Week 2 Review:** Completed on Day 10 - MILESTONE 2 achieved ✅
- **Week 3 Review:** Completed on Day 15 - MILESTONE 3 achieved ✅
- **Week 4 Review:** Scheduled for Day 20 - MILESTONE 4 in progress 🟠
- **Final Review:** Scheduled for Day 25

## Next Steps

The immediate focus is on completing Task 4.3 (Communication Interfaces):

1. Implement video call interface for consultations
2. Create audio call interface with appropriate controls
3. Develop asynchronous messaging interface
4. Connect all communication interfaces to the consultation workflow
5. Test all communication interfaces with mock data

After completing the communication interfaces, the focus will shift to:

1. Prepare for deployment to Vercel
2. Implement feedback collection mechanism
3. Conduct comprehensive testing across devices and browsers
4. Create documentation for stakeholder demonstrations
5. Prepare for the final review meeting

## File Dependencies for Task 4.3

Key files needed for the communication interfaces implementation:

1. `components/ui/communication/VideoCallContainer.tsx` - For video call interface
2. `components/ui/communication/AudioCallContainer.tsx` - For audio call interface
3. `components/ui/communication/ChatContainer.tsx` - For text chat interface
4. `components/ui/communication/AsyncMessageContainer.tsx` - For asynchronous messaging
5. `components/medical-student/consultations/MedicalStudentChatContainer.tsx` - For connecting communication to consultations
6. `app/[locale]/medical-student/consultations/[id]/page.tsx` - For integrating communication interfaces into consultation detail page