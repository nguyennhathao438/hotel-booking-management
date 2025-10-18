import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "./RoomContext";
export default function Province() {
    const [provinces,setProvinces] = useState([])
    // const {provinceCode,setProvinceCode} = useContext(Context)
    const {province,setProvince} = useContext(Context)
    useEffect(() => {
        const fetchProvices = async () => {
            const respone = await axios.get("https://provinces.open-api.vn/api/p/",
                { withCredentials: false }
            );
            setProvinces(respone.data)
        }
        fetchProvices()
    }, [])
    return (
        <div className="w-full">
            <span className="block px-4 py-1 text-sm font-medium">Chọn tỉnh thành</span>
            <div className="flex py-1">
                <select className="border border-gray-300 rounded-xl md:ml-3 lg:mx-auto mt-1 py-2.5 px-4"
                    name="" value={province} id="" onChange={(e)=>setProvince(e.target.value)} >
                    {
                        provinces.map((item) => (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}