import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCreditCard, 
  FiDollarSign, 
  FiCalendar, 
  FiCheck, 
  FiX, 
  FiPlus, 
  FiTrash2,
  FiEdit,
  FiLock
} from 'react-icons/fi';
import Button from '../../../components/Button';
import { fadeIn, staggerContainer, scaleIn } from '../utils/animationVariants';

// Mock data for payment history
const mockPaymentHistory = [
  {
    id: 1,
    bookingId: 'BK-2024-001',
    turfName: 'Premier Sports Complex',
    date: '2024-04-15',
    amount: 1800,
    status: 'completed',
    paymentMethod: 'Visa ending in 4242'
  },
  {
    id: 2,
    bookingId: 'BK-2024-002',
    turfName: 'Royal Sports Arena',
    date: '2024-04-10',
    amount: 1500,
    status: 'completed',
    paymentMethod: 'Visa ending in 4242'
  },
  {
    id: 3,
    bookingId: 'BK-2024-003',
    turfName: 'Elite Sports Center',
    date: '2024-04-05',
    amount: 2000,
    status: 'completed',
    paymentMethod: 'Mastercard ending in 8888'
  },
  {
    id: 4,
    bookingId: 'BK-2024-004',
    turfName: 'Green Valley Sports Complex',
    date: '2024-04-01',
    amount: 1600,
    status: 'failed',
    paymentMethod: 'Mastercard ending in 8888'
  }
];

// Mock data for saved payment methods
const mockPaymentMethods = [
  {
    id: 1,
    type: 'Visa',
    lastFour: '4242',
    expiryDate: '12/25',
    isDefault: true
  },
  {
    id: 2,
    type: 'Mastercard',
    lastFour: '8888',
    expiryDate: '08/26',
    isDefault: false
  }
];

const PaymentsTab = () => {
  const [activeTab, setActiveTab] = useState('history');
  const [addPaymentMethodModal, setAddPaymentMethodModal] = useState(false);
  const [editPaymentMethodModal, setEditPaymentMethodModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle add payment method
  const handleAddPaymentMethod = () => {
    setAddPaymentMethodModal(true);
  };

  // Handle edit payment method
  const handleEditPaymentMethod = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setEditPaymentMethodModal(true);
  };

  // Close modals
  const closeModals = () => {
    setAddPaymentMethodModal(false);
    setEditPaymentMethodModal(false);
    setTimeout(() => setSelectedPaymentMethod(null), 300);
  };

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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Payments</h2>
        <p className="text-gray-600">Manage your payment methods and view transaction history</p>
      </motion.section>

      {/* Tabs */}
      <motion.section 
        className="bg-white rounded-xl shadow-sm p-6"
        variants={scaleIn}
      >
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'history'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Payment History
          </button>
          <button
            onClick={() => setActiveTab('methods')}
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'methods'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Payment Methods
          </button>
        </div>

        {/* Payment History Tab */}
        {activeTab === 'history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Turf
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockPaymentHistory.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {payment.bookingId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.turfName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Empty State */}
            {mockPaymentHistory.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No payment history</h3>
                <p className="text-gray-600">You haven't made any payments yet</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'methods' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <Button 
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300 flex items-center"
                onClick={handleAddPaymentMethod}
              >
                <FiPlus className="mr-2" />
                Add Payment Method
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockPaymentMethods.map((method) => (
                <motion.div
                  key={method.id}
                  variants={scaleIn}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.3 }
                  }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-3 rounded-lg mr-4">
                        <FiCreditCard className="text-gray-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{method.type}</h3>
                        <p className="text-sm text-gray-500">•••• {method.lastFour}</p>
                      </div>
                    </div>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FiCalendar className="mr-1" />
                    <span>Expires {method.expiryDate}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                      onClick={() => handleEditPaymentMethod(method)}
                    >
                      <FiEdit className="mr-2" />
                      Edit
                    </Button>
                    <Button 
                      className="px-3 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300"
                    >
                      <FiTrash2 />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Empty State */}
            {mockPaymentMethods.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No payment methods</h3>
                <p className="text-gray-600">Add a payment method to make bookings easier</p>
              </div>
            )}
          </motion.div>
        )}
      </motion.section>

      {/* Add Payment Method Modal */}
      <AnimatePresence>
        {addPaymentMethodModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModals}
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
                <h3 className="text-xl font-semibold text-gray-800">Add Payment Method</h3>
                <button 
                  onClick={closeModals}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="default"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="default" className="ml-2 block text-sm text-gray-700">
                    Set as default payment method
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
                    onClick={closeModals}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                  >
                    Add Card
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Payment Method Modal */}
      <AnimatePresence>
        {editPaymentMethodModal && selectedPaymentMethod && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeModals}
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
                <h3 className="text-xl font-semibold text-gray-800">Edit Payment Method</h3>
                <button 
                  onClick={closeModals}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={`•••• ${selectedPaymentMethod.lastFour}`}
                      disabled
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <FiLock className="text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={selectedPaymentMethod.expiryDate}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="•••"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="default-edit"
                    checked={selectedPaymentMethod.isDefault}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="default-edit" className="ml-2 block text-sm text-gray-700">
                    Set as default payment method
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
                    onClick={closeModals}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PaymentsTab; 