import "./App.css";
import Header from "./components/Header.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "./api.js";
import { login } from "./storages/userSlice.js";
import { Toaster } from "react-hot-toast";
import DefaultLayout from "./layout/DefaultLayout.jsx";

import { RouterProvider } from "react-router-dom";
import router from "./routers.jsx";

function App() {

    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchUser = async()=>{
            const token= localStorage.getItem("token");
            console.log(token)
            if(token != null && token != "" ){

                try{
                 const response =await api.get("/users/myInfo")
                 dispatch(login({
                    avatar :response.data.result.avatar ,
                    firstName: response.data.result.firstName,
                    lastName: response.data.result.lastName,
                    userId: response.data.result.id,
                    roles: response.data.result.roles,
                 }))
                }catch(error){
                    console.error("Lỗi khi lấy thông tin user:", error);
                }

            }
        }
        fetchUser();
    }, [dispatch])
    return (
        <>
        <RouterProvider router={router}/>
        </>
    );
}

export default App;
