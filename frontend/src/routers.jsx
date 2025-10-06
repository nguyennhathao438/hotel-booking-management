import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./components/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminLayout from "./layout/AdminLayout";
import DashBoard from "./componentadmin/DashBoard"
import PermissionManager from "./pages/PermissionManager";
import Customers from "./pages/Customers";
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
                },
                {
                    path:"user",
                    element: <Customers/>
                }
            ]
            
        }
    
]);
export default router;