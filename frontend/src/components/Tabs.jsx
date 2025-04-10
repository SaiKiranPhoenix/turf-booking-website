import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Tabs = ({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default',
  orientation = 'horizontal',
  className = '',
}) => {
  // Use internal state if component is uncontrolled
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;
  
  // Handle tab change
  const handleTabChange = (index) => {
    if (!isControlled) {
      setInternalActiveTab(index);
    }
    
    if (onChange) {
      onChange(index);
    }
  };
  
  const variants = {
    default: {
      tabList: 'flex border-b border-gray-200',
      tab: (isActive) => `
        py-2 px-4 text-sm font-medium cursor-pointer
        ${isActive 
          ? 'border-b-2 border-green-500 text-green-600'
          : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
        }
      `,
      tabContent: 'mt-4',
    },
    boxed: {
      tabList: 'flex space-x-1 p-1 bg-gray-100 rounded-xl',
      tab: (isActive) => `
        py-2 px-4 text-sm font-medium rounded-lg cursor-pointer
        ${isActive 
          ? 'bg-white shadow text-gray-800'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
        }
      `,
      tabContent: 'mt-4',
    },
    pills: {
      tabList: 'flex space-x-2',
      tab: (isActive) => `
        py-2 px-4 text-sm font-medium rounded-full cursor-pointer
        ${isActive 
          ? 'bg-green-500 text-white shadow-sm'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }
      `,
      tabContent: 'mt-4',
    },
  };
  
  const orientations = {
    horizontal: {
      tabList: 'flex',
      wrapper: 'flex-col',
    },
    vertical: {
      tabList: 'flex-col space-y-2',
      wrapper: 'flex flex-row space-x-4',
    },
  };
  
  const currentVariant = variants[variant];
  const currentOrientation = orientations[orientation];
  
  return (
    <div className={`${className}`}>
      <div className={`${currentOrientation.wrapper}`}>
        <div className={`${currentVariant.tabList} ${currentOrientation.tabList}`}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${currentVariant.tab(index === activeTab)}`}
              onClick={() => handleTabChange(index)}
              role="tab"
              aria-selected={index === activeTab}
              aria-controls={`tab-panel-${index}`}
              id={`tab-${index}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className={`${currentVariant.tabContent} flex-1`}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              role="tabpanel"
              aria-labelledby={`tab-${index}`}
              id={`tab-panel-${index}`}
              className={index === activeTab ? '' : 'hidden'}
            >
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.number,
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'boxed', 'pills']),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  className: PropTypes.string,
};

export default Tabs;
