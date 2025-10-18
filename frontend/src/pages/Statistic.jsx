import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js/auto";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  ChartSplineIcon,
  ChartColumnBigIcon,
  HotelIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api";
export default function Statistic() {
    const [filter,setFilter] = useState("week");
    const [barFiler,setBarFilter] = useState("7-day-last");
    const [chartData,setChartData] = useState({labels : [],data : [] });
    const [barChart,setBarChart] = useState({labels : [], datasets: [] });
    const [invoiceStatus,setInvoiceStatus] = useState([]); 
    useEffect(() => {
        fetchInvoiceStatus();

      }, []);
      useEffect(() => {
        updateChartData();
      }, [filter, invoiceStatus]);
      useEffect(() => {
        updateBarChart();
      },[barFiler]);
    const fetchInvoiceStatus = async () => {
    try {
      const res = await api.get("/invoice/all");
      const invoices = res.data.result || [];
      const invoiceStatus = invoices.filter(i => i.status === 2 && i.checkOutDate);
      console.log(invoiceStatus);
      setInvoiceStatus(invoiceStatus);
    } catch (err) {
      console.error("Lỗi khi lấy invoice status da huy:", err);
    }
    }
    const updateChartData = () => {
    if(!invoiceStatus.length) return;

    if(filter === "week") {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999); 
      const days = ["CN","T2","T3","T4","T5","T6","T7"];
      const dayRevenue = Array(7).fill(0);
      invoiceStatus.forEach(inv => {
        const checkOut = new Date(inv.checkOutDate);
        if (checkOut >= startOfWeek && checkOut <= endOfWeek) {
          const idx = checkOut.getDay(); // 0–6
          dayRevenue[idx] += inv.totalAmount || 0;
        }
      });
      setChartData({labels : days , data: dayRevenue});
    }
    else if (filter === "month") {
      // === Tháng hiện tại ===
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth(); // 0–11
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const labels = Array.from({ length: daysInMonth }, (_, i) => `T${i + 1}`);
      const revenues = Array(daysInMonth).fill(0);

      invoiceStatus.forEach(inv => {
        const checkOut = new Date(inv.checkOutDate);
        if (checkOut.getMonth() === month && checkOut.getFullYear() === year) {
          const day = checkOut.getDate() - 1;
          revenues[day] += inv.totalAmount || 0;
        }
      });

      setChartData({ labels, data: revenues });
    }
    else if (filter === "year") {
      // === Năm hiện tại ===
      const now = new Date();
      const year = now.getFullYear();
      const labels = Array.from({ length: 12 }, (_, i) => `T${i + 1}`);
      const revenues = Array(12).fill(0);

      invoiceStatus.forEach(inv => {
        const checkOut = new Date(inv.checkOutDate);
        if (checkOut.getFullYear() === year) {
          const monthIdx = checkOut.getMonth(); // 0–11
          revenues[monthIdx] += inv.totalAmount || 0;
        }
      });

      setChartData({ labels, data: revenues });
    }
    }
    const updateBarChart = async () => {
      try {
      const res = await api.get("/invoice/all");
      const data = res.data.result || [];
      console.log("day la",data);
      const now = new Date();
      let labels = [];
      let bookedData = [];
      let canceledData = [];

      if(barFiler === "7-day-last"){
        labels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
        const today = new Date();
      const dayOfWeek = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - dayOfWeek);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      bookedData = Array(7).fill(0);
      canceledData = Array(7).fill(0);
      data.forEach((i) => {
        const d = new Date(i.checkOutDate)
        if(d >= startOfWeek && d <= endOfWeek){
          const dayIdx = d.getDay();
          if(i.status === 2) bookedData[dayIdx]++;
          if(i.status === 3) canceledData[dayIdx]++;
        }
      });
      } else if(barFiler === "this-month"){
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      labels = Array.from({ length: daysInMonth }, (_, i) => `T${i + 1}`);
      bookedData = Array(daysInMonth).fill(0);
      canceledData = Array(daysInMonth).fill(0);

      data.forEach((i) => {
        const d = new Date(i.checkOutDate);
        if(d.getMonth() === month && d.getFullYear() === year){
          const day = d.getDate() - 1;
          if (i.status === 2) bookedData[day]++;
          if (i.status === 3) canceledData[day]++;
        }
      });
      } else if(barFiler === "this-year"){
        labels = Array.from({ length: 12 }, (_, i) => `T${i + 1}`);
        bookedData = Array(12).fill(0);
        canceledData = Array(12).fill(0);

        const y = now.getFullYear();

        data.forEach((inv) => {
        const d = new Date(inv.checkOutDate);
        if (d.getFullYear() === y) {
          const month = d.getMonth(); // 0–11
          if (inv.status === 2) bookedData[month]++;
          if (inv.status === 3) canceledData[month]++;
        }
      });
      }

      setBarChart({
      labels,
      datasets: [
        {
          label: "Booked",
          data: bookedData,
          backgroundColor: "#3B82F6",
          borderRadius: 4,
        },
        {
          label: "Canceled",
          data: canceledData,
          backgroundColor: "#EF4444",
          borderRadius: 4,
        },
      ],
    });
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu cho biểu đồ Booking/Cancel:", err);
    }
  }; 

    return (
        <div className="bg-gray-100 rounded-lg shadow-sm p-5">
            <div className="mt-[90px]">
                <h1>Thống kê</h1>
                {/* Biểu đồ Line */}
                <div className="bg-white mb-4 max-w-6xl px-2 py-5 ml-32">
                <div className="flex mb-2 border-b-3 border-b-gray-200">
                <ChartColumnBigIcon/>
                <h2 className="text-xl font-semibold">Biểu đồ thống kê doanh thu</h2>
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
                    data = {{
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
                          value.toLocaleString("vi-VN") + " ₫", // định dạng tiền VNĐ
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
                    {/* Biểu đồ Donut */}
              <div className="flex space-x-5">
                <div className="bg-white mb-4 h-max max-w-1/2 px-2 py-5">
                  <div className="flex mb-2 border-b-3 border-b-gray-200"> 
                  <HotelIcon/>
                  <h2 className="text-xl font-semibold">Phân bố booking khách sạn</h2>
                  </div>
                  <Doughnut 
                    data = {{
                      labels: ["A","B","C"],
                      datasets: [
                        {
                          label: "Booking",
                          data: [200,300,400],
                        },
                        {
                          label: "Cancel",
                          data: [100,200,300],
                        }
                      ],
                    }}
                  />
                </div>
                {/* biểu đồ Bar */}
                <div className="bg-white mb-4 h-max min-w-1/2 px-2 py-5">
                  <h2 className="text-xl font-semibold mb-2 border-b-3 border-b-gray-200">Reservation</h2>
                  <select
                  value={barFiler}
                  onChange={(e) => setBarFilter(e.target.value)}
                  className="ml-auto mb-2 border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                  <option value="7-day-last">Tuần này</option>
                  <option value="this-month">Tháng này</option>
                  <option value="this-year">Năm nay</option>
                </select>
                  <Bar 
                  data = {barChart}
                     options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                      labels: {
                        usePointStyle: true,
                        pointStyle: "rectRounded",
                      },
                    },
                    title: { display: false },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                    },
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                        precision: 0,
                      },
                    },
                  },
                }}
                    />
                </div>
                <div className="bg-white mb-4 max-h-80 min-w-96 px-2 py-5">
                  <div className="flex mb-2 space-x-1 border-b-3 border-b-gray-200">
                  <ChartSplineIcon />
                  <h2 className="text-xl font-semibold">Thống kê phòng</h2>
                  </div>
                  <div className="mt-5 flex justify-around text-center border-b-3 border-b-gray-200 ">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-600 ">12</h2> 
                        <p className="text-md font-sans">Tổng phòng</p>
                    </div>
                    <div className="mb-7">
                        <h2 className="text-2xl font-bold text-green-400">0</h2>
                        <p className="text-md font-sans">Đang sử dụng</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-left mt-5">
                    <div>
                      <h2>Phòng trống</h2>
                      <h2>Phòng đang sử dụng</h2>
                    </div>
                    <div>
                      <p className="bg-green-500 rounded-xl px-2 text-white text-center">12</p>
                      <p className="text-center">0</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
    </div>
    );
};