
import "./App.css";
import Header from "./components/Header.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import api from "./api.js";
import { login } from "./storages/userSlice.js";
import { Toaster } from "react-hot-toast";
import DefaultLayout from "./layout/DefaultLayout.jsx";
import { useSelector } from "react-redux";
function App() {
    const isLogin = useSelector((state) => state.user.isLogin)
    const dispatch = useDispatch();
    useEffect(()=>{
        console.log("đã fetch")
        const fetchUser = async()=>{
            const token= localStorage.getItem("token");
            console.log("token" +token)
            if(token !=null || token != ""){
                try{
                 const response =await api.get("/users/myInfo")
                 dispatch(login({
                    avatar :response.data.avatar ,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    userId: response.data.userId,
                    roles: response.data.roles,
                 }))
                 console.log("islogin " + isLogin)
                }catch(error){
                    console.log("islogin " + isLogin)
                    console.error("Lỗi khi lấy thông tin user:", error);
                }

            }
        }
        fetchUser();
    }, [dispatch])
    return (
              <DefaultLayout/>
        

    );
}

export default App;
