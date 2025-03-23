// PATIENT DASHBOARD FLOW COMPONENTS OVERVIEW

// 1. DASHBOARD PAGE
// app/[locale]/patient/dashboard/page.tsx
// - Summary statistics
// - Upcoming consultations
// - Consultation history
// - Document management
// - Quick actions

// 2. CONSULTATION REQUEST FLOW
// app/[locale]/patient/consultations/new/page.tsx
// - Multi-step form with progress indicator
// - Step 1: Consultation type selection
// - Step 2: Details input with document attachment
// - Step 3: Communication preferences
// - Step 4: Review and submission

// 3. CONSULTATIONS LIST
// app/[locale]/patient/consultations/page.tsx
// - Tab-based filtering (active, past, all)
// - Consultation cards with status indicators
// - Empty state handling
// - Sorting by date

// 4. CONSULTATION DETAIL VIEW
// app/[locale]/patient/consultations/[id]/page.tsx
// - Consultation information
// - Status tracking
// - Related documents
// - Message/chat interface
// - Status-based actions

// 5. DOCUMENT MANAGEMENT
// app/[locale]/patient/documents/page.tsx
// - Document listing with search
// - Document actions (view, download, delete)
// - Confirmation dialogs

// 6. DOCUMENT UPLOAD
// app/[locale]/patient/documents/upload/page.tsx
// - Drag-and-drop file upload
// - File type validation
// - Success/error handling

// 7. CUSTOM COMPONENTS
// a. ConsultationTypeCard
// components/patient/consultations/ConsultationTypeCard.tsx
// - Visual card for consultation type selection

// b. DocumentUploader
// components/patient/consultations/DocumentUploader.tsx
// - Drag-and-drop file upload component
// - File upload handling

// c. DocumentList
// components/patient/consultations/DocumentList.tsx
// - List of available documents with selection

// d. ConsultationChatContainer
// components/patient/consultations/ConsultationChatContainer.tsx
// - Chat interface for consultation messages
// - Status-aware empty states

// 8. DATA HOOKS
// hooks/useDocuments.ts
// - Document CRUD operations
// - Mock data implementation
// - Loading and error states

// The patient flow implementation provides a complete user journey from viewing 
// dashboard information, requesting consultations, managing documents, to 
// communicating with medical students. All components are fully responsive,
// internationalized, and follow the established design system.