import { Star } from 'lucide-react';

export default function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const partialStarWidth = (rating - fullStars) * 100;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="relative ">
          <Star fill={index < fullStars ? 'yellow' : 'gray'} strokeWidth={0} />

          {index === fullStars && partialStarWidth > 0 && (
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${partialStarWidth}%` }}
            >
              <Star fill="yellow" strokeWidth={0} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
