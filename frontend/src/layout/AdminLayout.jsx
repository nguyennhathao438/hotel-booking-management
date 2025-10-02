import SideBar from "../componentadmin/SideBar";
import { Outlet } from "react-router-dom";
function AdminLayout(){
    return(
        <>
        <div className="flex">
            <SideBar/>
            <Outlet></Outlet>
        </div>
            
        </>
    )
}
export default AdminLayout;