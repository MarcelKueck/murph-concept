// components/medical-student/availability/WeeklyScheduleEditor.tsx
import React from 'react';

// Weekly schedule data structure
interface WeeklySchedule {
  monday: { morning: boolean; afternoon: boolean; evening: boolean };
  tuesday: { morning: boolean; afternoon: boolean; evening: boolean };
  wednesday: { morning: boolean; afternoon: boolean; evening: boolean };
  thursday: { morning: boolean; afternoon: boolean; evening: boolean };
  friday: { morning: boolean; afternoon: boolean; evening: boolean };
  saturday: { morning: boolean; afternoon: boolean; evening: boolean };
  sunday: { morning: boolean; afternoon: boolean; evening: boolean };
}

interface WeeklyScheduleEditorProps {
  /**
   * Weekly schedule data
   */
  weeklySchedule: WeeklySchedule;
  /**
   * Change handler
   */
  onChange: (schedule: WeeklySchedule) => void;
}

export const WeeklyScheduleEditor: React.FC<WeeklyScheduleEditorProps> = ({
  weeklySchedule,
  onChange
}) => {
  // Handle toggling a time slot
  const handleToggleTimeSlot = (day: keyof WeeklySchedule, timeSlot: 'morning' | 'afternoon' | 'evening') => {
    const newSchedule = {
      ...weeklySchedule,
      [day]: {
        ...weeklySchedule[day],
        [timeSlot]: !weeklySchedule[day][timeSlot]
      }
    };
    
    onChange(newSchedule);
  };
  
  // Handle toggling an entire day
  const handleToggleDay = (day: keyof WeeklySchedule) => {
    // Check if any time slot is active
    const anyActive = Object.values(weeklySchedule[day]).some(value => value);
    
    // If any active, turn all off; otherwise turn all on
    const newValue = !anyActive;
    
    const newSchedule = {
      ...weeklySchedule,
      [day]: {
        morning: newValue,
        afternoon: newValue,
        evening: newValue
      }
    };
    
    onChange(newSchedule);
  };
  
  // Handle copying schedule from previous day
  const handleCopyFromPrevious = (day: keyof WeeklySchedule) => {
    const days: (keyof WeeklySchedule)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const currentIndex = days.indexOf(day);
    
    if (currentIndex > 0) {
      const previousDay = days[currentIndex - 1];
      
      const newSchedule = {
        ...weeklySchedule,
        [day]: { ...weeklySchedule[previousDay] }
      };
      
      onChange(newSchedule);
    }
  };
  
  // Handle copying schedule to all weekdays
  const handleCopyToWeekdays = (day: keyof WeeklySchedule) => {
    const weekdays: (keyof WeeklySchedule)[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    
    const newSchedule = { ...weeklySchedule };
    weekdays.forEach(weekday => {
      newSchedule[weekday] = { ...weeklySchedule[day] };
    });
    
    onChange(newSchedule);
  };
  
  // Time slot labels
  const timeSlotLabels = {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening"
  };
  
  // Day labels
  const dayLabels: Record<keyof WeeklySchedule, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday"
  };
  
  // Render time slot cell
  const renderTimeSlot = (day: keyof WeeklySchedule, timeSlot: 'morning' | 'afternoon' | 'evening') => {
    const isActive = weeklySchedule[day][timeSlot];
    
    return (
      <div 
        className={`
          p-4 border border-neutral-200 cursor-pointer transition
          ${isActive ? 'bg-primary-50 border-primary-200' : 'hover:bg-neutral-50'}
        `}
        onClick={() => handleToggleTimeSlot(day, timeSlot)}
      >
        <div className="flex items-center justify-center">
          {isActive ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <div className="mb-6">
        <p className="text-neutral-700">Set your weekly availability by selecting which time slots you are available for consultations.</p>
      </div>
      
      <div className="w-full overflow-x-auto">
        <div className="min-w-max">
          {/* Header */}
          <div className="grid grid-cols-4 gap-1">
            <div className="p-2"></div>
            {Object.keys(timeSlotLabels).map((timeSlot) => (
              <div 
                key={timeSlot} 
                className="p-2 font-medium text-center text-neutral-700"
              >
                {timeSlotLabels[timeSlot as keyof typeof timeSlotLabels]}
              </div>
            ))}
          </div>
          
          {/* Days */}
          {Object.keys(weeklySchedule).map((day) => (
            <div key={day} className="grid grid-cols-4 gap-1 mb-1">
              <div 
                className="p-4 flex items-center justify-between bg-neutral-100 rounded-l font-medium cursor-pointer"
                onClick={() => handleToggleDay(day as keyof WeeklySchedule)}
              >
                <span>{dayLabels[day as keyof WeeklySchedule]}</span>
                <div className="flex space-x-1">
                  <button
                    type="button"
                    className="p-1 text-neutral-500 hover:text-primary-500 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyFromPrevious(day as keyof WeeklySchedule);
                    }}
                    title="Copy from previous day"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                  </button>
                  {(day === 'monday' || day === 'saturday') && (
                    <button
                      type="button"
                      className="p-1 text-neutral-500 hover:text-primary-500 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyToWeekdays(day as keyof WeeklySchedule);
                      }}
                      title={day === 'monday' ? "Copy to all weekdays" : "Copy to weekend"}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              {Object.keys(weeklySchedule[day as keyof WeeklySchedule]).map((timeSlot) => (
                renderTimeSlot(
                  day as keyof WeeklySchedule, 
                  timeSlot as 'morning' | 'afternoon' | 'evening'
                )
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 text-neutral-500 text-sm">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Time slots correspond to the following hours in your local timezone:</span>
        </div>
        <ul className="mt-2 ml-7 list-disc space-y-1">
          <li>Morning: 8:00 AM - 12:00 PM</li>
          <li>Afternoon: 1:00 PM - 5:00 PM</li>
          <li>Evening: 6:00 PM - 9:00 PM</li>
        </ul>
      </div>
    </div>
  );
};