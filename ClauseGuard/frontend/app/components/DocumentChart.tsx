import React from "react";

export default function DocumentChart() {
  // Placeholder chart. Replace with Chart.js, Recharts, etc. for real data.
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 mb-8">
      <div className="font-semibold text-lg mb-4">Document Activity</div>
      <div className="w-full h-56 flex items-center justify-center">
        {/* SVG Line Chart Placeholder */}
        <svg width="100%" height="100%" viewBox="0 0 400 180">
          <polyline
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            points="0,150 50,120 100,130 150,100 200,140 250,130 300,160 350,120 400,80"
          />
          <g fontSize="12" fill="#64748b">
            <text x="0" y="170">Jan</text>
            <text x="50" y="170">Feb</text>
            <text x="100" y="170">Mar</text>
            <text x="150" y="170">Apr</text>
            <text x="200" y="170">May</text>
            <text x="250" y="170">Jun</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
