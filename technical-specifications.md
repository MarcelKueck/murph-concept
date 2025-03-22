# Technical Specifications

This document outlines the technical architecture, stack, and implementation guidelines for the Murph Next.js project.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19 with Server and Client Components
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for UI animations, GSAP for complex animations
- **State Management**: React Context API + Zustand for client-side state
- **Internationalization**: next-intl for multilingual support (German/English)
- **Media Components**: Next.js Image and Video components for optimized media
- **Mock Data**: Hardcoded JSON files for demonstration purposes

## Project Structure

```
murph-website/
│
├── app/                          # Next.js App Router (routing structure)
│   ├── [locale]/                 # Locale-based routing
│   │   ├── layout.tsx            # Root layout component
│   │   ├── page.tsx              # Homepage component
│   │   │
│   │   ├── auth/                 # Authentication routes (mock)
│   │   ├── patient/              # Patient-specific routes
│   │   ├── medical-student/      # Medical student routes
│   │   ├── chat/                 # Chat interface (mock)
│   │   ├── video-call/           # Video call interface (mock)
│   │   └── about/                # Informational pages
│
├── components/                   # React components
│   ├── ui/                       # UI components
│   ├── core/                     # Core application components
│   ├── animations/               # Animation components
│   ├── patient/                  # Patient-specific components
│   └── medical-student/          # Medical student components
│
├── lib/                          # Utility functions and shared code
├── hooks/                        # Custom React hooks
├── providers/                    # React context providers
├── styles/                       # Global styles
├── public/                       # Static assets
├── messages/                     # Internationalization files
│   ├── en.json                   # English translations
│   └── de.json                   # German translations
├── middleware.ts                 # Internationalization middleware
└── mock-data/                    # Mock data JSON files
```

## Implementation Guidelines

### Next.js Setup

- Use the latest Next.js 15 with App Router
- Configure the project for TypeScript
- Set up internationalization with next-intl
- Create a clean folder structure following the pattern above

### Component Development

- Use a combination of Server and Client Components appropriately
- Implement components with TypeScript interfaces
- Create reusable UI components in the `components/ui` directory
- Use Tailwind CSS for styling with custom theme extension

### Styling Approach

- Use Tailwind CSS for all styling
- Extend Tailwind with custom colors and typography
- Create consistent spacing and sizing scales
- Use CSS variables for theme values when needed
- Avoid inline styles except for dynamic values

### Animation Implementation

- Use Framer Motion for component animations
- Use GSAP for more complex scroll-based animations
- Implement animation variants for different states
- Ensure animations are subtle and purposeful
- Consider reduced motion preferences

### Internationalization

- Implement language switching (German/English)
- Extract all text into message files
- Use proper pluralization and formatting
- Handle RTL/LTR layout changes if needed

#### Internationalization Implementation Details

1. **Locale-Based Routing**
   - Use dynamic route segments with the `[locale]` parameter
   - Support German (primary) and English (secondary) languages
   - Default to German if no locale is specified

2. **Message Structure**
   - Organize messages by features and pages with nested objects
   - Include all UI text, labels, and content in message files
   - Support pluralization and variables where needed

3. **Formatting**
   - Format dates according to locale conventions:
     - German: DD.MM.YYYY (24.12.2023)
     - English: MM/DD/YYYY (12/24/2023)
   - Format numbers according to locale conventions:
     - German: 1.234,56
     - English: 1,234.56
   - Format currencies with appropriate symbols:
     - German: 42,50 €
     - English: $42.50

4. **Language Switching**
   - Provide a UI component for switching between languages
   - Persist language preference in a cookie
   - Support Accept-Language header for initial language detection

5. **Implementation Components**
   - `IntlProvider.tsx`: React context provider for internationalization
   - `middleware.ts`: Next.js middleware for locale-based routing
   - `i18n-formatters.ts`: Utility functions for formatting dates and numbers
   - `LanguageSwitcher.tsx`: UI component for changing the language

### Mock Data Structure

- Create realistic JSON files for mock data
- Place mock data in the `mock-data` directory
- Create sufficient variation for demonstration purposes

Structure the mock data according to these simplified models:

```typescript
// User (Patient or Medical Student)
interface User {
  id: string;
  name: string;
  email: string;
  role: 'PATIENT' | 'MEDICAL_STUDENT';
  image?: string;
  
  // Patient specific fields
  dateOfBirth?: string;
  gender?: string;
  
  // Medical student specific fields
  university?: string;
  studyYear?: number;
  specialization?: string;
}

// Consultation
interface Consultation {
  id: string;
  type: 'labResult' | 'medication' | 'imaging' | 'symptoms' | 'general';
  primaryConcern: string;
  description: string;
  status: 'REQUESTED' | 'ASSIGNED' | 'SCHEDULED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  communicationChannel: 'video' | 'audio' | 'text' | 'async';
  scheduledFor?: string;
  completedAt?: string;
  rating?: number;
  feedback?: string;
  createdAt: string;
  
  // Relationships
  patientId: string;
  medicalStudentId?: string;
  documents?: string[]; // Document IDs
}

// Document
interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  userId: string;
}

// Message
interface Message {
  id: string;
  content: string;
  sentAt: string;
  isFromPatient: boolean;
  consultationId: string;
}
```

### Performance Considerations

- Optimize images with Next.js Image component
- Implement proper component splitting
- Use dynamic imports for larger components
- Implement loading states for better UX