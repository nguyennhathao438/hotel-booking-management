import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import api from "./api.js";
import { login } from "./storages/userSlice.js";
import DetailsHotelView from "./components/HotelDetails/HotelViewDetails.jsx";
import AddHotel from "./components/AddHotel.jsx";
import { Toaster } from "react-hot-toast";
import DefaultLayout from "./layout/DefaultLayout.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./router/routers.jsx";
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
      }
      if (token != null && token != "") {
        try {
          const response = await api.get("/users/myInfo");
          console.log(response);
          dispatch(
            login({
              avatar: response.data.result.avatar,
              firstName: response.data.result.firstName,
              lastName: response.data.result.lastName,
              userId: response.data.result.id,
              roles: response.data.result.roles,
            })
          );
        } catch (error) {
          console.error("Lỗi khi lấy thông tin user:", error);
        }
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);
  if (loading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen text-lg font-semibold text-gray-700">
          {/* Vòng tròn xoay */}
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p>Đang tải trang...</p>
        </div>
      </>
    );
  }
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
