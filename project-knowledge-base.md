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
| Authentication            | 🟠 In Progress | Frontend Dev     | YYYY-MM-DD   |
| Patient Dashboard         | 🟡 Planned     | Frontend Dev     | YYYY-MM-DD   |
| Consultation Flow         | 🟡 Planned     | Frontend Dev     | YYYY-MM-DD   |
| Medical Student Dashboard | 🟡 Planned     | Frontend Dev     | YYYY-MM-DD   |
| Communication Interfaces  | 🟡 Planned     | Frontend Dev     | YYYY-MM-DD   |
| Deployment                | 🟡 Planned     | Testing & Deploy | YYYY-MM-DD   |

Status: 🟢 Complete | 🟠 In Progress | 🟡 Planned | 🔴 Blocked

## Current Milestone

**MILESTONE 1: Project Foundation Complete ✅**

We have successfully completed the project initialization phase. The Project Manager has created a detailed project timeline with specific tasks, dependencies, and milestones. The UI/UX Design Agent has created a comprehensive design system with detailed component guidelines, color palette, typography, spacing system, and animation principles following Apple-like design principles. The Frontend Development Agent has set up the Next.js 15 project structure with TypeScript, Tailwind CSS configuration according to the design system specifications, and created the full folder structure with basic component placeholders.

**MILESTONE 2: Core Building Blocks Ready ✅**

We have successfully completed all Week 2 tasks as verified in the review meeting on 2025-03-22:

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

4. Weekly Review (Project Manager) ✅ - Completed on 2025-03-22
   - Verified all Week 2 tasks meet requirements and quality standards
   - Confirmed successful integration of components and internationalization
   - Updated project status and prepared for Week 3 tasks

**MILESTONE 3: Key Pages Implementation Status 🟠**

We have made significant progress on Week 3 tasks:

1. Task 3.1: Landing Page Design (UI/UX Design Agent) ✅ - Completed on 2025-03-23
   - Designed detailed landing page layout with section-by-section specifications
   - Created visual layout guide for all major sections (hero, value props, how it works, etc.)
   - Developed animation guidelines and implementation approaches for each section
   - Provided responsive design specifications for mobile, tablet, and desktop
   - Created animation code examples using Framer Motion and GSAP
   - Added accessibility considerations for all interactive elements

2. Task 3.2: Landing Page Implementation (Frontend Development Agent) ✅ - Completed on 2025-03-24
   - Implemented responsive landing page following the section-by-section layout from the design specifications
   - Created section components for header/navigation, hero, value propositions, how it works, testimonials, statistics, communication options, final CTA, and footer
   - Implemented animation system using a combination of Framer Motion for component animations and GSAP for scroll-based animations
   - Added intersection observer to trigger animations as sections come into view
   - Implemented responsive layouts that adapt to mobile, tablet, and desktop screens
   - Added number counting animations for statistics
   - Created interactive hover effects for cards and buttons
   - Integrated with internationalization system to support both German and English languages
   - Added accessibility support including keyboard navigation and reduced motion preferences
   - Thoroughly tested on various screen sizes

3. Task 3.3: Authentication Flows (Frontend Development Agent) 🟠 - In Progress
   - Create authentication interfaces for patient and medical student login/registration
   - Due: Day 15 (Priority: Medium)
   - Dependencies: Task 2.2

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
│       ├── page.tsx              # Homepage component (landing page)
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

## Landing Page Implementation

The landing page has been successfully implemented with the following features:

1. **Responsive Design**:
   - Mobile-first approach with progressive enhancement
   - Adapts to mobile, tablet, and desktop screen sizes
   - Optimized spacing and layout for each breakpoint

2. **Animation System**:
   - Component animations using Framer Motion
   - Scroll-based animations using GSAP with ScrollTrigger
   - Staggered animations for sequential reveals
   - Micro-interactions for enhanced user experience
   - Support for reduced motion preferences

3. **Interactive Elements**:
   - Hover effects on cards and buttons
   - Testimonial carousel with navigation
   - Number counter animations for statistics
   - Step indicators for how it works section

4. **Performance Optimizations**:
   - Lazy loading for off-screen animations
   - Efficient animation properties for smooth performance
   - Debounced scroll listeners to prevent performance issues

5. **Accessibility**:
   - Keyboard navigation support
   - ARIA attributes for interactive elements
   - Focus management for modals and drawers
   - Alternative text for visual elements

## Upcoming Tasks

The following tasks need immediate attention:

1. **Authentication Flows** (Frontend Development Agent) - In Progress
   - Create simple mock interfaces for login/registration
   - Consider role-specific fields for medical students
   - Due: Day 15 (Priority: High)

2. **Week 3 Review** (Project Manager)
   - Verify all Week 3 tasks meet requirements and quality standards
   - Update project status and prepare for Week 4 tasks
   - Scheduled for Day 15 (Priority: Medium)

## Weekly Review Schedule

- **Week 1 Review:** Completed on Day 5 - MILESTONE 1 achieved ✅
- **Week 2 Review:** Completed on Day 10 - MILESTONE 2 achieved ✅
- **Week 3 Review:** Scheduled for Day 15
- **Week 4 Review:** Scheduled for Day 20
- **Final Review:** Scheduled for Day 25