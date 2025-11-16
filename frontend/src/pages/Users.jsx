import {
  SearchIcon,
  User2Icon,
  PhoneIcon,
  CakeIcon,
  UserStarIcon,
  DeleteIcon,
  EyeIcon,
  UserPenIcon,
  UserMinusIcon,
  ContactIcon,
  UserRoundCheckIcon,
  UserRoundXIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ModelForm from "../components/Common/FormModel";
import api from "../api";
import toast from "react-hot-toast";
import UserEdit from "../components/UserEdit";
import { useSearchParams } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const userSchema = z.object({
    firstName: z.string().min(1, "Họ không được để trống"),
    lastName: z.string().min(1, "Tên không được để trống"),
    phone: z.string().regex(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
    dateOfBirth: z.string().min(1, "Ngày sinh không được để trống"),
  })
export default function Users() {
  const [userSelected, setUserSelected] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    avatar: "",
    roles: [],
  });
  const [userList, setUserList] = useState([]);
  const [userListSearch, setUserListSearch] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [openFormEdit, setOpenFormEdit] = useState(false);
  const [openFormView, setOpenFormView] = useState(false);
  const [selectUserId, setSelectUserId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNo, setPageNo] = useState(Number(searchParams.get("page")) || 1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
  },
});

  const handleCloseFormEdit = () => {
    setOpenFormEdit(false);
  };
  const handleGetUser = (userEmail,action) => {
    if(action === "Edit"){
      setOpenFormEdit(true);
    } else if(action === "View"){
      setOpenFormView(true);
    }
    const user = userListSearch.find((users) => users.email == userEmail);
    setUserSelected(user);
  };

  const handleBanUser = async () => {
    setOpenFormEdit(false);
    try {
      const newStatus = userSelected.status === 1 ? 0 : 1;
      await api.put(`/users/delete/${userSelected.id}`, { status: newStatus });

      setUserListSearch((prev) =>
        prev.map((u) =>
          u.id === userSelected.id ? { ...u, status: newStatus } : u
        )
      );
      await fetchUserPage();
      fetchUser();
      toast.success(newStatus === 1 ? "Đã ban user" : "Đã gỡ ban user");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi cập nhật trạng thái user"
      );
    }
  };
  const handleUpdateUser = async (data) => {
    console.log("Na")
    try {
      await api.put(`/users/${userSelected.id}`, {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        avatar: userSelected.avatar,
        roles: userSelected.roles.map((r) => r.name),
      });
      fetchUserPage();
      toast.success("Cập nhật vai trò thành công");
      setOpenFormEdit(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Lỗi không xác định"
      );
    }
  };

  const handleRoleCheckbox = (roleName) => {
    setUserSelected((prev) => {
      if (!prev) return prev;

      const hasRole = prev.roles?.some((r) => r.name === roleName);
      let newRoles;
      if (hasRole) {
        newRoles = prev.roles.filter((r) => r.name !== roleName);
      } else {
        newRoles = [...(prev.roles || []), { name: roleName }];
      }

      return { ...prev, roles: newRoles };
    });
  };
  const fetchUserPage = async () => {
    try {
      const response = await api.get(
        `/users/get-page?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`
      );
      const pageData = response.data.result;
      const usersWithFullName = pageData.content.map((user) => ({
        ...user,
        roles: user.roles.map((r) => (typeof r === "string" ? { name: r } : r)), // ✅ chuẩn hóa lại roles
      }));
      setUserListSearch(usersWithFullName);
      setTotalPages(pageData.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };
  const fetchUser = async () => {
    try {
      const response = await api.get("/users");
      const usersWithFullName = response.data.result.map((userSelected) => ({
        ...userSelected,
        fullName: `${userSelected.firstName || ""} ${
          userSelected.lastName || ""
        }`.trim(),
      }));
      setUserList(usersWithFullName);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };
  const fetchRole = async () => {
    try {
      const response = await api.get("/role", {
        params: {
          size: 100,
        },
      });
      setRoleList(response.data.result.content);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách role", error);
    }
  };
  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/users/${userId}`);
      const response = await api.get(
        `/users/get-page?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`
      );
      const pageData = response.data.result;
      const usersWithFullName = pageData.content.map((user) => ({
        ...user,
        roles: user.roles.map((r) => (typeof r === "string" ? { name: r } : r)),
      }));
      setUserListSearch(usersWithFullName);
      setUserList(usersWithFullName);
      toast.success("Xóa user thành công");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi xóa user"
      );
    }
  };
  useEffect(() => {
    fetchRole();
    fetchUser();
  }, []);
  useEffect(() => {
    const params = {};
    params.page = pageNo;
    if (keyword.trim()) params.keyword = keyword;
    setSearchParams(params);
  }, [pageNo, keyword]);
  useEffect(() => {
    fetchUserPage();
  }, [pageNo, keyword]);
  useEffect(() => {
  reset({
    firstName: userSelected.firstName || "",
    lastName: userSelected.lastName || "",
    phone: userSelected.phone || "",
    dateOfBirth: userSelected.dateOfBirth || "",
  });
  }, [userSelected, reset]);
  const handleSearchKey = (e) => {
  if (e.key === "Enter") {
    setKeyword(e.target.value); 
  }
};

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPageNo(newPage);
  };
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen w-full ml-[75px] md:ml-[300px]">
        <div className="flex">
          <User2Icon size={30} />
          <h1 className="text-2xl font-bold mb-6">Quản lý User</h1>
        </div>
        <div className="flex justify-start mb-5 space-x-6">
          <div className="bg-white p-4 rounded-lg pl-9 pr-9">
            <p>Số tài khoản</p>
            <div className="flex justify-center items-center space-x-1">
              <ContactIcon className="w-5 h-5 text-blue-500"/>
              <p className="text-blue-500">{userList.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
            <p>Chủ khách sạn</p>
            <p className="text-yellow-500 space-x-1">
              <UserStarIcon className="w-5 h-5 inline"/>
              <span>
                {
                userList.filter(
                  (user) =>
                    user.roles &&
                    user.roles.some(
                      (role) => role.name.toLowerCase() === "customer"
                    )
                ).length
              }
              </span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
            <p>Đang hoạt động</p>
            <p className="text-emerald-600 space-x-0.5">
              <UserRoundCheckIcon className="w-5 h-5 inline"/>
              <span>{userList.filter((user) => user.status === 0).length}</span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
            <p>Đang bị ban</p>
            <p className="text-red-500 space-x-0.5">
              <UserRoundXIcon className="w-5 h-5 inline"/>
              <span>{userList.filter((user) => user.status === 1).length}</span>
            </p>
          </div>
        </div>
        <div className="m-5 bg-white ">
          <div className="relative ml-4 min-w-full flex gap-4 p-1">
            <h2 className="text-md font-semibold text-gray-800 mt-2">
              Tìm kiếm:
            </h2>
            <input
              type="text"
              placeholder="Search user..."
              defaultValue={keyword}
              onKeyDown={handleSearchKey}
              className=" border border-gray-200 rounded-md px-7 py-2 w-[250px] md:w-[350px] sm:w-[300px] lg:w-[550px] focus:outline-none focus:ring-2 focus:ring-black"
            />
            <SearchIcon className="absolute w-4 h-4 font-light sm:top-4 sm:left-24 md:top-4 md:left-24 top-4 left-24" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-x-auto mt-5">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-200 text-gray-800 text-center">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6 ">Email</th>
                <th className="py-3 px-6 ">Status</th>
                <th className="py-3 px-6 ">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {!userListSearch ? (
                <div>không có dữ liệu</div>
              ) : (
                userListSearch.map((userList, id) => (
                  <tr
                    key={id}
                    onClick={() => setSelectUserId(userList.id)} // cũng có thể cho phép click vào dòng
                    className={`border-b transition ${
                      selectUserId === userList.id
                        ? "bg-blue-100" 
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <td className="py-3 px-6">{`${userList.firstName} ${userList.lastName}`}</td>
                    <td className="py-3 px-6">{userList.email}</td>
                    <td className="py-3 px-6">
                      {userList.status === 0 ? (
                        <span className="bg-green-300 font-medium px-2 py-2 rounded-lg">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-600 font font-medium px-2 py-2 rounded-lg">
                          Banned
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                        className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-md flex items-center space-x-1 text-xs"
                        onClick={() => handleGetUser(userList.email , "Edit")}
                      >
                      <UserPenIcon size = {14}/>
                        <span>sửa</span>
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center space-x-1 text-xs"
                        onClick={() => handleDelete(userList.id)}
                      >
                      <UserMinusIcon size={14} />
                      <span>Xóa</span>
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md flex items-center space-x-1 text-xs"
                        onClick={() => handleGetUser(userList.email , "View")}
                      >
                      <EyeIcon size={14} />
                        <span>Xem chi tiết</span>
                      </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(pageNo - 1)}
            className={`px-3 py-1 rounded-md ${
              pageNo === 1
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {" "}
            Trước
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded ${
                pageNo === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(pageNo + 1)}
            className={`px-3 py-1 rounded-md ${
              pageNo === totalPages
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Sau
          </button>
        </div>
      </div>
      {/*EditUser*/}

      {openFormEdit && (
      <ModelForm
        title="Cập nhật thông tin user"
        width="w-[700px]" // rộng hơn một chút để chia 2 cột
        onClose={() => handleCloseFormEdit()}
      >
      <form onSubmit={handleSubmit(handleUpdateUser)} className="bg-white p-4 rounded-lg shadow-sm">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          {/* Nhóm input 2 cột */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
            <UserEdit
              label="Họ:"
              placeholder="Nhập họ"
              registerName="firstName" 
              register={register} 
              error={errors.firstName}
            />
            <UserEdit
              label="Số điện thoại:"
              placeholder="Nhập số điện thoại"
              type="tel"
              registerName="phone"
              register={register} 
              error={errors.phone}
            />
            <UserEdit
              label="Tên:"
              placeholder="Nhập tên"
              registerName="lastName" 
              register={register} 
              error={errors.lastName}
            />
            <UserEdit
              label="Ngày sinh:"
              placeholder="Nhập ngày sinh"
              type="date"
              registerName="dateOfBirth" 
              register={register} 
              error={errors.dateOfBirth}
            />
          </div>

          {/* Bảng role */}
          <div className="mt-4">
            <p className="text-lg font-semibold mb-2 text-gray-700">Vai trò người dùng</p>
            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-[200px] overflow-y-auto">
                <table className="w-full border-collapse table-auto">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-2 border text-left font-medium text-gray-700">Role</th>
                      <th className="px-4 py-2 border text-center font-medium text-gray-700">Chọn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!roleList || roleList.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="text-center py-3 text-gray-500 italic">
                          Không có dữ liệu role
                        </td>
                      </tr>
                    ) : (
                      roleList.map((role, id) => (
                        <tr
                          key={id}
                          className="border-t hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-4 py-2 text-gray-700">{role.name}</td>
                          <td className="px-4 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={userSelected.roles?.some((r) => r.name === role.name)}
                              onChange={() => handleRoleCheckbox(role.name)}
                              className="w-5 h-5 accent-blue-500 cursor-pointer"
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6 py-2 transition"
            >
              Xác nhận
            </button>
            <button
              className={`${
                userSelected.status === 1
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              } text-white font-medium rounded-lg px-6 py-2 transition`}
              onClick={() => handleBanUser()}
            >
              {userSelected.status === 1 ? "UnBan" : "Ban"}
            </button>
          </div>
        </div>
        </form>
      </ModelForm>
    )}


      {/*ViewUser*/}
      {openFormView && userSelected && (
      <ModelForm
        title="Xem chi tiết thông tin user"
        width="w-[450px]" 
        onClose={() => setOpenFormView(false)}
      >
        <div className="p-4 bg-white rounded-lg">
          <div className="flex flex-col items-center mb-4">
            <img
              src={userSelected.avatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-400 shadow-md mb-3"
            />
            <h2 className="text-xl font-semibold text-gray-800">{`${userSelected.firstName} ${userSelected.lastName}`}</h2>
            <p className="text-gray-500 text-sm">{userSelected.email}</p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700"><PhoneIcon className="inline w-5 h-5 text-red-500"/> Số điện thoại:</span>
              <span className="text-gray-600">{userSelected.phone || "—"}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-700"><CakeIcon className="inline w-5 h-5 text-cyan-600"/> Ngày sinh:</span>
              <span className="text-gray-600">{userSelected.dateOfBirth || "—"}</span>
            </div>

            <div className="flex flex-col">
              <span className="font-medium text-gray-700 mb-1"><UserStarIcon className="inline w-5 h-5 text-fuchsia-800"/> Vai trò:</span>
              {userSelected.roles && userSelected.roles.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userSelected.roles.map((r, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                    >
                      {r.name}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-600 italic">Không có vai trò</span>
              )}
            </div>
          </div>
        </div>
      </ModelForm>
    )}

    </>
  );
}
