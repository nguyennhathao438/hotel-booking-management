import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "../componentcustomer/SideBarCustomer";
import ReviewList from "../componentcustomer/ReviewList";
import { Toaster } from "react-hot-toast";
import api from "../api";
import ServiceList from "../componentcustomer/ServiceList";
function CustomerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [listOpen, setListOpen] = useState(false);
  const [hotels, setHotels] = useState([]);
  const location = useLocation();
  const isIndexPage = location.pathname === "/customer";

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

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 relative ">
        {/* Sidebar trái */}
        <div className={`transition-all duration-300 ${sidebarOpen ? "w-[250px]" : "w-0"}  overflow-hidden`}>
          {sidebarOpen && <SideBar />}
        </div>


        {/* Nội dung chính */}
        <div className="flex-1 p-6 transition-all duration-300 gap-12">
          <Outlet />
        </div>


      </div>

      <Toaster position="top-right" />
    </>
  );
}

export default CustomerLayout;
