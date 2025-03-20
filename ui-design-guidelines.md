# UI Design Guidelines

This document outlines the comprehensive design system for the Murph Next.js project, including design principles, color palette, typography, spacing, components, and animation guidelines.

## Design Philosophy

The Murph platform follows Apple-like design principles with:

1. **Clarity**: Clean interfaces with a focus on essential content and functionality
   - Generous white space to let content breathe
   - Strong visual hierarchy to guide users' attention
   - Crisp, legible typography even at small sizes

2. **Deference**: UI that helps users understand and interact with content
   - Content-focused design that minimizes UI chrome
   - Subtle visual cues that enhance usability without distraction
   - Interfaces that feel intuitive and familiar

3. **Depth**: Visual layers and subtle motion to convey hierarchy
   - Purposeful use of shadows and layering to create depth
   - Motion that provides context and enhances understanding
   - Dimensionality that gives users a sense of place

4. **Direct Manipulation**: Design that encourages intuitive interaction
   - Interfaces that respond immediately to user input
   - Feedback that validates user actions
   - Gestures and interactions that feel natural

## Color System

### Primary Colors

- **Primary Blue**: `#1E88E5` (used for primary buttons, links, highlights)
  - 50: `#E3F2FD` (backgrounds, hover states)
  - 100: `#BBDEFB` (borders, dividers)
  - 200: `#90CAF9` (secondary buttons, highlights)
  - 300: `#64B5F6` (secondary accents)
  - 400: `#42A5F5` (lighter accents)
  - 500: `#1E88E5` (primary accent color)
  - 600: `#1976D2` (hover states)
  - 700: `#1565C0` (active states)
  - 800: `#0D47A1` (focus rings)
  - 900: `#0D3C84` (dark accents)

### Secondary Colors

- **Secondary Green**: `#43A047` (used for success states, confirmations)
  - 50: `#E8F5E9` (success backgrounds)
  - 100: `#C8E6C9` (success borders)
  - 200: `#A5D6A7` (light success elements)
  - 300: `#81C784` (secondary success elements)
  - 400: `#66BB6A` (lighter success accents)
  - 500: `#43A047` (primary success color)
  - 600: `#2E7D32` (hover success states)
  - 700: `#1B5E20` (active success states)
  - 800: `#145214` (dark success accents)
  - 900: `#0D3F0D` (very dark success accents)

### Neutral Colors

- **Neutral**: (used for text, backgrounds, borders)
  - White: `#FFFFFF` (backgrounds, cards)
  - 50: `#FAFAFA` (background variant)
  - 100: `#F5F5F5` (subtle backgrounds, alternate rows)
  - 200: `#EEEEEE` (borders, dividers)
  - 300: `#E0E0E0` (disabled backgrounds)
  - 400: `#BDBDBD` (disabled text, icons)
  - 500: `#9E9E9E` (placeholder text)
  - 600: `#757575` (secondary text)
  - 700: `#616161` (tertiary text)
  - 800: `#424242` (primary text)
  - 900: `#212121` (headings, important text)

### Status Colors

- **Error**: (for error states, validation)
  - Light: `#FFEBEE` (error backgrounds)
  - Medium: `#EF5350` (error borders, icons)
  - Default: `#F44336` (primary error color)
  - Dark: `#C62828` (text on error)

- **Warning**: (for warning states, cautionary notices)
  - Light: `#FFF8E1` (warning backgrounds)
  - Medium: `#FFB74D` (warning borders, icons)
  - Default: `#FF9800` (primary warning color)
  - Dark: `#EF6C00` (text on warning)

- **Success**: (for success states, positive confirmations)
  - Light: `#E8F5E9` (success backgrounds)
  - Medium: `#66BB6A` (success borders, icons)
  - Default: `#4CAF50` (primary success color)
  - Dark: `#2E7D32` (text on success)

- **Info**: (for informational states, notices)
  - Light: `#E1F5FE` (info backgrounds)
  - Medium: `#4FC3F7` (info borders, icons)
  - Default: `#2196F3` (primary info color)
  - Dark: `#0277BD` (text on info)

### Color Usage Guidelines

1. **Text Accessibility**
   - Maintain a minimum contrast ratio of 4.5:1 for normal text
   - Maintain a minimum contrast ratio of 3:1 for large text
   - Primary content should use Neutral-800 or Neutral-900 on light backgrounds
   - Secondary content can use Neutral-600 or Neutral-700

