import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/room";

export default function RoomManager() {
    const [formData, setFormData] = useState({
        roomName: "",
        roomType: "",
        roomCapacity: 1,
        bedCount: 1,
        roomPrice: 0,
    });

    const [rooms, setRooms] = useState([]);

    // Lấy danh sách phòng khi component load
    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const res = await axios.get(API_URL);
            setRooms(res.data.result);
        } catch (err) {
            console.error("Lỗi lấy danh sách phòng:", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/create`, formData);
            fetchRooms(); // refresh danh sách
            setFormData({
                roomName: "",
                roomType: "",
                roomCapacity: 1,
                bedCount: 1,
                roomPrice: 0,
            });
        } catch (err) {
            console.error("Lỗi tạo phòng:", err);
        }
    };

    return (
        <div className="p-4 flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6">Quản lý phòng</h2>

            {/* Form tạo phòng */}
            <form
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mb-6 space-y-4"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="roomName"
                    placeholder="Tên phòng"
                    value={formData.roomName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none"
                    required
                />
                <input
                    type="text"
                    name="roomType"
                    placeholder="Loại phòng"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none"
                />
                <div className="flex gap-2">
                    <input
                        type="number"
                        name="roomCapacity"
                        placeholder="Số lượng khách"
                        value={formData.roomCapacity}
                        onChange={handleChange}
                        className="w-1/2 px-3 py-2 bg-gray-100 rounded-full focus:outline-none"
                        min={1}
                    />
                    <input
                        type="number"
                        name="bedCount"
                        placeholder="Số giường"
                        value={formData.bedCount}
                        onChange={handleChange}
                        className="w-1/2 px-3 py-2 bg-gray-100 rounded-full focus:outline-none"
                        min={1}
                    />
                </div>
                <input
                    type="number"
                    name="roomPrice"
                    placeholder="Giá phòng"
                    value={formData.roomPrice}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-100 rounded-full focus:outline-none"
                    min={0}
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-green-400 text-white rounded-full font-semibold hover:bg-green-500"
                >
                    Tạo phòng
                </button>
            </form>

            {/* Bảng danh sách phòng */}
            <div className="w-full max-w-4xl">
                <table className="min-w-full border rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Tên phòng</th>
                        <th className="px-4 py-2">Loại</th>
                        <th className="px-4 py-2">Số giường</th>
                        <th className="px-4 py-2">Giá</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rooms.map((room) => (
                        <tr key={room.roomId} className="border-t">
                            <td className="px-4 py-2">{room.roomId}</td>
                            <td className="px-4 py-2">{room.roomName}</td>
                            <td className="px-4 py-2">{room.roomType}</td>
                            <td className="px-4 py-2">{room.bedCount}</td>
                            <td className="px-4 py-2">{room.roomPrice}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
