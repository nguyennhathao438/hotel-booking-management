import { WrenchIcon ,User2Icon,MegaphoneIcon, FileTextIcon,HandCoinsIcon , ChartNoAxesCombinedIcon , LayoutGridIcon, LayersIcon, BookmarkCheckIcon} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api";
export default function SideBar(){
      const [hotels, setHotels] = useState([]);

      const user = useSelector((state) => state.user);

    const userId = user?.userId;

      useEffect(() => {
        const fetchHotels = async () => {
          if (!userId) return;

          try {
            const response = await api.get(`/hotels/user/${userId}`);
            setHotels(response.data.result || []);
          } catch (err) {
            console.error("Lỗi khi lấy danh sách khách sạn:", err);
          }
        };
        fetchHotels();
      }, [userId]);

      const firstHotelId = hotels[0]?.hotelId;
    return(
        <div className="bg-black py-4 px-4 h-screen w-[200px] fixed z-10 ">
            <div className="px-4 mb-5 flex">
            <ChartNoAxesCombinedIcon className="text-green-400 w-6 h-6" />
            <h2 className="text-white font-bold pl-2 text-xl">OpenHotel</h2>
            </div>
            <div className="px-4 space-y-4">
                <NavLink to="/customer" className="flex hover:bg-gray-400"> <FileTextIcon   className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Trang chủ</p></NavLink>
                <NavLink to="/invoice" className="flex hover:bg-gray-400"> <FileTextIcon   className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Quản lý đơn hàng</p></NavLink>
                <NavLink to={`/customer/hotelmanagercustomer/${firstHotelId}`} className="flex hover:bg-gray-400"> <FileTextIcon   className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Quản lý khách sạn</p></NavLink>
                <div className="flex hover:bg-gray-400"> <HandCoinsIcon  className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Payments</p></div>
                <div className="flex hover:bg-gray-400"> <User2Icon  className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Agents</p></div>
                <div className="flex hover:bg-gray-400"> <WrenchIcon className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Setting</p></div>
            </div>
        </div>
    );
};