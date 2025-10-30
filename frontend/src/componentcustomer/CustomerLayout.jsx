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

  // Lấy hotelId đầu tiên (hoặc có thể cho người dùng chọn)
  const firstHotelId = hotels[0]?.hotelId;

  return (
    <>
      <div className="flex min-h-screen bg-gray-50 relative ">
        {/* Sidebar trái */}
        <div className={`transition-all duration-300 ${sidebarOpen ? "w-[250px]" : "w-0"}  overflow-hidden`}>
          {sidebarOpen && <SideBar />}
        </div>

        {/* Nút toggle sidebar trái */}
        <div className="flex items-center ">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-12 h-12 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold"
          >
            {sidebarOpen ? "←" : "→"}
          </button>
        </div>

        {/* Nội dung chính */}
        <div className="flex-1 p-6 transition-all duration-300 gap-12">
          <Outlet />
        </div>

        {/* Sidebar phải và nút toggle chỉ hiện trên index page */}
        {isIndexPage && (
          <>

            <div className="flex items-center mr-6 ">
              <button
                onClick={() => setListOpen(!listOpen)}
                className="w-12 h-12 bg-white border rounded-full shadow-lg hover:bg-blue-100 flex items-center justify-center transition text-xl font-bold"
              >
                {listOpen ? "→" : "←"}
              </button>
            </div>
            <div className={`transition-all duration-300 ${listOpen ? "w-[550px]" : "w-0"}  overflow-hidden`}>
              {listOpen && (
                <div className="space-y-6 p-4 ">
                     <div className="h-10">
                                  </div>
                  <ReviewList hotelId={firstHotelId} />
                  <ServiceList hotelId={firstHotelId} />
                </div>
              )}

            </div>
          </>
        )}
      </div>

      <Toaster position="top-right" />
    </>
  );
}

export default CustomerLayout;
