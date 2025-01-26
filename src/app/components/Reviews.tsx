// src/app/components/Reviews.tsx
'use client';

import { useState } from 'react';
import { HiStar } from 'react-icons/hi';

type Review = {
  id: string;
  author: string;
  rating: number; // 1 to 5
  comment: string;
};

type ReviewsProps = {
  reviews: Review[];
};

export default function Reviews({ reviews }: ReviewsProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      <div className="space-y-4">
        {displayedReviews.map(review => (
          <div key={review.id} className="border p-4 rounded-md">
            <div className="flex items-center mb-2">
              <span className="font-medium mr-2">{review.author}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <HiStar
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-indigo-600 hover:underline"
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
}