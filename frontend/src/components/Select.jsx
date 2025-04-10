import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = 'Select an option',
  error,
  touched,
  required = false,
  disabled = false,
  className = '',
}) => {
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
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`
          block w-full rounded-md shadow-sm 
          pl-3 pr-10 py-2
          border ${hasError 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-green-500 focus:border-green-500'
          }
          ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}
          ${!value ? 'text-gray-400' : 'text-gray-900'}
          transition-all duration-200
        `}
        aria-invalid={hasError ? 'true' : 'false'}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;
