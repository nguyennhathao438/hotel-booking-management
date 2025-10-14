import { useState, useEffect } from "react"
import api from "../api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import ModelForm from "../components/FormModel";
export default function MyInfo() {
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openFormPassword, setOpenFormPassword] = useState(false);
    const user = useSelector((state) => state.user)
    const [userInfo, setUserInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        dateOfBirth: "",
        avatar: "",
        file: null,
    });
    const [formPassword,setFormPassword] = useState({
        password : "",
        passwordnew1: "",
        passwordnew2: ""
    });
    useEffect(() => {
        const fetchMyinfo = async () => {

            const response = await api.get("/users/myInfo");
            console.log(response)
            setUserInfo(response.data.result)
            console.log("Thông tin user", user)
        }
        fetchMyinfo();
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleChangeFormPassword = (e) =>{
        const {name,value} = e.target;
        setFormPassword({
    ...formPassword,
    [name]: value
  });
    }
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setUserInfo((prev) => ({
                ...prev,
                avatar: previewURL,
                file: file,
            }));
        }
    };
    const handleSubmit = async () => {
        setLoading(true)
        try {

            const data = new FormData();
            if (userInfo.file) data.append("file", userInfo.file);
            data.append("firstName", userInfo.firstName || "");
            data.append("lastName", userInfo.lastName || "");
            data.append("dateOfBirth", userInfo.dateOfBirth || "");
            data.append("phone", userInfo.phone || "");
            const response = await api.put(`/users/myInfo/${user.userId}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            console.log(response)
            setIsEdit(false);
            toast.success("Cập nhật thành công")
        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "Đã xảy ra lỗi, vui lòng thử lại!";

            toast.error(message);
            console.error(error);

        } finally {
            setLoading(false)
        }
    }
    function handleCloseForm(){
    setOpenFormPassword(false)
    }
    const handleUpdatePassword =async()=>{
        try{
        const response = await api.put(`/users/pwd/${user.userId}`,formPassword)
        toast.success(response.message)
        }catch(error){
            const message =
                error.response?.data?.message ||
                error.message ||
                "Đã xảy ra lỗi, vui lòng thử lại!";

            toast.error(message);
            console.error(error);
        }
        setOpenFormPassword(false);
    }
    return (<>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div
                className="bg-white shadow-lg rounded-2xl w-[800px] max-w-full p-8"
            >
                <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Thông tin cá nhân
                </h1>

                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-24 h-24">
                        <img
                            alt="Avatar"
                            src={userInfo.avatar || "/default-avatar.png"}
                            className="w-24 h-24 rounded-full object-cover border"
                        />
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            disabled={!isEdit}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>
                    <p className="text-gray-500 text-sm mt-2">Nhấn vào ảnh để thay đổi</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Họ</label>
                        <input
                            type="text"
                            name="firstName"
                            value={userInfo.firstName}
                            onChange={handleChange}
                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                            disabled={!isEdit}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tên</label>
                        <input
                            type="text"
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleChange}
                            disabled={!isEdit}
                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            disabled={true}
                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleChange}
                            disabled={!isEdit}
                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-4">

                    <div className="relative">
                        <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value="********"
                            disabled={true}
                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 "
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-2/3 -translate-y-1/2 text-blue-500 text-sm font-medium hover:underline"
                            onClick={()=>setOpenFormPassword(true)}
                        >
                            Đổi mật khẩu
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={userInfo.dateOfBirth || ""}
                            onChange={handleChange}
                            disabled={!isEdit}
                            className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                </div>

                {!isEdit && (
                    <div className="text-center">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-full transition-all duration-300"
                            onClick={() => setIsEdit(true)}>Chỉnh sửa</button>
                    </div>)}
                {isEdit && (
                    <div className="text-center ">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-8 w-34 rounded-full transition-all duration-300"
                            onClick={() => setIsEdit(false)}>Hủy</button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 w-34 rounded-full transition-all duration-300 ml-4"
                            onClick={() => handleSubmit()}
                        >
                            {loading ? "Đang chỉnh sửa" : "Xác nhận"}
                        </button>
                    </div>)}

            </div>
            
            {openFormPassword && (<ModelForm title="Đổi mật khẩu" onClose={handleCloseForm}>
            <div>
        <label className="block text-sm font-medium mb-1">Mật khẩu cũ</label>
        <input
          type="password"
          name="password"
          value={formPassword.password}
          onChange={handleChangeFormPassword}
          required
          className="w-full border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mật khẩu mới</label>
        <input
          type="password"
          name="passwordnew1"
          value={formPassword.passwordnew1}
          onChange={handleChangeFormPassword}
          required
          className="w-full border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Xác nhận mật khẩu mới</label>
        <input
          type="password"
          name="passwordnew2"
          value={formPassword.passwordnew2}
          onChange={handleChangeFormPassword}
          required
          className="w-full border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="text-right mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all"
            onClick={()=> handleUpdatePassword()}
        >
          Lưu
        </button>
      </div>
            </ModelForm>)}
        </div>
    </>)
}