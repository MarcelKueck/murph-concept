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
│   │   ├── test/                 # Component testing page
│   │   └── not-found.tsx         # Not found page
│
├── components/                   # React components
│   ├── ui/                       # UI components
│   ├── core/                     # Core application components
│   ├── animations/               # Animation components
│   ├── patient/                  # Patient-specific components
│   └── medical-student/          # Medical student components
│
├── i18n/                         # Internationalization utilities
│   ├── navigation.ts             # Navigation utilities for i18n
│   ├── request.ts                # Request utilities for i18n
│   └── routing.ts                # Routing utilities for i18n
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
├── next-intl.config.js           # next-intl configuration
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

The project uses next-intl for comprehensive internationalization support:

#### 1. Directory Structure

- **messages/**: Contains JSON files with translations for each supported language
- **i18n/**: Contains utilities for internationalization
- **middleware.ts**: Root-level middleware for locale detection and routing
- **next-intl.config.js**: Configuration for next-intl

#### 2. Locale-Based Routing

- Dynamic route segments with the `[locale]` parameter in the app directory
- Support for German (primary) and English (secondary) languages
- Middleware handling for redirecting root paths to default locale
- Configuration for locale detection from Accept-Language headers and cookies

#### 3. Implementation Pattern

```typescript
// App Router internationalization pattern
// 1. Configure middleware
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'de',
  localePrefix: 'always'
});

// 2. Create locale-aware layout
// app/[locale]/layout.tsx
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  const messages = await import(`../../messages/${locale}.json`);
  
  return (
    <html lang={locale}>
      <body>
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
      </body>
    </html>
  );
}

// 3. Use translations in components
// In component files
'use client';
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('namespace');
  
  return <h1>{t('title')}</h1>;
}
```

#### 4. Translation Organization

Translations are organized in a hierarchical structure:

```json
{
  "common": {
    "actions": {
      "submit": "Submit",
      "cancel": "Cancel"
    }
  },
  "patient": {
    "dashboard": {
      "title": "Patient Dashboard"
    }
  }
}
```

#### 5. Formatting Conventions

- Format dates according to locale conventions:
  - German: DD.MM.YYYY (24.12.2023)
  - English: MM/DD/YYYY (12/24/2023)
- Format numbers according to locale conventions:
  - German: 1.234,56
  - English: 1,234.56
- Format currencies with appropriate symbols:
  - German: 42,50 €
  - English: $42.50

#### 6. Language Switching

- Use the LanguageSwitcher component for toggling between languages
- Preserve the current path when switching languages
- Store language preference in a cookie for persistence

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