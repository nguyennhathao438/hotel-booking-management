import { useContext, useEffect, useState } from "react";
import api from "../../api";
import ImageSlider from "../Common/ImageSlider";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Phone } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Context } from "../RoomContext";
import axios from "axios";
export default function HotelProvince() {
    const listProvince = [
        {
            "name": "Thành phố Hà Nội",
            "code": 1,
            "division_type": "tỉnh",
            "codename": "thanh_pho_ha_noi",
            "phone_code": 24,
            "districts": []
        },
        {
            "name": "Tỉnh Hà Giang",
            "code": 2,
            "division_type": "tỉnh",
            "codename": "tinh_ha_giang",
            "phone_code": 219,
            "districts": []
        },
        {
            "name": "Tỉnh Cao Bằng",
            "code": 4,
            "division_type": "tỉnh",
            "codename": "tinh_cao_bang",
            "phone_code": 206,
            "districts": []
        },
        {
            "name": "Tỉnh Bắc Kạn",
            "code": 6,
            "division_type": "tỉnh",
            "codename": "tinh_bac_kan",
            "phone_code": 209,
            "districts": []
        },
        {
            "name": "Tỉnh Tuyên Quang",
            "code": 8,
            "division_type": "tỉnh",
            "codename": "tinh_tuyen_quang",
            "phone_code": 207,
            "districts": []
        },
        {
            "name": "Tỉnh Lào Cai",
            "code": 10,
            "division_type": "tỉnh",
            "codename": "tinh_lao_cai",
            "phone_code": 214,
            "districts": []
        },
        {
            "name": "Tỉnh Điện Biên",
            "code": 11,
            "division_type": "tỉnh",
            "codename": "tinh_dien_bien",
            "phone_code": 215,
            "districts": []
        },
        {
            "name": "Tỉnh Lai Châu",
            "code": 12,
            "division_type": "tỉnh",
            "codename": "tinh_lai_chau",
            "phone_code": 213,
            "districts": []
        },
        {
            "name": "Tỉnh Sơn La",
            "code": 14,
            "division_type": "tỉnh",
            "codename": "tinh_son_la",
            "phone_code": 212,
            "districts": []
        },
        {
            "name": "Tỉnh Yên Bái",
            "code": 15,
            "division_type": "tỉnh",
            "codename": "tinh_yen_bai",
            "phone_code": 216,
            "districts": []
        },
        {
            "name": "Tỉnh Hoà Bình",
            "code": 17,
            "division_type": "tỉnh",
            "codename": "tinh_hoa_binh",
            "phone_code": 218,
            "districts": []
        },
        {
            "name": "Tỉnh Thái Nguyên",
            "code": 19,
            "division_type": "tỉnh",
            "codename": "tinh_thai_nguyen",
            "phone_code": 208,
            "districts": []
        },
        {
            "name": "Tỉnh Lạng Sơn",
            "code": 20,
            "division_type": "tỉnh",
            "codename": "tinh_lang_son",
            "phone_code": 205,
            "districts": []
        },
        {
            "name": "Tỉnh Quảng Ninh",
            "code": 22,
            "division_type": "tỉnh",
            "codename": "tinh_quang_ninh",
            "phone_code": 203,
            "districts": []
        },
        {
            "name": "Tỉnh Bắc Giang",
            "code": 24,
            "division_type": "tỉnh",
            "codename": "tinh_bac_giang",
            "phone_code": 204,
            "districts": []
        },
        {
            "name": "Tỉnh Phú Thọ",
            "code": 25,
            "division_type": "tỉnh",
            "codename": "tinh_phu_tho",
            "phone_code": 210,
            "districts": []
        },
        {
            "name": "Tỉnh Vĩnh Phúc",
            "code": 26,
            "division_type": "tỉnh",
            "codename": "tinh_vinh_phuc",
            "phone_code": 211,
            "districts": []
        },
        {
            "name": "Tỉnh Bắc Ninh",
            "code": 27,
            "division_type": "tỉnh",
            "codename": "tinh_bac_ninh",
            "phone_code": 222,
            "districts": []
        },
        {
            "name": "Tỉnh Hải Dương",
            "code": 30,
            "division_type": "tỉnh",
            "codename": "tinh_hai_duong",
            "phone_code": 220,
            "districts": []
        },
        {
            "name": "Thành phố Hải Phòng",
            "code": 31,
            "division_type": "tỉnh",
            "codename": "thanh_pho_hai_phong",
            "phone_code": 225,
            "districts": []
        },
        {
            "name": "Tỉnh Hưng Yên",
            "code": 33,
            "division_type": "tỉnh",
            "codename": "tinh_hung_yen",
            "phone_code": 221,
            "districts": []
        },
        {
            "name": "Tỉnh Thái Bình",
            "code": 34,
            "division_type": "tỉnh",
            "codename": "tinh_thai_binh",
            "phone_code": 227,
            "districts": []
        },
        {
            "name": "Tỉnh Hà Nam",
            "code": 35,
            "division_type": "tỉnh",
            "codename": "tinh_ha_nam",
            "phone_code": 226,
            "districts": []
        },
        {
            "name": "Tỉnh Nam Định",
            "code": 36,
            "division_type": "tỉnh",
            "codename": "tinh_nam_dinh",
            "phone_code": 228,
            "districts": []
        },
        {
            "name": "Tỉnh Ninh Bình",
            "code": 37,
            "division_type": "tỉnh",
            "codename": "tinh_ninh_binh",
            "phone_code": 229,
            "districts": []
        },
        {
            "name": "Tỉnh Thanh Hóa",
            "code": 38,
            "division_type": "tỉnh",
            "codename": "tinh_thanh_hoa",
            "phone_code": 237,
            "districts": []
        },
        {
            "name": "Tỉnh Nghệ An",
            "code": 40,
            "division_type": "tỉnh",
            "codename": "tinh_nghe_an",
            "phone_code": 238,
            "districts": []
        },
        {
            "name": "Tỉnh Hà Tĩnh",
            "code": 42,
            "division_type": "tỉnh",
            "codename": "tinh_ha_tinh",
            "phone_code": 239,
            "districts": []
        },
        {
            "name": "Tỉnh Quảng Bình",
            "code": 44,
            "division_type": "tỉnh",
            "codename": "tinh_quang_binh",
            "phone_code": 232,
            "districts": []
        },
        {
            "name": "Tỉnh Quảng Trị",
            "code": 45,
            "division_type": "tỉnh",
            "codename": "tinh_quang_tri",
            "phone_code": 233,
            "districts": []
        },
        {
            "name": "Thành phố Huế",
            "code": 46,
            "division_type": "tỉnh",
            "codename": "thanh_pho_hue",
            "phone_code": 234,
            "districts": []
        },
        {
            "name": "Thành phố Đà Nẵng",
            "code": 48,
            "division_type": "tỉnh",
            "codename": "thanh_pho_da_nang",
            "phone_code": 236,
            "districts": []
        },
        {
            "name": "Tỉnh Quảng Nam",
            "code": 49,
            "division_type": "tỉnh",
            "codename": "tinh_quang_nam",
            "phone_code": 235,
            "districts": []
        },
        {
            "name": "Tỉnh Quảng Ngãi",
            "code": 51,
            "division_type": "tỉnh",
            "codename": "tinh_quang_ngai",
            "phone_code": 255,
            "districts": []
        },
        {
            "name": "Tỉnh Bình Định",
            "code": 52,
            "division_type": "tỉnh",
            "codename": "tinh_binh_dinh",
            "phone_code": 256,
            "districts": []
        },
        {
            "name": "Tỉnh Phú Yên",
            "code": 54,
            "division_type": "tỉnh",
            "codename": "tinh_phu_yen",
            "phone_code": 257,
            "districts": []
        },
        {
            "name": "Tỉnh Khánh Hòa",
            "code": 56,
            "division_type": "tỉnh",
            "codename": "tinh_khanh_hoa",
            "phone_code": 258,
            "districts": []
        },
        {
            "name": "Tỉnh Ninh Thuận",
            "code": 58,
            "division_type": "tỉnh",
            "codename": "tinh_ninh_thuan",
            "phone_code": 259,
            "districts": []
        },
        {
            "name": "Tỉnh Bình Thuận",
            "code": 60,
            "division_type": "tỉnh",
            "codename": "tinh_binh_thuan",
            "phone_code": 252,
            "districts": []
        },
        {
            "name": "Tỉnh Kon Tum",
            "code": 62,
            "division_type": "tỉnh",
            "codename": "tinh_kon_tum",
            "phone_code": 260,
            "districts": []
        },
        {
            "name": "Tỉnh Gia Lai",
            "code": 64,
            "division_type": "tỉnh",
            "codename": "tinh_gia_lai",
            "phone_code": 269,
            "districts": []
        },
        {
            "name": "Tỉnh Đắk Lắk",
            "code": 66,
            "division_type": "tỉnh",
            "codename": "tinh_dak_lak",
            "phone_code": 262,
            "districts": []
        },
        {
            "name": "Tỉnh Đắk Nông",
            "code": 67,
            "division_type": "tỉnh",
            "codename": "tinh_dak_nong",
            "phone_code": 261,
            "districts": []
        },
        {
            "name": "Tỉnh Lâm Đồng",
            "code": 68,
            "division_type": "tỉnh",
            "codename": "tinh_lam_dong",
            "phone_code": 263,
            "districts": []
        },
        {
            "name": "Tỉnh Bình Phước",
            "code": 70,
            "division_type": "tỉnh",
            "codename": "tinh_binh_phuoc",
            "phone_code": 271,
            "districts": []
        },
        {
            "name": "Tỉnh Tây Ninh",
            "code": 72,
            "division_type": "tỉnh",
            "codename": "tinh_tay_ninh",
            "phone_code": 276,
            "districts": []
        },
        {
            "name": "Tỉnh Bình Dương",
            "code": 74,
            "division_type": "tỉnh",
            "codename": "tinh_binh_duong",
            "phone_code": 274,
            "districts": []
        },
        {
            "name": "Tỉnh Đồng Nai",
            "code": 75,
            "division_type": "tỉnh",
            "codename": "tinh_dong_nai",
            "phone_code": 251,
            "districts": []
        },
        {
            "name": "Tỉnh Bà Rịa - Vũng Tàu",
            "code": 77,
            "division_type": "tỉnh",
            "codename": "tinh_ba_ria_vung_tau",
            "phone_code": 254,
            "districts": []
        },
        {
            "name": "Thành phố Hồ Chí Minh",
            "code": 79,
            "division_type": "tỉnh",
            "codename": "thanh_pho_ho_chi_minh",
            "phone_code": 28,
            "districts": []
        },
        {
            "name": "Tỉnh Long An",
            "code": 80,
            "division_type": "tỉnh",
            "codename": "tinh_long_an",
            "phone_code": 272,
            "districts": []
        },
        {
            "name": "Tỉnh Tiền Giang",
            "code": 82,
            "division_type": "tỉnh",
            "codename": "tinh_tien_giang",
            "phone_code": 273,
            "districts": []
        },
        {
            "name": "Tỉnh Bến Tre",
            "code": 83,
            "division_type": "tỉnh",
            "codename": "tinh_ben_tre",
            "phone_code": 275,
            "districts": []
        },
        {
            "name": "Tỉnh Trà Vinh",
            "code": 84,
            "division_type": "tỉnh",
            "codename": "tinh_tra_vinh",
            "phone_code": 294,
            "districts": []
        },
        {
            "name": "Tỉnh Vĩnh Long",
            "code": 86,
            "division_type": "tỉnh",
            "codename": "tinh_vinh_long",
            "phone_code": 270,
            "districts": []
        },
        {
            "name": "Tỉnh Đồng Tháp",
            "code": 87,
            "division_type": "tỉnh",
            "codename": "tinh_dong_thap",
            "phone_code": 277,
            "districts": []
        },
        {
            "name": "Tỉnh An Giang",
            "code": 89,
            "division_type": "tỉnh",
            "codename": "tinh_an_giang",
            "phone_code": 296,
            "districts": []
        },
        {
            "name": "Tỉnh Kiên Giang",
            "code": 91,
            "division_type": "tỉnh",
            "codename": "tinh_kien_giang",
            "phone_code": 297,
            "districts": []
        },
        {
            "name": "Thành phố Cần Thơ",
            "code": 92,
            "division_type": "tỉnh",
            "codename": "thanh_pho_can_tho",
            "phone_code": 292,
            "districts": []
        },
        {
            "name": "Tỉnh Hậu Giang",
            "code": 93,
            "division_type": "tỉnh",
            "codename": "tinh_hau_giang",
            "phone_code": 293,
            "districts": []
        },
        {
            "name": "Tỉnh Sóc Trăng",
            "code": 94,
            "division_type": "tỉnh",
            "codename": "tinh_soc_trang",
            "phone_code": 299,
            "districts": []
        },
        {
            "name": "Tỉnh Bạc Liêu",
            "code": 95,
            "division_type": "tỉnh",
            "codename": "tinh_bac_lieu",
            "phone_code": 291,
            "districts": []
        },
        {
            "name": "Tỉnh Cà Mau",
            "code": 96,
            "division_type": "tỉnh",
            "codename": "tinh_ca_mau",
            "phone_code": 290,
            "districts": []
        }
    ]
    const [images, setImages] = useState([])
    const { province } = useParams();
    const location = useLocation();
    const hotelProvince = location.state?.hotelProvince;
    const [districts, setDistricts] = useState([])
    const [selectedStar, setSelectedStar] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [filteredHotels, setFilteredHotels] = useState(hotelProvince);
    const { checkInDate, checkOutDate } = useContext(Context)
    const [viewMode, setViewMode] = useState("Xem ngang")
    const [minPrices, setMinPrices] = useState({})

    useEffect(() => {
        const fetchAllImgHotel = async () => {
            const respone = await api.get("/images/all")
            setImages(respone.data.result)
        }
        fetchAllImgHotel()
    }, [])

    useEffect(() => {
        const fetchDistricts = async () => {
            const provinceCode = listProvince.find(p => p.name.includes(province))?.code
            const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`, {
                withCredentials: false
            })
            setDistricts(response.data.districts)
        }
        fetchDistricts()
    }, [province])

    useEffect(() => {
        const fetchMinPrices = async () => {
            const temp = {};
            for (let hotel of filteredHotels) {
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

        if (filteredHotels.length > 0) fetchMinPrices();
    }, [filteredHotels]);



    const applyFilters = (star, district) => {
        let result = hotelProvince;
        if (star) {
            result = result.filter(h => h.hotelRating >= star);
        }
        if (district) {
            result = result.filter(h => h.hotelAddress.includes(district));
        }
        setFilteredHotels(result);
    };

    // Xử lý lọc sao
    const handleFilterStar = (e) => {
        const valueStar = Number(e.target.value);
        const newStar = selectedStar === valueStar ? null : valueStar;
        setSelectedStar(newStar);
        applyFilters(newStar, selectedDistrict);
    };

    // Xử lý lọc quận/huyện
    const handleChangeDistrict = (e) => {
        const valueD = e.target.value;
        const newDistrict = selectedDistrict === valueD ? "" : valueD;
        setSelectedDistrict(newDistrict);
        applyFilters(selectedStar, newDistrict);
    };

    const [showAllDistricts, setShowAllDistricts] = useState(false);
    const displayedDistricts = showAllDistricts
        ? districts
        : districts.slice(0, 8);



    return (
        <div className="h-auto ">
            <div className="w-[98%] border border-gray-300 rounded-xl mx-auto">
                <div className="px-5 py-3">
                    <span className="font-bold text-center block py-2 text-xl">Tìm thấy {hotelProvince.length} chỗ nghỉ ở {province}</span>
                    <span className="font-light text-center py-2 block text-md">Click nút bên dưới để tìm phòng trống từ {checkInDate.toLocaleDateString()} đến {checkOutDate.toLocaleDateString()}</span>
                    <div className="flex justify-end mb-4">
                        <button className="px-4 py-1 border border-gray-200 gap-2 flex rounded-xl bg-gray-200">
                            <button className={`px-3 py-1.5 cursor-pointer rounded-xl border transition ${viewMode === "Xem ngang" ? "bg-blue-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-blue-100"}`}
                                onClick={() => setViewMode("Xem ngang")}>
                                Xem ngang
                            </button>
                            <button className={`px-3 py-1.5 cursor-pointer rounded-xl border transition ${viewMode === "Xem dọc" ? "bg-blue-500 text-white shadow-md" : "bg-white text-gray-700 hover:bg-blue-100"}`}
                                onClick={() => setViewMode("Xem dọc")}>
                                Xem dọc
                            </button>
                        </button>
                    </div>

                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    {/* SIDEBAR BÊN TRÁI */}
                    <div className="flex flex-col gap-2 md:block md:w-1/5">
                        <div className="">
                            {/* Lọc theo sao */}
                            <div className="border border-gray-300 rounded-xl p-4 mb-5">
                                <h3 className="font-bold text-lg mb-3">Lọc theo sao</h3>
                                <div className="space-y-2 text-gray-700">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <div key={star} className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                value={star}
                                                checked={selectedStar === star}
                                                onChange={(e) => handleFilterStar(e)}
                                                className="w-4 h-4"
                                            />
                                            <span>{star} ⭐</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="">
                            {/* Lọc theo quận huyện */}
                            <div className="border border-gray-300 rounded-xl p-4 mb-5">
                                <h3 className="font-bold text-lg mb-3">Lọc theo quận/huyện</h3>
                                <div className="space-y-2 text-gray-700">
                                    {displayedDistricts.map(d => (
                                        <label key={d.code} className="flex items-center p-1">
                                            <input
                                                className="w-4 h-4 mr-2"
                                                type="checkbox"
                                                value={d.name}
                                                checked={selectedDistrict === d.name}
                                                onChange={(e) => handleChangeDistrict(e)}
                                            />
                                            {d.name}
                                        </label>
                                    ))}
                                </div>

                                {/* Nút xem thêm */}
                                {districts.length > 8 && (
                                    <button onClick={() => setShowAllDistricts(!showAllDistricts)} className="mt-2 text-black-600 cursor-pointer text-center underline">
                                        {showAllDistricts ? "Ẩn bớt" : "Tải thêm kết quả"}
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>


                    {/* DANH SÁCH KHÁCH SẠN BÊN PHẢI */}
                    {
                        viewMode === "Xem ngang" && (
                            <div className="w-full md:w-4/5">
                                <div className="grid grid-cols-1 gap-4 md:gap-6 p-2">
                                    {filteredHotels.map((item) => {
                                        const hotelImages = images.filter(
                                            (img) => img.hotel.hotelId === item.hotelId
                                        );

                                        return (
                                            <div
                                                key={item.hotelId}
                                                className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                                            >
                                                {/* Ảnh khách sạn */}
                                                <div className="md:w-1/3 h-48 md:h-auto">
                                                    {hotelImages && hotelImages.length > 0 ? (
                                                        <ImageSlider sliders={hotelImages} />
                                                    ) : (
                                                        <div className="flex justify-center items-center h-full text-[#4b2e1f]/70">
                                                            Chưa có hình ảnh
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Thông tin */}
                                                <div className="flex-1 flex flex-col justify-between p-4">
                                                    <div>
                                                        {/* Tên khách sạn */}
                                                        <div className="flex">
                                                            <div className="shrink-0">
                                                                <Link to={`/detailshotel/${item.hotelId}`}>
                                                                    <h2 className="text-2xl font-bold text-blue-600 mb-1">
                                                                        {item.hotelName}
                                                                    </h2>
                                                                </Link>
                                                            </div>
                                                            <div className="flex justify-end w-full items-center">
                                                                <Phone className="text-blue-500 mx-2" />
                                                                <span>Liên hệ : {item.hotelPhone}</span>
                                                            </div>
                                                        </div>

                                                        {/* Địa chỉ */}
                                                        <div className="flex items-start gap-2 mb-2">
                                                            <FaMapMarkerAlt className="text-red-500 mt-1" />
                                                            <p className="text-gray-700">
                                                                <span className="font-semibold text-gray-800">
                                                                    Địa chỉ:
                                                                </span>{" "}
                                                                {item.hotelAddress}
                                                            </p>
                                                        </div>

                                                        {/* Mô tả */}
                                                        <p className="text-gray-600 text-sm md:text-base mb-2 line-clamp-2">
                                                            {item.hotelDescription}
                                                        </p>

                                                        {/* Rating + số phòng */}
                                                        <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-700">
                                                            <span>
                                                                <strong>⭐ {item.hotelRating.toFixed(1)}</strong> / 5
                                                            </span>
                                                            <span>|</span>
                                                            <span>{item.hotelTotalRoom} phòng</span>
                                                        </div>
                                                    </div>

                                                    {/* Giá & nút */}
                                                    <div className="flex justify-between items-center mt-4">
                                                        <div>
                                                            <span className="text-gray-600 text-sm">Giá từ</span>
                                                            <p className="text-lg md:text-xl font-semibold text-green-600">
                                                                {minPrices[item.hotelId]?.toLocaleString()} ₫/đêm
                                                            </p>
                                                        </div>
                                                        <Link to={`/detailshotel/${item.hotelId}`}>
                                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-xl transition">
                                                                Xem phòng trống
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    }

                    {
                        viewMode === "Xem dọc" && (
                            <div className="w-full md:w-4/5 mx-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-2">
                                    {filteredHotels.map((item) => {
                                        const hotelImages = images.filter(img => img.hotel.hotelId === item.hotelId);

                                        return (
                                            <div
                                                key={item.hotelId}
                                                className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                                            >
                                                {/* Ảnh khách sạn */}
                                                <div className="w-full h-56 relative">
                                                    {hotelImages.length > 0 ? (
                                                        <ImageSlider sliders={hotelImages} />
                                                    ) : (
                                                        <div className="flex justify-center items-center h-full text-[#4b2e1f]/70">
                                                            Chưa có hình ảnh
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Nội dung */}
                                                <div className="p-4 flex flex-col gap-2 grow">
                                                    {/* Tên + liên hệ */}
                                                    <div className="flex justify-between items-start">
                                                        <Link to={`/detailshotel/${item.hotelId}`} className="flex-1">
                                                            <h2 className="text-lg md:text-xl font-bold text-blue-600 line-clamp-2">
                                                                {item.hotelName}
                                                            </h2>
                                                        </Link>
                                                        <div className="flex items-center gap-1 mt-1 text-sm text-gray-700">
                                                            <Phone className="text-blue-500 w-4 h-4" />
                                                            <span>{item.hotelPhone}</span>
                                                        </div>
                                                    </div>

                                                    {/* Địa chỉ */}
                                                    <div className="flex items-start gap-2 text-gray-700 text-sm">
                                                        <FaMapMarkerAlt className="text-red-500 mt-1" />
                                                        <p className="line-clamp-2">
                                                            <span className="font-semibold">Địa chỉ:</span> {item.hotelAddress}
                                                        </p>
                                                    </div>

                                                    {/* Mô tả */}
                                                    <p className="text-gray-600 text-sm md:text-base line-clamp-3">
                                                        {item.hotelDescription}
                                                    </p>

                                                    {/* Rating + số phòng */}
                                                    <div className="flex gap-3 text-sm text-gray-700">
                                                        <span>
                                                            <strong>⭐ {item.hotelRating.toFixed(1)}</strong> / 5
                                                        </span>
                                                        <span>|</span>
                                                        <span>{item.hotelTotalRoom} phòng</span>
                                                    </div>

                                                    {/* Giá & nút */}
                                                    <div className="flex justify-between items-center mt-auto">
                                                        <div>
                                                            <span className="text-gray-600 text-xs">Giá từ</span>
                                                            <p className="text-lg md:text-lg font-semibold text-green-600">
                                                                {minPrices[item.hotelId]?.toLocaleString()} ₫/đêm
                                                            </p>
                                                        </div>

                                                        <Link to={`/detailshotel/${item.hotelId}`}>
                                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-2 rounded-xl transition">
                                                                Xem phòng trống
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    }



                </div>

            </div>
        </div>
    );
}