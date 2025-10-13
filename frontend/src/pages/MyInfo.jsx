import { useState, useEffect } from "react"
import api from "../api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
export default function MyInfo() {
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user)
    const [userInfo, setUserInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        dateOfBirth: "",
        avatar: "",
        file: null,
    });
    useEffect(() => {
        const fetchMyinfo = async () => {

            const response = await api.get("/users/myInfo");
            console.log(response)
            setUserInfo(response.data.result)
            console.log("Thông tin user", user)
        }
        fetchMyinfo();
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setUserInfo((prev) => ({
                ...prev,
                avatar: previewURL,
                file: file,
            }));
        }
    };
    const handleSubmit = async () => {
        setLoading(true)
        try {

            const data = new FormData();
            if (userInfo.file) data.append("file", userInfo.file);
            data.append("firstName", userInfo.firstName || "");
            data.append("lastName", userInfo.lastName || "");
            data.append("dateOfBirth", userInfo.dateOfBirth || "");
            data.append("phone", userInfo.phone || "");
            const response = await api.put(`/users/myInfo/${user.userId}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log(response)
            setIsEdit(false);
            toast.success("Cập nhật thành công")
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Đã xảy ra lỗi, vui lòng thử lại!";

            toast.error(message);
            console.error(error);

        } finally {
            setLoading(false)
        }
    }
    return (<>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div
                className="bg-white shadow-lg rounded-2xl w-[800px] max-w-full p-8"
            >
                <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Thông tin cá nhân
                </h1>

                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-24 h-24">
                        <img
                            alt="Avatar"
                            src={userInfo.avatar || "/default-avatar.png"}
                            className="w-24 h-24 rounded-full object-cover border"
                        />
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            disabled={!isEdit}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Nhấn vào ảnh để thay đổi</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Họ</label>
                        <input
                            type="text"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={handleChange}
                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            disabled={!isEdit}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tên</label>
                        <input
                            type="text"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleChange}
                            disabled={!isEdit}
                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            disabled={true}
                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleChange}
                            disabled={!isEdit}
                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={userInfo.dateOfBirth || ""}
                        onChange={handleChange}
                        disabled={!isEdit}
                        className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>



                {!isEdit && (
                    <div className="text-center">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-full transition-all duration-300"
                            onClick={() => setIsEdit(true)}>Chỉnh sửa</button>
                    </div>)}
                {isEdit && (
                    <div className="text-center ">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-8 w-34 rounded-full transition-all duration-300"
                            onClick={() => setIsEdit(false)}>Hủy</button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 w-34 rounded-full transition-all duration-300 ml-4"
                            onClick={() => handleSubmit()}
                        >
                            {loading ? "Đang chỉnh sửa": "Xác nhận"}
                        </button>
                    </div>)}

            </div>
        </div>
    </>)
}