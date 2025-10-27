import { useState } from "react";
import { Star } from "lucide-react";
import ModelForm from "../Common/FormModel"
export default function ReviewForm() {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const review = {
            feedback: feedback,
            star: rating,
            // hotelId và userId bạn có thể truyền từ props hoặc context
        };

        console.log("Review submitted:", review);

        // 👉 tại đây bạn có thể gọi API POST gửi review lên backend
        // fetch("/api/reviews", { method: "POST", body: JSON.stringify(review) });

        setFeedback("");
        setRating(0);
    };
    const [openReview, setOpenReview] = useState(false)

    return (
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-6 mt-8">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                Đánh giá khách sạn
            </h2>
            <button className="bg-green-400 px-5 py-2"
            onClick={()=>setOpenReview(true)}>Đánh giá</button>

            {/* Form */}
            {
                openReview && (
                    <ModelForm title="ĐÁNH GIÁ KHÁCH SẠN" width="500px" onClose={()=>setOpenReview(false)}>
                        <form className="w-[500px] h-auto space-y-5" onSubmit={handleSubmit}>
                            {/* Đánh giá sao */}
                            <div className="flex justify-center space-x-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <Star
                                        key={value}
                                        onClick={() => setRating(value)}
                                        className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${rating >= value
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Ô nhập nội dung */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Nhận xét của bạn
                                </label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    rows="4"
                                    placeholder="Hãy chia sẻ cảm nhận của bạn..."
                                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                                    required
                                ></textarea>
                            </div>

                            {/* Nút gửi */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl hover:bg-blue-700 transition-all duration-200"
                                >
                                    Gửi đánh giá
                                </button>
                            </div>
                        </form>
                    </ModelForm>
                )
            }

        </div>
    );
}
