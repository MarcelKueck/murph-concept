// components/medical-student/availability/WeeklyAvailabilityView.tsx
import React, { useState, useEffect } from 'react';

export const WeeklyAvailabilityView: React.FC = () => {
  // Mock weekly availability data
  // In a real app, this would be fetched from an API
  const [availability, setAvailability] = useState({
    monday: { morning: true, afternoon: true, evening: false },
    tuesday: { morning: true, afternoon: true, evening: false },
    wednesday: { morning: true, afternoon: false, evening: false },
    thursday: { morning: true, afternoon: true, evening: false },
    friday: { morning: true, afternoon: true, evening: false },
    saturday: { morning: false, afternoon: false, evening: false },
    sunday: { morning: false, afternoon: false, evening: false }
  });
  
  // Calculate total available hours
  const calculateTotalHours = () => {
    let total = 0;
    
    Object.values(availability).forEach(day => {
      if (day.morning) total += 4; // 8am-12pm
      if (day.afternoon) total += 4; // 1pm-5pm
      if (day.evening) total += 3; // 6pm-9pm
    });
    
    return total;
  };
  
  // Calculate today's availability
  const getTodayAvailability = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return availability[today as keyof typeof availability];
  };
  
  // Day labels
  const dayLabels = {
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    sunday: "Sun"
  };
  
  const todayAvailability = getTodayAvailability();
  const totalHours = calculateTotalHours();
  
  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {Object.entries(availability).map(([day, slots]) => {
          // Count available slots
          const availableSlots = Object.values(slots).filter(Boolean).length;
          
          // Check if today
          const isToday = day === ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
          
          return (
            <div 
              key={day}
              className={`
                p-2 text-center rounded
                ${isToday ? 'ring-2 ring-primary-400' : ''}
                ${availableSlots > 0 ? 'bg-primary-50' : 'bg-neutral-50'}
              `}
            >
              <div className="text-xs font-medium mb-1">{dayLabels[day as keyof typeof dayLabels]}</div>
              <div className="flex flex-col items-center justify-center h-12">
                {availableSlots > 0 ? (
                  <>
                    <span className="text-lg font-semibold text-primary-600">{availableSlots}</span>
                    <span className="text-xs text-neutral-500">slots</span>
                  </>
                ) : (
                  <span className="text-xs text-neutral-500">unavailable</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 rounded">
        <div>
          <p className="text-sm font-medium text-neutral-900">Total Hours</p>
          <p className="text-2xl font-bold text-primary-600">{totalHours}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-neutral-900">Today's Status</p>
          <div className="flex items-center mt-1">
            {(todayAvailability.morning || todayAvailability.afternoon || todayAvailability.evening) ? (
              <>
                <span className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></span>
                <span className="text-sm text-neutral-700">Available today</span>
              </>
            ) : (
              <>
                <span className="h-2.5 w-2.5 rounded-full bg-neutral-400 mr-2"></span>
                <span className="text-sm text-neutral-700">Unavailable today</span>
              </>
            )}
          </div>
        </div>
        
        <div>
          <p className="text-sm font-medium text-neutral-900">Upcoming Consultations</p>
          <p className="text-2xl font-bold text-primary-600">2</p>
        </div>
      </div>
    </div>
  );
};