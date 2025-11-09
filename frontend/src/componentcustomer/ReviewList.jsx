// ReviewList.jsx
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import api from "../api";

export default function ReviewList({ hotelId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!hotelId) return;

    const fetchReviews = async () => {
      try {
        const res = await api.get(`/review/oop/${hotelId}`);
        console.log("Dữ liệu review:", res);
        setReviews(res.data?.result || []);
      } catch (err) {
        console.error("Lỗi khi lấy đánh giá:", err);
      }
    };

    fetchReviews();
  }, [hotelId]);

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-center">Đánh giá khách sạn</h3>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          Chưa có đánh giá nào cho khách sạn này.
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-800">{review.user?.firstName
 || "Ẩn danh"}</p>
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
 <div className="w-full flex justify-end items-center" >
                    <button className="w-30 h-10 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold"


                    >
                   Phản hồi
                    </button>

                </div>
            </div>

          ))}
        </div>
      )}

    </div>
  );
}
