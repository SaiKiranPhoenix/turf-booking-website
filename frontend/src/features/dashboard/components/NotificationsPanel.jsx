import React from 'react';
import { motion } from 'framer-motion';
import { mockNotifications } from '../data/mockData';

const NotificationsPanel = ({ notificationsOpen, markAllAsRead }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="absolute top-16 right-4 w-80 bg-white rounded-lg shadow-lg z-20 border border-gray-200"
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">Notifications</h3>
        <button 
          onClick={markAllAsRead}
          className="text-sm text-green-600 hover:text-green-800"
        >
          Mark all as read
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {mockNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: notification.id * 0.1 }}
            className={`p-4 border-b border-gray-100 ${!notification.read ? 'bg-green-50' : ''}`}
          >
            <p className="text-sm text-gray-800">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationsPanel; 