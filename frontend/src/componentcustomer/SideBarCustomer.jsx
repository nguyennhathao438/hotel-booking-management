import {
  WrenchIcon,
  User2Icon,
  MegaphoneIcon,
  FileTextIcon,
  HandCoinsIcon,
  ChartNoAxesCombinedIcon,
  LayoutGridIcon,
  LayersIcon,
  BookmarkCheckIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../api";
export default function SideBar() {
  const [hotels, setHotels] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user?.userId;

  console.log("toi dang la", user)
  console.log("id cua toi dang la", userId)

  useEffect(() => {
    const fetchHotelByUserId = async () => {
      if (!userId) return;
      try {
        const response = await api.get(`/hotels/user/${userId}`);
        setHotels(response.data.result || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách khách sạn theo userId:", err);
      }
    };
    fetchHotelByUserId();
  }, [userId]);

  const firstHotelId = hotels[0]?.hotelId;
  return (
    <div className="bg-black py-4 px-4 h-screen w-[300px] fixed z-10 ">
      <div className="px-4 mb-5 flex">
        <ChartNoAxesCombinedIcon className="text-green-400 w-6 h-6" />
        <h2 className="text-white font-bold pl-2 text-xl">OpenHotel</h2>
      </div>
      <div className="px-4 space-y-4">
        <NavLink to="/customer" className="flex hover:bg-gray-400">
          {" "}
          <FileTextIcon className="w-6 h-6 text-gray-600" />
          <p className=" text-white cursor-pointer pl-2">Trang chủ</p>
        </NavLink>
        <NavLink
          to={`/customer/my-hotel/${firstHotelId}`}
          className="flex hover:bg-gray-400"
        >
          {" "}
          <FileTextIcon className="w-6 h-6 text-gray-600" />
          <p className=" text-white cursor-pointer pl-2">Khách sạn của tôi</p>
        </NavLink>

        <NavLink
          to={`/customer/service/hotel/${firstHotelId}`}
          className="flex hover:bg-gray-400"
        >
          {" "}
          <FileTextIcon className="w-6 h-6 text-gray-600" />
          <p className=" text-white cursor-pointer pl-2">Dịch vụ khách sạn</p>
        </NavLink>

        <NavLink
          to={`/customer/room/hotel/${firstHotelId}`}
          className="flex hover:bg-gray-400"
        >
          {" "}
          <FileTextIcon className="w-6 h-6 text-gray-600" />
          <p className=" text-white cursor-pointer pl-2">Phòng của tôi</p>
        </NavLink>
        <NavLink to="/customer/invoice" className="flex hover:bg-gray-400">
          {" "}
          <FileTextIcon className="w-6 h-6 text-gray-600" />
          <p className=" text-white cursor-pointer pl-2">Đơn hàng</p>
        </NavLink>
      </div>
    </div>
  );
}
