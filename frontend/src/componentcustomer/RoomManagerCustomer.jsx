// components/RoomManagerCustomer.jsx
import { useEffect, useState } from "react";
import api from "../api";
import banner2 from "./../assets/img/banner2.jpg";
import { Bed, DoorOpen, User } from "lucide-react";
import { FaHome } from "react-icons/fa";
import { MdWifi } from "react-icons/md";

export default function RoomManagerCustomer({ hotelId, hotelName }) {
  const [rooms, setRooms] = useState([]);
  const [images, setImages] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [filter, setFilter] = useState("all");
  const [editingStatusRoomId, setEditingStatusRoomId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomData = await api.get(`/rooms/hotel/${hotelId}`);
        setRooms(roomData.data.result || []);

        const imageData = await api.get(`/images/hotel/${hotelId}`);
        setImages(imageData.data.result || []);
      } catch (error) {
        console.error("Error when load data:", error);
      }
    };
    fetchData();
  }, [hotelId]);

  const handleUpdateClick = (room) => setEditingRoom(room);

  const handleInputChange = (e) =>
    setEditingRoom({ ...editingRoom, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await api.put(`/rooms/${editingRoom.roomId}`, editingRoom);
      alert("Cập nhật thành công!");
      setEditingRoom(null);
      const response = await api.get(`/rooms/hotel/${hotelId}`);
      setRooms(response.data.result || []);
    } catch (error) {
      console.error("Lỗi khi cập nhật phòng:", error);
      alert("Cập nhật thất bại!");
    }
  };
  const filteredRooms = rooms.filter((room) => {
    if (filter === "all") return true;
    if (filter === "active") return room.status === 0;
    if (filter === "maintenance") return room.status === 1;
    return true;
  });
  return (
    <div className="p-4 ml-[300px]">
      <h2 className="text-lg font-semibold mb-3 text-blue-600">
        Danh sách phòng của khách sạn {hotelName || "Khách sạn"}
      </h2>
      <div className="w-full flex justify-end items-center">
        <button
          onClick={() => setFilter("maintenance")}
          className={`w-24 h-10 border rounded-full shadow-lg flex items-center justify-center text-sm font-semibold transition
                ${
                  filter === "maintenance"
                    ? "bg-yellow-500 text-white"
                    : "bg-white hover:bg-yellow-100"
                }`}
        >
          Bảo trì
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`w-24 h-10 border rounded-full shadow-lg flex items-center justify-center text-sm font-semibold transition
                ${
                  filter === "active"
                    ? "bg-green-500 text-white"
                    : "bg-white hover:bg-green-100"
                }`}
        >
          Hoạt động
        </button>

        <button
          onClick={() => setFilter("all")}
          className={`w-24 h-10 border rounded-full shadow-lg flex items-center justify-center text-sm font-semibold transition
                ${
                  filter === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-white hover:bg-blue-100"
                }`}
        >
          Tất cả
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 ">
        {filteredRooms.map((room) => (
          <div
            key={room.roomId}
            className="flex flex-col lg:flex-row m-5 p-2 border rounded-2xl shadow-xl bg-gradient-to-r from-blue-50 via-white to-blue-50 hover:from-blue-100 hover:to-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
          >
            <div className="w-full lg:w-[30%]">
              <h2 className="p-2 text-2xl font-bold text-blue-400 drop-shadow-sm">
                {room.roomName}
              </h2>
              <img
                src={banner2}
                alt=""
                className="rounded-2xl object-cover shadow-md hover:shadow-lg transition-all duration-300"
              />
            </div>

            <div className="flex-1 flex flex-col lg:flex-row w-full lg:w-[70%] p-4 rounded-xl bg-white/70 backdrop-blur-sm">
              {/* Thông tin phòng */}
              <div className="flex-1 border m-2 rounded-xl bg-gradient-to-b from-white to-blue-50 p-2">
                <div className="text-center font-bold text-lg p-2 text-blue-600">
                  Thông tin phòng
                </div>
                <div className="flex p-2 items-center justify-center lg:justify-start">
                  <Bed className="text-blue-500" />
                  <span className="pl-2">{room.bedCount} giường ngủ</span>
                </div>
                <div className="flex p-2 items-center justify-center lg:justify-start">
                  <DoorOpen className="text-blue-500" />
                  <span className="pl-2">{room.bedRoomCount} phòng ngủ</span>
                </div>
                <div className="flex items-center pl-2 justify-center lg:justify-start">
                  <FaHome className="text-blue-500" />
                  <span className="p-2">
                    {room.roomArea} m<sup>2</sup>
                  </span>
                </div>
                <div className="flex items-center pl-2 justify-center lg:justify-start">
                  <MdWifi className="text-green-500" />
                  <span className="p-2">Wifi miễn phí</span>
                </div>
              </div>

              {/* Số lượng người */}
              <div className="flex-1 flex flex-col border rounded-xl m-2 bg-gradient-to-b from-white to-blue-50">
                <div className="text-center font-bold text-lg p-2 text-blue-600">
                  Số lượng người
                </div>
                <div className="flex justify-center h-full items-center gap-1">
                  {Array.from({ length: room.roomCapacity }).map((_, index) => (
                    <User key={index} className="w-6 h-6 text-blue-600" />
                  ))}
                </div>
              </div>

              {/* Giá phòng */}
              <div className="flex-1 border rounded-xl m-2 flex flex-col bg-gradient-to-b from-white to-blue-50">
                <div className="text-center font-bold text-lg p-2 text-blue-600">
                  Giá phòng / đêm
                </div>
                <div className="flex justify-center lg:justify-end h-full items-center pr-2">
                  <p className="text-orange-500 font-bold text-xl drop-shadow-sm">
                    {room.roomPrice.toLocaleString()} VNĐ
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between h-full p-3">
              <div className="flex justify-center lg:justify-end items-center p-3">
                <button
                  onClick={() => handleUpdateClick(room)}
                  className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Cập nhật thông tin phòng
                </button>
              </div>
              <div className="flex justify-center lg:justify-end items-center p-3">
                {editingStatusRoomId === room.roomId ? (
                  <div className="flex gap-2 w-full">
                    {room.status === 0 ? (
                      <button
                        onClick={async () => {
                          try {
                            await api.put(`/rooms/${room.roomId}`, {
                              ...room,
                              status: 1,
                            });
                            alert("Phòng đã chuyển sang trạng thái bảo trì!");
                            setEditingStatusRoomId(null);
                            const res = await api.get(
                              `/rooms/hotel/${hotelId}`
                            );
                            setRooms(res.data.result || []);
                          } catch (error) {
                            console.error("Lỗi cập nhật trạng thái:", error);
                            alert("Cập nhật thất bại!");
                          }
                        }}
                        className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                      >
                        Bảo trì phòng
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          try {
                            await api.put(`/rooms/${room.roomId}`, {
                              ...room,
                              status: 0,
                            });
                            alert("Phòng đã được kích hoạt lại!");
                            setEditingStatusRoomId(null);
                            const res = await api.get(
                              `/rooms/hotel/${hotelId}`
                            );
                            setRooms(res.data.result || []);
                          } catch (error) {
                            console.error("Lỗi cập nhật trạng thái:", error);
                            alert("Cập nhật thất bại!");
                          }
                        }}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Kích hoạt lại phòng
                      </button>
                    )}

                    {/* Nút hủy */}
                    <button
                      onClick={() => setEditingStatusRoomId(null)}
                      className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingStatusRoomId(room.roomId)}
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Cập nhật trạng thái
                  </button>
                )}
              </div>

              <div className="mt-auto flex  justify-center lg:justify-end items-center p-3">
                <p>
                  Trạng thái:{" "}
                  <span
                    className={
                      room.status === 0
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {room.status === 0 ? "Đang hoạt động" : "Bảo trì"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup cập nhật phòng */}
      {editingRoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={() => setEditingRoom(null)}
        >
          <div
            className="border bg-white rounded-2xl shadow-2xl p-6 w-[400px] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-blue-600 mb-4 text-center">
              Cập nhật phòng: {editingRoom.roomName}
            </h3>

            <div className="space-y-2">
              {[
                { label: "Tên phòng", name: "roomName" },
                { label: "Diện tích (m²)", name: "roomArea" },
                { label: "Số giường ngủ", name: "bedCount" },
                { label: "Số phòng ngủ", name: "bedRoomCount" },
                { label: "Sức chứa", name: "roomCapacity" },
                { label: "Giá phòng (VNĐ)", name: "roomPrice" },
              ].map((field) => (
                <label
                  key={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}:
                  <input
                    name={field.name}
                    value={editingRoom[field.name]}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2 mt-1"
                  />
                </label>
              ))}
            </div>

            <div className="flex justify-between mt-5">
              <button
                onClick={() => setEditingRoom(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
