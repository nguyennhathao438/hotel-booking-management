import { useState } from "react";

export default function TopTabBar() {
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
        <div className="w-full bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                {/* Tabs */}
                <div className="flex space-x-6">
                    {tabs.map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`relative font-medium transition duration-300 group ${activeTab === item
                                    ? "text-blue-600"
                                    : "text-gray-700 hover:text-blue-600"
                                }`}
                        >
                            {item}
                            <span
                                className={`absolute left-0 -bottom-[2px] h-[2px] bg-blue-600 transition-all duration-300 ${activeTab === item ? "w-full" : "w-0 group-hover:w-full"
                                    }`}
                            ></span>
                        </button>
                    ))}
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md">
                    Đặt căn hộ của bạn
                </button>
            </div>
        </div>
    );
}
