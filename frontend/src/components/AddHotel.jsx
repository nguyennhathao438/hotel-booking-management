import React, { useState } from "react";
const AddHotel = () => {
 const token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJob3RlbC1ib29raW5nLmNvbSIsInN1YiI6ImFkbWluQGdtYWlsLmNvbSIsImV4cCI6MTc1OTY4MTc3NCwiaWF0IjoxNzU5Njc0NTc0LCJqdGkiOiJmZDc3NmMxZS02ZWFmLTRiMjgtYmFhNi1lMzM0ZjE0YTRkMDkiLCJzY29wZSI6IiJ9.R451hhFzqMq0cTQgFmA7v8JizkdC9vqQ_TknFw30RHHHWsmV3-WsK9O6221MmQlX2pCodq5_dQ4GRjBQPTIDIQ"; 
    const [hotelData, setHotelData] = useState({
        hotelName: "",
        hotelAddress: "",
        hotelPrice: "",
        hotelTotalRoom: "",
        hotelDescription: "",
    });

    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    const handleChange = (e) => {
        setHotelData({ ...hotelData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...previews]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/hotel_booking/api/hotels/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(hotelData),
            });

            const data = await res.json();
            const hotelId = data.result.hotelId; 

            // Upload nhiều ảnh kèm hotelId
            const formData = new FormData();
            images.forEach((file) => formData.append("files", file));
            formData.append("hotelId", hotelId);

            await fetch("http://localhost:8080/hotel_booking/images/upload", {
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
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded">
            <input name="hotelName" placeholder="Tên khách sạn" onChange={handleChange} className="input" />
            <input name="hotelAddress" placeholder="Địa chỉ" onChange={handleChange} className="input" />
            <input name="hotelPrice" placeholder="Giá" type="number" onChange={handleChange} className="input" />
            <input name="hotelTotalRoom" placeholder="Số phòng" type="number" onChange={handleChange} className="input" />
            <textarea name="hotelDescription" placeholder="Mô tả" onChange={handleChange} className="input" />

            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="input" />

            <div className="grid grid-cols-3 gap-2 mt-4">
                {previewUrls.map((url, idx) => (
                    <img key={idx} src={url} alt={`preview-${idx}`} className="w-full h-32 object-cover rounded" />
                ))}
            </div>

            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Thêm khách sạn
            </button>
        </form>
    );
};

export default AddHotel;
