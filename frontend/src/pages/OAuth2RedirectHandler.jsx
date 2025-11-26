import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import { login } from "../storages/userSlice";
import { ClockIcon } from "lucide-react";
function OAuth2RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const param = new URLSearchParams(location.search);
    const token = param.get("token");
    console.log("token" + token);
    const fetchLogin = async () => {
      try {
        const response = await api.post("/auth/login/google", {
          token,
        });
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
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };
    if (token) {
      fetchLogin();
    } else {
      navigate("/login");
    }
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="p-8 bg-white rounded-lg shadow-md flex flex-col items-center">
        {/* Spinner */}
        <ClockIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />

        {/* Text */}
        <h2 className="mt-4 text-xl font-semibold text-[#4b2e1f]">
          Đang đăng nhập, vui lòng chờ...
        </h2>
        <p className="mt-2 text-sm text-gray-600 text-center max-w-xs">
          Chúng tôi đang xác thực thông tin của bạn, đừng tắt trình duyệt hoặc
          làm mới trang.
        </p>
      </div>
    </div>
  );
}

export default OAuth2RedirectHandler;
