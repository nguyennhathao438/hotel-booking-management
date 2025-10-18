import { useEffect, useState } from "react";
import ApiService from "../service/apiService";
import axios from "axios";
import NotificationModal from "./Modal";
import api from "../api";
const AddHotel = () => {
    const [images, setImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [listProvinces, setListProvinces] = useState([])
    const [provinceCode, setProvinceCode] = useState("");
    const [listDistricts, setListDistricts] = useState([]);
    const [district, setDistrict] = useState("");
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [modalType, setModalType] = useState("warning")

    const [hotelData, setHotelData] = useState({
        hotelName: "",
        hotelAddress: "",
        hotelTotalRoom: "",
        hotelCost: "",
        hotelRating: "",
        hotelPhone: "",
        hotelDescription: "",
    });

    const checkValue = () => {
        let flag = false
        if (hotelData.hotelName == null || hotelData.hotelName == "") {
            flag = true
            setShowModal(true)
            setModalMessage("Vui lòng nhập tên khách sạn")
            setModalType("warning")
        }
        else if (hotelData.hotelCost == null || hotelData.hotelCost == "") {
            flag = true
            setShowModal(true)
            setModalMessage("Vui lòng nhập giá khách sạn")
            setModalType("warning")
        }
        else if (hotelData.hotelDescription == null || hotelData.hotelDescription == "") {
            flag = true
            setShowModal(true)
            setModalMessage("Vui lòng nhập giá khách sạn")
            setModalType("warning")
        }
        else if (hotelData.hotelRating == null || hotelData.hotelRating == "") {
            flag = true
            setShowModal(true)
            setModalMessage("Vui lòng nhập số sao khách sạn")
            setModalType("warning")
        }
        else if (hotelData.hotelTotalRoom == null || hotelData.hotelTotalRoom == "") {
            flag = true
            setShowModal(true)
            setModalMessage("Vui lòng nhập tổng số phòng khách sạn")
            setModalType("warning")
        }
        else if (hotelData.hotelPhone == null || hotelData.hotelPhone == "") {
            flag = true
            setShowModal(true)
            setModalMessage("Vui lòng nhập số điện thoại liên hệ khách sạn")
            setModalType("warning")
        }
        else if (images.length == 0) {
            flag = true
            setShowModal(true)
            setModalMessage("Vui lòng thêm hình ảnh khách sạn")
            setModalType("warning")
        }
        return flag;
    }
    const handleChange = (e) => {
        setHotelData({ ...hotelData, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setImages(prev => {
            const updated = [...prev, ...newFiles];
            return updated;
        });
        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviews]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checkValue())
            return
        try {
            let fullAddress = ""
            if (listProvinces.length > 0 && listProvinces) {
                const province = listProvinces.find(p => p.code == provinceCode)
                const provinceName = province.name
                fullAddress = `${hotelData.hotelAddress}, ${district}, ${provinceName}`;
            }
            const respone = await api.post("/hotels/create", {
                ...hotelData,
                hotelAddress: fullAddress
            });
            const hotelId = respone.data.result.hotelId;
            const formData = new FormData();
            images.forEach((file) => formData.append("files", file))
            formData.append("hotelId", hotelId)
            const addimg = await api.post("/images/upload", formData, {// eslint-disable-line no-unused-vars
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Them khach san thanh cong")
        } catch (error) {
            console.error("Chi tiet loi : ", error)
        }
    };


    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const response = await axios.get(
                    "https://provinces.open-api.vn/api/p/",
                    { withCredentials: false }
                );
                setListProvinces(response.data)
                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProvince();
    }, []);

    useEffect(() => {
        const fecthDistrict = async () => {
            if (provinceCode) {
                const response = await axios.get(
                    `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
                    { withCredentials: false }
                );
                setListDistricts(response.data.districts)
            }
        }
        fecthDistrict()
    }, [provinceCode]);


    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
            <div>
                <label className="block font-semibold mb-1">Tên khách sạn</label>
                <input name="hotelName" placeholder="Nhập tên khách sạn" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block font-semibold mb-1">Chọn địa chỉ khách sạn</label>
                <div className="flex gap-5">
                    <select
                        className="border flex-1 border-gray-300 rounded-lg p-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm"
                        name="province"
                        id="province"
                        value={provinceCode}
                        onChange={(e) => setProvinceCode(e.target.value)}
                    >
                        <option value="" disabled>
                            Chọn tỉnh thành
                        </option>
                        {listProvinces.map((item) => (
                            <option key={item.code} value={item.code} className="text-gray-700">
                                {item.name}
                            </option>
                        ))}
                    </select>

                    <select className="border border-gray-300 flex-1 p-2 rounded-lg"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    >
                        <option value="">Chọn quận huyện </option>
                        {listDistricts.map((d) => (
                            <option key={d.code} value={d.name}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                <label className="block font-semibold mb-1">Nhập tên đường</label>
                <input name="hotelAddress" placeholder="Nhập địa chỉ khách sạn" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block font-semibold mb-1">Giá (VNĐ)</label>
                <input name="hotelCost" placeholder="Nhập giá phòng" type="number" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block font-semibold mb-1">Số sao (Đánh giá)</label>
                <input name="hotelRating" placeholder="Nhập số sao (ví dụ: 4.5)" type="number" step="0.1" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
                <label className="block font-semibold mb-1">Tổng số phòng</label>
                <input name="hotelTotalRoom" placeholder="Nhập tổng số phòng" type="number" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block font-semibold mb-1">Số điện thoại liên hệ</label>
                <input name="hotelPhone" placeholder="Nhập số điện thoại" type="number" onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
                <label className="block font-semibold mb-1">Mô tả khách sạn</label>
                <textarea name="hotelDescription" placeholder="Nhập mô tả chi tiết khách sạn" onChange={handleChange} rows={4}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>

            <div>
                <label className="block font-semibold mb-1">Ảnh khách sạn</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Hiển thị ảnh preview */}
            <div className="grid grid-cols-3 gap-2 mt-4">
                {previewUrls.map((url, idx) => (
                    <img
                        key={idx}
                        src={url}
                        alt={`preview-${idx}`}
                        className="w-full h-32 object-cover rounded shadow-sm"
                    />
                ))}
            </div>
            <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-all duration-200">
                Thêm khách sạn
            </button>
            <NotificationModal
                show={showModal}
                message={modalMessage}
                type={modalType}
                onClose={() => setShowModal(false)}
            />
        </form>
    );

};

export default AddHotel;
