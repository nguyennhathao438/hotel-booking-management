import SideBar from "../componentcustomer/SideBarCustomer";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
function CustomerLayout() {
  return (
    <>
      <div className="flex">
        <SideBar />
        <Outlet></Outlet>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default CustomerLayout;
