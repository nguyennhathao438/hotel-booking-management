import { useState, useEffect } from "react";
import api from "../api";
import ModelForm from "../components/Common/FormModel";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { BrickWallShieldIcon, DeleteIcon, PencilIcon, PlusIcon, SettingsIcon, ShieldUserIcon } from "lucide-react/dist/cjs/lucide-react";
export default function PermissionManager() {
  // Các state cũ giữ nguyên
  const [roleList, setRoleList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [roleSelected, setRoleSelected] = useState();
  const [permissionList, setPermissionList] = useState([]);
  const [permissionListSearch, setPermissionListSearch] = useState([]);
  const [role, setRole] = useState({
    name: "",
    description: "",
  });
  const [openFormRole, setOpenFormRole] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 7;

  const [totalRole, setTotalRole] = useState(0);

  useEffect(() => {
    const fetchPermission = async () => {
      const response = await api.get("/permission");
      setPermissionList(response.data.result);
      setPermissionListSearch(response.data.result);
    };
    fetchPermission();
  }, []);
  const fetchRole = async (page = 0, size = itemsPerPage) => {
    try {
      const response = await api.get(`/role?page=${page}&size=${size}`);
      setRoleList(response.data.result.content);
      setTotalPages(response.data.result.totalPages);
      setTotalRole(response.data.result.totalElements);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Có lỗi xảy ra"
      );
    }
  };

  useEffect(() => {
    fetchRole(currentPage - 1, itemsPerPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setOpenFormRole(false);
    setPermissionListSearch(permissionList);
  };

  const handleGetRole = (roleName) => {
    setOpenForm(true);
    const role = roleList.find((roles) => roles.name === roleName);
    setRoleSelected(role);
  };

  const handleCheckbox = (permissionName) => {
    setRoleSelected((prev) => {
      if (!prev) return prev;
      const hasPermission = prev.permissions?.some(
        (p) => permissionName === p.name
      );
      let newPermission;
      if (hasPermission) {
        newPermission = prev.permissions.filter(
          (p) => p.name !== permissionName
        );
      } else {
        newPermission = [...prev.permissions, { name: permissionName }];
      }
      return { ...prev, permissions: newPermission };
    });
  };

  const handleUpdateRole = async () => {
    setOpenForm(false);
    try {
      await api.put(`/role/${roleSelected.name}`, {
        name: roleSelected.name,
        description: roleSelected.description,
        permission: roleSelected.permissions.map((p) => p.name),
      });
      fetchRole(currentPage - 1, itemsPerPage);
      toast.success("Cập nhật vai trò thành công");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Có lỗi xảy ra"
      );
    }
  };

  const handleDeleteRole = async (roleName) => {
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
      await api.delete(`/role/${roleName}`);
      toast.success("Xóa vai trò thành công");
      fetchRole(currentPage - 1, itemsPerPage);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi xóa vai trò"
      );
    }
  };

  const handleSearch = (e) => {
    const list = permissionList.filter(
      (p) =>
        p.name.toLowerCase().includes(e.toLowerCase()) ||
        p.description.toLowerCase().includes(e.toLowerCase())
    );
    setPermissionListSearch(list);
  };

  const handleAddRole = async () => {
    setOpenFormRole(false);
    try {
      await api.post("/role", {
        name: role.name,
        description: role.description,
        permission: [],
      });
      fetchRole(currentPage - 1, itemsPerPage);
      toast.success("Thêm vai trò thành công");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Có lỗi xảy ra"
      );
    }
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setRole((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="bg-gray-200 ml-[300px] p-8 w-full h-screen">
        <h1 className="text-center text-3xl font-bold mb-6">Phân quyền</h1>
        <div className="flex justify-start mb-5 space-x-6">
          <div className="bg-white p-4 rounded-lg pl-9 pr-9">
            <p>Tổng vai trò</p>
            <div className="text-blue-500 flex justify-center items-center space-x-0.5">
              <SettingsIcon className="w-5 h-5"/>
              <p>{totalRole}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
            <p>Vai trò hệ thống</p>
            <p className="text-yellow-500 space-x-0.5">
              <ShieldUserIcon className="w-5 h-5 inline"/>
              <span>9</span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg pl-9 pr-9 text-center">
            <p>Quyền hệ thống</p>
            <p className="text-blue-500 space-x-0.5">
            <BrickWallShieldIcon className="w-5 h-5 inline"/>
            <span>{permissionList.length}</span>
            </p>
          </div>
        </div>
        <div className="ml-2 mb-6">
          <button
            className="space-x-1 px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
            onClick={() => setOpenFormRole(true)}
          >
          <PlusIcon className="w-5 h-5 mb-1 inline"/>
            <span>Thêm vai trò</span>
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-5">
          <table className="min-w-full text-sm text-gray-700">
            <thead className=" bg-gray-300">
              <tr>
                <td className="px-4 py-2 font-bold text-center">Vai trò</td>
                <td className="px-4 py-2 font-bold text-center">Mô tả</td>
                <td className="px-4 py-2 font-bold text-center">Quyền</td>
                <td className="px-4 py-2 font-bold text-center">Chức năng</td>
              </tr>
            </thead>

            <tbody>
              {!roleList || roleList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                roleList.map((role, id) => (
                  <tr
                    key={id}
                    className="border-b hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-4 py-2 text-center border-b font-bold">
                      {role.name}
                    </td>
                    <td className="px-4 py-2 text-left border-b">
                      {role.description}
                    </td>
                    <td className="px-4 py-2 text-left border-b">
                      <ul className="list-disc list-inside">
                        {!role.permissions || role.permissions.length === 0 ? (
                          <li>Không có dữ liệu</li>
                        ) : (
                          role.permissions.map((permission, idx) => (
                            <li key={idx}>{permission.name}</li>
                          ))
                        )}
                      </ul>
                    </td>
                    <td className="px-4 py-2 text-center border-b">
                      <div className="flex justify-center gap-2">
                         <button
                          onClick={() => handleGetRole(role.name)}
                          className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-md flex items-center space-x-1 text-xs"
                          >
                          <PencilIcon size = {14}/>
                          <span>Sửa</span>
                          </button>
                          <button
                            onClick={() => handleDeleteRole(role.name)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex items-center space-x-1 text-xs"
                          >
                          <DeleteIcon size={14} />
                          <span>Xóa</span>
                          </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Phần phân trang */}
        <div className="flex justify-center mt-4 space-x-1 sm:space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-3 py-1 rounded-md text-sm ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Sau
          </button>
        </div>
      </div>
      {openForm && (
        <ModelForm
          title={"Chỉnh sửa"}
          width="w-auto"
          onClose={() => handleCloseForm()}
        >
          <div className="text-center">
            <span>Tên quyền : </span> {roleSelected.name}
          </div>
          <div className="text-center mb-4">
            <input
              type="text"
              className="px-6 py-1 rounded-full border "
              placeholder="Tìm kiếm"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="border rounded-md w-[600px] mb-4">
            <table className="min-w-full border-collapse table-auto border-gray-500">
              <colgroup>
                <col className="w-1/3" /> <col className="w-1/3" />
                <col className="w-1/3" />
              </colgroup>
              <thead className="bg-gray-200 border-gray-500 border">
                <tr>
                  <th className="px-4 py-2 border font-bold text-center">
                    Tên quyền
                  </th>
                  <th className="px-4 py-2 border font-bold text-center">
                    Mô tả
                  </th>
                  <th className="px-4 py-2 border font-bold text-center">
                    Lựa chọn
                  </th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[162px] overflow-y-auto">
              <table className="min-w-full border-collapse table-auto border-gray-500">
                <colgroup>
                  <col className="w-1/3" /> <col className="w-1/3" />
                  <col className="w-1/3" />
                </colgroup>
                <tbody>
                  {permissionListSearch ? (
                    permissionListSearch.map((permission, id) => (
                      <tr key={id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2 text-center">
                          {permission.name}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {permission.description}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600"
                            checked={roleSelected.permissions?.some(
                              (p) => p.name === permission.name
                            )}
                            onChange={() => handleCheckbox(permission.name)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center py-3">
                        Chưa có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center">
            <button
              className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
              onClick={() => handleUpdateRole()}
            >
              Xác nhận
            </button>
          </div>
        </ModelForm>
      )}
      {openFormRole && (
        <ModelForm
          title={"Thêm vai trò"}
          width="w-auto"
          onClose={() => handleCloseForm()}
        >
          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">
                Tên vai trò
              </label>
              <input
                type="text"
                className="px-4 py-2 border rounded-lg focus:outline-none "
                placeholder="Nhập tên vai trò"
                value={role.name}
                name="name"
                onChange={handleChangeForm}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-gray-700">Mô tả</label>
              <input
                type="text"
                name="description"
                className="px-4 py-2 border rounded-lg focus:outline-none "
                placeholder="Nhập mô tả"
                value={role.description}
                onChange={handleChangeForm}
              />
            </div>
            <div className="text-right">
              <button
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => handleAddRole()}
              >
                Thêm
              </button>
            </div>
          </div>
        </ModelForm>
      )}
    </>
  );
}
