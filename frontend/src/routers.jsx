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