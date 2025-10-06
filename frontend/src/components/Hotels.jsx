import { useContext } from "react";
import testImg from "../assets/img/banner1.jpg";
import { Context } from "./RoomContext";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function Hotels() {
    const { hotels } = useContext(Context)
    const hotelsSort = [...hotels]
    hotelsSort.sort((a, b) => b.hotelRating - a.hotelRating)
    const hotelsTops = hotelsSort.splice(0, 5)
    return (
        <div className="p-4">
            <h3 className="w-full p-4 font-bold font-sans text-lg md:text-xl">
                KHÁCH SẠN ĐƯỢC ĐÁNH GIÁ CAO
            </h3>
            <ul className="flex flex-row gap-3 overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-6 md:overflow-visible">
                {hotelsTops.map((hotel) => (
                    <li key={hotel.hotelId} className="max-w-[220px] md:max-w-none overflow-hidden flex-shrink-0 rounded-xl border shadow hover:shadow-lg transition bg-white cursor-pointer">
                        <div>
                            <img src={testImg} alt={hotel.hotelName} className="w-full hover:scale-105 transition-transform duration-300 h-40 object-cover rounded-t-xl" />
                        </div>
                        <div className="p-4">
                            <Link to={`/detailshotel/${hotel.hotelId}`}>
                                <h3 className="font-bold text-base md:text-center">{hotel.hotelName}</h3>
                            </Link>
                            <p className="text-sm text-gray-600">{hotel.hotelAddress}</p>
                            <p className="hidden md:block text-sm text-gray-500">{hotel.hotelDescription}</p>
                            <div className="flex justify-between">
                                <span className="text-end font-semibold text-blue-600">Rate: {hotel.hotelRating} </span>
                                <span className="text-end font-semibold text-blue-600">Giá: {hotel.hotelCost} VNĐ</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Hotels;
