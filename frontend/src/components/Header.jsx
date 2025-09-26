import logo from "../assets/img/logo.jpg"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import defaultAvata from "../assets/img/defaultAvata.jpg"
import { useDispatch } from "react-redux"
import { logout } from "../storages/userSlice"
import api from "../api"
function Header() {
  const isLogin = useSelector((state) => state.user.isLogin)
  const [openAccount,setOpenAccount] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () =>{
    const token= localStorage.getItem("token")
    await api.post("/auth/logout",token)
    localStorage.removeItem("token")
    dispatch(logout());
  }
  return (
    <div className="top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-3 font-sans fixed">
      {/* Logo */}
      <img src={logo} alt="logo" className="w-12 h-auto object-contain" />

      {/* Menu */}
      <nav className="flex gap-8">
        
        <Link to="/" className="font-bold text-white cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">HOME</Link>
        <Link className="font-bold text-white cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">ROOMS</Link>
        <Link className="font-bold text-white cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">SPA</Link>
        <Link className="font-bold text-white cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">CONTACTS</Link>
      </nav>

      {/* Buttons */}
      {isLogin ? (
        <>
        <div className="relative">
          <div className="avatar">
          <button
          className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-blue-500 overflow-hidden"
          onClick={() =>setOpenAccount(!openAccount)}
          >
          <img src={defaultAvata} alt="" className=" object-cover"/>
          </button>
          </div>
          {openAccount && (
            <ul className="absolute right-0 bg-white shadow-lg rounded-md mt-2 transition-transform">
              <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">Thông tin cá nhân</li>
              <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">Lịch sử đặt phòng</li>
              <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer" onClick={handleLogout}>Đăng xuất</li>
            </ul>
          )}
        </div>
        </>
      ):
      (
        <>
        <div className="flex gap-4">
        <Link to="/login" className="px-5 py-2 rounded-full font-bold cursor-pointer border-2 border-white text-white transition-colors duration-300 hover:bg-white hover:text-[#4b2e1f]">
          LOGIN
        </Link>
        <Link to="/register" className="px-5 py-2 rounded-full font-bold cursor-pointer bg-[#4b2e1f] text-white border-2 border-[#4b2e1f] transition-colors duration-300 hover:bg-white hover:text-[#4b2e1f]">
          SIGNUP
        </Link>
      </div></>
      )}
      
    </div>
  )
}

export default Header
