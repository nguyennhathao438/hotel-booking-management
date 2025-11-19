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
    <div
      className=" py-4 px-3 h-screen fixed z-10 w-[70px] lg:w-[300px] transition-all duration-300"
      style={{
        background: "linear-gradient(to bottom, #4b2e1f, #a17f4f)",
      }}
    >
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
          end
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md transition ${
              isActive
                ? "bg-amber-600 text-white"
                : "text-gray-300 hover:bg-amber-700 hover:text-white"
            }`
          }
        >
          <LayoutGridIcon className="w-6 h-6" />
          <p className="cursor-pointer pl-2 hidden lg:block">Trang chủ</p>
        </NavLink>

        {hasRole("INVOICE") && (
          <NavLink
            to="/admin/invoice"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-amber-700 hover:text-white"
              }`
            }
          >
            <FileTextIcon className="w-6 h-6" />
            <p className="cursor-pointer pl-2 hidden lg:block">
              Quản lý hóa đơn
            </p>
          </NavLink>
        )}

        {hasRole("HOTEL") && (
          <NavLink
            to="/admin/hotelmanager"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-amber-700 hover:text-white"
              }`
            }
          >
            <HotelIcon className="w-6 h-6" />
            <p className="cursor-pointer pl-2 hidden lg:block">
              Quản lý khách sạn
            </p>
          </NavLink>
        )}

        {hasRole("USER") && (
          <NavLink
            to="/admin/user"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-amber-700 hover:text-white"
              }`
            }
          >
            <UserLockIcon className="w-6 h-6" />
            <p className="cursor-pointer pl-2 hidden lg:block">Quản lý user</p>
          </NavLink>
        )}

        {hasRole("ROLE") && (
          <NavLink
            to="/admin/permission"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-amber-700 hover:text-white"
              }`
            }
          >
            <UserLockIcon className="w-6 h-6" />
            <p className="cursor-pointer pl-2 hidden lg:block">Phân quyền</p>
          </NavLink>
        )}
        {hasRole("CHAT") && (
          <NavLink
            to="/admin/chat"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-md transition ${
                isActive
                  ? "bg-amber-600 text-white"
                  : "text-gray-300 hover:bg-amber-700 hover:text-white"
              }`
            }
          >
            <MessageCircle className="w-6 h-6" />
            <p className="cursor-pointer pl-2 hidden lg:block">Tin nhắn</p>
          </NavLink>
        )}

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-2 rounded-md transition ${
              isActive
                ? "bg-amber-600 text-white"
                : "text-gray-300 hover:bg-amber-700 hover:text-white"
            }`
          }
        >
          <ArrowLeftFromLine className="w-6 h-6" />
          <p className="cursor-pointer pl-2 hidden lg:block">
            Quay lại trang web
          </p>
        </NavLink>
      </div>
    </div>
  );
}
