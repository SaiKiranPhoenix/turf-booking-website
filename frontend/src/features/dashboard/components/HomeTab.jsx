import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiCalendar, FiChevronRight, FiMapPin, FiDollarSign, FiClock, FiHeart } from 'react-icons/fi';
import { FaFutbol, FaStar, FaRegStar } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Button from '../../../components/Button';
import TurfCardSkeleton from '../../../components/TurfCardSkeleton';
import BookingCardSkeleton from '../../../components/BookingCardSkeleton';
import { 
  mockBookings, 
  mockPopularEvents
} from '../data/mockData.jsx';
import { fadeIn, staggerContainer, scaleIn } from '../utils/animationVariants';
import { getSportIcon, getStatusColor } from '../utils/helpers.jsx';

// Dashboard stats for the home tab
const dashboardStats = [
  { id: 1, title: 'Total Bookings', value: '12', icon: <FiCalendar />, color: 'bg-blue-100 text-blue-600' },
  { id: 2, title: 'Amount Spent', value: '₹8,650', icon: <FiDollarSign />, color: 'bg-green-100 text-green-600' },
  { id: 3, title: 'Hours Played', value: '32', icon: <FiClock />, color: 'bg-purple-100 text-purple-600' },
  { id: 4, title: 'Favorite Sports', value: '3', icon: <FiHeart />, color: 'bg-red-100 text-red-600' }
];

const HomeTabSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section Skeleton */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <Skeleton height={40} width={200} className="mb-2" />
            <Skeleton height={20} width={300} className="mb-6" />
            <div className="flex flex-wrap gap-4">
              <Skeleton height={40} width={150} />
              <Skeleton height={40} width={150} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid Skeleton */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Skeleton circle width={40} height={40} className="mr-4" />
                <div>
                  <Skeleton height={20} width={100} className="mb-2" />
                  <Skeleton height={30} width={80} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Bookings Skeleton */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Skeleton height={30} width={200} />
          <Skeleton height={20} width={100} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <BookingCardSkeleton key={index} />
          ))}
        </div>
      </section>

      {/* Popular Events Skeleton */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Skeleton height={30} width={200} />
          <Skeleton height={20} width={100} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <TurfCardSkeleton key={index} />
          ))}
        </div>
      </section>

      {/* Recommended Turfs Skeleton */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Skeleton height={30} width={200} />
          <Skeleton height={20} width={100} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((index) => (
            <TurfCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

const HomeTab = ({ viewBookingDetails, mockAvailableTurfs, isLoading }) => {
  if (isLoading) {
    return <HomeTabSkeleton />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeIn}
      className="space-y-8"
    >
      {/* Welcome Section */}
      <motion.section 
        className="mb-8"
        variants={scaleIn}
      >
        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <FaFutbol className="w-full h-full" />
          </div>
          <div className="max-w-2xl relative z-0">
            <motion.h1 
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Hi, Rahul!
            </motion.h1>
            <motion.p 
              className="opacity-90 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Ready for your next game? Explore turfs or manage your bookings.
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              variants={fadeIn}
            >
              <Button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center shadow-md">
                <FiPlus className="mr-2" />
                <span>New Booking</span>
              </Button>
              <Button className="border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center">
                <FiCalendar className="mr-2" />
                <span>My Bookings</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Grid */}
      <motion.section 
        className="mb-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardStats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={scaleIn}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${stat.color} mr-4 transform transition-transform duration-300 hover:scale-110`}>
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
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Upcoming Bookings */}
      <motion.section 
        className="mb-8"
        variants={fadeIn}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Bookings</h2>
          <motion.button 
            className="text-green-600 hover:text-green-800 flex items-center"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All</span>
            <FiChevronRight className="ml-1" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBookings
            .filter(booking => booking.status === 'Upcoming')
            .map((booking) => (
              <motion.div
                key={booking.id}
                variants={scaleIn}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 }
                }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4 transform transition-transform duration-300 hover:scale-110">
                        {getSportIcon(booking.sport)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{booking.turf}</h3>
                        <p className="text-sm text-gray-500">{booking.location}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex items-center mb-2">
                      <FiCalendar className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{booking.date}</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <FiClock className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{booking.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">{booking.price}</span>
                      <motion.button 
                        onClick={() => viewBookingDetails(booking)}
                        className="bg-green-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-green-700 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.section>

      {/* Popular Events */}
      <motion.section 
        className="mb-8"
        variants={fadeIn}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Popular Events</h2>
          <motion.button 
            className="text-green-600 hover:text-green-800 flex items-center"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All</span>
            <FiChevronRight className="ml-1" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPopularEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={scaleIn}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                {event.registrationOpen && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                    Registration Open
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FiCalendar className="mr-1" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FiMapPin className="mr-1" />
                  <span>{event.location}</span>
                </div>
                <motion.button 
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Event
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recommended Turfs */}
      <motion.section 
        className="mb-8"
        variants={fadeIn}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recommended For You</h2>
          <motion.button 
            className="text-green-600 hover:text-green-800 flex items-center"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All</span>
            <FiChevronRight className="ml-1" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAvailableTurfs.slice(0, 3).map((turf) => (
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
                <motion.img
                  src={turf.image}
                  alt={turf.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                  {getSportIcon(turf.sport)}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{turf.name}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        {i < turf.rating ? <FaStar size={14} /> : <FaRegStar size={14} />}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FiMapPin className="mr-1" />
                  <span>{turf.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-green-600 font-semibold">₹{turf.price}</span>
                    <span className="text-gray-500 text-sm"> / hour</span>
                  </div>
                  <motion.button 
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HomeTab; 