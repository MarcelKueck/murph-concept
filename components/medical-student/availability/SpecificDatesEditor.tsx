// components/medical-student/availability/SpecificDatesEditor.tsx
import React, { useState } from 'react';
import { Input } from '../../../components/ui/forms/Input';
import { TextArea } from '../../../components/ui/forms/TextArea';
import Button from '../../../components/ui/buttons/Button';

interface ExcludedDate {
  date: string;
  reason: string;
}

interface SpecificDatesEditorProps {
  /**
   * Excluded dates
   */
  excludedDates: ExcludedDate[];
  /**
   * Change handler
   */
  onChange: (dates: ExcludedDate[]) => void;
}

export const SpecificDatesEditor: React.FC<SpecificDatesEditorProps> = ({
  excludedDates,
  onChange
}) => {
  // New date form state
  const [newDate, setNewDate] = useState('');
  const [newReason, setNewReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Handle adding a new excluded date
  const handleAddDate = () => {
    // Validate inputs
    if (!newDate) {
      setError("Date is required");
      return;
    }
    
    if (!newReason) {
      setError("Reason is required");
      return;
    }
    
    // Check if date already exists
    if (excludedDates.some(item => item.date === newDate)) {
      setError("This date is already excluded");
      return;
    }
    
    // Clear error
    setError(null);
    
    // Add new date
    const updatedDates = [
      ...excludedDates,
      { date: newDate, reason: newReason }
    ];
    
    // Sort dates chronologically
    updatedDates.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Update parent state
    onChange(updatedDates);
    
    // Clear form
    setNewDate('');
    setNewReason('');
  };
  
  // Handle removing an excluded date
  const handleRemoveDate = (dateToRemove: string) => {
    const updatedDates = excludedDates.filter(item => item.date !== dateToRemove);
    onChange(updatedDates);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div>
      <div className="mb-6">
        <p className="text-neutral-700">Mark specific dates when you're unavailable, such as vacations, exams, or other commitments.</p>
      </div>
      
      {/* Add new date form */}
      <div className="bg-neutral-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-4">Add Excluded Date</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            id="excluded-date"
            label="Date"
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]} // Today or later
            error={error && !newDate ? error : undefined}
            required
          />
          
          <TextArea
            id="excluded-reason"
            label="Reason"
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
            placeholder="Why are you unavailable on this date?"
            error={error && !newReason ? error : undefined}
            required
          />
        </div>
        
        {error && newDate && newReason && (
          <div className="mb-4 text-red-500 text-sm">
            {error}
          </div>
        )}
        
        <div className="flex justify-end">
          <Button
            onClick={handleAddDate}
          >
            Add Date
          </Button>
        </div>
      </div>
      
      {/* Excluded dates list */}
      <div>
        <h3 className="text-lg font-medium mb-4">Excluded Dates</h3>
        
        {excludedDates.length === 0 ? (
          <div className="text-center py-8 bg-neutral-50 rounded-lg">
            <p className="text-neutral-500">No excluded dates added yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {excludedDates.map((item) => (
              <div 
                key={item.date} 
                className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-lg hover:shadow-sm transition"
              >
                <div>
                  <h4 className="font-medium text-neutral-900">{formatDate(item.date)}</h4>
                  <p className="text-sm text-neutral-700 mt-1">{item.reason}</p>
                </div>
                <button
                  type="button"
                  className="text-neutral-400 hover:text-red-500 transition p-1"
                  onClick={() => handleRemoveDate(item.date)}
                  aria-label="Remove Date"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};