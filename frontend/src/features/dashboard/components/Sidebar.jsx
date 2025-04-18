import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiHome, 
  FiCalendar, 
  FiSearch, 
  FiHeart, 
  FiCreditCard, 
  FiSettings,
  FiX
} from 'react-icons/fi';
import { slideIn } from '../utils/animationVariants';

const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeTab, 
  handleTabChange, 
  isMobile 
}) => {
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="bg-white w-64 shadow-md z-20 h-full fixed md:relative"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-green-600">TurfBooker</h1>
          {isMobile && (
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          )}
        </div>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabChange('home')}
              className={`flex items-center w-full p-3 rounded-lg ${
                activeTab === 'home' 
                  ? 'bg-green-100 text-green-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiHome className="mr-3" />
              <span>Dashboard</span>
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTabChange('bookings')}
              className={`flex items-center w-full p-3 rounded-lg ${
                activeTab === 'bookings' 
                  ? 'bg-green-100 text-green-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiCalendar className="mr-3" />
              <span>My Bookings</span>
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <FiSearch className="mr-3" />
              <span>Find Turfs</span>
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <FiHeart className="mr-3" />
              <span>Favorites</span>
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <FiCreditCard className="mr-3" />
              <span>Payments</span>
            </motion.button>
          </li>
          <li>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <FiSettings className="mr-3" />
              <span>Settings</span>
            </motion.button>
          </li>
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar; 