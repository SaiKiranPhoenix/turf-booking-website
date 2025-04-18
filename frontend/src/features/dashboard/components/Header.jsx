import React from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiSearch, FiBell, FiUser } from 'react-icons/fi';

const Header = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  searchQuery, 
  setSearchQuery, 
  notificationsOpen, 
  setNotificationsOpen, 
  unreadCount 
}) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {!sidebarOpen && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(true)}
              className="mr-4 text-gray-700"
            >
              <FiMenu size={24} />
            </motion.button>
          )}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search turfs, events..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative text-gray-700"
          >
            <FiBell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </motion.button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
              <FiUser />
            </div>
            <span className="text-gray-700 font-medium">Rahul</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header; 