import {
  CloudDownloadIcon,
  SettingsIcon,
  SearchIcon,
  Trash2Icon,
  User2Icon,
} from "lucide-react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ModelForm from "../components/Common/FormModel";
import api from "../api";
import toast from "react-hot-toast";
import UserEdit from "../components/UserEdit";
import { useSearchParams } from "react-router-dom";
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
  const [selectUserId, setSelectUserId] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNo, setPageNo] = useState(Number(searchParams.get("page")) || 1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const handleCloseFormEdit = () => {
    setOpenFormEdit(false);
  };
  const handleGetUser = (userEmail) => {
    setOpenFormEdit(true);
    const user = userListSearch.find((users) => users.email == userEmail);
    setUserSelected(user);
  };

  const handleBanUser = async () => {
    setOpenFormEdit(false);
    try {
      // Đảo trạng thái hiện tại (0 -> 1 hoặc 1 -> 0)
      const newStatus = userSelected.status === 1 ? 0 : 1;

      // Gửi request cập nhật
      await api.put(`/users/delete/${userSelected.id}`, { status: newStatus });

      // Cập nhật local UI

      setUserListSearch((prev) =>
        prev.map((u) =>
          u.id === userSelected.id ? { ...u, status: newStatus } : u
        )
      );
      await fetchUserPage();
      toast.success(newStatus === 1 ? "Đã ban user" : "Đã gỡ ban user");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi cập nhật trạng thái user"
      );
    }
  };
  const handleUpdateUser = async () => {
    setOpenFormEdit(false);
    try {
      await api.put(`/users/${userSelected.id}`, {
        firstName: userSelected.firstName,
        lastName: userSelected.lastName,
        phone: userSelected.phone,
        dateOfBirth: userSelected.dateOfBirth,
        avatar: userSelected.avatar,
        roles: userSelected.roles.map((r) => r.name),
      });
      const response = await api.get(
        `/users/get-page?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`
      );
      const pageData = response.data.result;
      const usersWithFullName = pageData.content.map((user) => ({
        ...user,
        roles: user.roles.map((r) => (typeof r === "string" ? { name: r } : r)),
      }));
      setUserListSearch(usersWithFullName);
      toast.success("Cập nhật vai trò thành công");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Lỗi không xác định"
      );
    }
  };
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setUserSelected((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      console.log("bug1" + response.data.result);
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

  const handleSearch = (e) => setKeyword(e.target.value);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPageNo(newPage);
  };
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen w-full ml-[300px]">
        <div className="flex">
          <User2Icon size={30} />
          <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>
        </div>
        <div className="flex justify-start mb-5 space-x-6">
          <div className="bg-white p-4 rounded-lg pl-9 pr-9">
            <p>Số tài khoản</p>
            <div className="flex justify-center items-center space-x-1">
              <p className="text-blue-500">{userList.length}</p>
            </div>
            {console.log(userList)}
          </div>
          <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
            <p>Chủ khách sạn</p>
            <p className="text-yellow-500">
              {
                userList.filter(
                  (user) =>
                    user.roles &&
                    user.roles.some(
                      (role) => role.name.toLowerCase() === "customer"
                    )
                ).length
              }
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
            <p>Đang hoạt động</p>
            <p className="text-blue-500">
              {userList.filter((user) => user.status === 0).length}
            </p>
          </div>
        </div>
        <div className="m-5 bg-white">
          <div className="mb-2 ml-4 min-w-full flex space-x-1">
            <h2 className="text-md font-semibold text-gray-800 mt-4">
              Tìm kiếm:
            </h2>
            <input
              type="text"
              placeholder="Search user..."
              value={keyword}
              onChange={handleSearch}
              className="mt-2 border border-gray-200 rounded-md px-3 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <SearchIcon className="mt-4" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-5">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-200 text-gray-800 text-left">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Avatar</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {!userListSearch ? (
                <div>không có dữ liệu</div>
              ) : (
                userListSearch.map((userList, id) => (
                  <tr
                    key={id}
                    onClick={() => setSelectUserId(userList.id)} // cũng có thể cho phép click vào dòng
                    className={`border-b transition ${
                      selectUserId === userList.id
                        ? "bg-blue-100" // màu nền khi chọn
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <td className="py-3 px-6">{`${userList.firstName} ${userList.lastName}`}</td>

                    <td className="py-3 px-6">{userList.email}</td>
                    <td className="py-3 px-6">{userList.phone}</td>
                    <td className="py-3 px-6">{userList.dateOfBirth}</td>
                    <td className="py-3 px-6">
                      <img>{userList.img}</img>
                    </td>
                    <td className="text-left">
                      {userList.roles && userList.roles.length > 0
                        ? userList.roles.map((r) => r.name).join(", ")
                        : "Không có vai trò"}
                    </td>
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
                    <td className="py-3 px-6">
                      <button
                        className="text-blue-500 hover:text-blue-700 font-medium"
                        onClick={() => handleGetUser(userList.email)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700 font-medium"
                        onClick={() => handleDelete(userList.id)}
                      >
                        Delete
                      </button>
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
            Previous
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
            Next
          </button>
        </div>
      </div>
      {/*EditUser*/}

      {openFormEdit && (
        <ModelForm
          title="Cập nhật user"
          width="w-auto"
          onClose={() => handleCloseFormEdit()}
        >
          <UserEdit
            label="Enter firstName"
            placeholder="Nhập đầy đủ họ tên"
            onChange={handleChangeForm}
            name="firstName"
            value={userSelected.firstName}
          />
          <UserEdit
            label="Enter lastName:"
            placeholder="Nhập đầy đủ họ tên"
            onChange={handleChangeForm}
            name="lastName"
            value={userSelected.lastName}
          />
          <UserEdit
            label="Enter Phone:"
            placeholder="Nhập số điện thoại"
            type="tel"
            onChange={handleChangeForm}
            name="phone"
            value={userSelected.phone}
          />
          <UserEdit
            label="Enter Birth:"
            placeholder="Nhập ngày sinh"
            type="date"
            onChange={handleChangeForm}
            name="dateOfBirth"
            value={userSelected.dateOfBirth}
          />
          <div>
            <table className="min-w-full border-collapse table-auto">
              <colgroup>
                <col className="w-1/2" />
                <col className="w-1/2" />
              </colgroup>
              <thead className="bg-gray-200 border-gray-500 border">
                <tr>
                  <th className="px-6 py-3 border font-bold text-center">
                    Role
                  </th>
                  <th className="px-6 py-3 border font-bold text-center">
                    Option
                  </th>
                </tr>
              </thead>

              <tbody>
                {!roleList ? (
                  <div>Không có dữ liệu role</div>
                ) : (
                  roleList.map((role, id) => (
                    <tr key={id} className="border text-center">
                      <td>{role.name}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={userSelected.roles?.some(
                            (r) => r.name === role.name
                          )}
                          onChange={() => handleRoleCheckbox(role.name)}
                        ></input>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center px-30 mt-4">
            <button
              className="w-max mx-auto mt-4 bg-blue-400 rounded-md px-1 py-2 hover:opacity-80 space-x-3"
              onClick={() => handleUpdateUser()}
            >
              Xác nhận
            </button>
            <button
              className="w-[100px] mx-auto mt-4 bg-red-400 rounded-md px-1 py-2 hover:opacity-80"
              onClick={() => handleBanUser()}
            >
              {userSelected.status === 1 ? "UnBanned" : "Ban"}
            </button>
          </div>
        </ModelForm>
      )}
    </>
  );
}
