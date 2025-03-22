# Landing Page Design Specifications

This document outlines the detailed design specifications for the Murph landing page, including layout, visual elements, and animations for each section following our Apple-like UI principles.

## Design Overview & Strategy

The landing page follows a vertical structure with distinct sections that communicate Murph's value proposition in a clear, engaging manner. Each section uses subtle animations that guide the user's attention and create a sense of polish without being distracting.

### Key Design Principles Applied

- **Clarity**: Clean interfaces with focused content and strong visual hierarchy
- **Deference**: Content-first approach with UI elements that enhance rather than distract
- **Depth**: Subtle shadows, layering, and animations to create dimensionality
- **Direct Manipulation**: Interactive elements that respond immediately to user input

## Section-by-Section Design Specifications

### 1. Header/Navigation

**Layout:**
- Fixed position at top with subtle shadow on scroll
- Logo on left, navigation links in center, actions on right
- Mobile: Collapsible hamburger menu with smooth slide animation

**Specifications:**
- Height: 16 (4rem)
- Background: White
- Border-bottom: 1px solid Neutral-200
- Container: max-width-7xl with px-4 sm:px-6 lg:px-8 padding
- Logo: Text "Murph" in primary-600, font-bold, text-2xl
- Nav Links: space-x-6, text-gray-600 hover:text-primary-600
- Action Buttons: 
  - Log In: text-primary-600 hover:text-primary-700 
  - Get Started: bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600

**Animations:**
- Background opacity change and shadow appear on scroll
- Smooth slide-down entrance animation on page load (300ms)
- Mobile menu: Smooth slide-in from right with backdrop blur

**Responsive Behavior:**
- Desktop: Full navigation with all elements visible
- Tablet: Full navigation with possibly condensed spacing
- Mobile: Logo with hamburger menu, collapsible navigation

**Accessibility:**
- Navigation fully keyboard accessible
- ARIA attributes for expandable mobile menu
- Sufficient contrast for all text elements

### 2. Hero Section

**Layout:**
- Full-width with gradient background
- Centered content with generous vertical padding
- Two-button layout with primary and secondary CTAs

**Specifications:**
- Background: Gradient from primary-50 to white
- Padding: py-20 (5rem vertical padding)
- Container: max-width-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center
- Headline: text-4xl md:text-5xl lg:text-6xl, font-bold, text-gray-900, mb-6
- Subheadline: text-xl md:text-2xl, text-gray-700, max-w-3xl mx-auto, mb-10
- CTA Buttons:
  - Primary: bg-primary-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-600 shadow-sm
  - Secondary: border border-primary-500 text-primary-500 px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-50

**Animations:**
- Staggered fade-in and slight slide-up from bottom:
  - Headline appears first (0ms delay, 500ms duration)
  - Subheadline second (100ms delay, 500ms duration)
  - CTAs last (200ms delay, 500ms duration)
- Subtle scale transform (1.02) on CTA hover with shadow increase

**Responsive Behavior:**
- Desktop: Large headline and subheadline, buttons side by side
- Tablet: Medium headline and subheadline, buttons side by side
- Mobile: Smaller headline and subheadline, buttons stacked

**Animation Implementation:**
```jsx
// Framer Motion example
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900"
>
  {t('hero.headline')}
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
  className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl mx-auto"
>
  {t('hero.subheadline')}
</motion.p>

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
  className="flex flex-col sm:flex-row justify-center gap-4"
>
  {/* CTA buttons */}
</motion.div>
```

### 3. Value Proposition Cards

**Layout:**
- Section heading (centered)
- 4 cards in grid layout with responsive behavior
- Each card with icon, title, and description

**Specifications:**
- Section Container: py-16 (4rem vertical padding)
- Section Title: text-3xl font-semibold text-center mb-12
- Cards Container: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8
- Card: bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition
- Card Icon: text-primary-500, h-12 w-12 mb-4
- Card Title: text-xl font-semibold mb-2 text-neutral-900
- Card Description: text-gray-600

**Animations:**
- Cards appear with staggered fade-in and subtle slide-up (50ms between cards)
- Scale transform (1.03) and shadow increase on hover
- Icon subtle bounce animation on card hover

