import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  autoClose = false,
  autoCloseTime = 5000,
  showIcon = true,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Configure autoClose
  useEffect(() => {
    if (autoClose && autoCloseTime > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, autoCloseTime);
      
      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, onClose]);
  
  // Handle manual close
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };
  
  if (!isVisible) return null;
  
  // Styles based on alert type
  const types = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-400',
      text: 'text-green-800',
      icon: (
        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-400',
      text: 'text-red-800',
      icon: (
        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-400',
      text: 'text-yellow-800',
      icon: (
        <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-400',
      text: 'text-blue-800',
      icon: (
        <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
  };
  
  const currentType = types[type];
  
  return (
    <div className={`rounded-md border p-4 ${currentType.bg} ${currentType.border} ${className}`}>
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            {currentType.icon}
          </div>
        )}
        <div className={`${showIcon ? 'ml-3' : ''} flex-1`}>
          <div className="flex justify-between items-center">
            <div>
              {title && (
                <h3 className={`text-sm font-medium ${currentType.text}`}>
                  {title}
                </h3>
              )}
              {message && (
                <div className={`mt-1 text-sm ${currentType.text}`}>
                  {typeof message === 'string' ? <p>{message}</p> : message}
                </div>
              )}
            </div>
            
            <div className="pl-3 ml-auto">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={handleClose}
                  className={`inline-flex rounded-md p-1.5 ${currentType.text} hover:bg-opacity-20 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${type}-500`}
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  title: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  autoClose: PropTypes.bool,
  autoCloseTime: PropTypes.number,
  showIcon: PropTypes.bool,
  className: PropTypes.string,
};

export default Alert;
