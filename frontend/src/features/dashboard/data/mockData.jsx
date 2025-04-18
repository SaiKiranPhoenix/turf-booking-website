import React from 'react';
import { FaFootballBall, FaBasketballBall, FaTableTennis } from 'react-icons/fa';
import { GiCricketBat } from 'react-icons/gi';

// Mock bookings data
export const mockBookings = [
  {
    id: 1,
    turfName: 'Green Valley Sports Complex',
    location: 'Bangalore',
    date: '2024-03-25',
    time: '14:00',
    sport: 'Football',
    price: 1500,
    status: 'upcoming',
    paymentStatus: 'paid'
  },
  {
    id: 2,
    turfName: 'City Sports Arena',
    location: 'Mumbai',
    date: '2024-03-26',
    time: '16:00',
    sport: 'Cricket',
    price: 2000,
    status: 'completed',
    paymentStatus: 'paid'
  },
  {
    id: 3,
    turfName: 'Elite Sports Center',
    location: 'Delhi',
    date: '2024-03-27',
    time: '10:00',
    sport: 'Basketball',
    price: 1200,
    status: 'cancelled',
    paymentStatus: 'refunded'
  }
];

// Mock user stats
export const mockUserStats = {
  totalBookings: 15,
  upcomingBookings: 3,
  completedBookings: 11,
  cancelledBookings: 1,
  favoriteSports: ['Football', 'Cricket'],
  totalSpent: 25000
};

// Mock popular events
export const mockPopularEvents = [
  {
    id: 1,
    title: 'Weekend Football Tournament',
    date: '2024-04-01',
    sport: 'Football',
    participants: 24,
    price: 500
  },
  {
    id: 2,
    title: 'Corporate Cricket League',
    date: '2024-04-05',
    sport: 'Cricket',
    participants: 40,
    price: 1000
  }
];

// Mock recommended turfs
export const mockRecommendedTurfs = [
  {
    id: 1,
    name: 'Premier Sports Complex',
    location: 'Chennai',
    sports: ['Football', 'Cricket'],
    rating: 4.5,
    price: 1800,
    image: 'https://example.com/turf1.jpg'
  },
  {
    id: 2,
    name: 'Royal Sports Arena',
    location: 'Hyderabad',
    sports: ['Basketball', 'Tennis'],
    rating: 4.2,
    price: 1500,
    image: 'https://example.com/turf2.jpg'
  }
]; 