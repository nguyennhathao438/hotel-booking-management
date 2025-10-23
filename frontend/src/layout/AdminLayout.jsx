import SideBar from "../componentadmin/SideBar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function AdminLayout(){
    return(
        <>
        <div className="flex">
            <SideBar/>
            <Outlet></Outlet>
        </div>
            <Toaster position="top-right" />
        </>
    )
}
export default AdminLayout;