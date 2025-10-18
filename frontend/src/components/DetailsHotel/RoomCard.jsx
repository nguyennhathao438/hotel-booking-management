// src/components/DetailsHotel/RoomCard.jsx
import React from "react";
import { Bed, DoorOpen, User } from "lucide-react";
import { FaHome } from "react-icons/fa";
import { MdWifi } from "react-icons/md";
import banner2 from "../../assets/img/banner2.jpg";
import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
    return (
        <div className="flex flex-col lg:flex-row m-5 p-2 border rounded-2xl shadow-xl bg-gradient-to-r from-blue-50 via-white to-blue-50 hover:from-blue-100 hover:to-white transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
            <div className="w-full lg:w-[30%]">
                <h2 className="p-2 text-2xl font-bold text-blue-400 drop-shadow-sm">{room.roomName}</h2>
                <img src={banner2} alt="" className="rounded-2xl object-cover shadow-md hover:shadow-lg transition-all duration-300" />
            </div>
            <div className="flex flex-col lg:flex-row w-full lg:w-[70%] p-4 rounded-xl bg-white/70 backdrop-blur-sm">
                {/* --- Thông tin phòng --- */}
                <div className="flex-1 border m-2 rounded-xl bg-gradient-to-b from-white to-blue-50 p-2">
                    <div className="text-center font-bold text-lg p-2 text-blue-600">
                        <h2>Thông tin phòng</h2>
                    </div>
                    <div className="flex p-2 items-center justify-center lg:justify-start ">
                        <Bed className="text-blue-500" />
                        <span className="pl-2">{room.bedCount} giường ngủ</span>
                    </div>
                    <div className="flex p-2 items-center justify-center lg:justify-start">
                        <DoorOpen className="text-blue-500" />
                        <span className="pl-2">{room.bedRoomCount} phòng ngủ</span>
                    </div>
                    <div className="flex items-center pl-2 justify-center lg:justify-start">
                        <FaHome className="text-blue-500" />
                        <span className="p-2">{room.roomArea} m<sup>2</sup></span>
                    </div>
                    <div className="flex items-center pl-2 justify-center lg:justify-start">
                        <MdWifi className="text-green-500" />
                        <span className="p-2">Wifi miễn phí</span>
                    </div>
                </div>

                {/* --- Số lượng người --- */}
                <div className="flex-1 flex flex-col border rounded-xl m-2 bg-gradient-to-b from-white to-blue-50">
                    <div className="text-center font-bold text-lg p-2 text-blue-600">
                        <h2>Số lượng người</h2>
                    </div>
                    <div className="flex justify-center h-full items-center gap-1">
                        {Array.from({ length: room.roomCapacity }).map((_, index) => (
                            <User key={index} className="w-6 h-6 text-blue-600" />
                        ))}
                    </div>
                </div>

                {/* --- Giá phòng --- */}
                <div className="flex-1 border rounded-xl m-2 flex flex-col bg-gradient-to-b from-white to-blue-50">
                    <div className="text-center font-bold text-lg p-2 text-blue-600">
                        <h2>Giá phòng / đêm</h2>
                    </div>
                    <div className="flex justify-center lg:justify-end h-full items-center pr-2">
                        <p className="text-orange-500 font-bold text-xl drop-shadow-sm">
                            {room.roomPrice} VNĐ
                        </p>
                    </div>
                </div>
                <div className="flex justify-center lg:justify-end items-center p-3">
                    
                        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
                            Đặt phòng
                        </button>
                    
                </div>
            </div>
        </div>
    );
}
