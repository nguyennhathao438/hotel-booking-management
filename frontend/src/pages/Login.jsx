import { useState, useEffect } from "react";
import api from "../api";
import { login } from "../storages/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import backgroundImage from "../assets/img/login-background.jpg";
import facebookIcon from "../assets/img/facebook-icon.png";
import googleIcon from "../assets/img/google-Icon.png";
import loginImg from "../assets/img/login-register.jpg";
export default function Login() {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    if (error) {
      toast.error(decodeURIComponent(error));
      navigate("/login", { replace: true });
    }
  }, [location]);
  if (user?.isLogin) {
    return <Navigate to="/" replace />;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(response);
      localStorage.setItem("token", response.data.result.accessToken);
      dispatch(
        login({
          avatar: response.data.result.avatar,
          firstName: response.data.result.firstName,
          lastName: response.data.result.lastName,
          roles: response.data.result.roles,
          userId: response.data.result.userId,
        })
      );
      navigate("/");
      toast.success("Đăng nhập thành công");
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Lỗi kết nối sever");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleLoginGoogle = (e) => {
    e.preventDefault();
    // URL chuẩn để Spring Security tự xử lý OAuth2 flow
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };
  const handleLoginFaceBook = (e) => {
    e.preventDefault();
    // URL chuẩn để Spring Security tự xử lý OAuth2 flow
    window.location.href =
      "http://localhost:8080/oauth2/authorization/facebook";
  };
  return (
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
        {/* Left side (Image/Illustration) */}
        <div className="flex items-center justify-center w-1/2 bg-gray-50 p-0">
          <img
            src={loginImg}
            alt="Login Illustration"
            className="w-full max-h-[400px] object-cover"
          />
        </div>

        {/* Right side (Form) */}
        <div className="w-1/2 p-8">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 ">
            Member Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div
              className="flex items-center px-4 py-2.5 bg-[#f3e7d9] 
                rounded-full border border-[#c9a47a]
                focus-within:border-[#4b2e1f] transition-all"
            >
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 bg-transparent text-[#4b2e1f]
               placeholder-[#81624a] focus:outline-none"
              />
            </div>
            {/* Password */}
            <div
              className="flex items-center px-4 py-2.5 bg-[#f3e7d9] 
                rounded-full border border-[#c9a47a]
                focus-within:border-[#4b2e1f] transition-all"
            >
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 bg-transparent text-[#4b2e1f]
               placeholder-[#81624a] focus:outline-none"
              />
            </div>
            {/* Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className=" px-5 py-2 border-2 border-[#B08A63] bg-[#d9bd96] rounded-full font-semibold text-[#4b2e1f] hover:bg-[#4b2e1f] hover:text-white transition-colors"
              >
                {loading ? "Đang đăng nhập ..." : "Đăng nhập"}
              </button>
            </div>
            <div className="flex justify-around gap-4">
              <button
                className="flex w-[200px] py-2 items-center justify-center gap-3 
             border border-[#b08a63] bg-[#e6d4bb]
             rounded-full font-medium text-[#4b2e1f]
             hover:bg-[#4b2e1f] hover:text-white hover:border-[#4b2e1f]
             transition-all duration-200 shadow-sm"
                onClick={(e) => handleLoginGoogle(e)}
              >
                <img src={googleIcon} className="w-5 h-5" />
                <span>Google</span>
              </button>

              <button
                className="flex w-[200px] py-2 items-center justify-center gap-3 
             border border-[#b08a63] bg-[#e6d4bb]
             rounded-full font-medium text-[#4b2e1f]
             hover:bg-[#4b2e1f] hover:text-white hover:border-[#4b2e1f]
             transition-all duration-200 shadow-sm"
                onClick={(e) => handleLoginFaceBook(e)}
              >
                <img src={facebookIcon} className="w-5 h-5" />
                <span>Facebook</span>
              </button>
            </div>
          </form>
          {/* Links */}
          <p className="mt-4 text-sm text-center text-gray-700 ">
            Bạn chưa có tài khoản
            <a
              href="/register"
              className="font-semibold text-[#4b2e1f] hover:underline ml-1"
            >
              Đăng ký
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
