import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar,
  FiClock,
  FiUsers,
  FiDollarSign,
  FiPlus,
  FiBell,
  FiSettings,
  FiMenu,
  FiX,
  FiChevronRight,
  FiHome,
  FiSearch,
  FiMapPin,
  FiUser,
  FiHeart,
  FiCreditCard,
  FiGrid,
  FiFilter,
  FiInfo,
  FiMessageCircle,
  FiTag,
  FiStar,
  FiPhone,
  FiMail,
  FiEdit
} from 'react-icons/fi';
import {
  FaFutbol,
  FaVolleyballBall,
  FaBasketballBall,
  FaRunning,
  FaStar,
  FaRegStar,
  FaDirections
} from 'react-icons/fa';
import { MdSportsTennis } from 'react-icons/md';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Button from '../../components/Button';
import Input from '../../components/Input';
import BookingsTab from './components/BookingsTab';
import HomeTab from './components/HomeTab';
import FindTurfsTab from './components/FindTurfsTab';
import FavoritesTab from './components/FavoritesTab';
import PaymentsTab from './components/PaymentsTab';
import SettingsTab from './components/SettingsTab';
import { fadeIn, staggerContainer, scaleIn } from './utils/animationVariants';
import { getSportIcon, getStatusColor } from './utils/helpers.jsx';
import { mockBookings, mockUserStats, mockRecommendedTurfs } from './data/mockData.jsx';

// Mock data for demonstration
const mockUserBookings = [
  { id: 1, turf: 'Football Field 1', date: '18 Apr, 2025', time: '6:00 PM - 7:00 PM', status: 'Upcoming', sport: 'Football', location: 'Central Sports Complex', price: '₹750', isPaid: true },
  { id: 2, turf: 'Tennis Court 3', date: '21 Apr, 2025', time: '7:30 AM - 9:00 AM', status: 'Upcoming', sport: 'Tennis', location: 'Green Valley Club', price: '₹900', isPaid: false },
  { id: 3, turf: 'Basketball Court', date: '15 Apr, 2025', time: '5:00 PM - 6:30 PM', status: 'Completed', sport: 'Basketball', location: 'City Sports Arena', price: '₹600', isPaid: true },
  { id: 4, turf: 'Cricket Pitch 2', date: '10 Apr, 2025', time: '4:00 PM - 6:00 PM', status: 'Completed', sport: 'Cricket', location: 'Stadium Complex', price: '₹1200', isPaid: true },
  { id: 5, turf: 'Football Field 2', date: '5 Apr, 2025', time: '7:00 PM - 8:00 PM', status: 'Cancelled', sport: 'Football', location: 'Central Sports Complex', price: '₹750', isPaid: false },
];

const mockNotifications = [
  { id: 1, message: 'Your booking for Tennis Court has been confirmed.', time: '10 minutes ago', read: false },
  { id: 2, message: 'Special 20% discount on morning slots!', time: '1 hour ago', read: false },
  { id: 3, message: 'Your payment of ₹750 has been received.', time: '3 hours ago', read: true },
  { id: 4, message: 'Reminder: Your booking is tomorrow at 6:00 PM.', time: 'Yesterday', read: true },
];

const mockAvailableTurfs = [
  { 
    id: 1, 
    name: 'Premier Football Ground', 
    sport: 'Football', 
    icon: <FaFutbol />,
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e',
    rating: 4,
    location: 'Central Sports Complex',
    price: 750,
    amenities: ['Changing Rooms', 'Parking', 'Floodlights']
  },
  { 
    id: 2, 
    name: 'Cricket Pavilion', 
    sport: 'Cricket', 
    icon: <FaRunning />,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
    rating: 5,
    location: 'Stadium Complex',
    price: 1200,
    amenities: ['Changing Rooms', 'Parking', 'Floodlights', 'Refreshments']
  },
  { 
    id: 3, 
    name: 'Pro Basketball Arena', 
    sport: 'Basketball', 
    icon: <FaBasketballBall />,
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf',
    rating: 3,
    location: 'City Sports Arena',
    price: 600,
    amenities: ['Changing Rooms', 'Parking', 'Water Dispenser']
  },
  { 
    id: 4, 
    name: 'Ace Tennis Court', 
    sport: 'Tennis', 
    icon: <MdSportsTennis />,
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0',
    rating: 4,
    location: 'Green Valley Club',
    price: 900,
    amenities: ['Changing Rooms', 'Parking', 'Equipment Rental']
  },
  { 
    id: 5, 
    name: 'Beachside Volleyball', 
    sport: 'Volleyball', 
    icon: <FaVolleyballBall />,
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1',
    rating: 4,
    location: 'Beach Sports Zone',
    price: 550,
    amenities: ['Changing Rooms', 'Refreshments', 'Evening Lights']
  },
  { 
    id: 6, 
    name: 'Elite Football Field', 
    sport: 'Football', 
    icon: <FaFutbol />,
    image: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460',
    rating: 5,
    location: 'Premium Sports Club',
    price: 950,
    amenities: ['Changing Rooms', 'Parking', 'Floodlights', 'Personal Coach', 'Refreshments']
  },
];

const UserDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [activeTab, setActiveTab] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const [sportFilter, setSportFilter] = useState('All');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if viewport is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Mark all notifications as read
  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  // View booking details
  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setBookingDetailsOpen(true);
  };

  // Close booking details modal
  const closeBookingDetails = () => {
    setBookingDetailsOpen(false);
    setTimeout(() => setSelectedBooking(null), 300);
  };

  // Handle tab change with animation
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab viewBookingDetails={viewBookingDetails} mockAvailableTurfs={mockAvailableTurfs} />;
      case 'bookings':
        return <BookingsTab />;
      case 'find-turfs':
        return <FindTurfsTab />;
      case 'favorites':
        return <FavoritesTab />;
      case 'payments':
        return <PaymentsTab />;
      case 'settings':
        return <SettingsTab />;
      case 'calendar':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
            className="space-y-8"
          >
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
              <div className="h-[600px] flex items-center justify-center">
                <p className="text-gray-500">Calendar view coming soon...</p>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-white w-64 shadow-md z-20 h-full fixed md:relative"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-green-600">SportNest</h1>
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
                    onClick={() => handleTabChange('find-turfs')}
                    className={`flex items-center w-full p-3 rounded-lg ${
                      activeTab === 'find-turfs' 
                        ? 'bg-green-100 text-green-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiSearch className="mr-3" />
                    <span>Find Turfs</span>
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTabChange('favorites')}
                    className={`flex items-center w-full p-3 rounded-lg ${
                      activeTab === 'favorites' 
                        ? 'bg-green-100 text-green-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiHeart className="mr-3" />
                    <span>Favorites</span>
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTabChange('payments')}
                    className={`flex items-center w-full p-3 rounded-lg ${
                      activeTab === 'payments' 
                        ? 'bg-green-100 text-green-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiCreditCard className="mr-3" />
                    <span>Payments</span>
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTabChange('settings')}
                    className={`flex items-center w-full p-3 rounded-lg ${
                      activeTab === 'settings' 
                        ? 'bg-green-100 text-green-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiSettings className="mr-3" />
                    <span>Settings</span>
                  </motion.button>
                </li>
                {/* Mobile Profile - Only visible on mobile */}
                <li className="md:hidden border-t border-gray-200 pt-2 mt-2">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center w-full p-3 rounded-lg text-gray-700"
                  >
                    <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white mr-3">
                      <FiUser />
                    </div>
                    <span>Rahul</span>
                  </motion.div>
                </li>
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
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
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-48 md:w-64"
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
                className="hidden md:flex items-center space-x-2 cursor-pointer"
              >
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                  <FiUser />
                </div>
                <span className="text-gray-700 font-medium">Rahul</span>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Notifications Panel */}
        <AnimatePresence>
          {notificationsOpen && (
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
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-64"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {bookingDetailsOpen && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeBookingDetails}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                    {getSportIcon(selectedBooking.sport)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{selectedBooking.turf}</h3>
                    <p className="text-sm text-gray-500">{selectedBooking.location}</p>
                  </div>
                </div>
                <button 
                  onClick={closeBookingDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center mb-3">
                  <FiCalendar className="text-gray-400 mr-2" />
                  <span className="text-gray-700">{selectedBooking.date}</span>
                </div>
                <div className="flex items-center mb-3">
                  <FiClock className="text-gray-400 mr-2" />
                  <span className="text-gray-700">{selectedBooking.time}</span>
                </div>
                <div className="flex items-center mb-3">
                  <FiDollarSign className="text-gray-400 mr-2" />
                  <span className="text-gray-700">{selectedBooking.price}</span>
                </div>
                <div className="flex items-center mb-4">
                  <div className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </div>
                  <div className="ml-auto">
                    <span className={`text-sm ${selectedBooking.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedBooking.isPaid ? 'Paid' : 'Payment Pending'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Edit Booking
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                  >
                    Cancel Booking
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDashboard;