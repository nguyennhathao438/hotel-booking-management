import { useState } from "react"
import api from "../api";
import toast from "react-hot-toast";
export default function Register() {
    
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
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
        const response = await api.post("/users/register",formData);
        toast.success("Đăng ký thành công");
        console.log(response);
        }catch(error){ 
            if (error.response && error.response.data) {
            toast.error(error.response.data.message);
        } else {
            toast.error("Lỗi kết nối server ")
        }
        }

    }
    return (<>
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white shadow-lg rounded-lg flex w-[800px] max-w-full overflow-hidden">
                <div className="flex items-center justify-center w-1/2 bg-gray-50 p-8">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                        alt="Login Illustration"
                        className="w-40 h-40"
                    />
                </div>
                <div className="w-1/2 p-8">
                    <h2 className="font-bold text-2xl mb-8">Member register</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex">
                            <input type="text"
                                name="firstName"
                                placeholder="Họ"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-1/2 bg-gray-100 rounded-full py-2 px-3 items-center mr-3 focus:outline-none"
                                required
                            />
                            <input type="text"
                                name="lastName"
                                placeholder="Tên"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-1/2 bg-gray-100 rounded-full px-3 py-2 items-center focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-1 bg-transparent focus:outline-none "
                            />
                        </div>
                        <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full">
                            <input
                                type="password"
                                name="password"
                                placeholder="Mật khẩu"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-1 bg-transparent focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center px-3 py-2 bg-gray-100 rounded-full">
                            <input
                                type="password"
                                name="password2"
                                placeholder="Xác nhận mật khẩu"
                                value={formData.password2}
                                onChange={handleChange}
                                className="w-full px-3 py-1 bg-transparent focus:outline-none"
                            />
                        </div>
                        <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-[200px] rounded-full py-2 font-semibold !bg-green-400  hover:text-white"
                        >
                            Đăng ký
                        </button>
                        </div>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-700 ">
                        Quay lại trang

                        <a href="/login" className="font-semibold text-blue-600 hover:underline ml-1">
                            Đăng nhập
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </>)
}