2. **Color Combinations**
   - Use complementary colors sparingly
   - Avoid placing blue and green adjacent to each other
   - Use color to create hierarchy and guide attention
   - Don't rely on color alone to convey meaning

3. **Dark Mode Considerations**
   - Invert the brightness of colors in dark mode
   - Reduce saturation slightly in dark mode
   - Maintain the same hue to preserve brand identity

## Typography

### Font Families

- **Headings**: Montserrat (with system-ui, sans-serif fallbacks)
- **Body**: Nunito (with system-ui, sans-serif fallbacks)

### Type Scale

- **xs**: 0.75rem (12px)
  - Line height: 1rem (16px)
  - Use for: Small captions, labels, fine print

- **sm**: 0.875rem (14px)
  - Line height: 1.25rem (20px)
  - Use for: Secondary text, table content, input text

- **base**: 1rem (16px)
  - Line height: 1.5rem (24px)
  - Use for: Primary body text, paragraphs, list items

- **lg**: 1.125rem (18px)
  - Line height: 1.75rem (28px)
  - Use for: Lead paragraphs, important content

- **xl**: 1.25rem (20px)
  - Line height: 1.75rem (28px)
  - Use for: Subheadings, section titles

- **2xl**: 1.5rem (24px)
  - Line height: 2rem (32px)
  - Use for: Page headers, modal titles

- **3xl**: 1.875rem (30px)
  - Line height: 2.25rem (36px)
  - Use for: Major section headers

- **4xl**: 2.25rem (36px)
  - Line height: 2.5rem (40px)
  - Use for: Hero headings, large titles

- **5xl**: 3rem (48px)
  - Line height: 3rem (48px)
  - Use for: Hero titles, landing page headlines

### Font Weights

- **Light**: 300 (use sparingly, only for large headings)
- **Regular**: 400 (default for body text)
- **Medium**: 500 (emphasis, subheadings)
- **SemiBold**: 600 (headings, important UI elements)
- **Bold**: 700 (strong emphasis, primary headings)

### Typography Usage

1. **Headings**
   - Use Montserrat for all headings (h1-h6)
   - Apply font weight 600 (SemiBold) for headings
   - Use proper hierarchy with decreasing sizes
   - Maintain appropriate spacing between headings and content

2. **Body Text**
   - Use Nunito for all body text
   - Default to font weight 400 (Regular)
   - Use font weight 600 (SemiBold) for emphasis
   - Maintain line lengths between 60-80 characters for optimal readability

3. **Special Text Elements**
   - **Links**: Use Primary Blue-500 with underline on hover
   - **Emphasis**: Use Medium (500) weight rather than italics
   - **Strong Emphasis**: Use SemiBold (600) weight
   - **Lists**: Maintain consistent spacing between items (0.5rem)

4. **Localization Considerations**
   - Allow for text expansion in German (approximately 20% longer than English)
   - Ensure line heights accommodate diacritical marks
   - Test layouts with both languages to prevent overflow

## Spacing System

A consistent spacing scale helps maintain visual harmony throughout the interface.

### Spacing Scale

- **0**: 0px
- **px**: 1px
- **0.5**: 0.125rem (2px)
- **1**: 0.25rem (4px)
- **1.5**: 0.375rem (6px)
- **2**: 0.5rem (8px)
- **2.5**: 0.625rem (10px)
- **3**: 0.75rem (12px)
- **3.5**: 0.875rem (14px)
- **4**: 1rem (16px)
- **5**: 1.25rem (20px)
- **6**: 1.5rem (24px)
- **7**: 1.75rem (28px)
- **8**: 2rem (32px)
- **9**: 2.25rem (36px)
- **10**: 2.5rem (40px)
- **11**: 2.75rem (44px)
- **12**: 3rem (48px)
- **14**: 3.5rem (56px)
- **16**: 4rem (64px)
- **20**: 5rem (80px)
- **24**: 6rem (96px)
- **28**: 7rem (112px)
- **32**: 8rem (128px)
- **36**: 9rem (144px)
- **40**: 10rem (160px)
- **44**: 11rem (176px)
- **48**: 12rem (192px)
- **52**: 13rem (208px)
- **56**: 14rem (224px)
- **60**: 15rem (240px)
- **64**: 16rem (256px)
- **72**: 18rem (288px)
- **80**: 20rem (320px)
- **96**: 24rem (384px)

