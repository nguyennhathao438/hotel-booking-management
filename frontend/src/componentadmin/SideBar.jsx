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
} from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
export default function SideBar() {
  const userRoles = useSelector((state) => state.user.role);
  const hasRole = (roleName) => userRoles?.some((r) => r.name === roleName);
  return (
    <div className="bg-black py-4 px-4 h-screen w-[300px] fixed z-10">
      <div className="px-4 mb-5 flex">
        <ChartNoAxesCombinedIcon className="text-green-400 w-6 h-6" />
        <h2 className="text-white font-bold pl-2 text-xl">OpenHotel</h2>
      </div>
      <div className="px-4 space-y-4">
        <NavLink to="/admin" className="flex hover:bg-gray-400">
          {" "}
          <LayoutGridIcon className="w-6 h-6 text-gray-600" />
          <p className=" text-white cursor-pointer pl-2">Trang chủ</p>
        </NavLink>
        {hasRole("INVOICE") && (
          <NavLink to="/admin/invoice" className="flex hover:bg-gray-400">
            {" "}
            <FileTextIcon className="w-6 h-6 text-gray-600" />
            <p className=" text-white cursor-pointer pl-2">Quản lý hóa đơn</p>
          </NavLink>
        )}
        {hasRole("HOTEL") && (
          <NavLink to="/admin/hotelmanager" className="flex hover:bg-gray-400">
            {" "}
            <HotelIcon className="w-6 h-6 text-gray-600" />
            <p className=" text-white cursor-pointer pl-2">Quản lý khách sạn</p>
          </NavLink>
        )}
        {hasRole("USER") && (
          <NavLink to="/admin/user" className="flex hover:bg-gray-400">
            {" "}
            <User2Icon className="w-6 h-6 text-gray-600" />
            <p className=" text-white cursor-pointer pl-2">Quản lý user</p>
          </NavLink>
        )}
        {hasRole("ROLE") && (
          <NavLink to="/admin/permission" className="flex hover:bg-gray-400">
            {" "}
            <UserLockIcon className="w-6 h-6 text-gray-600" />
            <p className=" text-white cursor-pointer pl-2">Phân quyền</p>
          </NavLink>
        )}
        <NavLink to="/" className="flex hover:bg-gray-400">
          {" "}
          <ArrowLeftFromLine className="w-6 h-6 text-gray-600" />
          <p className=" text-white cursor-pointer pl-2">Quay lại trang web</p>
        </NavLink>
      </div>
    </div>
  );
}
