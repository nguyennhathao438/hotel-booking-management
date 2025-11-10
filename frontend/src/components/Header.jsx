import logo from "../assets/img/logo.jpg";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import defaultAvata from "../assets/img/defaultAvata.jpg";
import { useDispatch } from "react-redux";
import { logout } from "../storages/userSlice";
import { useNavigate } from "react-router-dom";
import api from "../api";
function Header() {
  const user = useSelector((state) => state.user);
  const [openAccount, setOpenAccount] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    await api.post("/auth/logout", { token }, { withCredentials: true });
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };
  const hasRole = (roleName) => user.role?.some((r) => r.name === roleName);
  return (
    <header className="sticky w-full z-50 bg-white shadow-md py-3 px-10 flex justify-between items-center font-sans ">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src={logo}
          alt="logo"
          className="w-12 h-12 object-cover rounded-full border border-[#d2b48c]"
        />
        <span className="text-[#4b2e1f] font-bold text-xl tracking-wide">
          GRAND HOTEL
        </span>
      </Link>

      {/* Menu */}
      <nav className="flex gap-8 text-[#4b2e1f] font-semibold">
        <Link
          to="/"
          className="transition-colors duration-200 hover:text-[#d2b48c]"
        >
          TRANG CHỦ
        </Link>
        <Link
          to="/HotelsView"
          className="transition-colors duration-200 hover:text-[#d2b48c]"
        >
          KHÁCH SẠN
        </Link>
        {/* <Link
          to="/spa"
          className="transition-colors duration-200 hover:text-[#d2b48c]"
        >
          SPA
        </Link>
        <Link
          to="/contact"
          className="transition-colors duration-200 hover:text-[#d2b48c]"
        >
          CONTACTS
        </Link> */}
      </nav>

      {/* Account / Auth Buttons */}
      {user.isLogin ? (
        <div className="relative">
          <button
            onClick={() => setOpenAccount(!openAccount)}
            className="w-10 h-10 rounded-full border-2 border-[#d2b48c] overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={user?.avatar ? user.avatar : defaultAvata}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </button>

          {openAccount && (
            <ul className="absolute right-0 bg-white shadow-lg rounded-md mt-2 transition-transform">
              <Link to="/myinfo">
                <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">
                  Thông tin cá nhân
                </li>
              </Link>
              <Link to="/history">
                <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">
                  Lịch sử đặt phòng
                </li>
              </Link>
              {hasRole("CUSTOMER") ? (
                <Link to="/customer">
                  <li className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">
                    Trang quản lý khách sạn
                  </li>
                </Link>
              ) : (
                <Link to="/addhotel">
                  <li className="block px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer">
                    Đăng ký khách sạn
                  </li>
                </Link>
              )}

              <li
                className="px-4 py-2 text-right whitespace-nowrap hover:scale-105 cursor-pointer"
                onClick={handleLogout}
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
