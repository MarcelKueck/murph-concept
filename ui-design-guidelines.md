# UI Design Guidelines

This document outlines the design principles, color palette, typography, and component specifications for the Murph Next.js project.

## Design Philosophy

The Murph platform should follow Apple-like design principles with:

1. **Clean, Minimalist Aesthetic**: Use white space effectively with a focus on content
2. **Purposeful Animations**: Animations that enhance usability rather than being decorative
3. **Dynamic Elements**: Components that respond to user interaction and scroll position
4. **Subtle Feedback**: Visual feedback that feels natural
5. **Depth and Layering**: Creating a sense of hierarchy with subtle shadows and layering

## Color Palette

### Primary Colors

- **Primary Blue**: `#1E88E5` (used for primary buttons, links, highlights)
  - Light: `#E3F2FD`
  - Medium Light: `#BBDEFB`
  - Medium: `#64B5F6`
  - Medium Dark: `#1976D2`
  - Dark: `#0D47A1`

### Secondary Colors

- **Secondary Green**: `#43A047` (used for success states, confirmations)
  - Light: `#E8F5E9`
  - Medium Light: `#C8E6C9`
  - Medium: `#81C784`
  - Medium Dark: `#2E7D32`
  - Dark: `#1B5E20`

### Neutral Colors

- **Neutral**: (used for text, backgrounds, borders)
  - White: `#FFFFFF`
  - Light Gray: `#F5F5F5`
  - Medium Light Gray: `#E0E0E0`
  - Medium Gray: `#9E9E9E`
  - Medium Dark Gray: `#616161`
  - Dark Gray: `#212121`

### Status Colors

- **Error**: `#F44336`
- **Warning**: `#FF9800`
- **Success**: `#4CAF50`
- **Info**: `#2196F3`

## Typography

### Font Families

- **Headings**: Montserrat
- **Body**: Nunito
- **Fallback**: system-ui, sans-serif

### Font Sizes

- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)

### Line Heights

- **tight**: 1.25
- **base**: 1.5
- **relaxed**: 1.75

## Component Design

### Buttons

- **Primary**: Filled background, white text, rounded corners
- **Secondary**: Outlined with primary color, rounded corners
- **Tertiary**: Text-only with primary color
- **Sizes**: sm, md, lg, xl

### Cards

- Subtle shadow
- Rounded corners (8px)
- White background
- Optional hover state with slight scale
- Consistent padding (16px or 24px)

### Inputs

- Clear focus states
- Subtle borders (1px)
- Error state with red border and message
- Consistent height (40px or 48px)

### Navigation

- Clean, minimal header
- Clear active states
- Smooth transitions between pages
- Mobile-friendly menu with animation

## Animation Guidelines

### Scroll-Based Animations

- Elements fade in as they enter viewport
- Slight parallax effect for background elements
- Content reveals on scroll with staggered timing
- Cards scale slightly on viewport entry

### Microinteractions

- Buttons scale slightly on hover (1.05)
- Form fields highlight with subtle animation
- Success/error states with smooth transitions
- Loading states with subtle animations

### Page Transitions

- Fade transitions between pages
- Content staggering on page load
- Smooth exit animations

## Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

- Stack elements vertically on mobile
- Consider touch targets (min 44px)
- Adjust typography size on smaller screens

## Key UI Components to Implement

1. **Button System**
   - Primary, Secondary, Tertiary variants
   - Size variations (sm, md, lg, xl)
   - States: Default, Hover, Active, Disabled

2. **Card Components**
   - Consultation Card
   - Document Card
   - Profile Card
   - Info Card

3. **Form Elements**
   - Text Input
   - Select Dropdown
   - Textarea
   - Radio Button
   - Checkbox
   - Date Picker

4. **Navigation Components**
   - Header with Language Switcher
   - Sidebar Navigation (Desktop)
   - Bottom Navigation (Mobile)
   - Breadcrumbs

5. **Status Indicators**
   - Badges (Success, Warning, Error, Info)
   - Progress Indicators
   - Loading States

6. **Communication Interface Elements**
   - Chat Bubble
   - Message Input
   - Video Call Container
   - Audio Controls
   - Document Viewer

7. **Layout Components**
   - Page Container
   - Grid Layout
   - Split View
   - Modal/Dialog
   - Drawer
