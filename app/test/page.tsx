'use client';

import React, { useState } from 'react';

// Button components
import Button from '@/components/ui/buttons/Button';
import IconButton from '@/components/ui/buttons/IconButton';

// Card components
import { Card } from '@/components/ui/cards/Card';
import { ConsultationCard } from '@/components/ui/cards/ConsultationCard';
import { DocumentCard } from '@/components/ui/cards/DocumentCard';
import { ProfileCard } from '@/components/ui/cards/ProfileCard';

// Form components
import { Input } from '@/components/ui/forms/Input';
import { TextArea } from '@/components/ui/forms/TextArea';
import { Select } from '@/components/ui/forms/Select';
import { Checkbox } from '@/components/ui/forms/Checkbox';
import { Radio } from '@/components/ui/forms/Radio';
import { RadioGroup } from '@/components/ui/forms/RadioGroup';
import { FormGroup } from '@/components/ui/forms/FormGroup';

// Status components
import { Badge } from '@/components/ui/status/Badge';
import { StatusBadge } from '@/components/ui/status/StatusBadge';
import { LinearProgress } from '@/components/ui/status/LinearProgress';
import { Spinner } from '@/components/ui/status/Spinner';
import { Skeleton } from '@/components/ui/status/Skeleton';

// Navigation components
import { NavItem } from '@/components/ui/navigation/NavItem';
import { TabNavigation } from '@/components/ui/navigation/TabNavigation';
import { Breadcrumbs } from '@/components/ui/navigation/Breadcrumbs';
import { Sidebar } from '@/components/ui/navigation/Sidebar';
import { Pagination } from '@/components/ui/navigation/Pagination';

// Modal components
import { Modal } from '@/components/ui/modal/Modal';
import { ModalBody } from '@/components/ui/modal/ModalBody';
import { ModalFooter } from '@/components/ui/modal/ModalFooter';
import { Drawer } from '@/components/ui/modal/Drawer';
import { Alert } from '@/components/ui/modal/Alert';
import { Toast } from '@/components/ui/modal/Toast';
import { ToastContainer } from '@/components/ui/modal/ToastContainer';

// Communication components
import { ChatBubble } from '@/components/ui/communication/ChatBubble';
import { ChatInput } from '@/components/ui/communication/ChatInput';
import { ChatContainer } from '@/components/ui/communication/ChatContainer';
import { VideoCallContainer } from '@/components/ui/communication/VideoCallContainer';
import { VideoCallButton } from '@/components/ui/communication/VideoCallButton';
import { AudioCallContainer } from '@/components/ui/communication/AudioCallContainer';
import { MessageInput } from '@/components/ui/communication/MessageInput';
import { AsyncMessageContainer } from '@/components/ui/communication/AsyncMessageContainer';
import { DocumentShare } from '@/components/ui/communication/DocumentShare';
import { ConsultationRequestSummary } from '@/components/ui/communication/ConsultationRequestSummary';

// Layout components
import { PageContainer } from '@/components/ui/layout/PageContainer';
import { PageHeader } from '@/components/ui/layout/PageHeader';
import { ContentSection } from '@/components/ui/layout/ContentSection';
import { SplitLayout } from '@/components/ui/layout/SplitLayout';
import { GridLayout } from '@/components/ui/layout/GridLayout';
// Note: DashboardLayout and AuthLayout are full-page layouts and harder to demo in a test page

// Avatar components
import { Avatar } from '@/components/ui/avatar/Avatar';
import { AvatarGroup } from '@/components/ui/avatar/AvatarGroup';
import { UserInfo } from '@/components/ui/avatar/UserInfo';
import { UserListItem } from '@/components/ui/avatar/UserListItem';

// Element components
import { Tag } from '@/components/ui/elements/Tag';
import { Divider } from '@/components/ui/elements/Divider';
import { EmptyState } from '@/components/ui/elements/EmptyState';
import { Stat } from '@/components/ui/elements/Stat';
import { StatsGroup } from '@/components/ui/elements/StatsGroup';