**Responsive Behavior:**
- Desktop: 4 cards in a row
- Tablet: 2 cards per row, 2 rows
- Mobile: 1 card per row, 4 rows

**Animation Implementation:**
```jsx
// GSAP staggered animation example
useEffect(() => {
  const cards = document.querySelectorAll('.value-prop-card');
  
  gsap.set(cards, { y: 40, opacity: 0 });
  
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        onComplete: () => observer.disconnect()
      });
    }
  }, { threshold: 0.2 });
  
  observer.observe(document.querySelector('.value-props-container'));
  
  return () => observer.disconnect();
}, []);
```

### 4. How It Works

**Layout:**
- Centered section heading
- 4-step process with numbers and connecting lines
- Horizontal on desktop, vertical on mobile

**Specifications:**
- Section Container: py-16 bg-neutral-50
- Section Title: text-3xl font-semibold text-center mb-12
- Steps Container: relative max-w-5xl mx-auto px-4
- Steps: flex flex-col md:flex-row justify-between relative
- Step Numbers: 
  - Circle: h-12 w-12 rounded-full flex items-center justify-center
  - Inactive: bg-white border-2 border-primary-200 text-primary-500
  - Active: bg-primary-500 text-white
- Connecting Lines: 
  - Desktop: Absolute h-0.5 bg-primary-200 top-6 between circles
  - Mobile: Absolute w-0.5 bg-primary-200 left-6 between circles
- Step Content:
  - md:text-center max-w-xs mx-auto
  - Title: text-xl font-semibold mt-4 mb-2
  - Description: text-gray-600

**Animations:**
- Sequential highlight of steps as user scrolls:
  - Number circles fill with color (bg-primary-500)
  - Text fades in
- Connecting lines drawn progressively as user scrolls (SVG stroke animation)
- Subtle lift effect (translateY(-4px)) on step hover

**Responsive Behavior:**
- Desktop: Horizontal layout with steps in a row
- Tablet: May remain horizontal with smaller spacing
- Mobile: Vertical layout with steps stacked and vertical connecting lines

**Animation Implementation:**
```jsx
// SVG line drawing animation
const drawLine = (svgPath) => {
  const length = svgPath.getTotalLength();
  
  gsap.set(svgPath, {
    strokeDasharray: length,
    strokeDashoffset: length,
    opacity: 1
  });
  
  return gsap.to(svgPath, {
    strokeDashoffset: 0,
    duration: 1,
    ease: "power2.inOut"
  });
};

// When section comes into view
const connectingLine = document.querySelector('.connecting-line');
drawLine(connectingLine);
```

### 5. Testimonials

**Layout:**
- Centered section heading
- Card-based testimonial carousel/slider
- Navigation dots and/or arrows

**Specifications:**
- Section Container: py-16
- Section Title: text-3xl font-semibold text-center mb-12
- Testimonial Container: relative max-w-4xl mx-auto
- Testimonial Card: bg-white rounded-xl p-8 shadow-sm
- Quote Marks: text-primary-200 text-6xl leading-none absolute top-6 left-6 opacity-50
- Quote Text: text-lg text-gray-700 italic relative z-10
- Author: font-semibold mt-4
- Role: text-sm text-gray-500
- Navigation: 
  - Dots: flex justify-center space-x-2 mt-8
  - Dot: h-2 w-2 rounded-full bg-neutral-300
  - Active Dot: bg-primary-500

**Animations:**
- Smooth slide transitions between testimonials
- Fade-in and subtle scale effect when testimonial becomes active
- Navigation dots with smooth color transition on active state

**Responsive Behavior:**
- Consistent card layout across devices
- Possible smaller text on mobile devices
- Touch-friendly navigation on mobile

**Animation Implementation:**
```jsx
// Simple carousel transition
const [activeIndex, setActiveIndex] = useState(0);

const nextTestimonial = () => {
  setActiveIndex((prev) => (prev + 1) % testimonials.length);
};

useEffect(() => {
  // Auto-advance timer
  const timer = setInterval(nextTestimonial, 5000);
  return () => clearInterval(timer);
}, []);

// In your JSX
<AnimatePresence mode="wait">
  <motion.div
    key={activeIndex}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 0.5 }}
    className="testimonial-card"
  >
    {/* Testimonial content */}
  </motion.div>
</AnimatePresence>
```

