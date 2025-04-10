import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = ({
  id,
  name,
  label,
  selected,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  minDate = new Date(),
  maxDate,
  minTime,
  maxTime,
  timeIntervals = 60,
  excludeTimes = [],
  excludeDates = [],
  placeholderText = 'Select date and time',
  showTimeSelect = true,
  disabled = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = touched && error;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <DatePicker
        id={id || name}
        name={name}
        selected={selected}
        onChange={onChange}
        onBlur={() => {
          setIsFocused(false);
          if (onBlur) onBlur({ target: { name } });
        }}
        onFocus={() => setIsFocused(true)}
        dateFormat="MMMM d, yyyy h:mm aa"
        minDate={minDate}
        maxDate={maxDate}
        minTime={minTime}
        maxTime={maxTime}
        timeIntervals={timeIntervals}
        excludeTimes={excludeTimes}
        excludeDates={excludeDates}
        showTimeSelect={showTimeSelect}
        placeholderText={placeholderText}
        disabled={disabled}
        className={`
          block w-full rounded-md shadow-sm 
          px-3 py-2 
          border ${hasError 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
          }
          ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}
          transition-all duration-200
        `}
      />
      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

DateTimePicker.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  required: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minTime: PropTypes.instanceOf(Date),
  maxTime: PropTypes.instanceOf(Date),
  timeIntervals: PropTypes.number,
  excludeTimes: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  excludeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  placeholderText: PropTypes.string,
  showTimeSelect: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default DateTimePicker;
