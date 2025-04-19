import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiBell,
  FiGlobe,
  FiShield,
  FiCreditCard,
  FiHelpCircle,
  FiLogOut,
  FiEdit,
  FiCheck,
  FiX
} from 'react-icons/fi';
import Button from '../../../components/Button';
import { fadeIn, staggerContainer, scaleIn } from '../utils/animationVariants';

// Mock user data
const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  location: 'Mumbai, India',
  language: 'English',
  notifications: {
    email: true,
    push: true,
    sms: false,
    marketing: true
  },
  security: {
    twoFactor: false,
    loginAlerts: true
  }
};

const SettingsTab = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userData, setUserData] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...mockUserData });

  const handleEdit = () => {
    setEditData({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setEditData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleSecurityChange = (type) => {
    setEditData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [type]: !prev.security[type]
      }
    }));
  };

  const renderProfileSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Profile Information</h3>
        {!isEditing ? (
          <Button
            onClick={handleEdit}
            className="flex items-center text-green-600 hover:text-green-700"
          >
            <FiEdit className="mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-3">
            <Button
              onClick={handleSave}
              className="flex items-center text-green-600 hover:text-green-700"
            >
              <FiCheck className="mr-2" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <FiX className="mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            {isEditing ? (
              <input
                type="email"
                value={editData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.phone}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <p className="text-gray-800">{userData.location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            {isEditing ? (
              <select
                value={editData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            ) : (
              <p className="text-gray-800">{userData.language}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderNotificationsSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-800">Notification Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center">
            <FiMail className="text-gray-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-800">Email Notifications</h4>
              <p className="text-sm text-gray-500">Receive booking confirmations and updates via email</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={editData.notifications.email}
              onChange={() => handleNotificationChange('email')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center">
            <FiBell className="text-gray-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-800">Push Notifications</h4>
              <p className="text-sm text-gray-500">Get instant updates about your bookings</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={editData.notifications.push}
              onChange={() => handleNotificationChange('push')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center">
            <FiPhone className="text-gray-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-800">SMS Notifications</h4>
              <p className="text-sm text-gray-500">Receive booking reminders via SMS</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={editData.notifications.sms}
              onChange={() => handleNotificationChange('sms')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center">
            <FiMail className="text-gray-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-800">Marketing Emails</h4>
              <p className="text-sm text-gray-500">Receive updates about new features and offers</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={editData.notifications.marketing}
              onChange={() => handleNotificationChange('marketing')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>
    </motion.div>
  );

  const renderSecuritySection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-gray-800">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center">
            <FiShield className="text-gray-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-800">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={editData.security.twoFactor}
              onChange={() => handleSecurityChange('twoFactor')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center">
            <FiBell className="text-gray-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-800">Login Alerts</h4>
              <p className="text-sm text-gray-500">Get notified about new sign-ins to your account</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={editData.security.loginAlerts}
              onChange={() => handleSecurityChange('loginAlerts')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div className="p-4 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <FiLock className="text-gray-600 mr-3" />
            <div>
              <h4 className="font-medium text-gray-800">Change Password</h4>
              <p className="text-sm text-gray-500">Update your account password</p>
            </div>
          </div>
          <Button
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            Change Password
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      className="space-y-8"
    >
      {/* Header Section */}
      <motion.section 
        className="bg-white rounded-xl shadow-sm p-6"
        variants={scaleIn}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </motion.section>

      {/* Settings Navigation */}
      <motion.section 
        className="bg-white rounded-xl shadow-sm p-6"
        variants={scaleIn}
      >
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setActiveSection('profile')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeSection === 'profile'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiUser className="inline-block mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveSection('notifications')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeSection === 'notifications'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiBell className="inline-block mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveSection('security')}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeSection === 'security'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FiShield className="inline-block mr-2" />
            Security
          </button>
        </div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === 'profile' && renderProfileSection()}
          {activeSection === 'notifications' && renderNotificationsSection()}
          {activeSection === 'security' && renderSecuritySection()}
        </AnimatePresence>
      </motion.section>

      {/* Danger Zone */}
      <motion.section 
        className="bg-white rounded-xl shadow-sm p-6 border border-red-100"
        variants={scaleIn}
      >
        <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <FiLogOut className="text-red-600 mr-3" />
              <div>
                <h4 className="font-medium text-red-800">Delete Account</h4>
                <p className="text-sm text-red-600">Permanently delete your account and all data</p>
              </div>
            </div>
            <Button
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default SettingsTab;