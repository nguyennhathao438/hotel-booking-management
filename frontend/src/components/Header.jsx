import logo from "../assets/img/logo.jpg"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import defaultAvata from "../assets/img/defaultAvata.jpg"
import { useDispatch } from "react-redux"
import { logout } from "../storages/userSlice"
import api from "../api"
function Header() {
  const user = useSelector((state) => state.user)
  const [openAccount, setOpenAccount] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const token = localStorage.getItem("token")
    await api.post("/auth/logout", {token},{ withCredentials: true })
    localStorage.removeItem("token")
    dispatch(logout());
  }
  const [scroll, setScroll] = useState(false)
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 50 ? setScroll(true) : setScroll(false)
    })
  })
  return (
    <div className={`${scroll ? "bg-white shadow-lg" : "bg-transparent"} fixed w-full z-50 flex justify-between items-center px-10 py-3 font-sans `}>
      {/* Logo */}
      <img src={logo} alt="logo" className="w-12 h-auto object-contain " />

      {/* Menu */}
      <nav className={`${scroll ? "text-[#d2b48c]" : "text-white"} flex gap-8`}>
        <Link to="/" className="font-bold cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">HOME</Link>
        <Link className="font-bold cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">ROOMS</Link>
        <Link className="font-bold cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">SPA</Link>
        <Link className="font-bold cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">CONTACTS</Link>
      </nav>

      {/* Buttons */}
      {user.isLogin ? (

        <>
          <div className="relative">
            <div className="avatar">
              <button
                className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-blue-500 overflow-hidden"
                onClick={() => setOpenAccount(!openAccount)}
              >
                <img src={user.avatar ? user.avatar:defaultAvata} alt="" className=" object-cover" />

              </button>
            </div>
            {openAccount && (
              <ul className="absolute right-0 bg-white shadow-lg rounded-md mt-2 transition-transform">
                <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">Thông tin cá nhân</li>
                <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">Lịch sử đặt phòng</li>
                <Link to="/addhotel" className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">Đăng ký khách sạn</Link>

                <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer" onClick={handleLogout}>Đăng xuất</li>
              </ul>
            )}
          </div>
        </>
      ) :
        (
          <>
            <div className="flex gap-4">
              <Link to="/login" className={`${scroll ? "border-white hover:border-[#4b2e1f] rounded-full text-black" : " border-white text-white hover:bg-white hover:text-[#4b2e1f]" } px-5 py-2 rounded-full font-bold cursor-pointer border-2 transition-colors duration-300`}>
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
