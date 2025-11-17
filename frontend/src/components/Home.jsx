import BookingSearch from "./BookingSearch.jsx";
import Banner from "./Banner"
import Hotels from "./Hotels.jsx";
import Facilities from "./Facilities.jsx";
import api from "../api.js";
import { useNavigate } from "react-router-dom";
function Home() {
    const destinations = [
        {
            name: "Thành phố Hồ Chí Minh",
            flag: "🇻🇳",
            img: "https://cdn.pixabay.com/photo/2021/11/02/15/04/ho-chi-minh-city-6763512_1280.jpg",
            large: true,
        },
        {
            name: "Thành phố Đà Nẵng",
            flag: "🇻🇳",
            img: "https://cdn.pixabay.com/photo/2021/08/18/07/16/love-bridge-6554833_1280.jpg",
            large: true,
        },
        {
            name: "Thành phố Hà Nội",
            flag: "🇻🇳",
            img: "https://media.istockphoto.com/id/2157440310/vi/anh/train-street-in-hanoi-vietnam-famous-landmark-and-tourism-destination.jpg?s=1024x1024&w=is&k=20&c=-bR5CcNjVe3C4rS_K47IoMMZ9HltLV02yoVnvIn_ups=",
            large: false,
        },
        {
            name: "Vũng Tàu",
            flag: "🇻🇳",
            img: "https://cdn.pixabay.com/photo/2021/12/22/00/28/city-6886266_1280.jpg",
            large: false,
        },
        {
            name: "Đà Lạt",
            flag: "🇻🇳",
            img: "https://cdn.pixabay.com/photo/2024/04/10/08/16/mountains-8687536_1280.jpg",
            large: false,
        },
    ];
    const navigate = useNavigate()
    const filterProvice = async (province) => {
        try {
            const response = await api.get(`/hotels/search/${encodeURIComponent(province)}`)
            const hotelProvinceTemp = response.data.result
            if (response.data.code) {
                navigate(`/search-result/${province}`, {
                    state: { hotelProvince: hotelProvinceTemp }
                })
            }
        } catch (error) {
            console.log("Không thể lọc theo tỉnh lỗi", error)
        }
    }
    return (
        <>
            <Banner />
            <div className="container mx-auto relative mb-[70px] ">
                <div className="bg-white lg:absolute lg:left-0
                lg:right-0 lg:p-0 lg:-top-12">
                    <BookingSearch />
                </div>
            </div>
            <div className="w-[85%] mx-auto">
                <h2 className="text-2xl font-bold mb-1">Điểm đến đang thịnh hành</h2>
                <p className="text-gray-600 mb-5">
                    Các lựa chọn phổ biến nhất cho du khách từ Việt Nam
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {destinations.slice(0, 3).map((d, index) => (
                        <div onClick={() => filterProvice(d.name)} key={index} className="relative overflow-hidden rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer">
                            <img src={d.img} className="w-full h-56 object-cover" />
                            <div className="absolute inset-0 from-black/60 to-transparent" />
                            <h3 className="absolute bottom-3 left-4 text-white text-lg font-bold flex items-center gap-2">
                                {d.name} <span>{d.flag}</span>
                            </h3>
                        </div>
                    ))}

                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {destinations.slice(3).map((d, index) => (
                            <div onClick={()=>filterProvice(d.name)} key={index} className="relative overflow-hidden rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer">
                                <img src={d.img} className="w-full h-64 object-cover" />
                                <div className="absolute inset-0 from-black/60 to-transparent" />
                                <h3 className="absolute bottom-3 left-4 text-white text-lg font-bold flex items-center gap-2">
                                    {d.name} <span>{d.flag}</span>
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <Hotels />
            <Facilities />
        </>
    );
}
export default Home