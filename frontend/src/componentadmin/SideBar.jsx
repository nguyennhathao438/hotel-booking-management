import { WrenchIcon ,User2Icon,MegaphoneIcon, FileTextIcon,HandCoinsIcon , ChartNoAxesCombinedIcon , LayoutGridIcon, LayersIcon, BookmarkCheckIcon} from "lucide-react";
import { NavLink } from "react-router-dom";
export default function SideBar(){
    return(
        <div className="bg-black py-4 px-4 h-screen w-[300px] fixed z-10">
            <div className="px-4 mb-5 flex">
            <ChartNoAxesCombinedIcon className="text-green-400 w-6 h-6" />
            <h2 className="text-white font-bold pl-2 text-xl">OpenHotel</h2>
            </div>
            <div className="px-4 space-y-4">
                <NavLink to="/admin" className="flex hover:bg-gray-400"> <LayoutGridIcon className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Dashboard</p></NavLink>
                <div className="flex hover:bg-gray-400"> <LayersIcon className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Rooms Available</p></div>
                <div className="flex hover:bg-gray-400"> <BookmarkCheckIcon className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Checkouts</p></div>
                <div className="flex hover:bg-gray-400"> <MegaphoneIcon  className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Enquiries</p></div>
                <NavLink to="/admin/invoice" className="flex hover:bg-gray-400"> <HandCoinsIcon  className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Invoice</p></NavLink>
                <NavLink to="/admin/permission" className="flex hover:bg-gray-400"> <FileTextIcon   className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Reports</p></NavLink>
                <NavLink to="/admin/user" className="flex hover:bg-gray-400"> <User2Icon  className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Agents</p></NavLink>
                <div className="flex hover:bg-gray-400"> <WrenchIcon className="w-6 h-6 text-gray-600"/><p className=" text-white cursor-pointer pl-2">Setting</p></div>
            </div>
        </div>
    );
};