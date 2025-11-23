import React from "react";

export default function RatingBar({ title, score, maxScore = 10 }) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="w-full flex items-center gap-4">
      <p className="w-[150px] font-[500]">{title}</p>
      <div className="flex-1 h-3 bg-gray-200 rounded-full">
        <div
          className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-[16px] text-[var(--color-primary)] font-bold  min-w-[30px]">
        {score}
      </p>
    </div>
  );
}
