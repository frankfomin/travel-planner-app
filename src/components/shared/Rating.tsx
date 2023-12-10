import React from "react";

export default function Rating({ rating }: { rating: number }) {
  console.log(rating);
  return (
    <div className="flex">
      {Array.from({ length: rating }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox={`0 0 24 24`}
          className={`w-6 h-6 fill-primary`}
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke=""
            stroke-width="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
      {Array.from({ length: 5 - rating}).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox={`0 0 24 24`}
          className={`w-6 h-6 fill-muted-foreground `}
        >
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            stroke=""
            stroke-width="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}