### Spacing Usage Guidelines

1. **Component Internal Spacing**
   - Buttons: padding-x of 4 (1rem), padding-y of 2 (0.5rem)
   - Cards: padding of 6 (1.5rem)
   - Form fields: padding-x of 3 (0.75rem), padding-y of 2 (0.5rem)
   - Modals: padding of 6 (1.5rem)

2. **Layout Spacing**
   - Section spacing: margin-y of 16 (4rem)
   - Content group spacing: margin-y of 8 (2rem)
   - Related item spacing: margin-y of 4 (1rem)
   - List item spacing: margin-y of 2 (0.5rem)

3. **Responsive Spacing**
   - Reduce horizontal spacing on mobile (e.g., card padding from 6 to 4)
   - Maintain vertical spacing for readability
   - Use percentage-based spacing for flexible layouts

## Layout System

### Grid System

- **Container**: Max width of 1280px with auto margins
- **Column System**: 12-column grid
- **Gutters**: 2rem (32px) between columns
- **Margins**: 2rem (32px) on large screens, 1rem (16px) on mobile

### Breakpoints

- **sm**: 640px (small devices)
- **md**: 768px (medium devices)
- **lg**: 1024px (large devices)
- **xl**: 1280px (extra large devices)
- **2xl**: 1536px (extra extra large devices)

### Layout Patterns

1. **Single Column Layout**
   - Used for: Mobile views, focused content pages
   - Content width: 100% up to max-width

2. **Two Column Layout**
   - Used for: Patient/medical student dashboards
   - Left column: Navigation, filters (25-33%)
   - Right column: Primary content (67-75%)

3. **Three Column Layout**
   - Used for: Advanced dashboards, communication interfaces
   - Left column: Navigation (20%)
   - Middle column: List/primary content (50%)
   - Right column: Details/secondary content (30%)

4. **Grid Layout**
   - Used for: Card collections, gallery views
   - Responsive: 1 column (mobile), 2 columns (tablet), 3-4 columns (desktop)

## Component Design

### Buttons

1. **Primary Button**
   - Background: Primary Blue-500
   - Text: White
   - Hover: Primary Blue-600
   - Active: Primary Blue-700
   - Focus: 3px ring of Primary Blue-200
   - Disabled: Neutral-300 background, Neutral-500 text
   - Sizes:
     - Small: text-sm, py-1.5, px-3, rounded
     - Medium (default): text-base, py-2, px-4, rounded
     - Large: text-lg, py-2.5, px-5, rounded-md

2. **Secondary Button**
   - Background: White
   - Border: 1px solid Primary Blue-500
   - Text: Primary Blue-500
   - Hover: Primary Blue-50 background
   - Active: Primary Blue-100 background
   - Focus: 3px ring of Primary Blue-200
   - Disabled: Neutral-200 border, Neutral-500 text
   - Sizes: Same as Primary Button

3. **Tertiary Button**
   - Background: Transparent
   - Text: Primary Blue-500
   - Hover: Primary Blue-50 background
   - Active: Primary Blue-100 background
   - Focus: 3px ring of Primary Blue-200
   - Disabled: Neutral-400 text
   - Sizes: Same as Primary Button

4. **Icon Button**
   - Background: Transparent
   - Icon: Primary Blue-500 or Neutral-600
   - Hover: Primary Blue-50 or Neutral-100 background
   - Active: Primary Blue-100 or Neutral-200 background
   - Focus: 3px ring of Primary Blue-200 or Neutral-300
   - Sizes: 
     - Small: p-1.5, rounded
     - Medium: p-2, rounded
     - Large: p-2.5, rounded-md

5. **Button with Icon**
   - Follow primary/secondary/tertiary styles
   - Icon size: Same height as text
   - Icon spacing: mr-2 (when icon is on left), ml-2 (when icon is on right)
   - Icon alignment: Center-aligned with text

### Cards

