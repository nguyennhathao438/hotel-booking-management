import { useState, useEffect } from "react"
import api from "../api";
import ModelForm from "../components/FormModel";
import toast from "react-hot-toast";
export default function PermissionManager() {
    const [roleList, setRoleList] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [roleSelected, setRoleSelected] = useState();
    const [permissionList,setPermissionList] = useState([]);
    const [permissionListSearch,setPermissionListSearch] = useState([]);
    const [role,setRole] = useState({
        name : "",
        description : "",
    });
    const [openFormRole,setOpenFormRole] = useState(false);
    useEffect(() => {
        const fetchRole = async () => {
            const response = await api.get("/role")
            setRoleList(response.data.result);
        }
        const fetchPermission =async () =>{
            const response = await api.get("/permission")
            setPermissionList(response.data.result);
            setPermissionListSearch(response.data.result);
        }
        fetchRole();
        fetchPermission();
    }, [])
    const handleCloseForm = () => {
        setOpenForm(false);
        setOpenFormRole(false);
    }
    const handleGetRole = (roleName) => {
        setOpenForm(true);
        const role = roleList.find((roles) => roles.name == roleName);
        setRoleSelected(role)
    }
    //Hàm toggle checbox
    const handleCheckbox = (permissionName) =>{
        setRoleSelected((prev) =>{
            if(!prev) return prev;
            const hasPermission = prev.permissions?.some((p) => permissionName === p.name)
            let newPermission
            if(hasPermission){ 
                newPermission = prev.permissions.filter((p) => p.name !== permissionName);
            }else {
                newPermission = [...prev.permissions , { name: permissionName }];
        }
        return { ...prev, permissions: newPermission };
        })
    }
    const handleUpdateRole = async () =>{ 
        setOpenForm(false);
        try{
            await api.put(`/role/${roleSelected.name}`,
            {
                name : roleSelected.name,
                description :roleSelected.description,
                permission : roleSelected.permissions.map(p => p.name),
            }
        )
        const res = await api.get("/role")
            setRoleList(res.data.result);
        toast.success("Cập nhật vai trò thành công")
        }catch(error){
            toast.error(error)
        }
        
    }
    const handleSearch = (e) =>{
            const list = permissionList.filter((p)=> p.name.toLowerCase().includes(e.toLowerCase()) || 
                                                    p.description.toLowerCase().includes(e.toLowerCase()) )
            setPermissionListSearch(list);
    }
    const handleAddRole = async () =>{ 
        setOpenFormRole(false);
        console.log(role)
        try{
            const response = await api.post("/role",{
                name :role.name,
                description :role.description,
                permission: [],
            })
        console.log(response);
            const res = await api.get("/role")
            setRoleList(res.data.result);
            toast.success("Thêm vai trò thành công")
        }catch(error){
            toast.error(error?.response?.data?.message || error.message || "Có lỗi xảy ra");
        }
        
    }
    const handleChangeForm = (e) =>{ 
        const {name , value } = e.target;
        setRole((prev) =>({
            ...prev,[name]: value
        }));
    }
    return (
        <>
            <div className="bg-gray-300 ml-[300px] p-8 w-full h-screen">
                <h1 className="text-center text-3xl font-bold mb-6">Phân quyền</h1>
                <div className="ml-2 mb-6"><button className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700" onClick={() => setOpenFormRole(true)}>Thêm vai trò </button></div>
                <div className="rounded-md border">
                    <table className=" min-w-full border-collapse table-auto border-gray-500 ">
                        <thead className="border-gray-500 border">
                            <tr>
                                <td className="px-4 py-2 border font-bold text-center">Vai trò</td>
                                <td className="px-4 py-2 border font-bold text-center">Mô tả</td>
                                <td className="px-4 py-2 border font-bold text-center">Quyền</td>
                                <td className="px-4 py-2 border font-bold text-center">Chức năng</td>
                            </tr>
                        </thead>

                        <tbody>
                            {!roleList ? (
                                <div>Không có dữ liệu</div>
                            ) : roleList.map((role,id) => (
                                <tr key={id} className="hover:bg-base-300 cursor-pointer">
                                    <td className="px-4 py-2 text-center border-b">{role.name}</td>
                                    <td className="px-4 py-2 text-left border-b">{role.description}</td>
                                    <td className="px-4 py-2 text-left border-b">
                                        <ul className="list-disc list-inside">
                                            {!role.permissions ? (<li>Không có dữ liệu</li>) : role.permissions.map((permission, id) => (
                                                <li key={id}>{permission.name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-4 py-2 text-center border-b"><button onClick={() => handleGetRole(role.name)}
                                        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 ">Sửa</button></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            
            {openForm && (<ModelForm title={"Chỉnh sửa"} width="w-auto" onClose={() => handleCloseForm()}>
                <div className="text-center"><span>Tên quyền : </span>{roleSelected.name}</div>


                <div className="text-center mb-4">Danh sách quyền</div>
                <div className="text-center mb-4"><input type="text" className="px-6 py-1 rounded-full border "placeholder="Tìm kiếm"onChange={(e)=>handleSearch(e.target.value)}/></div>
                <div className="border rounded-md w-[600px] mb-4">
                    <table className="min-w-full border-collapse table-auto border-gray-500">
                        <colgroup>
                            <col className="w-1/3" />
                            <col className="w-1/3" />
                            <col className="w-1/3" />
                        </colgroup>
                        <thead className="bg-gray-200 border-gray-500 border">
                            <tr>
                                <th className="px-4 py-2 border font-bold text-center">Tên quyền</th>
                                <th className="px-4 py-2 border font-bold text-center">Mô tả</th>
                                <th className="px-4 py-2 border font-bold text-center">Lựa chọn</th>
                            </tr>
                        </thead>
                    </table>

                    <div className="max-h-[162px] overflow-y-auto">
                        <table className="min-w-full border-collapse table-auto border-gray-500">
                            <colgroup>
                                <col className="w-1/3" />
                                <col className="w-1/3" />
                                <col className="w-1/3" />
                            </colgroup>
                            <tbody>
                                {permissionListSearch ? (
                                    permissionListSearch.map((permission, id) => (
                                        <tr key={id} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2 text-center">{permission.name}</td>
                                            <td className="px-4 py-2 text-center">{permission.description}</td>
                                            <td className="px-4 py-2 text-center">
                                                <input type="checkbox" className="h-4 w-4 text-blue-600" checked={roleSelected.permissions?.some((p)=> p.name === permission.name)}
                                                 onChange={()=> handleCheckbox(permission.name)}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center py-3">Chưa có dữ liệu</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="text-center"><button className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700"
                onClick={()=> handleUpdateRole()}>Xác nhận</button></div>
            </ModelForm>)}
            {openFormRole && <ModelForm title={"Thêm vai trò"} width="w-auto" onClose={() => handleCloseForm()}>
                    <div className="space-y-4">
      <div className="flex flex-col">
        <label className="mb-1 font-medium text-gray-700">Tên vai trò</label>
        <input
          type="text"
          className="px-4 py-2 border rounded-lg focus:outline-none  "
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
          className="px-4 py-2 border rounded-lg focus:outline-none  "
          placeholder="Nhập mô tả"
          value={role.description}
          onChange={handleChangeForm}
        />
      </div>

      <div className="text-right">
        <button
          className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          onClick={()=>handleAddRole()}
        >
          Thêm
        </button>
      </div>
    </div>
            </ModelForm>}
        </>

    )
}