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
export default function SideBar() {
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
        <NavLink to="/customer/my-hotel" className="flex hover:bg-gray-400">
          {" "}
          <FileTextIcon className="w-6 h-6 text-gray-600" />
          <p className=" text-white cursor-pointer pl-2">Khách sạn của tôi</p>
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
