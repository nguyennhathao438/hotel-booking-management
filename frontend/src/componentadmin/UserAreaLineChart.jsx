import { Line } from "react-chartjs-2";
import { ChartColumnBigIcon } from "lucide-react";

export default function UserAreaLineChart({ chartData, filter, setFilter, title,className ="",}) {
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

      <div className="h-[350px]">
        <Line
        data={{
            labels: chartData.labels,
            datasets: [
            {
                label: "User",
                data: chartData.data,
                borderColor: "#10B981", // xanh ngọc
                backgroundColor: "rgba(16,185,129,0.2)", // vùng tô nhẹ
                tension: 0.4,
                fill: true, // 👈 chính là phần tạo "Area"
                pointBackgroundColor: "#10B981",
                pointBorderColor: "#fff",
                pointHoverRadius: 6,
            },
            ],
        }}
        options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
            y: { beginAtZero: true },
            },
            plugins: {
            legend: { position: "top" },
            tooltip: {
                callbacks: {
                label: (context) => `${context.parsed.y} lượt đặt`,
                },
            },
            },
        }}
        />
      </div>
    </div>
  );
}
