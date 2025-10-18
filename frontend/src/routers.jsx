import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./components/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import DashBoard from "./componentadmin/DashBoard"
import PermissionManager from "./pages/PermissionManager";
import AddHotel from "./components/AddHotel";
import DetailsHotelView from "./components/DetailsHotel/DetailsHotelView";
import FormBooking from "./components/Booking/FormBooking";
import ConfirmBooking from "./components/Booking/ConfirmBooking";
import SuccessBooking from "./components/Booking/SuccessBooking";
import HotelProvince from "./components/BookingSearchResult/HotelProvince";
const router = createBrowserRouter([
        {
            path:"/",
            element : <DefaultLayout/>,
            children : [    
                {
                    path:"",
                    element: <Home/>,
                },
                {
                    path:"/register",
                    element: <Register/>
                },
                {
                    path:"/login",
                    element:<Login/>
                },
                {
                    path : "/addhotel",
                    element :<AddHotel/>
                },
                {
                    path: "/detailshotel/:hotelId",
                    element: <DetailsHotelView/>
                },
                {
                    path:"/booking-form/:roomId",
                    element:<FormBooking/>
                }
                ,{
                    path:"/confirm-booking/:roomId",
                    element:<ConfirmBooking/>
                }
                ,{
                    path:"/success-booking",
                    element:<SuccessBooking/>
                }
                ,{
                    path:"/search-result/:province",
                    element:<HotelProvince/>
                }
            ],
        },
        {
            path : "/admin",
            element : <AdminLayout/>,
            children : [
                {
                    path :"",
                    element: <DashBoard/>
                },
                {
                    path :"permission",
                    element:<PermissionManager/>
                }
            ]
            
        }
    
]);
export default router;