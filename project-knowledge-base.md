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
| Internationalization      | 🟢 Complete | Content & Loc    | 2025-03-22   |
| Week 2 Review             | 🟡 Planned  | Project Manager  | YYYY-MM-DD   |
| Landing Page              | 🟡 Planned  | UI/UX + Frontend | YYYY-MM-DD   |
| Authentication            | 🟡 Planned  | Frontend Dev     | YYYY-MM-DD   |
| Patient Dashboard         | 🟡 Planned  | Frontend Dev     | YYYY-MM-DD   |
| Consultation Flow         | 🟡 Planned  | Frontend Dev     | YYYY-MM-DD   |
| Medical Student Dashboard | 🟡 Planned  | Frontend Dev     | YYYY-MM-DD   |
| Communication Interfaces  | 🟡 Planned  | Frontend Dev     | YYYY-MM-DD   |
| Deployment                | 🟡 Planned  | Testing & Deploy | YYYY-MM-DD   |

Status: 🟢 Complete | 🟠 In Progress | 🟡 Planned | 🔴 Blocked

## Current Milestone

**MILESTONE 1: Project Foundation Complete ✅**

We have successfully completed the project initialization phase. The Project Manager has created a detailed project timeline with specific tasks, dependencies, and milestones. The UI/UX Design Agent has created a comprehensive design system with detailed component guidelines, color palette, typography, spacing system, and animation principles following Apple-like design principles. The Frontend Development Agent has set up the Next.js 15 project structure with TypeScript, Tailwind CSS configuration according to the design system specifications, and created the full folder structure with basic component placeholders.

**MILESTONE 2: Core Building Blocks Status 🟠**

We have made significant progress on the Week 2 tasks:
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

3. Task 2.3: Internationalization Setup (Content & Localization Agent) ✅ - Completed on 2025-03-22
   - Created comprehensive message files for both German and English with structured content organization
   - Restructured app directory to support [locale] routing with Next.js App Router
   - Implemented i18n directory with navigation, request, and routing utilities
   - Created next-intl.config.js for configuration settings
   - Implemented middleware for locale detection and routing
   - Created the IntlProvider component for application-wide translations
   - Added LanguageSwitcher component for toggling between languages
   - Implemented formatting utilities for locale-aware date and number handling

4. **Weekly Review (Project Manager)** 🟡 - Scheduled for Day 10
   - This is the final step to complete Milestone 2
   - Project Manager needs to verify all Week 2 tasks and update project status

**Note:** While all individual tasks for Week 2 are complete, the milestone is pending final review and verification by the Project Manager.

## Project Structure

The project has been successfully restructured to support locale-based routing using next-intl:

```
murph-concept/
│
├── app/                          # Next.js App Router
│   ├── globals.css               # Global CSS with Tailwind
│   ├── favicon.ico               # Site favicon
│   └── [locale]/                 # Locale-based routing
│       ├── layout.tsx            # Locale layout component
│       ├── page.tsx              # Homepage component
│       ├── not-found.tsx         # Not found page
│       ├── auth/                 # Authentication routes
│       │   ├── login/            # Login page
│       │   └── register/         # Registration page
│       ├── patient/              # Patient-specific routes
│       │   └── dashboard/        # Patient dashboard
│       ├── medical-student/      # Medical student routes
│       │   └── dashboard/        # Medical student dashboard
│       └── test/                 # Component test page
│
├── components/                   # React components
│   └── ui/                       # UI components with all subfolders and components
│
├── i18n/                         # Internationalization utilities
│   ├── navigation.ts             # Navigation utilities for i18n
│   ├── request.ts                # Request utilities for i18n  
│   └── routing.ts                # Routing utilities for i18n
│
├── messages/                     # Internationalization files
│   ├── en.json                   # English translations
│   └── de.json                   # German translations
│
├── lib/                          # Utility functions
│   └── utils/                    # Utility functions
│       ├── formatters.ts         # Data formatting utilities
│       ├── i18n-formatters.ts    # Internationalization formatters
│       └── validators.ts         # Form validation utilities
│
├── middleware.ts                 # Internationalization middleware (root level)
├── next-intl.config.js           # Configuration file for next-intl
│
├── providers/                    # React context providers
│   ├── AuthProvider.tsx          # Authentication context
│   ├── IntlProvider.tsx          # Internationalization provider
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
```

## Internationalization Implementation

The internationalization implementation uses next-intl with the following features:

1. **Locale-Based Routing**:
   - Dynamic route segments with the `[locale]` parameter in the app directory
   - German (primary) and English (secondary) language support
   - Default locale set to German
   - Middleware for locale detection and routing

2. **Translation Organization**:
   - Structured JSON files for messages in each language
   - Organized by features and pages for maintainability
   - Support for variables, formatting, and pluralization
   - Direct access through useTranslations hook

3. **API Structure**:
   - Navigation utilities for locale-aware linking
   - Request utilities for server-side locale handling
   - Routing utilities for path generation
   - Middleware for automatic locale detection and redirection

4. **User Interface**:
   - Language switcher component for toggling between languages
   - Locale-aware formatting for dates, numbers, and currencies
   - Consistent text across the application in both languages

## Upcoming Tasks

After the Project Manager completes the Week 2 review, the next tasks will be:

1. **Landing Page Design** (UI/UX Design Agent)
   - Design detailed landing page layout and animations
   - Due: Day 12 (Priority: High)

2. **Landing Page Implementation** (Frontend Development Agent)
   - Develop responsive landing page with animations
   - Due: Day 14 (Priority: High)

3. **Authentication Flows** (Frontend Development Agent)
   - Create simple mock authentication interfaces for patient and medical student login/registration
   - Due: Day 15 (Priority: Medium)

## Weekly Review Schedule

- **Week 1 Review:** Completed on Day 5 - MILESTONE 1 achieved ✅
- **Week 2 Review:** Scheduled for Day 10 - Weekly review pending, individual tasks complete
- **Week 3 Review:** Scheduled for Day 15
- **Week 4 Review:** Scheduled for Day 20
- **Final Review:** Scheduled for Day 25