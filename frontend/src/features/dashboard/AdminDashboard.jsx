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
} from 'react-icons/fi';
import {
  FaFutbol,
  FaVolleyballBall,
  FaBasketballBall,
  FaRunning,
} from 'react-icons/fa';
import { MdSportsTennis } from 'react-icons/md';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '../../components/Button';
import Input from '../../components/Input';
import AdminBookingsTab from './components/AdminBookingsTab';
import ThemeToggle from '../../components/ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

// Mock data for demonstration
const mockStats = [
  { id: 1, title: 'Total Bookings', value: '136', icon: <FiCalendar />, color: 'bg-blue-100 text-blue-600' },
  { id: 2, title: 'Revenue', value: '₹24,500', icon: <FiDollarSign />, color: 'bg-green-100 text-green-600' },
  { id: 3, title: 'Total Hours', value: '182', icon: <FiClock />, color: 'bg-purple-100 text-purple-600' },
  { id: 4, title: 'Customers', value: '84', icon: <FiUsers />, color: 'bg-orange-100 text-orange-600' },
];

const mockRecentBookings = [
  { id: 1, customer: 'Rahul Sharma', turf: 'Football Field 1', date: '10 Apr, 2025', time: '6:00 PM - 7:00 PM', status: 'Confirmed', sport: 'Football' },
  { id: 2, customer: 'Priya Patel', turf: 'Cricket Pitch 2', date: '10 Apr, 2025', time: '7:30 PM - 9:30 PM', status: 'Pending', sport: 'Cricket' },
  { id: 3, customer: 'Amit Singh', turf: 'Basketball Court', date: '11 Apr, 2025', time: '5:00 PM - 6:30 PM', status: 'Confirmed', sport: 'Basketball' },
  { id: 4, customer: 'Neha Gupta', turf: 'Tennis Court 1', date: '12 Apr, 2025', time: '8:00 AM - 10:00 AM', status: 'Cancelled', sport: 'Tennis' },
  { id: 5, customer: 'Kiran Kumar', turf: 'Football Field 2', date: '13 Apr, 2025', time: '7:00 PM - 8:00 PM', status: 'Confirmed', sport: 'Football' },
];

const mockNotifications = [
  { id: 1, message: 'New booking request from Rahul Sharma', time: '10 minutes ago', read: false },
  { id: 2, message: 'Priya Patel cancelled their booking', time: '1 hour ago', read: false },
  { id: 3, message: 'Payment received from Amit Singh', time: '3 hours ago', read: true },
  { id: 4, message: 'Maintenance scheduled for Football Field 1', time: 'Yesterday', read: true },
];

const mockAvailableTurfs = [
  { id: 1, name: 'Football Field 1', sport: 'Football', icon: <FaFutbol /> },
  { id: 2, name: 'Cricket Pitch', sport: 'Cricket', icon: <FaRunning /> },
  { id: 3, name: 'Basketball Court', sport: 'Basketball', icon: <FaBasketballBall /> },
  { id: 4, name: 'Tennis Court', sport: 'Tennis', icon: <MdSportsTennis /> },
  { id: 5, name: 'Volleyball Court', sport: 'Volleyball', icon: <FaVolleyballBall /> },
];

const AdminDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useTheme();

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

  // Mark all notifications as read
  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  // Get status color based on booking status
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Sport icon mapper
  const getSportIcon = (sport) => {
    switch (sport) {
      case 'Football':
        return <FaFutbol className="text-green-600" />;
      case 'Cricket':
        return <FaRunning className="text-blue-600" />;
      case 'Basketball':
        return <FaBasketballBall className="text-orange-600" />;
      case 'Tennis':
        return <MdSportsTennis className="text-yellow-600" />;
      case 'Volleyball':
        return <FaVolleyballBall className="text-red-600" />;
      default:
        return <FaRunning className="text-gray-600" />;
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <section className="mb-8">
              <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white shadow-lg">
                <div className="max-w-2xl">
                  <h1 className="text-3xl font-bold mb-2">Welcome to SportNest!</h1>
                  <p className="opacity-90 mb-6">
                    Manage your turf bookings, track performance, and grow your business all in one place.
                  </p>
                  <Button className="bg-white border border-white text-green-700 hover:bg-green-50 transition-colors duration-200">
                    <span>Create New Booking</span>
                    <FiPlus className="ml-2" />
                  </Button>
                </div>
              </div>
            </section>

            {/* Stats Grid */}
            <section className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockStats.map((stat) => (
                  <motion.div
                    key={stat.id}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-lg ${stat.color} mr-4 flex items-center justify-center`}>
                          <span className="flex items-center justify-center w-6 h-6">{stat.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-700 truncate">
                            {stat.title}
                          </h3>
                          <p className="text-2xl font-bold text-gray-900 truncate">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="text-green-500 flex items-center mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                            />
                          </svg>
                          12%
                        </span>
                        <span>from last month</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Recent Bookings */}
            <section className="mb-8">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Turf Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sport
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockRecentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <span className="text-gray-600 font-medium">
                                  {booking.customer[0]}
                                </span>
                              </div>
                              <div className="ml-4 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {booking.customer}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.turf}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.date}</div>
                            <div className="text-sm text-gray-500">{booking.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center space-x-2">
                              <span className="flex items-center justify-center w-5 h-5">{getSportIcon(booking.sport)}</span>
                              <span className="truncate">{booking.sport}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Notifications and Available Turfs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Notifications */}
              <section>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
                      <button className="text-sm text-green-600 hover:text-green-700">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {mockNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-6 ${
                          !notification.read ? 'bg-green-50' : ''
                        }`}
                      >
                        <div className="flex space-x-3">
                          <div className="flex-1">
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="mt-1 text-sm text-gray-500">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Available Turfs */}
              <section>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Available Turfs</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {mockAvailableTurfs.map((turf) => (
                        <div key={turf.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                <span className="flex items-center justify-center">{turf.icon}</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{turf.name}</p>
                              <p className="text-sm text-gray-500">{turf.sport}</p>
                            </div>
                          </div>
                          <button className="text-green-600 hover:text-green-700">
                            View Details
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        );
      case 'bookings':
        return <AdminBookingsTab />;
      case 'turfs':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">My Turfs</h2>
              <div className="h-[600px] flex items-center justify-center">
                <p className="text-gray-500">Turfs management coming soon...</p>
              </div>
            </div>
          </div>
        );
      case 'customers':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Customers</h2>
              <div className="h-[600px] flex items-center justify-center">
                <p className="text-gray-500">Customer management coming soon...</p>
              </div>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Reports</h2>
              <div className="h-[600px] flex items-center justify-center">
                <p className="text-gray-500">Reports coming soon...</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex h-screen bg-gray-100 overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: isMobile ? -280 : 0, opacity: isMobile ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`${
              isMobile ? 'fixed z-50 shadow-2xl' : 'relative'
            } w-64 bg-white h-full border-r border-gray-200 flex flex-col`}
          >
            {/* Logo and Title */}
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 text-white p-2 rounded-lg flex items-center justify-center">
                  <FaFutbol size={24} />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">SportNest</h1>
              </div>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-5 right-5 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-5 space-y-1 overflow-y-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'overview'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiCalendar size={18} className="mr-3" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'bookings'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiClock size={18} className="mr-3" />
                <span>Bookings</span>
              </button>
              <button
                onClick={() => setActiveTab('turfs')}
                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'turfs'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FaRunning size={18} className="mr-3" />
                <span>My Turfs</span>
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'customers'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiUsers size={18} className="mr-3" />
                <span>Customers</span>
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                  activeTab === 'reports'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiDollarSign size={18} className="mr-3" />
                <span>Reports</span>
              </button>
            </nav>

            {/* User profile */}
            <div className="p-5 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="User profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-800">Admin User</p>
                  <p className="text-sm text-gray-500">admin@sportnest.com</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-500 hover:text-gray-700 mr-4 flex items-center justify-center"
              >
                <FiMenu size={24} />
              </button>
            )}
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <Input
                type="text"
                name="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            </div>

            {/* Dark mode toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="text-gray-500 hover:text-gray-700 relative flex items-center justify-center"
              >
                <FiBell size={24} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                        >
                          <p className="text-gray-800 dark:text-gray-200">{notification.message}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 text-center">
                      <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center justify-center">
              <FiSettings size={24} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Custom styles for the calendar */}
      <style>
        {`
          .custom-calendar {
            width: 100%;
            border: none;
            font-family: inherit;
          }

          .custom-calendar .react-calendar__tile--active {
            background: #16a34a;
            color: white;
          }

          .custom-calendar .react-calendar__tile--now {
            background: #dcfce7;
          }

          .custom-calendar .react-calendar__tile:hover {
            background: #f0fdf4;
          }

          .custom-calendar .react-calendar__navigation button:hover {
            background: #f0fdf4;
          }

          .custom-calendar .react-calendar__navigation {
            margin-bottom: 1rem;
          }

          .custom-calendar .react-calendar__month-view__weekdays {
            text-transform: uppercase;
            font-weight: bold;
          }

          .custom-calendar .react-calendar__month-view__days__day--weekend {
            color: #ef4444;
          }

          .custom-calendar button {
            border-radius: 0.375rem;
            padding: 0.5rem;
          }

          /* Dark mode styles for calendar */
          .dark .custom-calendar {
            background-color: #1f2937;
            color: #f3f4f6;
          }

          .dark .custom-calendar .react-calendar__navigation button {
            color: #f3f4f6;
          }

          .dark .custom-calendar .react-calendar__month-view__weekdays__weekday {
            color: #9ca3af;
          }

          .dark .custom-calendar .react-calendar__tile {
            color: #f3f4f6;
            background-color: #1f2937;
          }

          .dark .custom-calendar .react-calendar__tile:enabled:hover {
            background-color: #374151;
          }

          .dark .custom-calendar .react-calendar__tile--now {
            background-color: #374151;
          }

          .dark .custom-calendar .react-calendar__tile--active {
            background-color: #16a34a;
            color: white;
          }

          /* Additional dark mode styles */
          .dark .react-calendar {
            background-color: #1f2937;
            border-color: #374151;
          }

          .dark .react-calendar__month-view__weekdays__weekday abbr {
            text-decoration: none;
          }

          .dark .react-calendar__month-view__days__day--neighboringMonth {
            color: #6b7280;
          }
        `}
      </style>
    </div>
  );
};

export default AdminDashboard;