import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaCalendarAlt, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';
import { getSportIcon, getStatusColor, formatDate, formatTime, formatPrice } from '../utils/helpers';
import { mockBookings } from '../data/mockData';

const BookingsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sportFilter, setSportFilter] = useState('all');

  const filteredBookings = useMemo(() => {
    return mockBookings.filter(booking => {
      const matchesSearch = booking.turfName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchesSport = sportFilter === 'all' || booking.sport.toLowerCase() === sportFilter.toLowerCase();
      return matchesSearch && matchesStatus && matchesSport;
    });
  }, [searchQuery, statusFilter, sportFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6"
    >
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by turf name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            >
              <option value="all">All Sports</option>
              <option value="football">Football</option>
              <option value="cricket">Cricket</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{booking.turfName}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{booking.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    <span>{formatDate(booking.date)} at {formatTime(booking.time)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    {getSportIcon(booking.sport)}
                    <span className="ml-2">{booking.sport}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaRupeeSign className="mr-2" />
                    <span>{formatPrice(booking.price)}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BookingsTab; 