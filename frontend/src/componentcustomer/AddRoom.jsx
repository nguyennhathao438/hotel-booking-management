import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";

export default function AddRoom({ hotelId, hotelName }) {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomCapacity, setRoomCapacity] = useState(1);
  const [roomArea, setRoomArea] = useState("");
  const [bedRoomCount, setBedRoomCount] = useState(1);
  const [bedCount, setBedCount] = useState(1);
  const [roomPrice, setRoomPrice] = useState("");
  const [status, setStatus] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomName || !roomType || !roomPrice || !hotelId) {
      toast.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
      return;
    }

    const roomData = {
      roomName,
      roomType,
      roomCapacity: Number(roomCapacity),
      roomArea: Number(roomArea),
      bedRoomCount: Number(bedRoomCount),
      bedCount: Number(bedCount),
      roomPrice: Number(roomPrice),
      status: Number(status),
      hotelID: hotelId,
    };

    try {
      const res = await api.post("/rooms/create", roomData);

      if (res.data?.result) {
        toast.success("Thêm phòng thành công!");
        setRoomName("");
        setRoomType("");
        setRoomCapacity(1);
        setRoomArea("");
        setBedRoomCount(1);
        setBedCount(1);
        setRoomPrice("");
        setStatus(1);
      } else {
        toast.error("Không thể thêm phòng!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi thêm phòng!");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Thêm phòng mới cho khách sạn{" "}
        <span className="text-blue-600">{hotelName}</span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Room Name */}
        <div>
          <label className="font-semibold">Tên phòng</label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Room Type */}
        <div>
          <label className="font-semibold">Loại phòng</label>
          <input
            type="text"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Capacity, Area, Beds */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold">Sức chứa (người)</label>
            <input
              type="number"
              min="1"
              value={roomCapacity}
              onChange={(e) => setRoomCapacity(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="font-semibold">Diện tích (m²)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={roomArea}
              onChange={(e) => setRoomArea(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="font-semibold">Giá (VNĐ)</label>
            <input
              type="number"
              min="0"
              value={roomPrice}
              onChange={(e) => setRoomPrice(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Beds info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Số phòng ngủ</label>
            <input
              type="number"
              min="1"
              value={bedRoomCount}
              onChange={(e) => setBedRoomCount(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="font-semibold">Số giường</label>
            <input
              type="number"
              min="1"
              value={bedCount}
              onChange={(e) => setBedCount(e.target.value)}
              className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="font-semibold">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-400"
          >
            <option value={0}>Đang hoạt động</option>
            <option value={1}>Bảo trì</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Thêm phòng
        </button>
      </form>
    </div>
  );
}
