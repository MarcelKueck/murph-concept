# Knowledge Base Update Template

This document provides a template for how agents should format their knowledge base updates to ensure consistency across all updates.

## Update Format

When providing knowledge base updates, agents should follow this structure:

```
# Knowledge Base Updates

## Files Updated
- file-name-1.md: [Brief description of changes]
- file-name-2.md: [Brief description of changes]

## Updated File: [file-name-1.md]

```markdown
[COMPLETE UPDATED CONTENT OF THE FILE]
```

### Changes Made:
- [Specific change 1]
- [Specific change 2]
- [Specific change 3]

## Updated File: [file-name-2.md]

```markdown
[COMPLETE UPDATED CONTENT OF THE FILE]
```

### Changes Made:
- [Specific change 1]
- [Specific change 2]
- [Specific change 3]
```

## Example Update

```
# Knowledge Base Updates

## Files Updated
- technical-specifications.md: Added WebRTC implementation details
- ui-design-guidelines.md: Updated button component specifications

## Updated File: technical-specifications.md

```markdown
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
- **Real-time Communication**: WebRTC for video/audio call interfaces

[... rest of the file content ...]
```

### Changes Made:
- Added WebRTC to the Technology Stack section
- Added implementation details for the video call interface
- Updated WebRTC configuration example
```

## Update Protocol

1. **Always provide the complete file**: Include the entire content of the file, not just the changes
2. **Use clear descriptions**: Explain what changed and why
3. **Format properly**: Use markdown code blocks for file content
4. **Be comprehensive**: Don't omit any sections of the file
5. **Update the project status**: If updating the project-knowledge-base.md file, ensure the status table is current
6. **Create artifacts**: Format each file update as a Claude markdown artifact for easy copying

## Post-Update Process

After an agent provides updated files:
1. The files will be updated in the GitHub repository
2. The updated GitHub repository will be synchronized with Claude's knowledge base
3. All agents will then have access to the latest information in subsequent conversations
