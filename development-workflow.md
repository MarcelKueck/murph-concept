# Development Workflow

This document outlines the development process, git workflow, and collaboration patterns for the Murph Next.js project.

## Development Process

The development process follows these steps:

1. **Planning**: Define feature requirements and design specifications
2. **Design**: Create UI designs and user flows
3. **Implementation**: Develop the feature with mock data
4. **Review**: Team review of the implementation
5. **Iteration**: Refine based on feedback
6. **Integration**: Merge into the main development branch
7. **Testing**: Verify functionality across devices
8. **Deployment**: Deploy to the staging environment

## Git Workflow

We'll use a simplified GitHub Flow:

1. **Main Branch**: `main` - always deployable
2. **Feature Branches**: `feature/feature-name` - created from `main`
3. **Development Branch**: `develop` - integration branch for features

### Branch Naming Convention

- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-description`
- Content updates: `content/update-description`
- UI improvements: `ui/improvement-description`

### Commit Message Convention

Follow this format for commit messages:
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: UI changes that don't affect functionality
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or updating tests

Example:
```
feat(patient-dashboard): add consultation history section

- Add consultation card component
- Implement filtering by date
- Add pagination for history items
```

## Collaboration Pattern

### Component Development Approach

1. Start with a static version of the component
2. Implement responsive behavior
3. Add interactivity and state
4. Implement animations and transitions
5. Finalize with proper typing and documentation

### Communication Guidelines

- Share progress through pull requests with detailed descriptions
- Use comments in code for unclear areas or TODOs
- Document key decisions and approaches

## Folder Structure Guidelines

- Keep component files small and focused
- Use index files for cleaner imports
- Group related components in subfolders
- Co-locate component styles with component files
- Keep constants and utilities in appropriate lib files

## Code Review Guidelines

When reviewing code, consider:

1. **Functionality**: Does it work as expected?
2. **Responsiveness**: Does it work across device sizes?
3. **Accessibility**: Does it follow accessibility guidelines?
4. **Performance**: Are there obvious performance issues?
5. **Code Quality**: Is the code clean, readable, and maintainable?
6. **Consistency**: Does it follow project patterns and conventions?

## Testing Approach

For this MVP, we'll focus on:

1. **Manual Testing**: Functional testing across devices and browsers
2. **Visual Testing**: Comparison against design specifications
3. **Usability Testing**: Internal review of user flows

## Project Setup Checklist

1. Initialize Next.js 15 project with TypeScript
   ```bash
   npx create-next-app@latest murph-website --typescript --eslint --tailwind --app --use-npm
   ```

2. Install additional dependencies
   ```bash
   npm install next-intl framer-motion gsap zustand @tailwindcss/forms react-hook-form zod
   ```

3. Configure Tailwind CSS with custom theme
   ```js
   // tailwind.config.js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       './pages/**/*.{js,ts,jsx,tsx,mdx}',
       './components/**/*.{js,ts,jsx,tsx,mdx}',
       './app/**/*.{js,ts,jsx,tsx,mdx}',
     ],
     theme: {
       extend: {
         colors: {
           primary: {
             50: '#e3f2fd',
             100: '#bbdefb',
             200: '#90caf9',
             300: '#64b5f6',
             400: '#42a5f5',
             500: '#1e88e5',
             600: '#1976d2',
             700: '#1565c0',
             800: '#0d47a1',
             900: '#0d3c84',
           },
           secondary: {
             50: '#e8f5e9',
             100: '#c8e6c9',
             200: '#a5d6a7',
             300: '#81c784',
             400: '#66bb6a',
             500: '#43a047',
             600: '#2e7d32',
             700: '#1b5e20',
             800: '#145214',
             900: '#0d3f0d',
           },
           neutral: {
             50: '#fafafa',
             100: '#f5f5f5',
             200: '#eeeeee',
             300: '#e0e0e0',
             400: '#bdbdbd',
             500: '#9e9e9e',
             600: '#757575',
             700: '#616161',
             800: '#424242',
             900: '#212121',
           },
         },
         fontFamily: {
           sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
           heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
         },
       },
     },
     plugins: [
       require('@tailwindcss/forms'),
     ],
   }
   ```

4. Configure internationalization
   - Set up locale-based routing with next-intl
   - Create message files for German and English

5. Create folder structure
   - Set up the app directory structure
   - Create component directories
   - Set up mock data folder
