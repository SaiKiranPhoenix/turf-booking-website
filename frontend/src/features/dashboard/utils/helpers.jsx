import React from 'react';
import { 
  FaFootballBall, 
  FaBasketballBall, 
  FaTableTennis
} from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';

// Get status color based on booking status
export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Sport icon mapper
export const getSportIcon = (sport) => {
  switch (sport.toLowerCase()) {
    case 'football':
      return <FaFootballBall size={24} />;
    case 'basketball':
      return <FaBasketballBall size={24} />;
    case 'tennis':
      return <FaTableTennis size={24} />;
    case 'cricket':
      return <GiCricketBat size={24} />;
    default:
      return <FaFootballBall size={24} />;
  }
};

// Format date for display
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format time for display
export const formatTime = (time) => {
  return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// Format currency for display
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

// Filter turfs by sport
export const filterTurfsBySport = (turfs, sport) => {
  if (sport === 'All') return turfs;
  return turfs.filter(turf => turf.sport === sport);
}; 