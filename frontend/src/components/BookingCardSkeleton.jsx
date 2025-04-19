import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BookingCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Skeleton circle width={40} height={40} className="mr-4" />
          <div>
            <Skeleton height={20} width={150} className="mb-2" />
            <Skeleton height={16} width={120} />
          </div>
        </div>
        <Skeleton height={24} width={80} />
      </div>
      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center mb-2">
          <Skeleton height={16} width={200} />
        </div>
        <div className="flex items-center mb-4">
          <Skeleton height={16} width={180} />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton height={20} width={80} />
          <Skeleton height={32} width={100} />
        </div>
      </div>
    </div>
  );
};

export default BookingCardSkeleton; 