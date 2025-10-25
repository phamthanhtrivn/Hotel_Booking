import React, { useState } from "react";

const OccupancyStatistics = ({ occupancyData }) => {
  const [view, setView] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("10");

  const chartHeight = 160;
  const chartWidth = 500;
  const barWidth = 20;

  // Dữ liệu hiển thị tùy theo chế độ
  let currentData = [];
  if (view === "weekly") {
    const key = `${selectedYear}-${selectedMonth.padStart(2, "0")}`;
    currentData = occupancyData.weekly[key] || [];
  } else if (view === "monthly") {
    currentData = occupancyData.monthly[selectedYear] || [];
  } else {
    currentData = occupancyData.yearly || [];
  }

  const barSpacing =
    (chartWidth - currentData.length * barWidth) / currentData.length;
  const yAxisLabels = [0, 25, 50, 75, 100];
  const maxValue = 100;

  return (
    <div className="bg-background p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-semibold">Occupancy Statistics</h2>
        <div className="flex gap-2">
          {["weekly", "monthly", "yearly"].map((type) => (
            <button
              key={type}
              onClick={() => setView(type)}
              className={`text-sm px-3 py-1.5 rounded-lg border transition-all ${
                view === type
                  ? "bg-foreground text-background border-foreground"
                  : "border-foreground/30 text-foreground/70 hover:bg-foreground/10"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {/* Weekly view: chọn tháng + năm */}
      {view === "weekly" && (
        <div className="flex gap-2 mb-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border border-foreground/30 bg-background text-foreground px-3 py-1.5 rounded-lg"
          >
            {Array.from({ length: 12 }, (_, i) => {
              const month = (i + 1).toString().padStart(2, "0");
              return (
                <option key={month} value={month}>
                  Tháng {month}
                </option>
              );
            })}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border border-foreground/30 bg-background text-foreground px-3 py-1.5 rounded-lg"
          >
            {Object.keys(occupancyData.monthly).map((year) => (
              <option key={year} value={year}>
                Năm {year}
              </option>
            ))}
          </select>
        </div>
      )}
      {/* Monthly view: chọn năm */}
      {view === "monthly" && (
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="mb-4 border border-foreground/30 bg-background text-foreground px-3 py-1.5 rounded-lg"
        >
          {Object.keys(occupancyData.monthly).map((year) => (
            <option key={year} value={year}>
              Năm {year}
            </option>
          ))}
        </select>
      )}
      {/* SVG Chart */}
      <div className="h-52 w-full">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${chartWidth + 80} ${chartHeight + 50}`}
        >
          {/* Trục Y */}
          <g className="text-xs text-foreground/60 fill-current">
            {yAxisLabels.map((label) => {
              const y = (1 - label / maxValue) * chartHeight + 10;
              return (
                <g key={label}>
                  <text x="0" y={y + 3} textAnchor="start">
                    {label}%
                  </text>
                  <line
                    x1="30"
                    y1={y}
                    x2={chartWidth + 40}
                    y2={y}
                    className="stroke-foreground/20"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </g>
              );
            })}
          </g>

          {/* Cột dữ liệu */}
          <g transform="translate(40, 10)">
            {currentData.map((item, index) => {
              const value = item.occupancy ?? item.value ?? 0;
              const barHeight = (value / maxValue) * chartHeight;
              const x = index * (barWidth + barSpacing) + barSpacing / 2;
              const y = chartHeight - barHeight;
              const label = item.week || item.month || item.year;
              return (
                <g key={label}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    style={{ fill: "var(--chart-2)" }}
                    className="transition-all duration-300 hover:opacity-80"
                    rx="4"
                    ry="4"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight + 25}
                    textAnchor="middle"
                    className="text-xs fill-foreground/70"
                  >
                    {label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default OccupancyStatistics;
