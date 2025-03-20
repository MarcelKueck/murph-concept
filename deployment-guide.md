# Deployment Guide

This document outlines the deployment process, environments, and feedback collection approach for the Murph Next.js project.

## Deployment Environments

### Development Environment

- **Purpose**: Local development and testing
- **URL**: Local (localhost:3000)
- **Updates**: Continuous during development

### Staging Environment

- **Purpose**: Team review and internal testing
- **URL**: staging-murph.vercel.app
- **Updates**: After each feature completion

### Production Environment

- **Purpose**: Stakeholder demos and feedback collection
- **URL**: murph-demo.vercel.app
- **Updates**: After major milestones

## Vercel Deployment Setup

### Prerequisites

1. Vercel account with appropriate access
2. GitHub repository connected to Vercel
3. Environment variables configured in Vercel

### Deployment Configuration

1. **Framework Preset**: Next.js
2. **Build Command**: `next build`
3. **Output Directory**: `.next`
4. **Install Command**: `npm install`
5. **Node.js Version**: 18.x

### Environment Variables

Configure these variables in Vercel:

```
NEXT_PUBLIC_SITE_URL=https://murph-demo.vercel.app
NEXT_PUBLIC_DEFAULT_LOCALE=de
```

### Deployment Process

1. Push code to the GitHub repository
2. Vercel automatically detects changes and starts the build
3. Preview deployments are created for pull requests
4. Main branch deployments go to the production environment

## Vercel Project Setup Steps

1. **Create a Vercel account** (if you don't have one)
   - Sign up at vercel.com

2. **Connect your GitHub repository**
   - Go to the Vercel dashboard
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Authenticate with GitHub if necessary

3. **Configure the project**
   - Select the Next.js framework preset
   - Configure environment variables
   - Adjust build settings if necessary
   - Click "Deploy"

4. **Set up custom domain** (optional)
   - Go to project settings > Domains
   - Add your custom domain
   - Configure DNS settings according to Vercel instructions

5. **Set up team access** (if working with a team)
   - Invite team members to the Vercel project
   - Configure appropriate permissions

## Feedback Collection

### Integrated Feedback Mechanism

Implement a feedback widget on the deployed site that collects:

1. Overall impression rating (1-5 stars)
2. Specific feedback on UI/UX
3. Missing features or functionality
4. Open-ended comments

### Feedback Collection Implementation

Create a simple feedback component that:
- Appears as a floating button in the corner of each page
- Opens a modal with a feedback form
- Sends data to a spreadsheet (e.g., Google Sheets via a serverless function)
- Thanks users for their feedback

```tsx
// Example feedback component structure
import { useState } from 'react';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog } from '@/components/ui/dialog';

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send feedback to collection endpoint
    // ...
    setSubmitted(true);
  };

  return (
    <>
      <Button 
        className="fixed bottom-4 right-4 z-50"
        onClick={() => setOpen(true)}
      >
        Feedback
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Share Your Feedback</Dialog.Title>
          </Dialog.Header>
          
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <h4>How would you rate your experience?</h4>
                  <StarRating 
                    value={rating} 
                    onChange={setRating} 
                  />
                </div>
                
                <div>
                  <h4>What feedback do you have for us?</h4>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <Button type="submit">Submit Feedback</Button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <h3>Thank you for your feedback!</h3>
              <p>We appreciate your input as we improve the Murph platform.</p>
              <Button onClick={() => {
                setOpen(false);
                setSubmitted(false);
                setRating(0);
                setFeedback('');
              }}>
                Close
              </Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog>
    </>
  );
}
```

## Performance Monitoring

Use Vercel Analytics to monitor:

1. Core Web Vitals
2. Page load times
3. Error rates
4. User behavior (most visited pages, time on page)

To enable Vercel Analytics:
1. Go to your project settings in Vercel
2. Navigate to the Analytics tab
3. Click "Enable Analytics"

## Troubleshooting Deployment Issues

Common issues and solutions:

1. **Build Failures**:
   - Check build logs for errors
   - Verify environment variables
   - Test the build locally before pushing

2. **Performance Issues**:
   - Review image optimization
   - Check for client-side JavaScript bloat
   - Analyze with Lighthouse

3. **Layout Shifts**:
   - Properly dimension images
   - Use skeleton loaders
   - Avoid dynamic content that changes page size

## Rollback Procedure

If a deployment causes critical issues:

1. Navigate to the Vercel dashboard
2. Select the project
3. Go to "Deployments" tab
4. Find the last working deployment
5. Click "..." and select "Promote to Production"
