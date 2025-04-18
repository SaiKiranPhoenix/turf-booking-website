import React from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiDollarSign, FiX } from 'react-icons/fi';
import { getSportIcon, getStatusColor } from '../utils/helpers';
import { modalAnimation } from '../utils/animationVariants';

const BookingDetailsModal = ({ 
  bookingDetailsOpen, 
  selectedBooking, 
  closeBookingDetails 
}) => {
  if (!bookingDetailsOpen || !selectedBooking) return null;

  return (
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
  );
};

export default BookingDetailsModal; 