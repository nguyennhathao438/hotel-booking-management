import { Line } from "react-chartjs-2";
import { ChartColumnBigIcon } from "lucide-react";

export default function RevenueLineChart({ chartData, filter, setFilter, title = "Biểu đồ thống kê doanh thu",className ="",}) {
  return (
    <div className={`bg-white mb-4 max-w-6xl px-2 py-5 ${className}`}>
      <div className="flex mb-2 border-b-3 border-b-gray-200">
        <ChartColumnBigIcon />
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-auto mb-2 border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="year">Năm nay</option>
        </select>
      </div>

      <Line
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: "Doanh thu (VNĐ)",
              data: chartData.data,
              borderColor: "#4F46E5",
              backgroundColor: "rgba(79,70,229,0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              ticks: {
                callback: (value) =>
                  value.toLocaleString("vi-VN") + " ₫",
              },
              beginAtZero: true,
            },
          },
          plugins: {
            legend: { position: "top" },
            tooltip: {
              callbacks: {
                label: (context) =>
                  context.parsed.y.toLocaleString("vi-VN") + " ₫",
              },
            },
          },
        }}
      />
    </div>
  );
}
