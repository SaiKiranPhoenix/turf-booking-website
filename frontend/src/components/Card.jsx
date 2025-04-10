import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  title,
  subtitle,
  children,
  image,
  footer,
  onClick,
  className = '',
  shadow = 'md',
  padding = 'md',
  rounded = 'md',
  hover = false,
}) => {
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const roundings = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={`
        bg-white 
        ${shadows[shadow]} 
        ${roundings[rounded]} 
        overflow-hidden 
        ${hover ? 'transition-all duration-200 hover:shadow-lg' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {image && (
        <div className="relative w-full h-48">
          <img
            src={image}
            alt={title || 'Card image'}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className={paddings[padding]}>
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {title}
          </h3>
        )}
        
        {subtitle && (
          <p className="text-sm text-gray-600 mb-4">
            {subtitle}
          </p>
        )}
        
        <div className="text-gray-800">
          {children}
        </div>
      </div>
      
      {footer && (
        <div className={`border-t border-gray-200 ${paddings[padding]} bg-gray-50`}>
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  children: PropTypes.node,
  image: PropTypes.string,
  footer: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', 'full']),
  hover: PropTypes.bool,
};

export default Card;
