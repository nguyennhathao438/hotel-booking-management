import { useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import registerImg from "../assets/img/login-register.jpg";
import backgroundImage from "../assets/img/login-background.jpg";
export default function Register() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", formData);
      toast.success("Đăng ký thành công");

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Lỗi kết nối server ");
      }
    }
  };
  if (user?.isLogin) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="flex w-[780px] max-w-full rounded-2xl shadow-2xl overflow-hidden 
               bg-white/70 backdrop-blur-lg border border-white/40"
          style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
        >
          <div className="flex items-center justify-center w-1/2 bg-gray-50 p-0">
            <img
              src={registerImg}
              alt="Login Illustration"
              className="w-full max-h-[450px] object-cover"
            />
          </div>
          <div className="w-1/2 p-8">
            <h2 className="font-bold text-2xl mb-6 text-center text-[#4b2e1f]">
              Member Register
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name fields */}
              <div className="flex gap-3">
                <div
                  className="flex-1 px-4 py-2.5 bg-[#f3e7d9] rounded-full border border-[#c9a47a]
                              focus-within:border-[#4b2e1f] transition-all"
                >
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Họ"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-transparent text-[#4b2e1f] placeholder-[#81624a] focus:outline-none"
                    required
                  />
                </div>

                <div
                  className="flex-1 px-4 py-2.5 bg-[#f3e7d9] rounded-full border border-[#c9a47a]
                              focus-within:border-[#4b2e1f] transition-all"
                >
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Tên"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-transparent text-[#4b2e1f] placeholder-[#81624a] focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div
                className="px-4 py-2.5 bg-[#f3e7d9] rounded-full border border-[#c9a47a]
                            focus-within:border-[#4b2e1f] transition-all"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent text-[#4b2e1f] placeholder-[#81624a] focus:outline-none"
                />
              </div>

              {/* Password */}
              <div
                className="px-4 py-2.5 bg-[#f3e7d9] rounded-full border border-[#c9a47a]
                            focus-within:border-[#4b2e1f] transition-all"
              >
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent text-[#4b2e1f] placeholder-[#81624a] focus:outline-none"
                />
              </div>

              {/* Password confirm */}
              <div
                className="px-4 py-2.5 bg-[#f3e7d9] rounded-full border border-[#c9a47a]
                            focus-within:border-[#4b2e1f] transition-all"
              >
                <input
                  type="password"
                  name="password2"
                  placeholder="Xác nhận mật khẩu"
                  value={formData.password2}
                  onChange={handleChange}
                  className="w-full bg-transparent text-[#4b2e1f] placeholder-[#81624a] focus:outline-none"
                />
              </div>

              {/* Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-5 py-2 border-2 border-[#B08A63] bg-[#d9bd96] rounded-full
                           font-semibold text-[#4b2e1f] hover:bg-[#4b2e1f] hover:text-white
                           transition-colors duration-200"
                >
                  Đăng ký
                </button>
              </div>
            </form>

            <p className="mt-4 text-sm text-center text-gray-700">
              Quay lại trang
              <a
                href="/login"
                className="font-semibold text-[#4b2e1f] hover:underline ml-1"
              >
                Đăng nhập
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
