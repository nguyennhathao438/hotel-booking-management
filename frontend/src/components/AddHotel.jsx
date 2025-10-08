import React, { useContext, useState } from "react";
import ApiService from "../service/apiService";
import { Context } from "./RoomContext";
const AddHotel = () => {
    const [hotelData, setHotelData] = useState({
        hotelName: "",
        hotelAddress: "",
        hotelTotalRoom: "",
        hotelCost: "",
        hotelRating: "",
        hotelPhone: "",
        hotelDescription: "",
    });

    const { images, setImages } = useContext(Context);
    const [previewUrls, setPreviewUrls] = useState([]);
    const checkValue = () => {
        if (hotelData.hotelName == null || hotelData.hotelName == "") {
            alert("Bạn chưa nhập tên khách sạn")
            return
        }
        else if (hotelData.hotelCost == null || hotelData.hotelCost == "") {
            alert("Bạn chưa nhập giá khách sạn")
            return
        }
        else if (hotelData.hotelDescription == null || hotelData.hotelDescription == "") {
            alert("Bạn chưa nhập giới thiệu khách sạn")
            return
        }
        else if (hotelData.hotelRating == null || hotelData.hotelRating == "") {
            alert("Bạn chưa nhập số sao")
            return
        }
        else if (hotelData.hotelTotalRoom == null || hotelData.hotelTotalRoom == "") {
            alert("Bạn chưa nhập tên khách sạn")
            return
        }
        else if (hotelData.hotelPhone == null || hotelData.hotelPhone == "") {
            alert("Bạn chưa nhập số điện thoại khách sạn")
            return
        }
        else if (images.length == 0) {
            alert("Bạn chưa thêm ảnh")
            return
        }
    }
    const handleChange = (e) => {
        setHotelData({ ...hotelData, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setImages(prev => {
            const updated = [...prev, ...newFiles];
            return updated;
        });
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviews]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            checkValue()
            const data = await ApiService.postHotel(hotelData);
            const hotelId = data.result.hotelId;
            const formData = new FormData();
            images.forEach((file) => formData.append("files", file))
            formData.append("hotelId", hotelId)
            await ApiService.postImgHotel(formData);
            alert("Them khach san thanh cong")
        } catch (error) {
            console.error("Chi tiet loi : ", error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
            <div>
                <label className="block font-semibold mb-1">Tên khách sạn</label>
                <input name="hotelName" placeholder="Nhập tên khách sạn" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block font-semibold mb-1">Địa chỉ</label>
                <input name="hotelAddress" placeholder="Nhập địa chỉ khách sạn" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block font-semibold mb-1">Giá (VNĐ)</label>
                <input name="hotelCost" placeholder="Nhập giá phòng" type="number" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block font-semibold mb-1">Số sao (Đánh giá)</label>
                <input name="hotelRating" placeholder="Nhập số sao (ví dụ: 4.5)" type="number" step="0.1" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
                <label className="block font-semibold mb-1">Tổng số phòng</label>
                <input name="hotelTotalRoom" placeholder="Nhập tổng số phòng" type="number" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block font-semibold mb-1">Số điện thoại liên hệ</label>
                <input name="hotelPhone" placeholder="Nhập số điện thoại" type="number" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block font-semibold mb-1">Mô tả khách sạn</label>
                <textarea name="hotelDescription" placeholder="Nhập mô tả chi tiết khách sạn" onChange={handleChange} rows={4}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
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
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-all duration-200">
                Thêm khách sạn
            </button>
        </form>
    );

};

export default AddHotel;
