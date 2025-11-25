import {
  HotelIcon,
  HomeIcon,
  MapPinIcon,
  BedIcon,
  FileTextIcon,
  HandCoinsIcon,
  LayersIcon,
  ArrowLeftFromLine,
  MessageCircleIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../api";
export default function SideBar() {
  const [hotels, setHotels] = useState([]);
  const user = useSelector((state) => state.user);
  const hasRole = (roleName) => user.role?.some((r) => r.name === roleName);
  const userId = user?.userId;

  console.log("toi dang la", user);
  console.log("id cua toi dang la", userId);

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
  console.log("khach san cua toi la",hotels[0])

  const firstHotelId = hotels[0]?.hotelId;
  return (
    <div
      className=" py-4 px-4 h-screen w-[300px] fixed z-10 "
      style={{
        background: "linear-gradient(to bottom, #4b2e1f, #a17f4f)",
      }}
    >
      <div className="px-4 mb-5 flex items-center gap-2">
        <HotelIcon className="text-green-400 w-6 h-6" />
        <h2 className="text-white font-bold pl-2 text-xl">OpenHotel</h2>
      </div>
      <div className="px-4 space-y-4">
        {hasRole("CUSTOMER") && (
          <NavLink
            to="/customer"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-amber-700 hover:text-white"
              }`
            }
          >
            <HomeIcon className="w-6 h-6" />
            <p className=" text-white cursor-pointer pl-2">Trang chủ</p>
          </NavLink>
        )}
        {hasRole("HOTEL") && (
          <NavLink
            to={`/customer/my-hotel/${firstHotelId}`}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-amber-700 hover:text-white"
              }`
            }
          >
            <HotelIcon className="w-6 h-6" />
            <p className=" text-white cursor-pointer pl-2">Khách sạn của tôi</p>
          </NavLink>
        )}

        {hasRole("HOTEL") && (
          <NavLink
            to={`/customer/service/hotel/${firstHotelId}`}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-amber-700 hover:text-white"
              }`
            }
          >
            <LayersIcon className="w-6 h-6" />
            <p className=" text-white cursor-pointer pl-2">Dịch vụ khách sạn</p>
          </NavLink>
        )}

        {hasRole("ROOM") && (
          <NavLink
            to={`/customer/room/hotel/${firstHotelId}`}
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-amber-700 hover:text-white"
              }`
            }
          >
            <BedIcon className="w-6 h-6" />
            <p className=" text-white cursor-pointer pl-2">Phòng của tôi</p>
          </NavLink>
        )}
        {hasRole("INVOICE_(2)") && (
          <NavLink
            to="/customer/invoice"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-amber-700 hover:text-white"
              }`
            }
          >
            <HandCoinsIcon className="w-6 h-6" />
            <p className=" text-white cursor-pointer pl-2">Đơn hàng</p>
          </NavLink>
        )}
        {hasRole("CHAT") && (
          <NavLink
            to="/customer/chat"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-amber-700 hover:text-white"
              }`
            }
          >
            <MessageCircleIcon className="w-6 h-6" />
            <p className="text-white cursor-pointer pl-2 hidden lg:block">
              Tin nhắn
            </p>
          </NavLink>
        )}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md cursor-pointer transition ${
              isActive
                ? "bg-amber-600 text-white"
                : "text-gray-300 hover:bg-amber-700 hover:text-white"
            }`
          }
        >
          <ArrowLeftFromLine className="w-6 h-6" />
          <p className="text-white cursor-pointer pl-2 hidden lg:block">
            Quay lại trang web
          </p>
        </NavLink>
      </div>
    </div>
  );
}