### 6. Statistics

**Layout:**
- Four statistics in horizontal row (desktop) or 2x2 grid (tablet/mobile)
- Each with large number and descriptive label

**Specifications:**
- Container: py-16 bg-gray-50
- Stats Grid: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8
- Stat Container: text-center p-4
- Stat Number: text-4xl font-bold text-primary-500
- Stat Label: text-gray-600 mt-2

**Animations:**
- Counter animation for numbers as they enter viewport
- Subtle fade-in and scale-up (1.01-1.05) effect

**Responsive Behavior:**
- Desktop: 4 stats in a row
- Tablet: 2×2 grid
- Mobile: Stacked vertically

**Animation Implementation:**
```jsx
// Number counter animation
const CountAnimation = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef();
  
  useEffect(() => {
    const node = nodeRef.current;
    
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let startTime;
        const startValue = 0;
        
        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
          const currentCount = Math.floor(progress * (end - startValue) + startValue);
          
          setCount(currentCount);
          
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        
        window.requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    if (node) {
      observer.observe(node);
    }
    
    return () => observer.disconnect();
  }, [end, duration]);
  
  return <span ref={nodeRef}>{count}</span>;
};
```

### 7. Communication Options

**Layout:**
- Section heading with brief introduction
- 4 option cards in grid layout
- Icon, title, and description in each card

**Specifications:**
- Section Container: py-16
- Section Title: text-3xl font-semibold text-center mb-4
- Section Intro: text-center text-gray-600 max-w-2xl mx-auto mb-12
- Cards Grid: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
- Cards: bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition
- Icons: text-primary-500, h-16 w-16 mx-auto mb-4
- Card Title: text-xl font-semibold text-center mb-2
- Description: text-gray-600 text-center

**Animations:**
- Cards appear with staggered fade-in (50ms between cards)
- Subtle float animation on hover (translateY(-4px) with shadow increase)
- Icon subtle rotation or bounce on card hover

**Responsive Behavior:**
- Desktop: 4 cards in a row
- Tablet: 2 cards per row, 2 rows
- Mobile: 1 card per row, 4 rows

**Animation Implementation:**
```jsx
// Hover animation with Framer Motion
const CommunicationCard = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm"
      whileHover={{ 
        y: -4,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="text-primary-500 mx-auto mb-4"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  );
};
```

### 8. Final CTA

**Layout:**
- Full-width section with background gradient
- Large headline and prominent CTA button

**Specifications:**
- Background: Gradient from primary-100 to primary-50
- Padding: py-16 (4rem vertical padding)
- Inner container: max-w-3xl text-center mx-auto
- Headline: text-3xl md:text-4xl font-bold text-gray-900 mb-8
- CTA Button: bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-md text-lg font-medium

**Animations:**
- Subtle background gradient shift on hover/scroll
- Button scale effect (1.05) on hover with shadow increase
- Entire section fades in and slightly scales up as it enters viewport

**Responsive Behavior:**
- Consistent center alignment across devices
- Possibly smaller text and button on mobile

**Animation Implementation:**
```jsx
// Gradient shift animation
const GradientBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position as percentage of screen
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Compute gradient angle based on mouse position
  const gradientAngle = 120 + (mousePosition.x * 30) - (mousePosition.y * 30);
  
  return (
    <div 
      className="py-16"
      style={{ 
        background: `linear-gradient(${gradientAngle}deg, var(--primary-100), var(--primary-50))`,
        transition: 'background 0.5s ease'
      }}
    >
      {/* CTA content */}
    </div>
  );
};
```

### 9. Footer

**Layout:**
- Three-column grid with company info, quick links, and legal
- Copyright bar at bottom

