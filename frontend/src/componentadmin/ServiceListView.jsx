import { useEffect, useState } from "react";
import api from "../api";

export default function ServiceList({ hotelId }) {
  const [services, setServices] = useState([]);

  // Lấy danh sách dịch vụ
  useEffect(() => {
    if (!hotelId) return;

    const fetchServices = async () => {
      try {
        const res = await api.get(`/service/hotel/${hotelId}`);
        setServices(res.data?.result || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách dịch vụ:", err);
      }
    };

    fetchServices();
  }, [hotelId]);

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-4">
      <h3 className="text-2xl font-bold mb-4 text-center">Dịch vụ khách sạn</h3>

      {services.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          Khách sạn hiện chưa có dịch vụ nào.
        </p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {services.map((service) => (
            <li
              key={service.serviceId}
              className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
            >
              {service.icon && (
                <img
                  src={service.icon}
                  alt={service.serviceName}
                  className="w-12 h-12 object-contain"
                />
              )}
              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  {service.serviceName}
                </h4>
                <p className="text-gray-600">{service.description}</p>
                <p className="text-gray-800 font-bold mt-2">
                  Giá:{" "}
                  <span className="text-blue-600">
                    {service.price?.toLocaleString("vi-VN")} ₫
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
