import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Alert = ({ type = 'info', message, onClose, className = '' }) => {
  const alertStyles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  const icons = {
    success: <FiCheckCircle className="h-5 w-5" />,
    error: <FiAlertCircle className="h-5 w-5" />,
    warning: <FiAlertCircle className="h-5 w-5" />,
    info: <FiInfo className="h-5 w-5" />,
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={`rounded-md border p-4 ${alertStyles[type]} ${className}`}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              {icons[type]}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{message}</p>
            </div>
            {onClose && (
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${type === 'success' ? 'focus:ring-green-500 focus:ring-offset-green-50' : ''}
                      ${type === 'error' ? 'focus:ring-red-500 focus:ring-offset-red-50' : ''}
                      ${type === 'warning' ? 'focus:ring-yellow-500 focus:ring-offset-yellow-50' : ''}
                      ${type === 'info' ? 'focus:ring-blue-500 focus:ring-offset-blue-50' : ''}
                    `}
                  >
                    <span className="sr-only">Dismiss</span>
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  message: PropTypes.string,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default Alert;
