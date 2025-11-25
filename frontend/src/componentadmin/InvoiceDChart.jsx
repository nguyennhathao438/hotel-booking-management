import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function InvoiceDChart({ chartData, title }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-[530px] mr-14 h-[440px] mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center border-b-4 border-gray-200">{title}</h2>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 20,
                padding: 20,
              },
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                    const label = tooltipItem.label || "";
                    const value = tooltipItem.raw || 0;
                    return `${label}: ${value}%`;
                },
              },
            },
          },
          cutout:"30%",
        }}
      />
    </div>
  );
}
