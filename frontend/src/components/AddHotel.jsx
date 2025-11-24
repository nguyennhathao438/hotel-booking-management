import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const hotelSchema = z.object({
  hotelName: z
    .string()
    .min(3, "Tên khách sạn phải có ít nhất 3 ký tự")
    .max(100, "Tên khách sạn quá dài"),
  hotelAddress: z
    .string()
    .min(5, "Địa chỉ quá ngắn")
    .max(150, "Địa chỉ quá dài"),
  hotelTotalRoom: z
    .number({ invalid_type_error: "Tổng số phòng phải là số" })
    .positive("Số phòng phải lớn hơn 0"),
  hotelPhone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .max(11, "Số điện thoại không hợp lệ")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
  hotelDescription: z
    .string()
    .min(10, "Mô tả khách sạn phải ít nhất 10 ký tự")
    .max(1500, "Mô tả quá dài"),
});
const AddHotel = () => {
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [listProvinces, setListProvinces] = useState([]);
  const [provinceCode, setProvinceCode] = useState("");
  const [listDistricts, setListDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/p/",
          { withCredentials: false }
        );
        setListProvinces(response.data);
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
        setListDistricts(response.data.districts);
      }
    };
    fecthDistrict();
  }, [provinceCode]);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setImages((prev) => {
      const updated = [...prev, ...newFiles];
      return updated;
    });
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(hotelSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      if (images.length > 0) {
        let fullAddress = "";
        if (!district) {
          toast.error("Vui lòng chọn tỉnh thành");
          return;
        }
        if (listProvinces.length > 0 && listProvinces) {
          const province = listProvinces.find((p) => p.code == provinceCode);
          const provinceName = province.name;
          fullAddress = `${data.hotelAddress}, ${district}, ${provinceName}`;
        }
        const respone = await api.post("/hotels/create", {
          ...data,
          hotelAddress: fullAddress,
          hotelCost: 0.0,
          hotelRating: 0.0,
        });
        const hotelId = respone.data.result.hotelId;
        const formData = new FormData();
        images.forEach((file) => formData.append("files", file));
        formData.append("hotelId", hotelId);
        await api.post("/images/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Thêm khách sạn thành công");
      } else {
        toast.error("Vui lòng chọn ảnh khách sạn");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi xóa vai trò"
      );
    } finally {
      setLoading(false)
    }
  };

  const onError = (err) => {
    const firstErr = Object.values(err)[0];
    if (firstErr) toast.error(firstErr.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="max-w-3xl my-2 mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-5 border border-gray-100 sm:p-8">
      <h2 className="text-center font-medium text-xl">HÃY ĐĂNG KÝ KHÁCH SẠN CỦA BẠN</h2>
      {/* Tên khách sạn */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Tên khách sạn
        </label>
        <input
          placeholder="Nhập tên khách sạn"
          {...register("hotelName")}
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Địa chỉ khách sạn */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Chọn địa chỉ khách sạn
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            className="border flex-1 border-gray-300 rounded-xl p-2.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            name="province"
            id="province"
            value={provinceCode}
            onChange={(e) => setProvinceCode(e.target.value)}
          >
            <option value="" disabled>
              Chọn tỉnh thành
            </option>
            {listProvinces.map((item) => (
              <option
                key={item.code}
                value={item.code}
                className="text-gray-700"
              >
                {item.name}
              </option>
            ))}
          </select>

          <select
            className="border flex-1 border-gray-300 rounded-xl p-2.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Chọn quận huyện</option>
            {listDistricts.map((d) => (
              <option key={d.code} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <label className="block font-semibold mt-4 mb-2 text-gray-700">
          Nhập tên đường
        </label>
        <input
          {...register("hotelAddress")}
          placeholder="Nhập địa chỉ khách sạn"
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Tổng số phòng */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Tổng số phòng
          </label>
          <input
            {...register("hotelTotalRoom", { valueAsNumber: true })}
            placeholder="Nhập tổng số phòng"
            type="number"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Số điện thoại liên hệ
          </label>
          <input
            {...register("hotelPhone")}
            placeholder="Nhập số điện thoại"
            type="number"
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Mô tả khách sạn */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Giới thiệu khách sạn
        </label>
        <textarea
          {...register("hotelDescription")}
          placeholder="Nhập mô tả chi tiết khách sạn"
          rows={4}
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Ảnh khách sạn */}
      <div>
        <label className="block font-semibold mb-2 text-gray-700">
          Ảnh khách sạn
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Preview ảnh */}
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
          {previewUrls.map((url, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl border border-gray-200 shadow-sm"
            >
              <img
                src={url}
                alt={`preview-${idx}`}
                className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Nút submit */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all duration-200 focus:ring-2 focus:ring-blue-400 
    ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {!loading ? (
          "Thêm khách sạn"
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Đang thêm khách sạn...
          </span>
        )}
      </button>

    </form>
  );
};

export default AddHotel;