1. **Standard Card**
   - Background: White
   - Border: None
   - Shadow: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`
   - Border Radius: rounded-lg (0.5rem)
   - Padding: p-6
   - Hover: Optional subtle transform scale(1.01) with smoother shadow
   - Internal Layout:
     - Header: pb-4, optional border-b
     - Content: py-4
     - Footer: pt-4, optional border-t

2. **Consultation Card**
   - Extend Standard Card
   - Left Border: 4px solid (color depends on status)
   - Status Indicator: Small badge showing status
   - Format: Type, date, status, and primary concern at a glance
   - Action: Entire card is clickable to view details

3. **Document Card**
   - Extend Standard Card
   - Icon: Document type indicator
   - Format: Name, type, upload date
   - Preview: Small thumbnail if applicable
   - Action: Download button and/or click to view

4. **Profile Card**
   - Extend Standard Card
   - Avatar: User image (with placeholder)
   - Content: Name, role, key information
   - Actions: Contact or view profile

### Form Elements

1. **Text Input**
   - Height: 10 (2.5rem)
   - Background: White
   - Border: 1px solid Neutral-300
   - Border Radius: rounded (0.25rem)
   - Text: Neutral-900
   - Placeholder: Neutral-500
   - Padding: px-3 py-2
   - Focus: Ring-2 ring-primary-200, border-primary-500
   - Disabled: bg-neutral-100, text-neutral-400
   - Error: border-error, focus:ring-error-200
   - Helper Text: text-sm text-neutral-600 (error: text-error)
   - Label: text-sm font-medium text-neutral-700, mb-1

2. **Select Dropdown**
   - Same base styling as Text Input
   - Dropdown Icon: Chevron down, text-neutral-400
   - Options: py-1.5 px-3, hover:bg-neutral-100
   - Selected: text-primary-700, bg-primary-50

3. **Checkbox**
   - Size: 4 (1rem)
   - Border: 1px solid Neutral-300
   - Border Radius: rounded (0.25rem)
   - Checked: bg-primary-500, border-primary-500
   - Focus: Ring-2 ring-primary-200
   - Disabled: bg-neutral-100, text-neutral-400
   - Label: inline-block text-neutral-700, ml-2

4. **Radio Button**
   - Size: 4 (1rem)
   - Border: 1px solid Neutral-300
   - Border Radius: rounded-full
   - Checked: bg-primary-500, border-primary-500
   - Focus: Ring-2 ring-primary-200
   - Disabled: bg-neutral-100, text-neutral-400
   - Label: inline-block text-neutral-700, ml-2

5. **Textarea**
   - Similar to Text Input
   - Min Height: 20 (5rem)
   - Resize: vertical
   - Line Height: 1.5

6. **Form Group**
   - Spacing between groups: mb-4
   - Label Position: Above input
   - Helper/Error Text: Below input
   - Required Indicator: text-error-500 after label

7. **Date Picker**
   - Input: Same as Text Input
   - Calendar: bg-white, rounded-md, shadow-md
   - Date Cells: w-8 h-8, rounded-full, hover:bg-primary-50
   - Selected Date: bg-primary-500, text-white
   - Today: border border-primary-500
   - Navigation: text-neutral-600, hover:text-primary-500

### Navigation Components

1. **Header Navigation**
   - Height: 16 (4rem)
   - Background: White
   - Border Bottom: 1px solid Neutral-200
   - Logo: Left-aligned
   - Main Navigation: Center
   - User Menu: Right-aligned
   - Mobile: Hamburger menu, right-aligned
   - Shadow: Subtle on scroll

2. **Sidebar Navigation**
   - Width: 64 (16rem)
   - Background: White
   - Border Right: 1px solid Neutral-200
   - Section Headers: text-xs uppercase text-neutral-500
   - Items: py-2 px-3, rounded-md
   - Active Item: bg-primary-50 text-primary-700
   - Hover: bg-neutral-50
   - Icon + Text: icon mr-3 inline-flex
   - Collapsed State: Width 16 (4rem), only icons

3. **Tab Navigation**
   - Border Bottom: 1px solid Neutral-200
   - Tabs: px-4 py-2 inline-block
   - Active Tab: border-b-2 border-primary-500 text-primary-700
   - Hover: text-primary-600
   - Disabled: text-neutral-400

4. **Bottom Navigation (Mobile)**
   - Height: 16 (4rem)
   - Background: White
   - Border Top: 1px solid Neutral-200
   - Items: Equal width, centered icons with small text
   - Active Item: text-primary-500
   - Items: Home, Search, Consultations, Profile

5. **Breadcrumbs**
   - Text: text-sm text-neutral-600
   - Separator: text-neutral-400, mx-2
   - Current Page: text-neutral-900
   - Hover: text-primary-600
   - Max Display: 3-4 items, truncate with ellipsis for longer paths

### Status Indicators

1. **Badges**
   - Font Size: text-xs
   - Padding: px-2 py-0.5
   - Border Radius: rounded-full
   - Variants:
     - Default: bg-neutral-100 text-neutral-800
     - Success: bg-green-100 text-green-800
     - Warning: bg-yellow-100 text-yellow-800
     - Error: bg-red-100 text-red-800
     - Info: bg-blue-100 text-blue-800

2. **Status Pill**
   - Same as Badges but with dot indicator:
     - REQUESTED: bg-neutral-100, gray dot
     - ASSIGNED: bg-blue-100, blue dot
     - SCHEDULED: bg-purple-100, purple dot
     - IN_PROGRESS: bg-yellow-100, yellow dot
     - RESOLVED: bg-green-100, green dot
     - CLOSED: bg-neutral-100, gray dot

3. **Progress Indicators**
   - **Linear Progress Bar**
     - Height: 1.5 (0.375rem)
     - Background: Neutral-200
     - Fill: Primary Blue-500
     - Border Radius: rounded-full
     - Animation: Smooth transition on change
   
   - **Circular Progress**
     - Stroke Width: 3px
     - Track Color: Neutral-200
     - Fill Color: Primary Blue-500
     - Animation: Smooth rotation/fill
     - Sizes: 6, 8, 12 (1.5rem, 2rem, 3rem)

4. **Loading States**
   - **Spinner**
     - Color: Primary Blue-500
     - Sizes: 4, 6, 8 (1rem, 1.5rem, 2rem)
     - Animation: Continuous rotation
   
   - **Skeleton Loader**
     - Background: Neutral-200
     - Border Radius: rounded
     - Animation: Pulse effect
     - Variants: Text lines, cards, avatars

### Communication Interface Elements

1. **Chat Bubble**
   - **User Message (Patient)**
     - Background: Primary Blue-50
     - Border Radius: rounded-lg rounded-br-none
     - Alignment: Right
     - Max Width: 75%
     - Padding: p-3
     - Timestamp: text-xs text-neutral-500, below bubble
   
   - **Other Message (Medical Student)**
     - Background: Neutral-100
     - Border Radius: rounded-lg rounded-bl-none
     - Alignment: Left
     - Avatar: Left of first message in sequence
     - Max Width: 75%
     - Padding: p-3
     - Timestamp: text-xs text-neutral-500, below bubble

2. **Message Input**
   - Background: White
   - Border: 1px solid Neutral-300
   - Border Radius: rounded-full
   - Padding: pl-4 pr-12 py-2
   - Send Button: Absolute right, text-primary-500
   - Attachment Button: Before send button, text-neutral-500
   - Placeholder: "Type your message..."

3. **Video Call Container**
   - Primary Video: Full container size, rounded-lg
   - Self Video: Bottom right, w-1/4, rounded-lg, draggable
   - Controls: Centered bottom, p-2, bg-black/50 backdrop-blur-sm, rounded-full
   - Control Buttons: mx-1, hover:bg-white/20, rounded-full
   - Status Indicators: Top right, rounded-full, px-2 py-0.5

4. **Audio Call Interface**
   - Avatar: Large centered, with pulsing animation
   - Name: text-xl below avatar
   - Duration: text-neutral-500 below name
   - Controls: Same as video call controls, centered bottom

5. **Document Viewer**
   - Toolbar: Top, bg-white, shadow-sm, p-2
   - Page Navigation: Bottom, centered
   - Zoom Controls: Bottom right
   - Document Container: bg-neutral-100, h-full
   - Document Page: bg-white, shadow-sm, mx-auto

### Layout Components

1. **Page Container**
   - Max Width: 7xl (80rem)
   - Padding: px-4 sm:px-6 lg:px-8
   - Margin: mx-auto
   - Content Structure: 
     - Page Header: mb-6
     - Content Sections: mb-8
     - Page Footer: mt-12

2. **Grid Layout**
   - Using CSS Grid (grid)
   - Columns: 
     - Mobile: grid-cols-1
     - Tablet: grid-cols-2
     - Desktop: grid-cols-3
     - Wide Desktop: grid-cols-4
   - Gap: gap-6
   - Items: min-height defined for consistency

3. **Split View**
   - Using CSS Grid or Flexbox
   - Left Panel: 1/3 width
   - Right Panel: 2/3 width
   - Mobile: Stack vertically
   - Divider: Border or subtle shadow

4. **Modal/Dialog**
   - Overlay: bg-black/25 backdrop-blur-sm
   - Container: bg-white rounded-xl max-w-md w-full mx-auto
   - Header: px-6 py-4 border-b
   - Content: p-6
   - Footer: px-6 py-4 border-t flex justify-end
   - Animation: Scale and fade
   - Close Button: Top right, text-neutral-400
   - Focus Management: Focus trap inside modal

5. **Drawer**
   - Position: Right or left side
   - Width: 
     - Mobile: 80% of screen
     - Desktop: 400px
   - Background: White
   - Shadow: Large shadow on opposite side
   - Animation: Slide in from edge
   - Close: Swipe, X button, or click outside
   - Content Structure: Same as Modal

## Iconography

### Icon Style

1. **Line Style**
   - 2px stroke weight
   - Rounded caps and joins
   - Minimal use of fills
   - Consistent corner radius (2px)
   - Optimized for 24x24px grid

2. **Icon Sizing**
   - Small: 16x16px (for dense UIs)
   - Medium: 20x20px or 24x24px (standard)
   - Large: 32x32px (for emphasis)

3. **Icon Alignment**
   - Center-align with text vertically
   - Ensure proper optical alignment

### Icon Usage

1. **Navigation Icons**
   - Simple, clear silhouettes
   - Consistent style across all navigation areas
   - Active state: filled version or highlight color

2. **Action Icons**
   - Communicate clear actions
   - Combine with text for important actions
   - Can be used alone for common actions (edit, delete, etc.)

3. **Status Icons**
   - Clearly communicate status at a glance
   - Use consistent colors that match status colors
   - Keep shape distinct for accessibility

4. **Medical Icons**
   - Simple representations of medical concepts
   - Avoid overly clinical or potentially alarming imagery
   - Focus on clarity and reassurance

## Animation & Motion

### Animation Principles

1. **Purposeful**: Animations should have a clear purpose
   - Guide attention
   - Show relationships
   - Provide feedback
   - Maintain context

2. **Subtle**: Animations should enhance, not distract
   - Quick durations (150-300ms)
   - Natural easing functions
   - Avoid bouncy animations for medical context

3. **Consistent**: Similar elements should animate similarly
   - Use a consistent animation library (Framer Motion)
   - Reuse animation presets

### Animations by Context

1. **Page Transitions**
   - Subtle fade for content
   - Maintain header/navigation during transitions
   - Content slides in from direction of navigation
   - Duration: 200-300ms
   - Easing: Ease-out

2. **Component Animations**
   - **Buttons**: Subtle scale on hover (1.02), quicker on press
   - **Cards**: Subtle lift on hover (y: -2px, shadow increase)
   - **Modals**: Fade in with slight scale up (0.95 to 1)
   - **Drawers**: Slide in from edge
   - **Alerts**: Slide in from top, fade out

3. **Loading & Progress Animations**
   - Spinner: Continuous rotation
   - Linear progress: Smooth width transitions
   - Skeleton screens: Subtle pulse animation
   - Content placeholder: Wave animation

4. **Scroll-Based Animations**
   - Subtle fade and slide up for content as it enters viewport
   - Parallax effect for background elements (subtle, 0.1-0.2 factor)
   - Sticky headers with smooth shadow on scroll
   - Animation timing: Stagger children elements (50ms delay between items)

5. **Microinteractions**
   - Form field focus: Smooth border/ring transition
   - Toggle switches: Smooth knob and background transitions
   - Dropdown menus: Fade and slight scale
   - Error/success states: Smooth transitions
   - Notifications: Attention-grabbing while still subtle

### Animation Technical Details

1. **Timing Functions**
   - Default: cubic-bezier(0.2, 0, 0.2, 1) (standard ease-out)
   - Enter: cubic-bezier(0, 0, 0.2, 1) (decelerate)
   - Exit: cubic-bezier(0.4, 0, 1, 1) (accelerate)
   - Emphasized: cubic-bezier(0.2, 0, 0, 1) (strong deceleration)

2. **Durations**
   - Extra Small: 100ms (immediate feedback)
   - Small: 150ms (micro-interactions)
   - Medium: 200ms (standard transitions)
   - Large: 300ms (significant UI changes)
   - Extra Large: 500ms (major view changes)

3. **Implementation Notes**
   - Use CSS transitions for simple state changes
   - Use Framer Motion for complex animations
   - Use GSAP for scroll-based and complex choreographed animations
   - Always consider reduced motion preferences

## Responsive Design

### Responsive Approach

1. **Mobile-First Development**
   - Start with mobile layouts
   - Progressively enhance for larger screens
   - Use min-width breakpoints

2. **Responsive Patterns**
   - Stack elements vertically on mobile
   - Side-by-side on larger screens
   - Hide secondary content on small screens
   - Offer simplified versions of complex components

3. **Touch Considerations**
   - Minimum tap target size: 44px × 44px
   - Adequate spacing between interactive elements
   - Consider thumb zones on mobile

### Breakpoint Usage

- **Default (Mobile)**: <640px
  - Single column layouts
  - Full-width components
  - Simplified navigation
  - Larger touch targets
  - Hidden secondary content

- **sm**: 640px+
  - Two column grids
  - Expanded spacing
  - Begin showing some secondary content

- **md**: 768px+
  - Multi-column layouts
  - Side navigation options
  - Larger type scale for headings

- **lg**: 1024px+
  - Full desktop experience
  - Side panels and split views
  - Show all secondary content
  - More refined spacing

- **xl**: 1280px+
  - Optimized for large displays
  - More content density where appropriate
  - Larger imagery and media

- **2xl**: 1536px+
  - Maximum content width constraints
  - Optimized for ultra-wide displays

### Responsive Component Adaptations

1. **Navigation**
   - Mobile: Bottom navigation or hamburger menu
   - Tablet: Icon + text sidebar (collapsible)
   - Desktop: Full sidebar

2. **Cards**
   - Mobile: Full width, simplified content
   - Tablet: 2-column grid
   - Desktop: 3 or 4-column grid with full content

3. **Layout**
   - Mobile: Stacked sections, focused views
   - Tablet: Begin introducing panels and columns
   - Desktop: Multi-panel layouts, advanced features

4. **Typography**
   - Slightly smaller scale on mobile
   - Larger headings as screen size increases
   - Adjusted line lengths for readability

## Accessibility Guidelines

### Semantic HTML

- Use proper HTML elements for their intended purpose
- Structure content using appropriate headings (h1-h6)
- Use landmarks (main, nav, aside, footer)
- Implement proper forms with labels and fieldsets

### Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Maintain logical tab order
- Provide visible focus indicators
- Implement keyboard shortcuts for power users

### Color & Contrast

- Meet WCAG AA standard (4.5:1 for normal text, 3:1 for large text)
- Don't rely on color alone to convey information
- Test designs in grayscale
- Provide sufficient contrast in all states (hover, active, etc.)

### Screen Readers

- Provide alt text for all images
- Use aria-label and aria-labelledby when necessary
- Implement accessible names for interactive elements
- Test with screen readers

### Motion & Animation

- Respect user's reduced motion preferences
- Avoid animations that could trigger vestibular disorders
- Provide alternatives to motion-based interactions
- Limit flashing content

## Component Implementation Examples

These examples show how components should be implemented using Tailwind CSS classes.

### Button Component Example

```jsx
// Primary Button
<button className="inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white font-medium rounded transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 active:bg-primary-700 disabled:bg-neutral-300 disabled:text-neutral-500">
  Button Text
