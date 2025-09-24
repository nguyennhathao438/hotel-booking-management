import { useEffect, useState } from "react";

function Hotel() {
    const [hotels, setHotels] = useState([]);

    // gọi API khi component load
    useEffect(() => {
        fetch("http://localhost:8080/api/hotel") // API backend
            .then((res) => res.json())
            .then((data) => {
                setHotels(data); // lưu vào state
            })
            .catch((err) => console.error("Lỗi khi load hotel:", err));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-green-600">Danh sách khách sạn</h1>

            {/* Nếu chưa có dữ liệu thì báo đang tải */}
            {hotels.length === 0 ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {hotels.map((hotel) => (
                        <div
                            key={hotel.hotelId}
                            className="border p-4 rounded-lg shadow bg-white"
                        >
                            <h2 className="text-xl font-semibold">{hotel.hotelName}</h2>
                            <p className="text-gray-600">{hotel.hotelAddress}</p>
                            <p>📞 {hotel.hotelPhone}</p>
                            <p>✉️ {hotel.hotelEmail}</p>
                            <p className="font-bold text-blue-600">
                                Giá: {hotel.hotelCost.toLocaleString()} VND
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                {hotel.hotelDescription}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Hotel;
