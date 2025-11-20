import React, { useState } from "react";

const RevenueStatistics = ({ revenueData }) => {
  const [selectedYear, setSelectedYear] = useState("2025");
    const [hoveredPoint, setHoveredPoint] = useState(null);

  const chartWidth = 650;
  const chartHeight = 200;
  const paddingX = 90;
  const paddingY = 30;

  const currentData = revenueData[selectedYear] || [];

  // Nếu không có dữ liệu thì hiển thị rỗng
  if (currentData.length === 0) {
    return (
      <div className="bg-background p-6 rounded-xl shadow-sm text-center text-foreground/60">
        <h2 className="text-2xl font-semibold mb-2">Revenue Statistics</h2>
        <p>No data available for {selectedYear}</p>
      </div>
    );
  }

  // Lấy giá trị max để chia trục Y động
  const maxRevenue = Math.max(...currentData.map((d) => d.revenue), 0);
  const yAxisSteps = 5;
  const yAxisLabels = Array.from({ length: yAxisSteps + 1 }, (_, i) =>
    Math.round((i * maxRevenue) / yAxisSteps)
  );

  // Tạo path cho line chart
  const points = currentData
    .map((d, i) => {
      const x =
        paddingX + (i / (currentData.length - 1)) * (chartWidth - 2 * paddingX);
      const y =
        chartHeight -
        (d.revenue / maxRevenue) * (chartHeight - paddingY) +
        paddingY / 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="bg-background p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-semibold">
          Revenue Statistics
        </h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="mb-4 border border-foreground/30 bg-background text-foreground px-3 py-1.5 rounded-lg"
        >
          {Object.keys(revenueData).map((year) => (
            <option key={year} value={year}>
              {`Year ${year}`}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="relative">
        <svg
          width="100%"
          height={chartHeight + 50}
          viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}
        >
          {/* Y-axis */}
          <g className="text-xs text-foreground/60 fill-current">
            {yAxisLabels.map((label) => {
              const y =
                chartHeight -
                (label / maxRevenue) * (chartHeight - paddingY) +
                paddingY / 2;
              return (
                <g key={label}>
                  <text x="5" y={y + 4} textAnchor="start">
                    {label.toLocaleString()}₫
                  </text>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX / 2}
                    y2={y}
                    className="stroke-foreground/20"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </g>
              );
            })}
          </g>

          {/* Đường biểu đồ */}
          <polyline
            fill="none"
            stroke="var(--chart-2)"
            strokeWidth="3"
            points={points}
            className="transition-all duration-500 ease-in-out"
          />

          {/* Chấm dữ liệu */}
          {currentData.map((d, i) => {
            const x =
              paddingX +
              (i / (currentData.length - 1)) * (chartWidth - 2 * paddingX);
            const y =
              chartHeight -
              (d.revenue / maxRevenue) * (chartHeight - paddingY) +
              paddingY / 2;
            const isHovered = hoveredPoint === i
              
            return (
              <g key={d.month} onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? "var(--chart-3)" : "var(--chart-2)"}
                  className="cursor-pointer transition-all duration-200"
                />
                {isHovered && (
                  <>
                    <text
                      x={x}
                      y={y - 22}
                      textAnchor="middle"
                      className="text-xs font-semibold fill-foreground/80"
                    >
                      {d.revenue.toLocaleString()}₫
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {/* Nhãn trục X */}
          {currentData.map((d, i) => {
            const x =
              paddingX +
              (i / (currentData.length - 1)) * (chartWidth - 2 * paddingX);
            return (
              <text
                key={d.month}
                x={x}
                y={chartHeight + 25}
                textAnchor="middle"
                className="text-xs fill-foreground/70"
              >
                {d.month}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default RevenueStatistics;