</button>

// Secondary Button
<button className="inline-flex items-center justify-center px-4 py-2 bg-white text-primary-500 font-medium rounded border border-primary-500 transition hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-200 active:bg-primary-100 disabled:border-neutral-200 disabled:text-neutral-500">
  Button Text
</button>

// Tertiary Button
<button className="inline-flex items-center justify-center px-4 py-2 bg-transparent text-primary-500 font-medium rounded transition hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-200 active:bg-primary-100 disabled:text-neutral-400">
  Button Text
</button>

// Icon Button
<button className="p-2 text-primary-500 rounded-full transition hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-200 active:bg-primary-100">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <!-- Icon path -->
  </svg>
</button>

// Button with Icon
<button className="inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white font-medium rounded transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 active:bg-primary-700">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <!-- Icon path -->
  </svg>
  Button Text
</button>
```

### Card Component Example

```jsx
// Standard Card
<div className="bg-white rounded-lg shadow-sm p-6">
  <div className="pb-4 border-b border-neutral-200">
    <h3 className="text-lg font-semibold text-neutral-900">Card Title</h3>
  </div>
  <div className="py-4">
    <p className="text-neutral-700">Card content goes here. This is a standard card example.</p>
  </div>
  <div className="pt-4 border-t border-neutral-200 flex justify-end">
    <button className="text-primary-500 hover:text-primary-600">Action</button>
  </div>
