import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../api";
import NotificationModal from "../components/Common/Modal";
import defaultImg from "../assets/img/banner2.jpg";
import toast from "react-hot-toast";

const EditHotelForm = ({ onUpdated }) => {
  const { hotelId } = useParams();
  const [hotelData, setHotelData] = useState({});
  const [images, setImages] = useState([]);
  const [listProvinces, setListProvinces] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [provinceCode, setProvinceCode] = useState("");
  const [district, setDistrict] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("warning");

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/p/", { withCredentials: false })
      .then((res) => setListProvinces(res.data || []))
      .catch((err) => console.error("Lỗi lấy tỉnh:", err));
  }, []);

  // Lấy thông tin khách sạn + ảnh
  useEffect(() => {
    if (!hotelId) return;

    api
      .get(`/hotels/${hotelId}`)
      .then((res) => {
        const data = res.data.result;
        console.log(res);
        setHotelData(data);
        setProvinceCode(data.provinceCode?.toString() || "");
        setDistrict(data.district || "");
      })
      .catch((err) => console.error(err));

    api
      .get(`/images/hotel/${hotelId}`)
      .then((res) => {
        const imgs = res.data?.result.map((i) => ({ ...i, imgUrl: i.imgUrl }));
        setImages(imgs || []);
      })
      .catch((err) => console.error(err));
  }, [hotelId]);

  // Lấy quận/huyện theo tỉnh
  useEffect(() => {
    if (!provinceCode) {
      setListDistricts([]);
      setDistrict("");
      return;
    }

    axios
      .get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`, {
        withCredentials: false,
      })
      .then((res) => setListDistricts(res.data.districts || []))
      .catch((err) => console.error("Lỗi lấy quận/huyện:", err));
  }, [provinceCode]);

  const handleChange = (e) =>
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newImageObjects = newFiles.map((file) => ({
      file,
      imgUrl: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImageObjects]);
  };

  const handleDeleteImage = async (idx) => {
    const item = images[idx];
    if (item.imgHotelId) {
      if (!window.confirm("Bạn có chắc muốn xóa ảnh này không?")) return;
      try {
        await api.delete(`/images/delete/${item.imgHotelId}`);
        toast.success("Xóa ảnh thành công!");
        setImages((prev) => prev.filter((_, i) => i !== idx));
      } catch (err) {
        console.error(err);
        toast.error("Xóa ảnh thất bại!");
      }
    } else {
      setImages((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const submitHotelUpdate = async () => {
    if (!hotelData.hotelName) return alert("Vui lòng nhập tên khách sạn!");
    setLoading(true);

    try {
      let fullAddress = hotelData.hotelAddress;
      if (provinceCode) {
        const province = listProvinces.find(
          (p) => p.code.toString() === provinceCode
        );
        fullAddress = `${hotelData.hotelAddress}, ${district}, ${
          province?.name || ""
        }`;
      }

      // Cập nhật thông tin khách sạn
      await api.put(`/hotels/update/${hotelId}`, {
        ...hotelData,
        hotelAddress: fullAddress,
        provinceCode,
        district,
      });

      // Upload ảnh mới
      const newFiles = images.filter((i) => i.file);
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((i) => formData.append("files", i.file));
        formData.append("hotelId", hotelId);
        await api.post("/images/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setModalMessage("Cập nhật thành công!");
      toast.success("Cập nhật thành công");
      setModalType("success");
      setShowModal(true);
      onUpdated && onUpdated();
      setIsEdit(false);
      // Xóa các object URL của file mới
      images.forEach((i) => i.file && URL.revokeObjectURL(i.imgUrl));
    } catch (err) {
      console.error(err);
      setModalMessage("Cập nhật thất bại!");
      toast.error("Cập nhật thất bại");
      setModalType("error");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[1700px] items-center justify-center min-h-screen bg-gray-100 ml-[300px]">
      <div className="w-[1550px] flex bg-white shadow-lg rounded-2xl gap-20 p-8">
        {/* Form thông tin khách sạn */}
        <div className="w-[800px]">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Quản lý khách sạn
          </h1>

          <div>
            <label className="block font-semibold mb-1">Tên khách sạn</label>
            <input
              name="hotelName"
              value={hotelData.hotelName || ""}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Chọn địa chỉ khách sạn
            </label>
            <div className="flex gap-5 mb-2">
              <select
                value={provinceCode}
                onChange={(e) => {
                  const code = e.target.value;
                  setProvinceCode(code);
                  setHotelData({ ...hotelData, provinceCode: code });
                  setDistrict(""); // reset district khi đổi tỉnh
                }}
                disabled={!isEdit}
                className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Chọn tỉnh --</option>
                {listProvinces.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </select>

              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                disabled={!isEdit}
                className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">-- Chọn quận --</option>
                {listDistricts.map((d) => (
                  <option key={d.code} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Nhập tên đường</label>
            <input
              name="hotelAddress"
              value={hotelData.hotelAddress || ""}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-5">
            <div>
              <label className="block font-semibold mb-1">Số sao</label>
              <input
                name="hotelRating"
                type="number"
                step="0.1"
                value={hotelData.hotelRating || ""}
                onChange={handleChange}
                disabled={!isEdit}
                className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Tổng số phòng</label>
              <input
                name="hotelTotalRoom"
                type="number"
                value={hotelData.hotelTotalRoom || ""}
                onChange={handleChange}
                disabled={!isEdit}
                className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Điện thoại liên hệ
            </label>
            <input
              name="hotelPhone"
              value={hotelData.hotelPhone || ""}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Mô tả khách sạn</label>
            <textarea
              name="hotelDescription"
              rows={4}
              value={hotelData.hotelDescription || ""}
              onChange={handleChange}
              disabled={!isEdit}
              className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="text-center mt-4">
            {!isEdit && (
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="bg-blue-500 text-white px-8 py-2 rounded-full"
              >
                Chỉnh sửa
              </button>
            )}
            {isEdit && (
              <>
                <button
                  type="button"
                  onClick={() => setIsEdit(false)}
                  className="bg-red-500 text-white px-8 py-2 rounded-full"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={submitHotelUpdate}
                  className="bg-blue-500 text-white px-8 py-2 rounded-full ml-4"
                  disabled={loading}
                >
                  {loading ? "Đang chỉnh sửa..." : "Xác nhận"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Grid ảnh */}
        <div className="grid grid-cols-3 gap-2">
          {images.map((item, idx) => (
            <div key={idx} className="relative">
              <button
                type="button"
                onClick={() => handleDeleteImage(idx)}
                className="absolute top-1 right-1 bg-red-500/50 rounded-full w-6 h-6 flex items-center justify-center text-xl"
              >
                x
              </button>
              <img
                src={item.imgUrl || defaultImg}
                alt={`hotel-${idx}`}
                className="w-full h-32 object-cover rounded shadow-sm"
              />
            </div>
          ))}

          {isEdit && (
            <label className="border border-dashed flex items-center justify-center rounded h-32 cursor-pointer">
              +
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
      </div>

      {showModal && (
        <NotificationModal
          message={modalMessage}
          type={modalType}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default EditHotelForm;
