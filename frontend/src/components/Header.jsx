import logo from "../assets/img/logo.jpg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import defaultAvata from "../assets/img/defaultAvata.jpg";
import { logout } from "../storages/userSlice";
import api from "../api";

function Header() {
  const isLogin = useSelector((state) => state.user.isLogin);
  const [openAccount, setOpenAccount] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    await api.post("/auth/logout", { token }, { withCredentials: true });
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <header className="sticky w-full z-50 bg-white shadow-md py-3 px-10 flex justify-between items-center font-sans">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="logo"className="w-12 h-12 object-cover rounded-full border border-[#d2b48c]"/>
        <span className="text-[#4b2e1f] font-bold text-xl tracking-wide">GRAND HOTEL</span>
      </Link>

      {/* Menu */}
      <nav className="flex gap-8 text-[#4b2e1f] font-semibold">
        <Link to="/" className="transition-colors duration-200 hover:text-[#d2b48c]">
          HOME
        </Link>
        <Link to="/rooms" className="transition-colors duration-200 hover:text-[#d2b48c]">
          ROOMS
        </Link>
        <Link to="/spa" className="transition-colors duration-200 hover:text-[#d2b48c]">
          SPA
        </Link>
        <Link to="/contact" className="transition-colors duration-200 hover:text-[#d2b48c]">
          CONTACTS
        </Link>
      </nav>

      {/* Account / Auth Buttons */}
      {isLogin ? (
        <div className="relative">
          <button
            onClick={() => setOpenAccount(!openAccount)}
            className="w-10 h-10 rounded-full border-2 border-[#d2b48c] overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={defaultAvata}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {openAccount && (
            <ul className="absolute right-0 mt-3 bg-white border border-gray-200 rounded-lg shadow-lg w-48 overflow-hidden animate-fadeIn">
              <li className="px-4 py-2 hover:bg-[#f7f3ef] cursor-pointer text-sm text-[#4b2e1f]">
                Thông tin cá nhân
              </li>
              <li className="px-4 py-2 hover:bg-[#f7f3ef] cursor-pointer text-sm text-[#4b2e1f]">
                Lịch sử đặt phòng
              </li>
              <Link
                to="/addhotel"
                className="block px-4 py-2 hover:bg-[#f7f3ef] text-sm text-[#4b2e1f]"
              >
                Đăng ký khách sạn
              </Link>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-[#f7f3ef] cursor-pointer text-sm text-red-600 font-semibold"
              >
                Đăng xuất
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 border-2 border-[#4b2e1f] rounded-full font-semibold text-[#4b2e1f] hover:bg-[#4b2e1f] hover:text-white transition-colors"
          >
            LOGIN
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 border-2 border-[#4b2e1f] bg-[#4b2e1f] text-white rounded-full font-semibold hover:bg-transparent hover:text-[#4b2e1f] transition-colors"
          >
            SIGNUP
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;


// import logo from "../assets/img/logo.jpg"
// import { Link } from "react-router-dom"
// import { useSelector } from "react-redux"
// import { useEffect, useState } from "react"
// import defaultAvata from "../assets/img/defaultAvata.jpg"
// import { useDispatch } from "react-redux"
// import { logout } from "../storages/userSlice"
// import api from "../api"
// function Header() {
//   const isLogin = useSelector((state) => state.user.isLogin)
//   const [openAccount, setOpenAccount] = useState(false);
//   const dispatch = useDispatch();
//   const handleLogout = async () => {
//     const token = localStorage.getItem("token")
//     await api.post("/auth/logout", { token }, { withCredentials: true })
//     localStorage.removeItem("token")
//     dispatch(logout());
//   }
//   const [scroll, setScroll] = useState(false)
//   useEffect(() => {
//     window.addEventListener('scroll', () => {
//       window.scrollY > 50 ? setScroll(true) : setScroll(false)
//     })
//   })
//   return (
//     <div className={`${scroll ? "bg-white shadow-lg" : "bg-transparent"} fixed w-full z-50 flex justify-between items-center px-10 py-3 font-sans `}>
//       {/* Logo */}
//       <img src={logo} alt="logo" className="w-12 h-auto object-contain " />

//       {/* Menu */}
//       <nav className={`${scroll ? "text-[#d2b48c]" : "text-white"} flex gap-8`}>
//         <Link to="/" className="font-bold cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">HOME</Link>
//         <Link className="font-bold cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">ROOMS</Link>
//         <Link className="font-bold cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">SPA</Link>
//         <Link className="font-bold cursor-pointer transition-transform duration-200 hover:text-[#d2b48c] hover:scale-105">CONTACTS</Link>
//       </nav>

//       {/* Buttons */}
//       {isLogin ? (
//         <>
//           <div className="relative">
//             <div className="avatar">
//               <button className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-blue-500 overflow-hidden" onClick={() => setOpenAccount(!openAccount)}>
//                 <img src={defaultAvata} alt="" className=" object-cover" />
//               </button>
//             </div>
//             {openAccount && (
//               <ul className="absolute right-0 bg-white shadow-lg rounded-md mt-2 transition-transform">
//                 <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">Thông tin cá nhân</li>
//                 <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">Lịch sử đặt phòng</li>
//                 <Link to="/addhotel" className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">Đăng ký khách sạn</Link>
//                 <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer" onClick={handleLogout}>Đăng xuất</li>
//               </ul>
//             )}
//           </div>
//         </>
//       ) :
//         (
//           <>
//             <div className="flex gap-4">
//               <Link to="/login" className={`${scroll ? "border-white hover:border-[#4b2e1f] rounded-full text-black" : " border-white text-white hover:bg-white hover:text-[#4b2e1f]"} px-5 py-2 rounded-full font-bold cursor-pointer border-2 transition-colors duration-300`}>
//                 LOGIN
//               </Link>
//               <Link to="/register" className="px-5 py-2 rounded-full font-bold cursor-pointer bg-[#4b2e1f] text-white border-2 border-[#4b2e1f] transition-colors duration-300 hover:bg-white hover:text-[#4b2e1f]">
//                 SIGNUP
//               </Link>
//             </div></>
//         )}
//     </div>
//   )
// }
// export default Header
