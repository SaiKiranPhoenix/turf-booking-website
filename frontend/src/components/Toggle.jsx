import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
  size = 'md',
  labelPosition = 'right',
  className = '',
}) => {
  const sizes = {
    sm: {
      toggle: 'w-8 h-4',
      dot: 'h-3 w-3 translate-x-3.5',
      label: 'text-sm',
    },
    md: {
      toggle: 'w-11 h-6',
      dot: 'h-5 w-5 translate-x-5',
      label: 'text-base',
    },
    lg: {
      toggle: 'w-14 h-7',
      dot: 'h-6 w-6 translate-x-7',
      label: 'text-lg',
    },
  };
  
  const currentSize = sizes[size];
  
  return (
    <div className={`flex items-center ${className}`}>
      {label && labelPosition === 'left' && (
        <label 
          htmlFor={id || name} 
          className={`${currentSize.label} mr-3 cursor-pointer ${
            disabled 
              ? 'text-gray-500 dark:text-gray-600' 
              : 'text-gray-900 dark:text-gray-100'
          }`}
        >
          {label}
        </label>
      )}
      
      <div className="relative inline-block">
        <input
          type="checkbox"
          id={id || name}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <div 
          className={`
            ${currentSize.toggle} 
            ${checked 
              ? 'bg-green-600 dark:bg-green-500' 
              : 'bg-gray-200 dark:bg-gray-700'
            } 
            rounded-full cursor-pointer transition-colors ease-in-out duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div 
            className={`
              ${currentSize.dot} 
              bg-white dark:bg-gray-100 rounded-full shadow transform transition ease-in-out duration-200
              ${checked ? currentSize.dot : 'translate-x-0.5'}
            `}
          />
        </div>
      </div>
      
      {label && labelPosition === 'right' && (
        <label 
          htmlFor={id || name} 
          className={`${currentSize.label} ml-3 cursor-pointer ${
            disabled 
              ? 'text-gray-500 dark:text-gray-600' 
              : 'text-gray-900 dark:text-gray-100'
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

Toggle.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  labelPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

export default Toggle;
