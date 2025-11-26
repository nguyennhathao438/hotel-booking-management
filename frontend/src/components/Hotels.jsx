import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import api from "../api";
function Hotels() {
    const [hotels, setHotels] = useState([])
    const hotelsSort = [...hotels]
    hotelsSort.sort((a, b) => b.hotelRating - a.hotelRating)
    const hotelsTops = hotelsSort.splice(0, 15)
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollRef = useRef(null);
    const [minPrices, setMinPrices] = useState({});



    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const checkScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = el;

            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
        };

        checkScroll();
        el.addEventListener("scroll", checkScroll);

        return () => el.removeEventListener("scroll", checkScroll);
    }, [hotels]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8; // mỗi lần trượt 80% chiều rộng
            scrollRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const fetchAllHotel = async () => {
        try {
            const response = await api.get("/hotels/all")
            setHotels(response.data.result)
        } catch (error) {
            console.error("Error when load data :", error);
        }
    }

    useEffect(() => {
        fetchAllHotel()
    }, [])

    const [firstHotelImages, setFirstHotelImages] = useState({});
    useEffect(() => {
        const fetchImgsHotelFirst = async () => {
            const temp = {};
            for (let hotel of hotels) {
                try {
                    const res = await api.get(`/images/hotel/${hotel.hotelId}/first`);
                    temp[hotel.hotelId] = res.data?.result?.imgUrl ?? null;
                } catch (err) {
                    console.log("Lỗi", err)
                    temp[hotel.roomId] = null;
                }
            }
            setFirstHotelImages(temp);
        };
        if (hotels.length > 0)
            fetchImgsHotelFirst()
    }, [hotels]);


    useEffect(() => {
        const fetchMinPrices = async () => {
            const temp = {};
            for (let hotel of hotels) {
                try {
                    const res = await api.get(`/rooms/hotel/${hotel.hotelId}/min-price`);
                    temp[hotel.hotelId] = res.data?.result?.roomPrice ?? null;
                } catch (err) {
                    console.log("Lỗi lấy giá min", err);
                    temp[hotel.hotelId] = null;
                }
            }
            setMinPrices(temp);
        };

        if (hotels.length > 0) fetchMinPrices();
    }, [hotels]);


    return (
        <div className="p-4">
            <h3 className="w-full p-4 font-bold font-sans text-lg md:text-xl">
                KHÁCH SẠN ĐƯỢC ĐÁNH GIÁ CAO
            </h3>
            <div className="relative group px-4 md:px-8">
                <button onClick={() => scroll("left")}
                    className={`hidden cursor-pointer md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-100 transition
                    ${!canScrollLeft ? "opacity-0 pointer-events-none" : ""}`}
                >
                    <ChevronLeft className="text-blue-600" />
                </button>
                <ul ref={scrollRef} className="flex flex-row gap-4 overflow-x-auto scrollbar-hide scroll-smooth md:gap-6 md:overflow-hidden">
                    {hotelsTops.map((hotel) => {
                        return (
                            <li key={hotel.hotelId} className="shrink-0 w-[220px] md:w-[260px] lg:w-[280px] h-[360px] flex flex-col justify-between rounded-xl border shadow hover:shadow-lg transition bg-white cursor-pointer">
                                <div className="overflow-hidden h-[45%]">
                                    <Link to={`/detailshotel/${hotel.hotelId}`}>
                                        <img
                                            src={firstHotelImages[hotel.hotelId]}
                                            alt={hotel.hotelName}
                                            className="w-full h-full object-cover rounded-t-xl hover:scale-105 transition-transform duration-300"
                                        />
                                    </Link>
                                </div>
                                {/* Nội dung */}
                                <div className="flex flex-col justify-between h-[55%] p-4">
                                    <Link to={`/detailshotel/${hotel.hotelId}`}>
                                        <h3 className="font-bold text-base text-center line-clamp-1">{hotel.hotelName}</h3>
                                    </Link>
                                    <p className="text-sm text-gray-600 line-clamp-1 text-center">{hotel.hotelAddress}</p>
                                    <p className="hidden md:block text-sm text-gray-500 line-clamp-2 text-center">{hotel.hotelDescription}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="font-semibold text-blue-600"> ⭐ {hotel.hotelRating && (hotel.hotelRating.toFixed(1))}</span>
                                        <span className="font-semibold text-orange-600 text-sm">Chỉ từ : {minPrices[hotel.hotelId]?.toLocaleString() || "—"} VNĐ</span>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
                <button onClick={() => scroll("right")}
                    className={`hidden cursor-pointer md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-blue-100 transition
                    ${!canScrollRight ? "opacity-0 pointer-events-none" : ""}`}
                >
                    <ChevronRight className="text-blue-600" />
                </button>
            </div>
        </div>
    );
}
export default Hotels;
