import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Legend, Tooltip, Title } from "chart.js";
import { CalendarDaysIcon } from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip, Title);

const BookingBarChart = ({ barChart, barFilter, setBarFilter }) => {
  return (
    <div className="bg-white shadow-md rounded-lg mb-4 p-5 w-full lg:w-[90%] h-[380px]">
      {/* Tiêu đề và bộ lọc */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="text-indigo-600" />
          <h2 className="text-lg font-semibold">Total Bookings</h2>
        </div>
        <select
          value={barFilter}
          onChange={(e) => setBarFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="7-day-last">Tuần này</option>
          <option value="this-month">Tháng này</option>
          <option value="this-year">Năm nay</option>
        </select>
      </div>

      {/* Biểu đồ */}
    <div className="h-[300px]">
        <Bar
        data={barChart}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
                pointStyle: "rectRounded",
              },
            },
            title: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${context.parsed.y} lượt đặt`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 12 } },
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
                precision: 0,
              },
              grid: { color: "rgba(200, 200, 200, 0.2)" },
            },
          },
        }}
        height={300}
      />
      </div>
    </div>
  );
};

export default BookingBarChart;