// Feedback components
import { StarRating } from '@/components/ui/feedback/StarRating';
import { FeedbackForm } from '@/components/ui/feedback/FeedbackForm';
import { SatisfactionSurvey } from '@/components/ui/feedback/SatisfactionSurvey';
import { NPSSurvey } from '@/components/ui/feedback/NPSSurvey';

export default function ComponentTestPage() {
  // State for interactive components
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [radioGroupValue, setRadioGroupValue] = useState('option1');
  const [chatInput, setChatInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('tab1');
  const [progress, setProgress] = useState(60);

  // Create section links for navigation
  const sections = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards', label: 'Cards' },
    { id: 'forms', label: 'Forms' },
    { id: 'status', label: 'Status Indicators' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'modals', label: 'Modals & Dialogs' },
    { id: 'communication', label: 'Communication' },
    { id: 'layout', label: 'Layout' },
    { id: 'avatar', label: 'Avatars' },
    { id: 'elements', label: 'UI Elements' },
    { id: 'feedback', label: 'Feedback' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation header */}
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold mb-4">UI Component Test Page</h1>
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <a 
                key={section.id}
                href={`#${section.id}`}
                className="px-3 py-1 bg-white border border-neutral-300 rounded-full text-sm hover:bg-neutral-100 transition"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <PageContainer>
        {/* Button Components */}
        <section id="buttons" className="py-8">
          <PageHeader 
            title="Button Components" 
            subtitle="Various button styles and variants"
          />

          <ContentSection title="Standard Buttons">
            <div className="flex flex-wrap gap-4">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="tertiary">Tertiary Button</Button>
              <Button disabled>Disabled Button</Button>
              <Button size="small">Small Button</Button>
              <Button size="large">Large Button</Button>
              <Button fullWidth>Full Width Button</Button>
              <Button leftIcon={<span>👈</span>}>Left Icon</Button>
              <Button rightIcon={<span>👉</span>}>Right Icon</Button>
            </div>
          </ContentSection>

          <ContentSection title="Icon Buttons">
            <div className="flex flex-wrap gap-4">
              <IconButton 
                icon={<span>🔍</span>} 
                ariaLabel="Search" 
              />
              <IconButton 
                icon={<span>🔔</span>} 
                ariaLabel="Notifications"
                variant="secondary" 
              />
              <IconButton 
                icon={<span>❤️</span>} 
                ariaLabel="Like"
                variant="tertiary" 
              />
              <IconButton 
                icon={<span>⚙️</span>} 
                ariaLabel="Settings"
                variant="ghost" 
              />
              <IconButton 
                icon={<span>🗑️</span>} 
                ariaLabel="Delete"
                disabled 
              />
              <IconButton 
                icon={<span>➕</span>} 
                ariaLabel="Add"
                size="large" 
              />
            </div>
          </ContentSection>
        </section>

        {/* Card Components */}
        <section id="cards" className="py-8">
          <PageHeader 
            title="Card Components" 
            subtitle="Various card styles for content containers"
          />

          <ContentSection title="Standard Card">
            <Card 
              title="Standard Card" 
              footer={<div className="flex justify-end"><Button size="small">Action</Button></div>}
              className="max-w-md"
            >
              <p>This is a standard card with a title and footer. Cards are used to group related content and actions.</p>
            </Card>
          </ContentSection>

          <ContentSection title="Specialized Cards">
            <GridLayout columns={{ sm: 1, md: 2, lg: 3 }}>
              <ConsultationCard 
                type="labResult"
                primaryConcern="Understanding Blood Test Results"
                status="IN_PROGRESS"
                date="Today, 2:30 PM"
                description="Help interpreting recent blood work"
                onClick={() => alert('Consultation card clicked')}
              />

              <DocumentCard 
                name="Blood Test Results.pdf"
                type="PDF Document"
                uploadDate="Mar 15, 2025"
                onClick={() => alert('Document card clicked')}
                onDownload={() => alert('Download clicked')}
              />

              <ProfileCard
                name="Dr. Jane Smith"
                role="Medical Student"
                avatarUrl="/vercel.svg"
                infoLines={["Charité University Hospital", "Specializing in Internal Medicine"]}
                actionButton={<Button size="small">Contact</Button>}
              />
            </GridLayout>
          </ContentSection>
        </section>

        {/* Form Components */}
        <section id="forms" className="py-8">
          <PageHeader 
            title="Form Components" 
            subtitle="Input elements and form controls"
          />

          <ContentSection title="Form Inputs">
            <FormGroup>
              <Input 
                label="Text Input" 
                placeholder="Enter text here"
                helperText="This is helper text for the input"
              />
              
              <Input 
                label="Required Input" 
                placeholder="This field is required"
                required
              />
              
              <Input 
                label="Input with Error" 
                placeholder="Error state"
                error="This field has an error message"
              />
              
              <Input 
                label="Input with Icon" 
                placeholder="Search..."
                leftIcon={<span>🔍</span>}
              />
              
              <TextArea 
                label="Text Area" 
                placeholder="Enter multiple lines of text"
              />
              
              <Select 
                label="Dropdown Select"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                ]}
              />
            </FormGroup>
          </ContentSection>

          <ContentSection title="Selection Controls">
            <div className="space-y-4">
              <Checkbox 
                id="checkbox1"
                label="Checkbox Example" 
                checked={checkboxValue}
                onChange={() => setCheckboxValue(!checkboxValue)}
              />
              
              <Radio 
                id="radio1"
                name="radioExample"
                label="Radio Button Example" 
                checked={radioValue === 'option1'}
                onChange={() => setRadioValue('option1')}
              />
              
              <RadioGroup 
                name="radioGroup"
                label="Radio Group Example"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                ]}
                value={radioGroupValue}
                onChange={setRadioGroupValue}
              />
            </div>
          </ContentSection>
        </section>

        {/* Status Indicators */}
        <section id="status" className="py-8">
          <PageHeader 
            title="Status Indicators" 
            subtitle="Progress, loading, and status displays"
          />

          <ContentSection title="Badges">
            <div className="flex flex-wrap gap-3">
              <Badge>Default Badge</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
              <Badge withDot>With Dot</Badge>
              
              <StatusBadge status="REQUESTED" />
              <StatusBadge status="ASSIGNED" />
              <StatusBadge status="SCHEDULED" />
              <StatusBadge status="IN_PROGRESS" />
              <StatusBadge status="RESOLVED" />
              <StatusBadge status="CLOSED" />
            </div>
          </ContentSection>

          <ContentSection title="Progress & Loading">
            <div className="space-y-8 max-w-xl">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Progress: {progress}%</span>
                  <div className="space-x-2">
                    <Button 
                      size="small" 
                      onClick={() => setProgress(Math.max(0, progress - 10))}
                    >
                      Decrease
                    </Button>
                    <Button 
                      size="small" 
                      onClick={() => setProgress(Math.min(100, progress + 10))}
                    >
                      Increase
                    </Button>
                  </div>
                </div>
                <LinearProgress 
                  value={progress} 
                  label="Progress Example" 
                  showPercentage 
                />
                
                <LinearProgress 
                  value={75} 
                  variant="success" 
                  size="small" 
                />
                
                <LinearProgress 
                  value={50} 
                  variant="warning" 
                  size="large" 
                />
              </div>
              
              <div className="flex flex-wrap gap-6 items-center">
                <div>
                  <h4 className="text-sm font-medium mb-2">Spinners:</h4>
                  <div className="flex gap-4">
                    <Spinner size="small" />
                    <Spinner />
                    <Spinner size="large" />
                    <Spinner color="white" className="p-2 bg-primary-500 rounded" />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Skeletons:</h4>
                  <div className="space-y-2">
                    <Skeleton variant="text" width="200px" />
                    <Skeleton variant="circle" width="40px" />
                    <Skeleton variant="rectangle" width="300px" height="100px" />
                  </div>
                </div>
              </div>
            </div>
          </ContentSection>
        </section>

        {/* Navigation Components */}
        <section id="navigation" className="py-8">
          <PageHeader 
            title="Navigation Components" 
            subtitle="UI elements for navigation"
          />

          <ContentSection title="Tab Navigation">
            <TabNavigation
              tabs={[
                { id: 'tab1', label: 'First Tab' },
                { id: 'tab2', label: 'Second Tab' },
                { id: 'tab3', label: 'Third Tab', badgeCount: 3 },
                { id: 'tab4', label: 'Disabled Tab', disabled: true },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
            
            <div className="p-4 border border-neutral-200 rounded-md mt-4">
              Content for tab: {activeTab}
            </div>
          </ContentSection>

          <ContentSection title="Breadcrumbs">
            <Breadcrumbs
              items={[
                { href: '/', label: 'Home' },
                { href: '/patient', label: 'Patient' },
                { href: '/patient/dashboard', label: 'Dashboard' },
                { label: 'Current Page' },
              ]}
            />
          </ContentSection>
          
          <ContentSection title="NavItem & Sidebar Examples">
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-1/3 border border-neutral-200 rounded-lg overflow-hidden">
                <div className="p-2 bg-neutral-100 font-medium">
                  NavItem Examples:
                </div>
                <div className="p-2">
                  <NavItem
                    href="#"
                    label="Dashboard"
                    icon={<span>📊</span>}
                  />
                  <NavItem
                    href="#"
                    label="Consultations"
                    icon={<span>🗨️</span>}
                    isActive
                  />
                  <NavItem
                    href="#"
                    label="Messages"
                    icon={<span>✉️</span>}
                    notificationCount={3}
                  />
                </div>
              </div>
              
              <div className="w-full md:w-3/5 border border-neutral-200 rounded-lg overflow-hidden">
                <div className="p-2 bg-neutral-100 font-medium">
                  Sidebar Example (Simplified):
                </div>
                <div className="p-2">
                  <Sidebar
                    sections={[
                      {
                        title: 'Main',
                        items: [
                          { href: '#', label: 'Dashboard', icon: <span>🏠</span>, isActive: true },
                          { href: '#', label: 'Consultations', icon: <span>🗓️</span> },
                          { href: '#', label: 'Documents', icon: <span>📄</span> },
                        ],
                      },
                      {
                        title: 'Account',
                        items: [
                          { href: '#', label: 'Profile', icon: <span>👤</span> },
                          { href: '#', label: 'Settings', icon: <span>⚙️</span> },
                          { href: '#', label: 'Help', icon: <span>❓</span> },
                        ],
                      },
                    ]}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Pagination">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
              showFirstLast
            />
            <div className="mt-2 text-center text-sm text-neutral-600">
              Current Page: {currentPage}
            </div>
          </ContentSection>
        </section>

        {/* Modal Components */}
        <section id="modals" className="py-8">
          <PageHeader 
            title="Modal & Dialog Components" 
            subtitle="Overlays, alerts, and notifications"
          />

          <ContentSection title="Modal and Drawer">
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => setIsModalOpen(true)}>
                Open Modal
              </Button>
              
              <Button variant="secondary" onClick={() => setIsDrawerOpen(true)}>
                Open Drawer
              </Button>
              
              <Button 
                variant="tertiary" 
                onClick={() => setShowToast(true)}
              >
                Show Toast
              </Button>
            </div>
            
            {/* Modal Example */}
            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Example Modal"
              >
                <ModalBody>
                  <p>This is an example modal dialog.</p>
                  <p className="mt-2">You can include any content here.</p>
                </ModalBody>
                <ModalFooter>
                  <Button 
                    variant="secondary" 
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => setIsModalOpen(false)}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </Modal>
            )}
            
            {/* Drawer Example */}
            {isDrawerOpen && (
              <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="Example Drawer"
              >
                <p>This is an example drawer that slides in from the side.</p>
                <p className="mt-4">It&#39;s useful for forms, details panels, and navigation.</p>
                <div className="mt-6">
                  <Button 
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Close Drawer
                  </Button>
                </div>
              </Drawer>
            )}
            
            {/* Toast Container & Toast */}
            <ToastContainer position="top-right">
              {showToast && (
                <Toast
                  message="This is a toast notification"
                  type="success"
                  onClose={() => setShowToast(false)}
                />
              )}
            </ToastContainer>
          </ContentSection>

          <ContentSection title="Alerts">
            <div className="space-y-4">
              <Alert
                title="Information Alert"
                message="This is an informational message."
                variant="info"
              />
              
              <Alert
                title="Success Alert"
                message="Operation completed successfully."
                variant="success"
              />
              
              <Alert
                title="Warning Alert"
                message="Please review the information before proceeding."
                variant="warning"
              />
              
              <Alert
                title="Error Alert"
                message="An error occurred while processing your request."
                variant="error"
              />
              
              <Alert
                message="This is a dismissible alert."
                variant="info"
                dismissible
                onDismiss={() => alert('Alert dismissed')}
              />
            </div>
          </ContentSection>
        </section>

        {/* Communication Components */}
        <section id="communication" className="py-8">
          <PageHeader 
            title="Communication Components" 
            subtitle="Chat, video, and messaging interfaces"
          />

          <ContentSection title="Chat Interface">
            <div className="border border-neutral-200 rounded-lg overflow-hidden">
              <ChatContainer
                header={
                  <div className="flex items-center">
                    <Avatar name="John Doe" size="sm" />
                    <div className="ml-2">
                      <div className="font-medium">John Doe</div>
                      <div className="text-xs text-neutral-500">Online</div>
                    </div>
                  </div>
                }
                footer={
                  <ChatInput
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onSubmit={() => {
                      alert(`Message submitted: ${chatInput}`);
                      setChatInput('');
                    }}
                    placeholder="Type a message..."
                    attachEnabled
                    onAttach={() => alert('Attach clicked')}
                  />
                }
              >
                <div className="space-y-4">
                  <ChatBubble
                    message="Hello! How can I help you today?"
                    timestamp="10:30 AM"
                    isCurrentUser={false}
                    avatar="/vercel.svg"
                    senderName="Dr. Smith"
                  />
                  
                  <ChatBubble
                    message="I received my lab results and I'm not sure what some of these values mean."
                    timestamp="10:32 AM"
                    isCurrentUser={true}
                  />
                  
                  <ChatBubble
                    message="No problem, I'd be happy to help you understand your results. Could you share what specific values you have questions about?"
                    timestamp="10:33 AM"
                    isCurrentUser={false}
                    avatar="/vercel.svg"
                    senderName="Dr. Smith"
                  />
                  
                  <ChatBubble
                    message="I'm particularly concerned about my cholesterol level. It says 240 mg/dL."
                    timestamp="10:35 AM"
                    isCurrentUser={true}
                  />
                </div>
              </ChatContainer>
            </div>
          </ContentSection>

          <ContentSection title="Message and Consultation Components">
            <SplitLayout
              left={
                <div className="space-y-4">
                  <AsyncMessageContainer
                    title="Async Message Example"
                    status="Last updated 3 hours ago"
                  >
                    <div className="space-y-4">
                      <p>This demonstrates an asynchronous message container that can be used for non-real-time communications.</p>
                      
                      <DocumentShare
                        name="Lab Results.pdf"
                        type="PDF Document"
                        onClick={() => alert('Document clicked')}
                      />
                      
                      <MessageInput
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onSubmit={() => {
                          alert(`Message submitted: ${messageInput}`);
                          setMessageInput('');
                        }}
                        placeholder="Type your response..."
                      />
                    </div>
                  </AsyncMessageContainer>
                </div>
              }
              right={
                <ConsultationRequestSummary
                  primaryConcern="Understanding Blood Test Results"
                  description="I received my annual physical results and need help understanding my cholesterol and glucose levels."
                  documents={[
                    { name: "Blood Work Results.pdf", type: "PDF Document" },
                    { name: "Medical History.docx", type: "Word Document" }
                  ]}
                />
              }
            />
          </ContentSection>

          <ContentSection title="Video and Audio Call Interfaces">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Video Call (Simplified Demo)</h3>
                <VideoCallContainer
                  primaryVideo={
                    <div className="bg-neutral-800 h-64 flex items-center justify-center text-white">
                      Primary Video Feed
                    </div>
                  }
                  selfVideo={
                    <div className="bg-neutral-700 h-20 flex items-center justify-center text-white text-sm">
                      Self View
                    </div>
                  }
                  controls={
                    <>
                      <VideoCallButton
                        icon={<span>🎤</span>}
                        label="Toggle Microphone"
                        onClick={() => alert('Mic toggled')}
                      />
                      <VideoCallButton
                        icon={<span>📷</span>}
                        label="Toggle Camera"
                        onClick={() => alert('Camera toggled')}
                      />
                      <VideoCallButton
                        icon={<span>📱</span>}
                        label="End Call"
                        isEndCall
                        onClick={() => alert('Call ended')}
                      />
                    </>
                  }
                  status="connected"
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Audio Call (Simplified Demo)</h3>
                <AudioCallContainer
                  name="Dr. Jane Smith"
                  status="Call duration: 03:42"
                  avatar="/vercel.svg"
                  controls={
                    <>
                      <VideoCallButton
                        icon={<span>🎤</span>}
                        label="Toggle Microphone"
                        onClick={() => alert('Mic toggled')}
                      />
                      <VideoCallButton
                        icon={<span>🔊</span>}
                        label="Toggle Speaker"
                        onClick={() => alert('Speaker toggled')}
                      />
                      <VideoCallButton
                        icon={<span>📱</span>}
                        label="End Call"
                        isEndCall
                        onClick={() => alert('Call ended')}
                      />
                    </>
                  }
                />
              </div>
            </div>
          </ContentSection>
        </section>

        {/* Layout Components */}
        <section id="layout" className="py-8">
          <PageHeader 
            title="Layout Components" 
            subtitle="Page structure and content organization"
          />
          
          <ContentSection title="Content Section">
            <p className="mb-4">
              The ContentSection component you&apos;re seeing right now is an example of a layout component. 
              It provides consistent styling for content sections with optional titles and actions.
            </p>
            
            <ContentSection
              title="Nested Content Section"
              description="This is a description for the section"
              actions={
                <Button size="small">Action</Button>
              }
            >
              <p>Content inside a nested section</p>
            </ContentSection>
          </ContentSection>

          <ContentSection title="Grid Layout">
            <p className="mb-4">GridLayout provides a responsive grid system:</p>
            
            <GridLayout 
              columns={{ sm: 1, md: 2, lg: 3 }}
              gap="md"
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item} 
                  className="bg-white p-4 rounded-lg border border-neutral-200 shadow-sm"
                >
                  Grid Item {item}
                </div>
              ))}
            </GridLayout>
          </ContentSection>

          <ContentSection title="Split Layout">
            <p className="mb-4">SplitLayout creates a two-column layout with configurable widths:</p>
            
            <SplitLayout
              left={
                <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
                  Left Column (Sidebar)
                </div>
              }
              right={
                <div className="bg-white p-4 rounded-lg border border-neutral-200">
                  Right Column (Main Content Area)
                </div>
              }
              leftWidth={4}
              gap="md"
            />
          </ContentSection>

          <ContentSection title="PageHeader Example">
            <p className="mb-4">
              PageHeader component (used at the top of each section) provides consistent page headers with titles, 
              subtitles, breadcrumbs, and actions:
            </p>
            
            <div className="border border-neutral-200 rounded-lg p-4 bg-white">
              <PageHeader
                title="Example Page Title"
                subtitle="This is an example page subtitle that provides additional context"
                breadcrumbs={[
                  { href: '/', label: 'Home' },
                  { href: '/section', label: 'Section' },
                  { label: 'Current Page' }
                ]}
                actions={
                  <div className="flex space-x-2">
                    <Button variant="secondary" size="small">Secondary Action</Button>
                    <Button size="small">Primary Action</Button>
                  </div>
                }
              />
              <div className="border-t border-neutral-200 mt-4 pt-4">
                Page content would go here...
              </div>
            </div>
          </ContentSection>
        </section>

        {/* Avatar Components */}
        <section id="avatar" className="py-8">
          <PageHeader 
            title="Avatar Components" 
            subtitle="User avatars and profile displays"
          />

          <ContentSection title="Avatar Variations">
            <div className="flex flex-wrap gap-6 items-end">
              <div>
                <h4 className="text-sm font-medium mb-2">Sizes:</h4>
                <div className="flex gap-4">
                  <Avatar name="John Doe" size="xs" />
                  <Avatar name="John Doe" size="sm" />
                  <Avatar name="John Doe" size="md" />
                  <Avatar name="John Doe" size="lg" />
                  <Avatar name="John Doe" size="xl" />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">With Status:</h4>
                <div className="flex gap-4">
                  <Avatar name="John Doe" status="online" />
                  <Avatar name="John Doe" status="busy" />
                  <Avatar name="John Doe" status="away" />
                  <Avatar name="John Doe" status="offline" />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Shapes:</h4>
                <div className="flex gap-4">
                  <Avatar name="John Doe" shape="circle" />
                  <Avatar name="John Doe" shape="square" />
                </div>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Avatar Group">
            <AvatarGroup
              avatars={[
                { name: "John Doe", status: "online" },
                { name: "Jane Smith", status: "away" },
                { name: "Robert Johnson" },
                { name: "Emily Williams" },
                { name: "Michael Brown" },
                { name: "Sarah Davis" }
              ]}
              max={4}
            />
          </ContentSection>

          <ContentSection title="User Information Displays">
            <div className="space-y-4">
              <UserInfo
                name="Dr. Jane Smith"
                info="Cardiologist, Charité Hospital"
                avatarSrc="/vercel.svg"
                status="online"
              />
              
              <Divider />
              
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <h4 className="text-sm font-medium p-3 bg-neutral-50 border-b border-neutral-200">
                  User List Example:
                </h4>
                <div>
                  <UserListItem
                    name="Dr. John Doe"
                    info="Internal Medicine"
                    selected={true}
                    onClick={() => alert('User clicked')}
                  />
                  <UserListItem
                    name="Dr. Jane Smith"
                    info="Cardiology"
                    onClick={() => alert('User clicked')}
                    action={
                      <Button size="small" variant="secondary">Message</Button>
                    }
                  />
                  <UserListItem
                    name="Dr. Mike Johnson"
                    info="Neurology"
                    onClick={() => alert('User clicked')}
                  />
                </div>
              </div>
            </div>
          </ContentSection>
        </section>

        {/* UI Elements */}
        <section id="elements" className="py-8">
          <PageHeader 
            title="UI Elements" 
            subtitle="Tags, dividers, and other interface elements"
          />

          <ContentSection title="Tags">
            <div className="flex flex-wrap gap-2">
              <Tag label="Default Tag" />
              <Tag label="Primary" variant="primary" />
              <Tag label="Secondary" variant="secondary" />
              <Tag label="Success" variant="success" />
              <Tag label="Warning" variant="warning" />
              <Tag label="Error" variant="error" />
              <Tag 
                label="Removable" 
                removable 
                onRemove={() => alert('Tag removed')} 
              />
            </div>
          </ContentSection>

          <ContentSection title="Dividers">
            <div className="space-y-8">
              <div>
                <p className="mb-2">Simple horizontal divider:</p>
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <p>Content above divider</p>
                  <Divider className="my-4" />
                  <p>Content below divider</p>
                </div>
              </div>
              
              <div>
                <p className="mb-2">Divider with label:</p>
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <p>Content above divider</p>
                  <Divider label="Section Divider" className="my-4" />
                  <p>Content below divider</p>
                </div>
              </div>
              
              <div>
                <p className="mb-2">Vertical divider (in flex container):</p>
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="flex items-center h-12">
                    <span>Left content</span>
                    <Divider orientation="vertical" />
                    <span>Right content</span>
                  </div>
                </div>
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Empty State">
            <EmptyState
              title="No consultations found"
              description="You don't have any active consultations. Start a new consultation to get medical guidance."
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              action={
                <Button>Start Consultation</Button>
              }
            />
          </ContentSection>

          <ContentSection title="Statistics">
            <div className="space-y-6">
              <Stat
                label="Total Consultations"
                value="524"
                change={12.5}
                increaseIsGood={true}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                }
              />
              
              <StatsGroup
                stats={[
                  {
                    label: "Active Patients",
                    value: "128",
                    change: 5.4,
                    increaseIsGood: true,
                  },
                  {
                    label: "Response Rate",
                    value: "98.2%",
                    change: 2.1,
                    increaseIsGood: true,
                  },
                  {
                    label: "Average Duration",
                    value: "24 min",
                    change: -8.3,
                    increaseIsGood: true,
                  }
                ]}
              />
            </div>
          </ContentSection>
        </section>

        {/* Feedback Components */}
        <section id="feedback" className="py-8">
          <PageHeader 
            title="Feedback Components" 
            subtitle="Components for collecting user feedback"
          />

          <ContentSection title="Star Rating">
            <div className="space-y-6">
              <StarRating 
                value={starRating} 
                onChange={setStarRating}
                label="Rate your experience"
              />
              
              <div className="flex gap-6">
                <StarRating 
                  value={3.5} 
                  onChange={() => {}}
                  size="sm"
                  readOnly
                />
                
                <StarRating 
                  value={4} 
                  onChange={() => {}}
                  size="lg"
                  count={10}
                />
              </div>
            </div>
          </ContentSection>

          <ContentSection title="Satisfaction Survey">
            <SatisfactionSurvey 
              question="Was this information helpful?"
              onSubmit={(satisfaction, comment) => {
                alert(`Satisfaction: ${satisfaction}, Comment: ${comment}`);
              }}
            />
          </ContentSection>

          <ContentSection title="NPS Survey">
            <NPSSurvey 
              onSubmit={(score, comment) => {
                alert(`NPS Score: ${score}, Comment: ${comment}`);
              }}
            />
          </ContentSection>

          <ContentSection title="Feedback Form">
            <FeedbackForm 
              onSubmit={(feedback) => {
                alert(`Feedback submitted: ${JSON.stringify(feedback)}`);
              }}
              onCancel={() => alert('Feedback cancelled')}
            />
          </ContentSection>

          <ContentSection title="Floating Feedback Widget">
            <p>The FeedbackWidget component adds a floating button to collect feedback. In this example, it&apos;s disabled to avoid overlap with the fixed navigation, but it normally appears as a floating button in the bottom corner.</p>
            
            <div className="p-4 border border-neutral-200 rounded-lg bg-white">
              <div className="flex items-center justify-between">
                <span className="font-medium">Floating Feedback Button</span>
                <Button 
                  size="small"
                  onClick={() => alert('In a real implementation, this would open the feedback form')}
                >
                  Show Demo
                </Button>
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                Normally positioned in the bottom-right corner of the viewport.
              </p>
            </div>
          </ContentSection>
        </section>
      </PageContainer>
    </div>
  );
}