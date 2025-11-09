import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";
import NotificationModal from "../components/Common/Modal";
import defaultImg from "../assets/img/banner2.jpg";

const EditHotelForm = ({ hotel, onClose, onUpdated }) => {
  const [hotelData, setHotelData] = useState({ ...hotel });
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [listProvinces, setListProvinces] = useState([]);
  const [provinceCode, setProvinceCode] = useState("");
  const [listDistricts, setListDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("warning");
  const [confirmUpdate, setConfirmUpdate] = useState(false);

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const response = await axios.get("https://provinces.open-api.vn/api/p/");
        setListProvinces(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProvince();
  }, []);
useEffect(() => {
    if (!hotelData.hotelId) return;
    const fetchImages = async () => {
      try {
        const res = await api.get(`/images/hotel/${hotelData.hotelId}`);
        console.log("Image data1111111111111111111111111:",res.data);
        setImages(res.data?.result || []);
      } catch (err) {
        console.error("Lỗi khi lấy ảnh khách sạn:", err);
      }
    };
    fetchImages();
  }, [hotelData.hotelId]);
  useEffect(() => {
    if (provinceCode) {
      const fetchDistrict = async () => {
        try {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
          );
          setListDistricts(response.data.districts);
        } catch (err) {
          console.error(err);
        }
      };
      fetchDistrict();
    }
  }, [provinceCode]);

  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const checkValue = () => {
    if (!hotelData.hotelName) {
      setShowModal(true);
      setModalMessage("Vui lòng nhập tên khách sạn");
      return true;
    }
    if (!hotelData.hotelCost) {
      setShowModal(true);
      setModalMessage("Vui lòng nhập giá khách sạn");
      return true;
    }
    if (!hotelData.hotelDescription) {
      setShowModal(true);
      setModalMessage("Vui lòng nhập mô tả khách sạn");
      return true;
    }
    if (!hotelData.hotelRating) {
      setShowModal(true);
      setModalMessage("Vui lòng nhập số sao khách sạn");
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkValue()) return;

    try {
      let fullAddress = hotelData.hotelAddress;
      if (listProvinces.length > 0 && provinceCode) {
        const province = listProvinces.find((p) => p.code === provinceCode);
        fullAddress = `${hotelData.hotelAddress}, ${district || hotelData.hotelAddress}, ${province?.name}`;
      }

      const resp = await api.put(`/hotels/update/${hotelData.hotelId}`, {
        ...hotelData,
        hotelAddress: fullAddress,
      });

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((file) => formData.append("files", file));
        formData.append("hotelId", hotelData.hotelId);
        await api.post("/images/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setModalMessage("Cập nhật khách sạn thành công!");
      setModalType("success");
      setShowModal(true);

      if (onUpdated) onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      setModalMessage("Cập nhật thất bại");
      setModalType("error");
      setShowModal(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[1100px] mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
  <div className="flex gap-6">
    {/* Cột form nhập thông tin */}
    <div className="flex-1 space-y-4">
      <div>
        <label className="block font-semibold mb-1">Tên khách sạn</label>
        <input
          name="hotelName"
          placeholder="Nhập tên khách sạn"
          value={hotelData.hotelName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Chọn địa chỉ khách sạn</label>
        <div className="flex gap-5 mb-2">
          <select
            className="border flex-1 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={provinceCode}
            onChange={(e) => setProvinceCode(e.target.value)}
          >
            <option value="">Chọn tỉnh thành</option>
            {listProvinces.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            className="border flex-1 border-gray-300 rounded-lg p-2"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Chọn quận/huyện</option>
            {listDistricts.map((d) => (
              <option key={d.code} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <label className="block font-semibold mb-1">Nhập tên đường</label>
        <input
          name="hotelAddress"
          placeholder="Nhập địa chỉ khách sạn"
          value={hotelData.hotelAddress}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Giá (VNĐ)</label>
        <input
          name="hotelCost"
          type="number"
          value={hotelData.hotelCost}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Số sao</label>
        <input
          name="hotelRating"
          type="number"
          step="0.1"
          value={hotelData.hotelRating}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
  <div className="flex gap-12" >
      <div className="w-[240px]">
        <label className="block font-semibold mb-1">Tổng số phòng</label>
        <input
          name="hotelTotalRoom"
          type="number"
          value={hotelData.hotelTotalRoom}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="w-[240px]">
        <label className="block font-semibold mb-1">Số điện thoại</label>
        <input
          name="hotelPhone"
          type="number"
          value={hotelData.hotelPhone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      </div>
      <div>
        <label className="block font-semibold mb-1">Mô tả khách sạn</label>
        <textarea
          name="hotelDescription"
          rows={4}
          value={hotelData.hotelDescription}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>





      {!confirmUpdate ? (
        <button
          type="button"
          onClick={() => setConfirmUpdate(true)}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-all duration-200"
        >
          Cập nhật khách sạn
        </button>
      ) : (
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={() => setConfirmUpdate(false)}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 rounded transition-all duration-200"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-all duration-200"
          >
            Xác nhận cập nhật
          </button>
        </div>
      )}
    </div>

    {/* Cột hiển thị ảnh hiện tại */}
    <div className="w-[500px]">
      <span className="font-semibold mb-2 block">Ảnh khách sạn hiện tại:</span>
      <div className="grid grid-cols-2 gap-2">

        {(images.length > 0 ? images : [defaultImg]).map((img, idx) => (
            <div  className="relative">
                  <button className="absolute top-1 right-1 bg-red-500/50 rounded-full w-6 h-6 flex items-center justify-center text-xl "
                  > x</button>
          <img
            key={idx}
            src={img.imgUrl || defaultImg}
            alt={`hotel-${idx}`}
            className="w-full h-32 object-cover rounded shadow-sm"
          />
        </div>))}
         <div className="w-full h-32 object-cover rounded shadow-sm flex items-center justify-center">
                {previewUrls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`preview-${idx}`}
                    className="w-full h-32 object-cover rounded shadow-sm"
                  />
                ))}
              </div>
 <div>
          <label
            htmlFor="hotel-images"
            className="w-full h-32 object-cover rounded shadow-sm flex items-center justify-center"
          >
            +
          </label>
         <input
           id="hotel-images"
           type="file"
           multiple
           accept="image/*"
           onChange={handleImageChange}
           className="hidden w-full h-32"
         />
      </div>

      </div>
    </div>
  </div>



      <NotificationModal
        show={showModal}
        message={modalMessage}
        type={modalType}
        onClose={() => setShowModal(false)}
      />
    </form>
  );
};

export default EditHotelForm;
