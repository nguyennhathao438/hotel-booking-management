import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./components/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import DashBoard from "./componentadmin/DashBoard"
import PermissionManager from "./pages/PermissionManager";
import DetailsHotel from "./components/DetailsHotel/DetailsHotel";
import AddHotel from "./components/AddHotel";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import Users from "./pages/Users";
import MyInfo from "./pages/MyInfo";
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
                    element: <DetailsHotel/>
                },
                
                {
                    path: "/myinfo",
                    element: <MyInfo/>
                }
                

            ],
        },
        {
                    path: "/oauth2/redirect",
                    element: <OAuth2RedirectHandler/>
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
                },
                {
                    path:"user",
                    element: <Users/>
                }
            ]
            
        }
    
]);
export default router;