</div>

// Consultation Card
<div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-l-yellow-500 hover:transform hover:scale-[1.01] transition">
  <div className="flex justify-between items-start">
    <div>
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-yellow-500"></span>
        IN PROGRESS
      </span>
      <h3 className="mt-2 text-lg font-semibold text-neutral-900">Medication Consultation</h3>
      <p className="text-neutral-600 mt-1">Understanding my new prescription</p>
    </div>
    <span className="text-sm text-neutral-500">Today, 2:30 PM</span>
  </div>
  <div className="mt-4 flex justify-end">
    <button className="text-primary-500 hover:text-primary-600">View Details</button>
  </div>
</div>
```

### Form Element Example

```jsx
// Text Input with Label
<div className="mb-4">
  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
    Email Address <span className="text-error-500">*</span>
  </label>
  <input
    type="email"
    id="email"
    className="w-full h-10 px-3 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
    placeholder="your.email@example.com"
    required
  />
  <p className="mt-1 text-sm text-neutral-600">We'll never share your email.</p>
</div>

// Input with Error
<div className="mb-4">
  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
    Password
  </label>
  <input
    type="password"
    id="password"
    className="w-full h-10 px-3 py-2 border border-error-500 rounded focus:outline-none focus:ring-2 focus:ring-error-200 focus:border-error-500"
    aria-invalid="true"
    aria-describedby="password-error"
  />
  <p id="password-error" className="mt-1 text-sm text-error-500">Password must be at least 8 characters</p>
