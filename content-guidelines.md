# Content & Localization Guidelines

This document outlines the requirements for content creation, mock data, and localization for the Murph Next.js project.

## Content Tone & Style

### Brand Voice

- **Professional**: Convey medical credibility while being accessible
- **Empathetic**: Show understanding of patient concerns
- **Clear**: Use straightforward language, especially for medical concepts
- **Reassuring**: Create a sense of trust and security
- **Engaging**: Be conversational without being overly casual

### Writing Guidelines

- Use clear, concise sentences
- Avoid medical jargon when possible; explain it when necessary
- Use second-person perspective for patient-facing content
- Maintain a warm, approachable tone
- Use active voice when possible

## Mock Data Requirements

### Patient Profiles

Create 8-10 diverse patient profiles with:
- Name, age, gender
- Profile picture (use free stock photos)
- Brief medical history
- Typical concerns and questions
- Document history (medical reports, test results)

### Medical Student Profiles

Create 5-8 medical student profiles with:
- Name, age, gender
- University and study year
- Specialization interests
- Brief bio and motivation
- Availability patterns
- Expertise areas

### Consultation Data

Create 15-20 mock consultations with:
- Consultation type (document interpretation, symptom assessment, etc.)
- Communication channel used
- Duration and status
- Brief description of concern
- Sample dialogue exchanges
- Mock documents (lab results, discharge summaries, etc.)

### Medical Documents

Create realistic medical document templates for:
- Blood test results
- Imaging reports (X-ray, MRI, ultrasound)
- Specialist referral letters
- Discharge summaries
- Medication prescriptions

## Localization Requirements

### Supported Languages

- **Primary**: German (de-DE)
- **Secondary**: English (en-US)

### Translation Guidelines

- Maintain consistent terminology across languages
- Adapt idioms and expressions appropriately
- Consider cultural differences in medical communications
- Ensure translated text fits in UI components
- Maintain the same tone and style across languages

### Implementation Approach

- Create separate message files for each language
- Use descriptive keys that indicate context
- Group messages by feature or page
- Include plural forms where needed
- Add comments for translators where context may be unclear

### Date & Number Formatting

- Format dates according to local conventions:
  - German: DD.MM.YYYY (24.12.2023)
  - English: MM/DD/YYYY (12/24/2023)
  
- Format numbers according to local conventions:
  - German: 1.234,56
  - English: 1,234.56

## Landing Page Content

The landing page should include:

1. **Hero Section**:
   - Headline: "Medical guidance when you need it most"
   - Subheadline: "Connect with medical students for accessible explanations and advice"
   - CTA: "Get Started" / "Learn More"
   
2. **Value Proposition Cards**:
   - **Understand Your Health**: Get clear explanations of medical documents and test results
   - **Accessible Guidance**: Connect with knowledgeable medical students through your preferred channel
   - **Know When to Act**: Get help determining if a doctor visit is necessary
   - **Flexible Communication**: Choose between video, audio, text, or asynchronous messages
   
3. **How It Works**:
   - Step 1: Create your account
   - Step 2: Request a consultation
   - Step 3: Connect with a medical student
   - Step 4: Get the guidance you need
   
4. **Testimonials**:
   - 2-3 patient testimonials focusing on clarity and accessibility
   - 1-2 medical student testimonials highlighting educational benefits
   
5. **Statistics**:
   - Number of consultations completed
   - Patient satisfaction rate
   - Average response time
   - Healthcare impact metrics
   
6. **Communication Options**:
   - Video: Face-to-face explanations with document sharing
   - Audio: Private conversations with full attention
   - Text: Written guidance for reference and clarity
   - Asynchronous: Flexibility for non-urgent questions
   
7. **Final CTA**:
   - "Join Murph today and take control of your health journey"
