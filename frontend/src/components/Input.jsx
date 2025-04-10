import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Input = ({
  id,
  name,
  type = 'text',
  label,
  placeholder = '',
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  disabled = false,
  className = '',
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasError = touched && error;

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

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
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          className={`
            block w-full rounded-md shadow-sm 
            ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 
            border ${hasError 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
            }
            ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}
            transition-all duration-200
          `}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
      </div>
      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'time']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
};

export default Input;
