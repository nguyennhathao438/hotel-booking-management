import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";
import { StarIcon } from "@heroicons/react/24/solid";
import ServiceList from "./ServiceListView";
import defaultImg from "../assets/img/banner2.jpg";

const DetailHotelForm = ({ hotel, onClose }) => {
  const [hotelData, setHotelData] = useState({ ...hotel });
  const [listProvinces, setListProvinces] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);

  // Lấy danh sách tỉnh
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

  // Lấy danh sách quận/huyện
  useEffect(() => {
    if (!hotelData.provinceCode) return;
    const fetchDistrict = async () => {
      try {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/p/${hotelData.provinceCode}?depth=2`
        );
        setListDistricts(response.data.districts);
        const district = response.data.districts.find(
          (d) => d.code === hotelData.districtCode
        );
        setDistrictName(district?.name || "");
      } catch (err) {
        console.error(err);
      }
    };
    fetchDistrict();
  }, [hotelData.provinceCode, hotelData.districtCode]);

  // Lấy review
  useEffect(() => {
    if (!hotelData.hotelId) return;
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/review/${hotelData.hotelId}`);
        setReviews(res.data?.result || []);
      } catch (err) {
        console.error("Lỗi khi lấy đánh giá:", err);
      }
    };
    fetchReviews();
  }, [hotelData.hotelId]);

  // Lấy ảnh khách sạn
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

  return (
    <div className="w-[1200px] flex mx-auto p-6 space-y-6 overflow-y-auto scroll-smooth">
      {/* Thông tin khách sạn */}
      <div className="w-[750px] bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold">{hotelData.hotelName}</h2>

        <p>
          <span className="font-semibold">Địa chỉ:</span>{" "}
          {`${hotelData.hotelAddress}, ${districtName}, ${
            listProvinces.find((p) => p.code === hotelData.provinceCode)?.name || ""
          }`}
        </p>

        <p>
          <span className="font-semibold">Giá (VNĐ):</span>{" "}
          {hotelData.hotelCost?.toLocaleString()} VNĐ
        </p>

        <p>
          <span className="font-semibold">Số sao:</span> ⭐ {hotelData.hotelRating}
        </p>

        <p>
          <span className="font-semibold">Tổng số phòng:</span> {hotelData.hotelTotalRoom}
        </p>

        <p>
          <span className="font-semibold">Số điện thoại:</span> {hotelData.hotelPhone}
        </p>

        <p>
          <span className="font-semibold">Mô tả:</span> {hotelData.hotelDescription}
        </p>

        <div>
          <span className="font-semibold mb-2 block">Ảnh khách sạn:</span>
          <div className="grid grid-cols-3 gap-2">
            {(images.length > 0 ? images : [defaultImg]).map((img, idx) => (
              <img
                key={idx}
                src={img.imgUrl || defaultImg}
                alt={`hotel-${idx}`}
                className="w-full h-32 object-cover rounded shadow-sm"
              />

            ))}
          </div>
        </div>


      </div>

      {/* Review + Service */}
      <div className="w-[450px] space-y-6">
        {/* Review khách sạn */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-center">Đánh giá khách sạn</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center italic">
              Chưa có đánh giá nào cho khách sạn này.
            </p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-800">
                      {review.user?.firstName || "Ẩn danh"}
                    </p>
                    <div className="flex items-center">
                      {[...Array(review.star)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-1">{review.feedback}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(review.createAt || review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service khách sạn (view only) */}
        <ServiceList hotelId={hotelData.hotelId} viewOnly />
      </div>
    </div>
  );
};

export default DetailHotelForm;
