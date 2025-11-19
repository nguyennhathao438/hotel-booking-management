import {
  WrenchIcon,
  User2Icon,
  MegaphoneIcon,
  FileTextIcon,
  HandCoinsIcon,
  ChartNoAxesCombinedIcon,
  LayoutGridIcon,
  LayersIcon,
  UserLockIcon,
  HotelIcon,
  ArrowLeftFromLine,
  MessageCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  const userRoles = useSelector((state) => state.user.role);
  const hasRole = (roleName) => userRoles?.some((r) => r.name === roleName);

  return (
    <div className="bg-black py-4 px-3 h-screen fixed z-10 w-[70px] lg:w-[300px] transition-all duration-300">
      {/* Logo */}
      <div className="px-2 mb-6 flex items-center justify-center lg:justify-start">
        <ChartNoAxesCombinedIcon className="text-green-400 w-6 h-6" />
        <h2 className="text-white font-bold pl-2 text-xl hidden lg:block">
          OpenHotel
        </h2>
      </div>

      {/* Menu */}
      <div className="space-y-4">
        <NavLink
          to="/admin"
          className="flex items-center hover:bg-gray-700 p-2 rounded-md"
        >
          <LayoutGridIcon className="w-6 h-6 text-gray-400" />
          <p className="text-white cursor-pointer pl-2 hidden lg:block">
            Trang chủ
          </p>
        </NavLink>

        {hasRole("INVOICE") && (
          <NavLink
            to="/admin/invoice"
            className="flex items-center hover:bg-gray-700 p-2 rounded-md"
          >
            <FileTextIcon className="w-6 h-6 text-gray-400" />
            <p className="text-white cursor-pointer pl-2 hidden lg:block">
              Quản lý hóa đơn
            </p>
          </NavLink>
        )}

        {hasRole("HOTEL") && (
          <NavLink
            to="/admin/hotelmanager"
            className="flex items-center hover:bg-gray-700 p-2 rounded-md"
          >
            <HotelIcon className="w-6 h-6 text-gray-400" />
            <p className="text-white cursor-pointer pl-2 hidden lg:block">
              Quản lý khách sạn
            </p>
          </NavLink>
        )}

        {hasRole("USER") && (
          <NavLink
            to="/admin/user"
            className="flex items-center hover:bg-gray-700 p-2 rounded-md"
          >
            <UserLockIcon className="w-6 h-6 text-gray-400" />
            <p className="text-white cursor-pointer pl-2 hidden lg:block">
              Quản lý user
            </p>
          </NavLink>
        )}

        {hasRole("ROLE") && (
          <NavLink
            to="/admin/permission"
            className="flex items-center hover:bg-gray-700 p-2 rounded-md"
          >
            <UserLockIcon className="w-6 h-6 text-gray-400" />
            <p className="text-white cursor-pointer pl-2 hidden lg:block">
              Phân quyền
            </p>
          </NavLink>
        )}
        {hasRole("CHAT") && (
          <NavLink
            to="/admin/chat"
            className="flex items-center hover:bg-gray-700 p-2 rounded-md"
          >
            <MessageCircle className="w-6 h-6 text-gray-400" />
            <p className="text-white cursor-pointer pl-2 hidden lg:block">
              Tin nhắn
            </p>
          </NavLink>
        )}

        <NavLink
          to="/"
          className="flex items-center hover:bg-gray-700 p-2 rounded-md"
        >
          <ArrowLeftFromLine className="w-6 h-6 text-gray-400" />
          <p className="text-white cursor-pointer pl-2 hidden lg:block">
            Quay lại trang web
          </p>
        </NavLink>
      </div>
    </div>
  );
}
