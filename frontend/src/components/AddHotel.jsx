import React, { useState } from "react";
import api from "../api";
const AddHotel = () => {
    const [hotelData, setHotelData] = useState({
        hotelName: "",
        hotelAddress: "",
        hotelCost: "",
        hotelTotalRoom: "",
        hotelDescription: "",
        hotelPhone: "",
        hotelRating : "",
    });
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const token = localStorage.getItem("token");
    const handleChange = (e) => {
        setHotelData({ ...hotelData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...previews]);
        console.log(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/hotels/create", {
              hotelName: hotelData.hotelName,
        hotelAddress: hotelData.hotelAddress,
        hotelCost: hotelData.hotelCost,
        hotelTotalRoom: hotelData.hotelTotalRoom,
        hotelDescription: hotelData.hotelDescription,
        hotelPhone :hotelData.hotelPhone,
        hotelRating : hotelData.hotelRating,
            });

            const hotelId = res.data.result.hotelId;
            
            // Upload nhiều ảnh kèm hotelId
            const formData = new FormData();
            images.forEach((file) => formData.append("files", file));
            formData.append("hotelId", hotelId);
            

            await fetch("http://localhost:8080/api/images/upload", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });
            alert("Thêm khách sạn thành công!");
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi thêm khách sạn!");
        }
    };

    return (
  <form
    onSubmit={handleSubmit}
    className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
  >
    <div>
      <label className="block font-semibold mb-1">Tên khách sạn</label>
      <input
        name="hotelName"
        placeholder="Nhập tên khách sạn"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Địa chỉ</label>
      <input
        name="hotelAddress"
        placeholder="Nhập địa chỉ khách sạn"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Giá (VNĐ)</label>
      <input
        name="hotelCost"
        placeholder="Nhập giá phòng"
        type="number"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Số sao (Đánh giá)</label>
      <input
        name="hotelRating"
        placeholder="Nhập số sao (ví dụ: 4.5)"
        type="number"
        step="0.1"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Tổng số phòng</label>
      <input
        name="hotelTotalRoom"
        placeholder="Nhập tổng số phòng"
        type="number"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Số điện thoại liên hệ</label>
      <input
        name="hotelPhone"
        placeholder="Nhập số điện thoại"
        type="number"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Mô tả khách sạn</label>
      <textarea
        name="hotelDescription"
        placeholder="Nhập mô tả chi tiết khách sạn"
        onChange={handleChange}
        rows={4}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Ảnh khách sạn</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Hiển thị ảnh preview */}
    <div className="grid grid-cols-3 gap-2 mt-4">
      {previewUrls.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt={`preview-${idx}`}
          className="w-full h-32 object-cover rounded shadow-sm"
        />
      ))}
    </div>

    <button
      type="submit"
      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-all duration-200"
    >
      Thêm khách sạn
    </button>
  </form>
);

};

export default AddHotel;
