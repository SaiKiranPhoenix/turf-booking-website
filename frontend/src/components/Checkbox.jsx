import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  onBlur,
  error,
  touched,
  disabled = false,
  className = '',
}) => {
  const hasError = touched && error;

  return (
    <div className={`mb-2 ${className}`}>
      <div className="flex items-center">
        <input
          id={id || name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`
            h-4 w-4 rounded
            ${hasError 
              ? 'border-red-500 text-red-600 focus:ring-red-500' 
              : 'border-gray-300 text-green-600 focus:ring-green-500'
            }
            ${disabled ? 'bg-gray-100' : ''}
          `}
        />
        {label && (
          <label
            htmlFor={id || name}
            className={`ml-2 block text-sm ${disabled ? 'text-gray-500' : 'text-gray-700'}`}
          >
            {label}
          </label>
        )}
      </div>
      {hasError && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Checkbox;
