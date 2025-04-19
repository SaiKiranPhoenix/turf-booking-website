import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiStar, FiClock, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { FaFutbol, FaBasketballBall, FaTableTennis } from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';
import Button from '../../../components/Button';
import { fadeIn, staggerContainer, scaleIn } from '../utils/animationVariants';

// Mock data for favorite turfs
const mockFavoriteTurfs = [
  {
    id: 1,
    name: 'Premier Sports Complex',
    location: 'Chennai',
    sports: ['Football', 'Cricket'],
    rating: 4.5,
    price: 1800,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    amenities: ['Parking', 'Changing Rooms', 'Floodlights', 'Cafeteria'],
    availability: {
      '2024-04-20': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
      '2024-04-21': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
    }
  },
  {
    id: 2,
    name: 'Royal Sports Arena',
    location: 'Hyderabad',
    sports: ['Basketball', 'Tennis'],
    rating: 4.2,
    price: 1500,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    amenities: ['Parking', 'Changing Rooms', 'Floodlights', 'Water Dispenser'],
    availability: {
      '2024-04-20': ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
      '2024-04-21': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    }
  },
  {
    id: 3,
    name: 'Elite Sports Center',
    location: 'Delhi',
    sports: ['Football', 'Cricket', 'Basketball'],
    rating: 4.8,
    price: 2000,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    amenities: ['Parking', 'Changing Rooms', 'Floodlights', 'Cafeteria', 'First Aid'],
    availability: {
      '2024-04-20': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
      '2024-04-21': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    }
  }
];

// Helper function to get sport icon
const getSportIcon = (sport) => {
  switch (sport.toLowerCase()) {
    case 'football':
      return <FaFutbol className="text-green-600" />;
    case 'cricket':
      return <GiCricketBat className="text-green-600" />;
    case 'basketball':
      return <FaBasketballBall className="text-green-600" />;
    case 'tennis':
      return <FaTableTennis className="text-green-600" />;
    default:
      return <FaFutbol className="text-green-600" />;
  }
};

const FavoritesTab = () => {
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Handle turf selection
  const handleTurfSelect = (turf) => {
    setSelectedTurf(turf);
    setBookingModalOpen(true);
  };

  // Close booking modal
  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setTimeout(() => setSelectedTurf(null), 300);
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">My Favorite Turfs</h2>
        <p className="text-gray-600">Quick access to your favorite sports facilities</p>
      </motion.section>

      {/* Favorites Grid */}
      <motion.section 
        className="mb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFavoriteTurfs.map((turf) => (
            <motion.div
              key={turf.id}
              variants={scaleIn}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={turf.image} 
                  alt={turf.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                  {getSportIcon(turf.sports[0])}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{turf.name}</h3>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{turf.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <FiMapPin className="mr-1" />
                  <span>{turf.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {turf.sports.map((sport, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-600">
                    <FiDollarSign className="mr-1" />
                    <span>{turf.price} / hour</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiClock className="mr-1" />
                    <span>Available: {Object.keys(turf.availability).length} days</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                    onClick={() => handleTurfSelect(turf)}
                  >
                    Book Now
                  </Button>
                  <Button 
                    className="px-3 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300"
                  >
                    <FiStar className="text-red-500" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State */}
        {mockFavoriteTurfs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No favorite turfs yet</h3>
            <p className="text-gray-600">Add turfs to your favorites to see them here</p>
          </motion.div>
        )}
      </motion.section>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModalOpen && selectedTurf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeBookingModal}
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
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{selectedTurf.name}</h3>
                  <p className="text-sm text-gray-500">{selectedTurf.location}</p>
                </div>
                <button 
                  onClick={closeBookingModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Select Date</h4>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  />
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Available Time Slots</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedTurf.availability[selectedDate.toISOString().split('T')[0]] ? (
                      selectedTurf.availability[selectedDate.toISOString().split('T')[0]].map((time, index) => (
                        <button
                          key={index}
                          className="py-2 px-3 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          {time}
                        </button>
                      ))
                    ) : (
                      <p className="text-gray-500 col-span-3">No slots available for this date</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTurf.amenities.map((amenity, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Price per hour</span>
                    <div className="font-semibold text-gray-900">₹{selectedTurf.price}</div>
                  </div>
                  <Button 
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                  >
                    Proceed to Book
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

export default FavoritesTab; 