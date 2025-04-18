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
    switch(status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Sport icon mapper
  const getSportIcon = (sport) => {
    switch(sport.toLowerCase()) {
      case 'football':
        return <FaFutbol className="text-green-600" />;
      case 'cricket':
        return <FaRunning className="text-blue-600" />;
      case 'basketball':
        return <FaBasketballBall className="text-orange-600" />;
      case 'tennis':
        return <MdSportsTennis className="text-yellow-600" />;
      case 'volleyball':
        return <FaVolleyballBall className="text-red-600" />;
      default:
        return <FaRunning className="text-gray-600" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
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
                <div className="bg-green-600 text-white p-2 rounded-lg">
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
                className="text-gray-500 hover:text-gray-700 mr-4"
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
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">
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

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="text-gray-500 hover:text-gray-700 relative"
              >
                <FiBell size={24} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50"
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
                    <div className="max-h-96 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <p className="text-gray-800">{notification.message}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-gray-50 text-center">
                      <button className="text-sm text-green-600 hover:text-green-800">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <button className="text-gray-500 hover:text-gray-700">
              <FiSettings size={24} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="container mx-auto"
            >
              {/* Welcome Section */}
              <section className="mb-8">
                <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white shadow-lg">
                  <div className="max-w-2xl">
                    <h1 className="text-3xl font-bold mb-2">Welcome to SportNest!</h1>
                    <p className="opacity-90 mb-6">
                      Manage your turf bookings, track performance, and grow your business all in one place.
                    </p>
                    <Button className="border border-white text-green-700  transition-colors duration-200">
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
                          <div className={`p-3 rounded-lg ${stat.color} mr-4`}>
                            {stat.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-700">
                              {stat.title}
                            </h3>
                            <p className="text-2xl font-bold text-gray-900">
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
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                              />
                            </svg>
                            <span className="ml-1">12%</span>
                          </span>
                          <span>from last month</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Two column layout for calendar and quick actions */}
              <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Booking Calendar</h2>
                    <div className="flex space-x-2">
                      <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm">
                        Day
                      </Button>
                      <Button className="bg-green-600 text-white hover:bg-green-700 text-sm">
                        Week
                      </Button>
                      <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm">
                        Month
                      </Button>
                    </div>
                  </div>
                  <div className="calendar-container">
                    <Calendar
                      onChange={setDate}
                      value={date}
                      className="custom-calendar"
                    />
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Booked</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Pending</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                      <span className="text-sm text-gray-600">Maintenance</span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Available Turfs</h2>
                  <div className="space-y-4">
                    {mockAvailableTurfs.map((turf) => (
                      <motion.div
                        key={turf.id}
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-green-50 transition-colors duration-200"
                      >
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-white shadow-sm mr-3">
                            {turf.icon}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{turf.name}</p>
                            <p className="text-sm text-gray-500">{turf.sport}</p>
                          </div>
                        </div>
                        <FiChevronRight className="text-gray-400" />
                      </motion.div>
                    ))}
                  </div>
                  <Button className="mt-6 w-full bg-green-600 text-white hover:bg-green-700">
                    View All Turfs
                  </Button>
                </div>
              </section>

              {/* Recent Bookings */}
              <section className="mb-8">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
                      <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm">
                        View All
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Turf & Sport
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockRecentBookings.map((booking) => (
                          <motion.tr 
                            key={booking.id}
                            whileHover={{ backgroundColor: '#f9fafb' }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                  {booking.customer.charAt(0)}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="mr-2">
                                  {getSportIcon(booking.sport)}
                                </div>
                                <div>
                                  <div className="text-sm text-gray-900">{booking.turf}</div>
                                  <div className="text-sm text-gray-500">{booking.sport}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {booking.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {booking.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                              <button className="text-red-600 hover:text-red-900">Cancel</button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                    <p className="text-sm text-gray-500">Showing 5 of 24 bookings</p>
                    <div className="flex space-x-1">
                      <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm px-2 py-1">
                        Previous
                      </Button>
                      <Button className="bg-green-600 text-white hover:bg-green-700 text-sm px-3 py-1">
                        1
                      </Button>
                      <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm px-3 py-1">
                        2
                      </Button>
                      <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm px-3 py-1">
                        3
                      </Button>
                      <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm px-2 py-1">
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
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
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default AdminDashboard;