**Specifications:**
- Background: bg-gray-800
- Text Color: text-white and text-gray-300
- Padding: py-12 (3rem vertical padding)
- Grid: grid grid-cols-1 md:grid-cols-3 gap-8
- Company Section:
  - Logo: font-bold text-xl mb-4
  - Description: text-gray-300
- Links Sections:
  - Title: font-bold mb-4
  - Links: text-gray-300 hover:text-white transition
- Copyright: border-t border-gray-700 mt-8 pt-8 text-center text-gray-400

**Animations:**
- Subtle hover effect on links (text color transition)
- No entrance animations needed

**Responsive Behavior:**
- Desktop: 3 columns
- Tablet: 3 columns or 2 columns
- Mobile: Stacked vertically

## Responsive Design Implementation

The layout should adapt appropriately at different screen sizes:

### Mobile (<640px)
- Single column layouts
- Hamburger menu for navigation
- Value props, steps, and communication options stacked vertically
- Full-width cards

### Tablet (640px-1024px)
- Navigation links visible
- Value props and communication options in 2-column grid
- Steps may remain vertical or start horizontal arrangement
- Statistics in 2×2 grid

### Desktop (>1024px)
- Full horizontal navigation
- Multi-column layouts for cards (4 columns for value props)
- Horizontal step indicators with connecting lines
- Statistics in single row

All responsive behavior should be implemented using Tailwind's responsive utility classes:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {/* This will create a 1-column grid on mobile, 2-column on tablet, and 4-column on desktop */}
</div>
```

## Animation Principles & Guidelines

All animations should follow these principles:

### Timing & Easing
- **Entrances**: 300-500ms duration with cubic-bezier(0.2, 0, 0.2, 1) easing
- **Hover effects**: 150-200ms duration with cubic-bezier(0.2, 0, 0, 1) easing
- **Element transitions**: 200-300ms duration

### Animation Types
1. **Entrance Animations** (as elements enter viewport):
   - Opacity: 0 → 1
   - TranslateY: 20px → 0px
   - Scale (optional): 0.95 → 1

2. **Hover Animations**:
   - Scale: 1 → 1.02-1.05
   - TranslateY: 0 → -4px (for "lifting" effect)
   - Shadow: Increase
   - Background/color transitions

3. **Scroll-Based Animations**:
   - Progressive reveals
   - Counting animations
   - Drawing effects

4. **Staggered Animations**:
   - 50ms delay between related elements
   - Start with primary elements
   - Move to supporting elements

### Accessibility Considerations
- All animations must respect the `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- No animations should be crucial for understanding content
- All interactive elements must be accessible via keyboard

## Implementation Libraries & Approach

The landing page animations should be implemented using a combination of:

1. **Framer Motion** - For component-based animations:
   - Entrance animations
   - Hover effects
   - Transitions between states

2. **GSAP** - For more complex animations:
   - Scroll-triggered animations
   - Drawing effects
   - Counting animations
   - Coordinated animation sequences

3. **CSS Transitions** - For simple state changes:
   - Button hover effects
   - Color transitions
   - Simple transforms

4. **Intersection Observer API** - For triggering animations when elements enter viewport:
   - Combined with GSAP or Framer Motion
   - Efficient performance by only animating visible elements

## Design Mockups

Simplified mockups for key sections are available:

- [Hero Section Layout](https://i.ibb.co/3CkHbqB/hero-section-mockup.jpg)
- [Value Props Layout](https://i.ibb.co/6PwbCj1/value-props-mockup.jpg)
- [How It Works Layout](https://i.ibb.co/2jMC0bz/how-it-works-mockup.jpg)

## Next Steps for Implementation

1. Frontend Development Agent should:
   - Start with mobile layouts first
   - Implement responsive breakpoints using Tailwind classes
   - Add animations as progressive enhancement
   - Test on various screen sizes

2. Ensure all text content uses internationalization:
   - Allow space for German text expansion
   - Use translation keys for all text content
   - Test layouts with both languages

3. Optimize for performance:
   - Lazy load off-screen sections
   - Use efficient animation properties
   - Throttle scroll-based animations

By following these specifications, the landing page will provide an engaging, informative, and visually cohesive introduction to Murph that aligns with our Apple-like design principles.