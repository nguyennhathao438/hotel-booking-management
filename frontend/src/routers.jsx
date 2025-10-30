import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./components/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import DashBoard from "./componentadmin/DashBoard"
import PermissionManager from "./pages/PermissionManager";
import AddHotel from "./components/AddHotel";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import Users from "./pages/Users";
import Invoice from "./pages/Invoice";
import InvoiceU from "./pages/InvoiceU";
import Statistic from "./pages/Statistic";
import HotelsView from "./pages/HotelsView";
import MyInfo from "./pages/MyInfo";
import FormBooking from "./components/Booking/BookingForm";
import ConfirmBooking from "./components/Booking/BookingConfirm";
import SuccessBooking from "./components/Booking/BookingSuccess";
import HotelProvince from "./components/BookingSearchResult/HotelsResult";
import DetailsHotel from "./components/HotelDetails/HotelViewDetails"
import HistoryInvoice from "./pages/HistoryInvoice";
import RoomManagerCustomer from "./componentcustomer/RoomManagerCustomer";
import CustomerLayout from "./componentcustomer/CustomerLayout";
import HotelList from "./componentcustomer/hotelsList";
import Revenue from "./componentcustomer/Revenue";
import ReviewList from "./componentcustomer/ReviewList";
import HotelManager from "./componentadmin/HotelManager";

import Chat from "./pages/Chat";
const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/addhotel",
                element: <AddHotel />
            },
            {
                path: "/detailshotel/:hotelId",
                element: <DetailsHotel />
            },
            {
                path: "/myinfo",
                element: <MyInfo />
            },
            {
                path: "/invoice",
                element: <InvoiceU />
            },
            {
                path: "/statistic",
                element: <Statistic />
            },
            {
                path: "/HotelsView",
                element: <HotelsView />
            },
            {
                path: "/booking-form/:roomId",
                element: <FormBooking />
            }
            , {
                path: "/confirm-booking/:roomId",
                element: <ConfirmBooking />
            }
            , {
                path: "/success-booking",
                element: <SuccessBooking />
            }
            , {
                path: "/search-result/:province",
                element: <HotelProvince />
            }
            , {
                path: "/history",
                element: <HistoryInvoice />
            }
        ],
    },
    {
        path: "/oauth2/redirect",
        element: <OAuth2RedirectHandler />
    },
    {
        path: "/customer",
        element: <CustomerLayout />,
        children: [
            {
                path: "room/:hotelId",
                element: <RoomManagerCustomer />
            },
            {
                path: "Revenue/:hotelId",
                element: <Revenue />
            },
            {
                index: true,
                element: <HotelList />
            },
            {
                path: "review/:hotelId",
                element: <ReviewList />
            },

        ]
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "",
                element: <DashBoard />
            },
            {
                path: "permission",
                element: <PermissionManager />
            },
            {
                path: "user",
                element: <Users />
            },
            {
                path: "hotelmanager",
                element: <HotelManager />
            },

            {
                path: "invoice",
                element: <Invoice />
            },
            {
                path: "chat",
                element: <Chat />
            }
        ]

    }

]);

export default router;