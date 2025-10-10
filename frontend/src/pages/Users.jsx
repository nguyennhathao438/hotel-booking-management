import { CloudDownloadIcon,SettingsIcon, SearchIcon,Trash2Icon} from "lucide-react";
import { useEffect, useState } from "react";
import ModelForm from "../components/FormModel";
import api from "../api";
import toast from "react-hot-toast";
import UserEdit from "../components/UserEdit";
import UserBan from "../components/UserBan";
export default function Users(){
    const [userSelected,setUserSelected] = useState({
        id: "",
        firstName : "",
        lastName : "",
        email : "",
        phone : "",
        dateOfBirth: "",
        avatar: "",
        roles: [],
    });
    const [userList,setUserList] = useState([]);
    const [userListSearch,setUserListSearch] = useState([]);
    const [roleList,setRoleList] = useState([]);
    const [openFormEdit,setOpenFormEdit] = useState(false);
    const [openFormBan,setOpenFormBan] = useState(false);
    const [selectUserId,setSelectUserId] = useState(null);
    const handleCloseFormEdit = () => {
        setOpenFormEdit(false);
        setOpenFormBan(false);
    }
    const handleGetUser = (userEmail) => {
        setOpenFormEdit(true);
        const user = userList.find((users) => users.email == userEmail);
        setUserSelected(user);
    }
    const handleGetUserBan = () => {
        const user = userList.find(u => u.id === selectUserId);
        if (!user) {
        toast.error("Vui lòng chọn user trước khi ban");
        return;
    }
    setUserSelected(user);
    setOpenFormBan(true);
    }
    const handleBanUser = async () => {
        setOpenFormBan(false);
        try {
            await api.put(`/users/delete/${userSelected.id}`,
                {
                    status : userSelected.status,
                }
            )
            const response = await api.get("/users");
            const usersWithFullName = response.data.result.map((userSelected) => ({
                ...userSelected,
                fullName: `${userSelected.firstName || ""} ${userSelected.lastName || ""}`.trim(),
            }));
            setUserList(usersWithFullName);
            setUserListSearch(usersWithFullName);
        toast.success("Cập nhật vai trò thành công")
        }catch(error){
            toast.error(error.response?.data?.message || error.message || "Lỗi không xác định")
        }
    }
    const handleUpdateUser = async () => {
        setOpenFormEdit(false);
        try{
            await api.put(`/users/${userSelected.id}`,
            {
                firstName : userSelected.firstName,
                lastName : userSelected.lastName,
                phone : userSelected.phone,
                dateOfBirth : userSelected.dateOfBirth,
                avatar : userSelected.avatar,
                roles : userSelected.roles.map(r => r.name),
            }
        )
        const response = await api.get("/users");
        const usersWithFullName = response.data.result.map((userSelected) => ({
                ...userSelected,
                fullName: `${userSelected.firstName || ""} ${userSelected.lastName || ""}`.trim(),
            }));
            setUserList(usersWithFullName);
            setUserListSearch(usersWithFullName);
        toast.success("Cập nhật vai trò thành công")
        }catch(error){
            toast.error(error.response?.data?.message || error.message || "Lỗi không xác định")
        }
    }
    const handleChangeForm = (e) =>{ 
        const {name , value } = e.target;
        setUserSelected((prev) =>({
            ...prev,
            [name]: value
        }));
    }
    const handleSearch = (e) => {
    const searchValue = e.toLowerCase();
   
    const list = userList.filter((p) =>
      p.fullName?.toLowerCase().includes(searchValue) ||
      p.email?.toLowerCase().includes(searchValue) ||
      p.phone?.toLowerCase().includes(searchValue) ||
      p.dateOfBirth?.toLowerCase().includes(searchValue) ||
      (Array.isArray(p.roles) &&
        p.roles.some((r) =>
          r.name?.toLowerCase().includes(searchValue)
        ))
    );
        setUserListSearch(list);
    }
                {/*Lấy dữ liệu của role set vao checkbox nếu có*/}

    const handleRoleCheckbox = (roleName) => {
        setUserSelected((prev) => {
            if(!prev) return prev;

            const hasRole = prev.roles?.some((r) => r.name === roleName);
            let newRoles;
            if(hasRole) {
                newRoles = prev.roles.filter((r) => r.name !== roleName);
            } else {
                newRoles = [...(prev.roles || []), {name : roleName}];
            }

            return{...prev, roles: newRoles};
        });
    };
    useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await api.get("/users");
            const usersWithFullName = response.data.result.map((userSelected) => ({
                ...userSelected,
                fullName: `${userSelected.firstName || ""} ${userSelected.lastName || ""}`.trim(),
            }));
            setUserList(usersWithFullName);
            setUserListSearch(usersWithFullName);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách người dùng:", error);
        }
    };
    const fetchRole = async () => {
        try {
            const response = await api.get("/role");
            setRoleList(response.data.result);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách role",error);
        }
    };
    fetchRole();
    fetchUser();
}, []);

    return(
        <>
        <div className="bg-gray-300 ml-[300px]">
            <div className="m-5 flex items-center justify-between bg-gray-100 px-6 py-4 w-[1200px] ">
                <div>
                    <h2 className="text-2xl font-semibold">User List</h2>
                    <p className="text-sm text-gray-500">You have total {userList.length} users.</p>
                </div>

                <div className="flex justify-between items-center space-x-6">
                    <button className="flex text-white bg-blue-400 hover:bg-white hover:text-black w-auto p-2 space-x-2">
                        <CloudDownloadIcon/>
                        <p>Export</p>
                    </button>
                    <button className="bg-blue-400 p-2 text-white hover:opacity-90" onClick={() => handleGetUserBan()}>
                        <Trash2Icon/>
                    </button>
                </div>
            </div>
            <div className="m-5 bg-white">
                <div className="mb-2 ml-4 min-w-full flex space-x-1">
                    <h2 className="text-md font-semibold text-gray-800 mt-4">Tìm kiếm:</h2>
                    <input
                    type="text"
                    placeholder="Search user..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="mt-2 border border-gray-200 rounded-md px-3 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-black"/>
                    <SearchIcon className="mt-4"/>
                </div>
                <table className="min-w-full border-collapse border border-white">
                    <thead className="font-semibold border-b">                   
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
                    ) : userListSearch.map((userList,id) => (
                    <tr key={id}  onClick={() => setSelectUserId(userList.id)} // cũng có thể cho phép click vào dòng
                        className={`border-b transition ${
                            selectUserId === userList.id
                            ? "bg-blue-100" // màu nền khi chọn
                            : "hover:bg-gray-100"
                        }`}>
                        <td className="py-3 px-6">{userList.fullName}</td>

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
                            <span className="bg-green-300 font-medium px-2 py-2 rounded-lg">Active</span>
                        ) : (
                            <span className="bg-red-600 font font-medium px-2 py-2 rounded-lg">Banned</span>
                        )}
                        </td>
                        <td className="py-3 px-6">
                        <button className="text-blue-500 hover:text-blue-700 font-medium" onClick={() => handleGetUser(userList.email)}>Edit</button>
                        </td>
                    </tr>
                    ))}
                    
                    </tbody>
                </table>
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Previous</button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">1</button>
                    <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">2</button>
                    <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Next</button>
                </div> 
            </div>
        </div> 
                    {/*EditUser*/}

            {openFormEdit && <ModelForm title="Cập nhật user" width = "w-auto" onClose={() => handleCloseFormEdit()}>
                <UserEdit label = "Enter firstName" placeholder= "Nhập đầy đủ họ tên" onChange={handleChangeForm} name="firstName" value={userSelected.firstName}/>
                <UserEdit label = "Enter lastName:" placeholder = "Nhập đầy đủ họ tên" onChange={handleChangeForm} name="lastName" value={userSelected.lastName}/>
                <UserEdit label = "Enter Phone:" placeholder = "Nhập số điện thoại" type="tel" onChange={handleChangeForm} name="phone" value={userSelected.phone}/>
                <UserEdit label = "Enter Birth:" placeholder = "Nhập ngày sinh" type="date" onChange={handleChangeForm} name="dateOfBirth" value={userSelected.dateOfBirth}/>
                <div>
                    <table className="min-w-full border-collapse table-auto">
                        <colgroup>
                                <col className="w-1/2" /> 
                                <col className="w-1/2" />
                        </colgroup>
                        <thead className="bg-gray-200 border-gray-500 border">
                        <tr>
                            <th className="px-6 py-3 border font-bold text-center">Role</th>
                            <th className="px-6 py-3 border font-bold text-center">Option</th>
                        </tr>
                        </thead>

                        <tbody>
                            {!roleList ? (
                                <div>Không có dữ liệu role</div>
                            ) : roleList.map((role,id) => (
                            <tr key={id} className= "border text-center" >
                                <td >{role.name}</td>
                                <td >
                                    <input type="checkbox" checked={userSelected.roles?.some((r) => r.name === role.name)} onChange={() => handleRoleCheckbox(role.name)}></input>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-max mx-auto mt-4 bg-blue-400 rounded-md px-1 py-2 hover:opacity-80">
                    <button onClick={() => handleUpdateUser()}>Xác nhận</button>
                </div>
            </ModelForm>}

            {/*BanUser*/}

            {openFormBan && <ModelForm title="Ban user" width = "w-auto" onClose={() => handleCloseFormEdit()}>
                <UserBan onConfirm = {() => handleBanUser()} onCancel={() => handleCloseFormEdit()}/>
            </ModelForm>}
    </>       
    );
}