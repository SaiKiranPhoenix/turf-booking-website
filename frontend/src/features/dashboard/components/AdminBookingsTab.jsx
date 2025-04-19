import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiDollarSign,
  FiSearch,
  FiFilter,
  FiCheck,
  FiX,
  FiEdit,
  FiTrash2,
  FiEye,
  FiDownload,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiMail,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi';
import { FaFutbol, FaVolleyballBall, FaBasketballBall, FaRunning } from 'react-icons/fa';
import { MdSportsTennis } from 'react-icons/md';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

// Mock data for bookings
const mockBookings = [
  { 
    id: 1, 
    bookingId: 'BK001', 
    customer: 'Rahul Sharma', 
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    turf: 'Football Field 1', 
    date: '10 Apr, 2025', 
    time: '6:00 PM - 7:00 PM', 
    status: 'Confirmed', 
    sport: 'Football',
    amount: '₹750',
    paymentStatus: 'Paid',
    bookingDate: '05 Apr, 2025'
  },
  { 
    id: 2, 
    bookingId: 'BK002', 
    customer: 'Priya Patel', 
    email: 'priya.patel@example.com',
    phone: '+91 87654 32109',
    turf: 'Cricket Pitch 2', 
    date: '10 Apr, 2025', 
    time: '7:30 PM - 9:30 PM', 
    status: 'Pending', 
    sport: 'Cricket',
    amount: '₹1200',
    paymentStatus: 'Pending',
    bookingDate: '06 Apr, 2025'
  },
  { 
    id: 3, 
    bookingId: 'BK003', 
    customer: 'Amit Singh', 
    email: 'amit.singh@example.com',
    phone: '+91 76543 21098',
    turf: 'Basketball Court', 
    date: '11 Apr, 2025', 
    time: '5:00 PM - 6:30 PM', 
    status: 'Confirmed', 
    sport: 'Basketball',
    amount: '₹600',
    paymentStatus: 'Paid',
    bookingDate: '07 Apr, 2025'
  },
  { 
    id: 4, 
    bookingId: 'BK004', 
    customer: 'Neha Gupta', 
    email: 'neha.gupta@example.com',
    phone: '+91 65432 10987',
    turf: 'Tennis Court 1', 
    date: '12 Apr, 2025', 
    time: '8:00 AM - 10:00 AM', 
    status: 'Cancelled', 
    sport: 'Tennis',
    amount: '₹900',
    paymentStatus: 'Refunded',
    bookingDate: '08 Apr, 2025'
  },
  { 
    id: 5, 
    bookingId: 'BK005', 
    customer: 'Kiran Kumar', 
    email: 'kiran.kumar@example.com',
    phone: '+91 54321 09876',
    turf: 'Football Field 2', 
    date: '13 Apr, 2025', 
    time: '7:00 PM - 8:00 PM', 
    status: 'Confirmed', 
    sport: 'Football',
    amount: '₹750',
    paymentStatus: 'Paid',
    bookingDate: '09 Apr, 2025'
  },
];

const AdminBookingsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sportFilter, setSportFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

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

  // Get payment status color
  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Refunded':
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

  // Filter bookings based on search query and filters
  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch = 
      booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.turf.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;
    const matchesSport = sportFilter === 'All' || booking.sport === sportFilter;
    const matchesDate = !dateFilter || booking.date.includes(dateFilter);
    
    return matchesSearch && matchesStatus && matchesSport && matchesDate;
  });

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc' 
        ? new Date(b.bookingDate) - new Date(a.bookingDate)
        : new Date(a.bookingDate) - new Date(b.bookingDate);
    } else if (sortBy === 'amount') {
      return sortOrder === 'desc'
        ? parseInt(b.amount.replace('₹', '')) - parseInt(a.amount.replace('₹', ''))
        : parseInt(a.amount.replace('₹', '')) - parseInt(b.amount.replace('₹', ''));
    } else {
      return 0;
    }
  });

  // Handle booking action (confirm, cancel, etc.)
  const handleBookingAction = (booking, action) => {
    console.log(`Action ${action} for booking ${booking.bookingId}`);
    // In a real app, this would make an API call to update the booking status
  };

  // View booking details
  const viewBookingDetails = (booking) => {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  };

  // Close booking details modal
  const closeBookingDetails = () => {
    setShowBookingDetails(false);
    setTimeout(() => setSelectedBooking(null), 300);
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Bookings Management</h2>
          <p className="text-gray-600">Manage and track all turf bookings</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <FiCalendar className="mr-2" />
            <span>Export Bookings</span>
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <FiPlus className="mr-2" />
            <span>Create Booking</span>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search by booking ID, customer name, or turf..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FiFilter className="mr-2" />
            <span>Filters</span>
            {showFilters ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
          </Button>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sport
                  </label>
                  <select
                    value={sportFilter}
                    onChange={(e) => setSportFilter(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="All">All Sports</option>
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Volleyball">Volleyball</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Turf & Sport
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.bookingId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                        {booking.customer.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.customer}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2">
                        {getSportIcon(booking.sport)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.turf}</div>
                        <div className="text-sm text-gray-500">{booking.sport}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.date}</div>
                    <div className="text-sm text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.amount}</div>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => viewBookingDetails(booking)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Details"
                      >
                        <FiEye />
                      </button>
                      <button 
                        onClick={() => handleBookingAction(booking, 'edit')}
                        className="text-green-600 hover:text-green-900"
                        title="Edit Booking"
                      >
                        <FiEdit />
                      </button>
                      {booking.status === 'Pending' && (
                        <button 
                          onClick={() => handleBookingAction(booking, 'confirm')}
                          className="text-green-600 hover:text-green-900"
                          title="Confirm Booking"
                        >
                          <FiCheck />
                        </button>
                      )}
                      {booking.status !== 'Cancelled' && (
                        <button 
                          onClick={() => handleBookingAction(booking, 'cancel')}
                          className="text-red-600 hover:text-red-900"
                          title="Cancel Booking"
                        >
                          <FiX />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty state */}
        {sortedBookings.length === 0 && (
          <div className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <FiCalendar className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No bookings found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters to find what you're looking for.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <FiPlus className="mr-2" />
              <span>Create New Booking</span>
            </Button>
          </div>
        )}
        
        {/* Pagination */}
        {sortedBookings.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedBookings.length}</span> of <span className="font-medium">{sortedBookings.length}</span> results
            </div>
            <div className="flex space-x-2">
              <Button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </Button>
              <Button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {showBookingDetails && selectedBooking && (
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
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                    {getSportIcon(selectedBooking.sport)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Booking Details</h3>
                    <p className="text-sm text-gray-500">Booking ID: {selectedBooking.bookingId}</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FiUser className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium text-gray-800">{selectedBooking.customer}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiMail className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-800">{selectedBooking.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiPhone className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-gray-800">{selectedBooking.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Booking Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <FiMapPin className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Turf</p>
                          <p className="font-medium text-gray-800">{selectedBooking.turf}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Date</p>
                          <p className="font-medium text-gray-800">{selectedBooking.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Time</p>
                          <p className="font-medium text-gray-800">{selectedBooking.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Status</p>
                      <span className={`mt-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Payment Status</p>
                      <span className={`mt-1 px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(selectedBooking.paymentStatus)}`}>
                        {selectedBooking.paymentStatus}
                      </span>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium text-gray-800">{selectedBooking.amount}</p>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <p className="text-sm text-gray-500">Booking Date</p>
                      <p className="font-medium text-gray-800">{selectedBooking.bookingDate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <Button 
                    onClick={closeBookingDetails}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Close
                  </Button>
                  <Button 
                    onClick={() => handleBookingAction(selectedBooking, 'edit')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Edit Booking
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBookingsTab; 