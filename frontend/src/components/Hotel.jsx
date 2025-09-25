import { useContext} from "react";
import testImg from "../assets/img/banner1.jpg";
import { Context } from "./RoomContext";

function HotelInfor() {
    const {hotels} = useContext(Context)

    return (
        <div className="p-4 border">
            <h3 className="w-full p-4 font-bold font-sans text-lg md:text-xl">
                CHỌN CHỖ NGHỈ LÝ TƯỞNG CỦA BẠN
            </h3>
            <ul className="border cursor-pointer flex flex-row gap-3 overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6 md:overflow-visible">
                {hotels.map((hotel) => (
                    <li key={hotel.hotelId} className="max-w-[220px] md:max-w-none overflow-hidden flex-shrink-0 rounded-xl border shadow hover:shadow-lg transition bg-white">
                        <div>
                            <img src={testImg} alt={hotel.hotelName} className="w-full hover:scale-105 transition-transform duration-300 h-40 object-cover rounded-t-xl" />
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-base md:text-center">{hotel.hotelName}</h3>
                            <p className="text-sm text-gray-600">{hotel.hotelAddress}</p>
                            <p className="hidden md:block text-sm text-gray-500">{hotel.hotelDescription}</p>
                            <p className="text-end font-semibold text-blue-600">Giá: {hotel.hotelPrice.toLocaleString()} VND</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HotelInfor;
