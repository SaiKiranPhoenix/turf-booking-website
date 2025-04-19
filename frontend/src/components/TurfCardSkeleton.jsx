import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const TurfCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <Skeleton height={200} />
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <Skeleton height={24} width={150} />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Skeleton key={star} circle width={14} height={14} />
            ))}
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Skeleton height={16} width={180} />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <Skeleton height={20} width={100} />
            <Skeleton height={16} width={60} />
          </div>
          <Skeleton height={36} width={100} />
        </div>
      </div>
    </div>
  );
};

export default TurfCardSkeleton; 