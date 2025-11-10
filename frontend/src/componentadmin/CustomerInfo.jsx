import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../api";

export default function CustomerInfo() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    avatar: "",
  });
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/users/myInfo");
        setUserInfo(response.data.result);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="w-[450px] flex flex-col items-center p-4  bg-white shadow-md rounded-lg">
      <img
        alt="Avatar"
        src={userInfo.avatar || "/default-avatar.png"}
        className="w-24 h-24 rounded-full object-cover border mb-4"
      />
      <div className="grid grid-cols-2 gap-4 w-full">
        <div>
          <label className="block text-sm font-medium mb-1">Họ</label>
          <input
            type="text"
            value={userInfo.firstName}
            disabled
            className="w-full bg-gray-100 rounded-full py-2 px-4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tên</label>
          <input
            type="text"
            value={userInfo.lastName}
            disabled
            className="w-full bg-gray-100 rounded-full py-2 px-4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="text"
            value={userInfo.email}
            disabled
            className="w-full bg-gray-100 rounded-full py-2 px-4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Số điện thoại</label>
          <input
            type="text"
            value={userInfo.phone}
            disabled
            className="w-full bg-gray-100 rounded-full py-2 px-4"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Ngày sinh</label>
          <input
            type="text"
            value={userInfo.dateOfBirth || ""}
            disabled
            className="w-full bg-gray-100 rounded-full py-2 px-4"
          />
        </div>
      </div>
    </div>
  );
}
