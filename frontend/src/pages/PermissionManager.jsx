import { useState ,useEffect} from "react"
import api from "../api";
export default function PermissionManager(){
    const [roleList,setRoleList] = useState([]);
    useEffect(()=>{
        const fetchRole = async ()=>{
            const response = await api.get("/role")
            setRoleList(response.data.result);
            
        }
        fetchRole();
    },[])
    return (
        <>
        <div className="bg-gray-300 ml-[300px] w-full">
            <h1 className="text-center text-3xl font-bold">Phân quyền</h1>
            <div>
            <table className="min-w-full border table-auto border-gray-500 border-collapse">
                <thead>
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
                ) :roleList.map((role)=>(
                    <tr key={role.id} className="hover:bg-base-300 cursor-pointer">
                    <td className="px-4 py-2 text-center border">{role.name}</td>
                    <td className="px-4 py-2 text-center border">{role.description}</td>
                    <td className="px-4 py-2 text-center border">
                        <ul className="list-disc list-inside">
                        {!roleList.permissions ? (<li>Không có dữ liệu</li>):roleList.permissions.map((permission) =>(
                            <li key={ role.id - permission.id}>{permission.name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-4 py-2 text-center border"><button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 ">Sửa</button></td>
                </tr>
                ))}
                
                </tbody>
            </table>
        </div>
        </div>
        
        </>
    )
}