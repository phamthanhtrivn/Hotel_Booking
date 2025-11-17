import React from "react";

const FloorStatus = ({ floorStatus }) => {
  const radius = 60;
  const stroke = 12;
  const normalizedRadius = radius - stroke;
  const circumference = Math.PI * normalizedRadius;
  const progress = (floorStatus / 100) * circumference;
  return (
    <div className="bg-background p-6 rounded-xl shadow-sm h-full">
      <h2 className="text-4xl font-semibold mb-4">Floor status</h2>
      <div className="flex items-center justify-around gap-6">
        <div className="relative">
          <div className="relative w-70 h-40 mx-auto">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 120 60"
              className="overflow-visible"
            >
              <path
                d="M10 60 A50 50 0 0 1 110 60"
                stroke="var(--ring)"
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M10 60 A50 50 0 0 1 110 60"
                stroke="var(--chart-2)"
                strokeWidth={stroke}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center mt-20">
              <span className="text-3xl font-bold text-foreground/80">
                {floorStatus}%
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-chart-2"></div>
            <span className="text-xl text-foreground/80">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-ring"></div>
            <span className="text-xl text-foreground/80">Yet to Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorStatus;