</div>
```

### Communication Element Example

```jsx
// Chat Message Bubbles
<div className="space-y-4">
  <!-- Other person's message -->
  <div className="flex items-start">
    <div className="flex-shrink-0 mr-3">
      <div className="w-8 h-8 rounded-full bg-neutral-300"></div>
    </div>
    <div>
      <div className="bg-neutral-100 p-3 rounded-lg rounded-bl-none">
        <p className="text-neutral-800">Hello! How can I help you understand your lab results today?</p>
      </div>
      <span className="text-xs text-neutral-500 mt-1">10:30 AM</span>
    </div>
  </div>
  
  <!-- User's message -->
  <div className="flex items-start justify-end">
    <div>
      <div className="bg-primary-50 p-3 rounded-lg rounded-br-none">
        <p className="text-neutral-800">I'm confused about my cholesterol levels. The report shows LDL as "borderline high" but I'm not sure what that means.</p>
      </div>
      <span className="text-xs text-neutral-500 mt-1 block text-right">10:32 AM</span>
    </div>
  </div>
</div>

// Message Input
<div className="relative">
  <input
    type="text"
    className="w-full pl-4 pr-12 py-2 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
    placeholder="Type your message..."
  />
  <button className="absolute right-1 top-1 p-1.5 text-primary-500 hover:text-primary-600 rounded-full hover:bg-primary-50">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <!-- Send icon path -->
    </svg>
  </button>
</div>
```

## References & Resources

### Design System Implementation Tips

1. **Component Library Structure**
   - Create a well-organized component folder structure
   - Document components with JSDoc or comments
   - Implement Storybook for component viewing (if time permits)

2. **Tailwind Configuration**
   - Extend Tailwind with custom colors and typography
   - Create reusable component classes with @apply
   - Use consistent naming patterns

3. **Responsive Testing**
   - Test on real devices when possible
   - Use browser developer tools for comprehensive testing
   - Check both portrait and landscape orientations

### Design System Evolution

1. **Versioning**
   - Track major changes to the design system
   - Document rationale for design decisions
   - Maintain backwards compatibility when possible

2. **Feedback Collection**
   - Document user feedback on design elements
   - Track usage patterns to identify improvement areas
   - Plan regular design reviews