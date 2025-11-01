import { useState } from "react";

export default function TopTabBar({ scrollToRooms, scrollToDetailsHotel }) {
    const tabs = [
        "Tổng quan",
        "Thông tin căn hộ & giá",
        "Tiện nghi",
        "Quy tắc chung",
        "Ghi chú",
        "Đánh giá của khách",
    ];
    const [activeTab, setActiveTab] = useState("Tổng quan");
    return (
        <div className="w-full bg-white shadow-md border-b border-gray-200 top-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                <div className="flex space-x-6">
                    {tabs.map((item) => (
                        <button key={item} onClick={() => {setActiveTab(item);
                                if (item === "Thông tin căn hộ & giá" && scrollToRooms) {
                                    scrollToRooms(); 
                                }
                                if (item === "Tổng quan" && scrollToDetailsHotel) {
                                    scrollToDetailsHotel();
                                }
                            }}
                            className={`relative font-medium transition duration-300 group ${activeTab === item? "text-[#6B4423]": "text-gray-700 hover:text-[#6B4423]"}`}>
                            {item}
                            <span
                                className={`absolute left-0 -bottom-[2px] h-[2px] bg-[#6B4423] transition-all duration-300 ${
                                    activeTab === item ? "w-full" : "w-0 group-hover:w-full"
                                }`}
                            ></span>
                        </button>
                    ))}
                </div>

                <button className="bg-[#6B4423] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#4E342E] transition duration-300 shadow-md">
                    Đặt căn hộ của bạn
                </button>
            </div>
        </div>
    );
}
