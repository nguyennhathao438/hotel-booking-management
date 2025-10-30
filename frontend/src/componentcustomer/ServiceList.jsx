import { useEffect, useState } from "react";
import api from "../api";

export default function ServiceList({ hotelId }) {
  const [services, setServices] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: "",
    description: "",
    price: "",
    icon: "",
  });

  // Lấy danh sách dịch vụ
  useEffect(() => {
    if (!hotelId) return;

    const fetchServices = async () => {
      try {
        const res = await api.get(`/service/hotel/${hotelId}`);
        console.log("Dữ liệu dịch vụ:", res.data);
        setServices(res.data?.result || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách dịch vụ:", err);
      }
    };

    fetchServices();
  }, [hotelId]);

const handleDeleteService = async (serviceId) => {
  try {
    await api.delete(`/service/${serviceId}`);
    setServices(services.filter((s) => s.serviceId !== serviceId));
    console.log("Xóa dịch vụ thành công");
  } catch (err) {
    console.error("Lỗi khi xóa dịch vụ:", err);
  }
};
  // Hàm thêm dịch vụ mới
  const handleAddService = async () => {
    try {
      const res = await api.post("/service/create", {
        serviceName: newService.serviceName,
        description: newService.description,
        price: parseFloat(newService.price),
        icon: newService.icon,
        hotelID: hotelId,
      });
      console.log("Dịch vụ đã thêm:", res.data);
      setServices([...services, res.data.result]);
      setNewService({ serviceName: "", description: "", price: "", icon: "" });
      setShowAddForm(false);
    } catch (err) {
      console.error("Lỗi khi thêm dịch vụ:", err);
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold flex-1 text-center">
          Dịch vụ khách sạn
        </h3>

        {/* Nút thêm dịch vụ */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-35 h-10 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold"
        >
          {showAddForm ? "Đóng" : "Thêm dịch vụ"}
        </button>
      </div>

      {/* Form thêm dịch vụ */}
      {showAddForm && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h4 className="font-semibold text-lg mb-3 text-gray-800">
            Nhập thông tin dịch vụ
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Tên dịch vụ"
              value={newService.serviceName}
              onChange={(e) =>
                setNewService({ ...newService, serviceName: e.target.value })
              }
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Giá (VNĐ)"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
              className="border p-2 rounded-lg w-full"
            />
            <input
              type="text"
              placeholder="Link icon (URL)"
              value={newService.icon}
              onChange={(e) =>
                setNewService({ ...newService, icon: e.target.value })
              }
              className="border p-2 rounded-lg w-full"
            />
            <textarea
              placeholder="Mô tả dịch vụ"
              value={newService.description}
              onChange={(e) =>
                setNewService({ ...newService, description: e.target.value })
              }
              className="border p-2 rounded-lg w-full md:col-span-2"
            ></textarea>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddService}
              className="w-32 h-10 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold"
            >
              Lưu dịch vụ
            </button>
          </div>
        </div>
      )}

      {/* Danh sách dịch vụ */}
      {services.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          Khách sạn hiện chưa có dịch vụ nào.
        </p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {services.map((service) => (
            <li
              key={service.serviceId}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex items-center gap-4"
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
               <hr className="border-gray-300 my-2" />
                     <button
                     onClick={() => handleDeleteService(service.serviceId)}
                      className="w-21 h-6 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold"
                     >
                                      Xóa
                                    </button>
              </div>

            </li>

          ))}

        </ul>

      )}
    </div>
  );
}
