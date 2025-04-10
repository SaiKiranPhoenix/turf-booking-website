import React from 'react';
import PropTypes from 'prop-types';

const TimeSlot = ({
  slots,
  selectedSlots = [],
  onSelectSlot,
  disabled = false,
  maxSelections = null,
  disabledSlots = [],
  className = '',
}) => {
  const handleSelectSlot = (slot) => {
    if (disabled) return;
    
    // Check if slot is available
    if (disabledSlots.includes(slot.id)) return;
    
    // Check if slot is already selected
    const isSelected = selectedSlots.includes(slot.id);

    if (isSelected) {
      // If selected, remove it
      onSelectSlot(selectedSlots.filter(id => id !== slot.id));
    } else {
      // If not selected and we've reached max selections, don't add
      if (maxSelections !== null && selectedSlots.length >= maxSelections) {
        return;
      }
      
      // Add the slot
      onSelectSlot([...selectedSlots, slot.id]);
    }
  };

  const isSlotSelected = (slotId) => selectedSlots.includes(slotId);
  const isSlotDisabled = (slotId) => disabledSlots.includes(slotId);

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 ${className}`}>
      {slots.map((slot) => {
        const selected = isSlotSelected(slot.id);
        const slotDisabled = isSlotDisabled(slot.id) || disabled;
        
        return (
          <button
            key={slot.id}
            type="button"
            onClick={() => handleSelectSlot(slot)}
            disabled={slotDisabled}
            className={`
              py-2 px-3 rounded-md border text-sm font-medium
              transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
              ${selected 
                ? 'bg-green-600 text-white border-green-600 hover:bg-green-700 focus:ring-green-500' 
                : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50 focus:ring-green-500'
              }
              ${slotDisabled 
                ? 'opacity-50 cursor-not-allowed bg-gray-100 hover:bg-gray-100' 
                : ''
              }
            `}
          >
            <div className="flex flex-col items-center">
              <span>{slot.time}</span>
              {slot.price && (
                <span className="text-xs mt-1">
                  {selected ? '✓ ' : ''}₹{slot.price}
                </span>
              )}
              {slot.availability !== undefined && (
                <span className={`text-xs mt-1 ${slot.availability === 0 ? 'text-red-500' : ''}`}>
                  {slot.availability === 0 
                    ? 'Booked' 
                    : `${slot.availability} available`
                  }
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

TimeSlot.propTypes = {
  slots: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      time: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      availability: PropTypes.number,
    })
  ).isRequired,
  selectedSlots: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onSelectSlot: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  maxSelections: PropTypes.number,
  disabledSlots: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  className: PropTypes.string,
};

export default TimeSlot;
