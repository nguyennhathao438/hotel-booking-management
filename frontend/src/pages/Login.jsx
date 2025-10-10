import { useState } from "react";
import api from "../api";
import { login } from "../storages/userSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {  toast } from "react-hot-toast";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] =useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login",{
        email,
        password,
      });
      
      console.log(response);
      localStorage.setItem("token",response.data.result.accessToken);
      dispatch(login({
        avatar:response.data.result.avatar,
        firstName:response.data.result.firstName,
        lastName:response.data.result.lastName,
        roles:response.data.result.roles,
        userId:response.data.result.userId
      }))
      navigate("/")
      toast.success("Đăng nhập thành công");
    }catch(error){
        if (error.response && error.response.data) {
           toast.error(error.response.data.message);
        } else {
            toast.error("Lỗi kết nối sever");
        }
    }
    finally{
      setLoading(false);
    }
  };
  const handleLoginGoogle = () => {
  // URL chuẩn để Spring Security tự xử lý OAuth2 flow
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
};
    const handleLoginFaceBook = () => {
  // URL chuẩn để Spring Security tự xử lý OAuth2 flow
  window.location.href = "http://localhost:8080/oauth2/authorization/facebook";
};
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-lg flex w-[800px] max-w-full overflow-hidden">       
        {/* Left side (Image/Illustration) */}
        <div className="flex items-center justify-center w-1/2 bg-gray-50 p-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
            alt="Login Illustration"
            className="w-40 h-40"
          />
        </div>

        {/* Right side (Form) */}
        <div className="w-1/2 p-8">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Member Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1 bg-transparent focus:outline-none"
              />
            </div>
            {/* Password */}
            <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full">
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1 bg-transparent focus:outline-none"
              />
            </div>
            {/* Button */}
            <div className="flex justify-center">
            <button
              type="submit" 
              disabled={loading}
              className=" w-[200px] rounded-full py-2 font-semibold !bg-green-400  hover:text-white"
            >
              {loading ?  "Đang đăng nhập ..." : "Đăng nhập" }
            </button>
            </div>
            <div className="flex justify-around gap-4"><button className=" w-[200px] rounded-full py-2 font-semibold !bg-green-400  hover:text-white" 
            type="button"
            onClick={() => handleLoginGoogle()}>Google</button>
            <button className=" w-[200px] rounded-full py-2 font-semibold !bg-green-400  hover:text-white" 
            type="button"
            onClick={()=> handleLoginFaceBook()}>Facebook</button></div>
          </form>
          {/* Links */}
          <p className="mt-4 text-sm text-center text-gray-500 cursor-pointer hover:underline">
            Forgot Username / Password?
          </p>
          <p className="mt-4 text-sm text-center text-gray-700 ">
            Bạn chưa có tài khoản 
            <a href="/register" className="font-semibold text-blue-600 hover:underline ml-1">
            Đăng ký
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
