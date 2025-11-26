import { useEffect, useState } from "react"
import ModelForm from "../components/Common/FormModel"
import { Plus, Edit, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const roomSchema = z.object({
    roomName: z
        .string()
        .trim()
        .nonempty("Vui lòng nhập tên phòng")
        .min(3, "Tên phòng quá ngắn")
        .max(100, "Tên phòng quá dài"),
    roomType: z.union([
        z.literal("Standard"),
        z.literal("Superior"),
        z.literal("Deluxe"),
        z.literal("Premium Deluxe"),
        z.literal("Suite"),
        z.literal("Executive Suite"),
        z.literal("Royal Suite"),
        z.literal("Presidential Suite"),
        z.literal("Single Room"),
        z.literal("Double Room"),
        z.literal("Twin Room"),
        z.literal("Triple Room"),
        z.literal("Family Room"),
        z.literal("Connecting Room"),
        z.literal("Studio"),
        z.literal(""),
    ]).refine(val => val !== "", {
        message: "Vui lòng chọn loại phòng hợp lệ",
    }),
    roomArea: z
        .string()
        .trim()
        .nonempty("Vui lòng nhập diện tích phòng")
        .max(5, "Diện tích phòng quá dài"),
    bedRoomCount: z
        .string()
        .trim()
        .nonempty("Vui lòng số phòng ngủ")
        .max(10, "Số phòng ngủ quá nhiều"),
    roomCapacity: z
        .string()
        .trim()
        .nonempty("Vui lòng nhập sức chứa của phòng")
        .max(10, "Sức chứa phòng quá nhiều"),
    bedCount: z
        .string()
        .trim()
        .nonempty("Vui lòng nhập số giường ngủ")
        .max(20, "Số giường ngủ quá nhiều"),
    roomPrice: z
        .string()
        .trim()
        .nonempty("Vui lòng nhập giá phòng")
        .min(3, "Giá phòng không hợp lệ")
})
export default function RoomManager() {
    const [openCreate, setOpenCreate] = useState(false)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([]);          // eslint-disable-line no-unused-vars
    const [previewUrls, setPreviewUrls] = useState([]);
    const handleImageChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setImages((prev) => {
            const updated = [...prev, ...newFiles];
            return updated;
        });
        const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
        setPreviewUrls((prev) => [...prev, ...newPreviews]);
    };


    const { hotelId } = useParams();
    const [rooms, setRooms] = useState([])
    const fetchRoomsByHotelId = async (hotelId) => {
        try {
            const response = await api.get(`/rooms/hotel/${hotelId}`)
            setRooms(response.data.result)
        } catch (error) {
            console.log("Lỗi không thể lấy được danh sách", error)
        }
    }

    useEffect(() => {
        fetchRoomsByHotelId(hotelId)
    }, [hotelId])

    const [firstRoomImages, setFirstRoomImages] = useState({});
    useEffect(() => {
        const fetchImages = async () => {
            const temp = {};
            for (let room of rooms) {
                try {
                    const res = await api.get(`/imageRoom/room/${room.roomId}`);
                    temp[room.roomId] = res.data.result[0].imgUrl;
                } catch (error) {
                    console.log("loi khong the lay anh", error)
                    temp[room.roomId] = null;
                }
            }
            setFirstRoomImages(temp);
        };
        if (rooms.length > 0) fetchImages();
    }, [rooms]);

    const { handleSubmit, register, reset } = useForm({
        resolver: zodResolver(roomSchema)
    })

    const [room, setRoom] = useState(null)
    const defaultAdd = () => {
        setPreviewUrls([])
        setImgsRoom([])
        setRoom(null)
        reset({
            roomArea: "",
            roomName: "",
            roomCapacity: "",
            bedCount: "",
            bedRoomCount: "",
            roomPrice: ""
        })
    }
    const defaultUpdate = (r) => {
        setPreviewUrls([])
        setImages([])
        setRoom(r)
        reset({
            roomArea: String(r.roomArea),
            roomName: r.roomName,
            roomType: r.roomType,
            roomCapacity: String(r.roomCapacity),
            bedCount: String(r.bedCount),
            bedRoomCount: String(r.bedRoomCount),
            roomPrice: String(r.roomPrice)
        })
    }

    const [imgsRoom, setImgsRoom] = useState([])
    const fullImgRoomByRoomId = async (roomId) => {
        try {
            const response = await api.get(`/imageRoom/room/${roomId}`)
            if (response.data.code)
                setImgsRoom(response.data.result)
        } catch (error) {
            console.log("khong the lay anh", error)
        }
    }

    const [idImgRoom, setIdImgRoom] = useState([])
    const deleteImageTemp = async (imgId) => {
        setImgsRoom(prev => prev.filter(img => img.id !== imgId));
        setIdImgRoom((prev) => [...prev, imgId])
    }

    const onError = (err) => {
        const firstErr = Object.values(err)[0]
        if (firstErr)
            toast.error(firstErr.message)
    }

    const onSubmit = async (data) => {
        const dataNew = {
            ...data,
            hotelID: hotelId,
        }
        if (!room) {
            setLoading(true)
            if (images.length === 0) {
                toast.error("Vui long them anh phong")
                return
            }
            try {
                const response = await api.post("/rooms/create", dataNew)
                const roomId = response.data.result.roomId;
                const formData = new FormData();
                images.forEach((file) => formData.append("files", file))
                formData.append("roomId", roomId)
                const responseImgRoom = await api.post("/imageRoom/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (responseImgRoom.data.code) {
                    toast.success("Thêm phòng thành công")
                    fetchRoomsByHotelId(hotelId)
                    setOpenCreate(false)
                    setPreviewUrls([])
                    setImages([])
                }
            } catch (error) {
                toast.error("Không thể thêm phòng")
                console.log("Không thể thêm phòng", error)
            } finally {
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                const response = await api.put(`rooms/${room.roomId}`, dataNew)
                const formData = new FormData();
                if (images.length != 0 && previewUrls) {
                    images.forEach((file) => formData.append("files", file))
                    formData.append("roomId", room.roomId)
                    await api.post("/imageRoom/upload", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                }
                if (idImgRoom.length > 0) {
                    await Promise.all(idImgRoom.map(id => api.delete(`/imageRoom/delete/${id}`)));
                    setIdImgRoom([]);
                }
                if (response.data.code) {
                    toast.success("Cập nhật thành công")
                    fetchRoomsByHotelId(hotelId)
                    setOpenCreate(false)
                    setImages([])
                    setPreviewUrls([])
                }
            } catch (error) {
                toast.error("Không thể cập nhật")
                console.log("Không thể cập nhật", error)
            } finally {
                setLoading(false)
            }
        }
    }

    const [roomType, setRoomType] = useState("")
    useEffect(() => {
        const fetchRoomsByRoomType = async () => {
            if (roomType === "")
                fetchRoomsByHotelId(hotelId)
            else {
                const response = await api.get(`/rooms/hotel/${hotelId}/${roomType}`)
                setRooms(response.data.result)
            }
        }
        fetchRoomsByRoomType()
    }, [roomType, hotelId])


    // console.log("danh sach id anh ban muon xoa la", idImgRoom)
    const deleteRoom = async (roomId) => {
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
            const response = await api.delete(`/rooms/delete/${roomId}`)
            console.log(response.data)
            if (response.data.code) {
                toast.success("Xóa phòng thành công")
                fetchRoomsByHotelId(hotelId)
            }
        } catch (error) {
            toast.error("Không thể xóa phòng")
            console.log("Không thể xóa phòng", error)
        }
    }

    const renderStatus = (status) => {
        if (status === 0)
            return (<span className="text-green-600 text-sm font-medium">Phòng còn trống</span>)
        if (status === 1)
            return (<span className="text-red-500 text-sm font-medium">Khách đang ở</span>)
        if (status === 2)
            return (<span className="text-blue-500 text-sm font-medium">Đã được đặt</span>)
        else
            return (<span className="text-yellow-500 text-sm font-medium">Bảo trì</span>)
    }
    const [openStatus, setOpenStatus] = useState(false)
    const statusList = [
        { label: "Phòng còn trống", status: 0 },
        { label: "Khách đang ở", status: 1 },
        { label: "Đã được đặt", status: 2 },
        { label: "Bảo trì", status: 3 }
    ];
    const [selected, setSelected] = useState(0);
    const [roomSelected, setRoomSelected] = useState(null)
    const setStatusRoom = async (status) => {
        try {
            if (roomSelected != null) {
                const response = await api.put(`rooms/status/${roomSelected.roomId}`, { status })
                if (response.data.code) {
                    toast.success("Cập nhật trạng thái phòng thành công")
                    fetchRoomsByHotelId(hotelId)
                }
            }
        } catch (error) {
            console.log("loi khong the cap nhat trang thai", error)
        }
    }
    return (
        <div className="w-[1700px] items-center justify-center min-h-screen bg-gray-100 ml-[300px]">
            <div className="px-2 py-2 h-auto">
                <h2 className="text-center font-medium text-3xl">QUẢN LÝ PHÒNG CỦA BẠN</h2>
                <div className="flex items-end justify-end gap-4 border border-gray-200 rounded-xl py-2 mx-4 px-2 mt-2 bg-white shadow-sm">
                    {/* Bộ lọc loại phòng */}
                    <div className="flex flex-col">
                        <label htmlFor="roomType" className="text-sm font-medium text-gray-700 mb-1">Lọc theo loại phòng</label>
                        <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="w-56 border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition">
                            <option value="">-- Chọn loại phòng --</option>
                            <option value="Standard">Standard</option>
                            <option value="Superior">Superior</option>
                            <option value="Deluxe">Deluxe</option>
                            <option value="Premium Deluxe">Premium Deluxe</option>
                            <option value="Suite">Suite</option>
                            <option value="Executive Suite">Executive Suite</option>
                            <option value="Royal Suite">Royal Suite</option>
                            <option value="Presidential Suite">Presidential Suite</option>
                            <option value="Single Room">Single Room</option>
                            <option value="Double Room">Double Room</option>
                            <option value="Twin Room">Twin Room</option>
                            <option value="Triple Room">Triple Room</option>
                            <option value="Family Room">Family Room</option>
                            <option value="Connecting Room">Connecting Room</option>
                            <option value="Studio">Studio</option>
                        </select>
                    </div>

                    {/* Nút thêm mới */}
                    <button onClick={() => { setOpenCreate(true); defaultAdd() }} className="flex items-center gap-2 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition active:scale-95">
                        <Plus className="w-5 h-5" />
                        Thêm
                    </button>
                </div>

                {
                    rooms.length != 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-5 px-2 py-6">
                            {rooms.map((room) => (
                                <div key={room.roomId}
                                    className="rounded-2xl shadow-md hover:shadow-xl transition-all bg-white overflow-hidden border border-gray-100">
                                    {/* Ảnh phòng */}
                                    <div className="h-48 w-full bg-gray-100 overflow-hidden">
                                        <img
                                            src={firstRoomImages[room.roomId]}
                                            alt=""
                                            className="w-full h-full object-cover hover:scale-105 transition"
                                        />
                                    </div>

                                    <div className="px-5 py-4">
                                        {/* Tên phòng */}
                                        <p className="text-lg font-semibold text-gray-800">
                                            {room.roomName}{" "}
                                            <span className="text-sm text-gray-500">
                                                ({room.roomType})
                                            </span>
                                        </p>

                                        {/* Info */}
                                        <p className="text-sm text-gray-600 mt-2">
                                            🛏️ {room.bedCount} giường • {room.bedRoomCount} phòng ngủ • {room.roomCapacity} khách
                                        </p>

                                        <p className="text-sm text-gray-600">
                                            📐 Diện tích: {room.roomArea} m²
                                        </p>

                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-xl font-bold text-green-600">
                                                {room.roomPrice.toLocaleString()} ₫/đêm
                                            </span>

                                            {renderStatus(room.status)}
                                        </div>

                                        {/* Nút hành động */}
                                        <div className="flex justify-end gap-2 mt-5">
                                            <button onClick={() => { setOpenStatus(true), setRoomSelected(room), setSelected(room.status) }} className="flex cursor-pointer items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition">
                                                Trạng thái
                                            </button>
                                            {/* Sửa */}
                                            <button
                                                onClick={() => { setOpenCreate(true); defaultUpdate(room); fullImgRoomByRoomId(room.roomId) }}
                                                className="flex cursor-pointer items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded-lg hover:bg-yellow-600 transition">
                                                {/* <Edit size={16} /> */}
                                                <span>Sửa</span>
                                            </button>

                                            {/* Chỉnh trạng thái */}


                                            {/* Xóa */}
                                            <button
                                                onClick={() => deleteRoom(room.roomId)}
                                                className="flex cursor-pointer items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition">
                                                {/* <Trash size={16} /> */}
                                                <span>Xóa</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="font-md text-xl text-center py-4">
                            Bạn chưa có phòng nào cho khách sạn của mình
                        </div>
                    )
                }

            </div>
            {
                openCreate && (
                    <ModelForm title="Thêm phòng" width="950px" onClose={() => { setOpenCreate(false) }}>
                        <form onSubmit={handleSubmit(onSubmit, onError)} className="w-[950px] grid grid-cols-2 gap-10" action="">
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold border-b pb-1">Thông tin phòng</h3>

                                <div>
                                    <label className="block text-sm font-medium">Tên phòng *</label>
                                    <input
                                        type="text"
                                        name="roomName"
                                        placeholder="Nhập tên phòng"
                                        className="w-full border px-3 py-2 rounded-lg"
                                        {...register("roomName")}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Loại phòng</label>
                                    <select
                                        name="roomType"
                                        className="w-full border px-3 py-2 rounded-lg"
                                        {...register("roomType")}
                                    >
                                        <option value="">-- Chọn loại phòng --</option>
                                        <option value="Standard">Standard</option>
                                        <option value="Superior">Superior</option>
                                        <option value="Deluxe">Deluxe</option>
                                        <option value="Premium Deluxe">Premium Deluxe</option>
                                        <option value="Suite">Suite</option>
                                        <option value="Executive Suite">Executive Suite</option>
                                        <option value="Royal Suite">Royal Suite</option>
                                        <option value="Presidential Suite">Presidential Suite</option>
                                        <option value="Single Room">Single Room</option>
                                        <option value="Double Room">Double Room</option>
                                        <option value="Twin Room">Twin Room</option>
                                        <option value="Triple Room">Triple Room</option>
                                        <option value="Family Room">Family Room</option>
                                        <option value="Connecting Room">Connecting Room</option>
                                        <option value="Studio">Studio</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-1">
                                    <div>
                                        <label className="block text-sm font-medium">Diện tích (m²)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="VD: 25.5"
                                            className="w-full border px-3 py-2 rounded-lg"
                                            {...register("roomArea")}
                                        />
                                    </div>
                                </div>


                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium">Số phòng ngủ</label>
                                        <input
                                            type="number"
                                            className="w-full border px-3 py-2 rounded-lg"
                                            {...register("bedRoomCount")}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Sức chứa</label>
                                        <input
                                            type="number"
                                            className="w-full border px-3 py-2 rounded-lg"
                                            {...register("roomCapacity")}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium">Số giường *</label>
                                        <input
                                            type="number"
                                            className="w-full border px-3 py-2 rounded-lg"
                                            {...register("bedCount")}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Giá phòng (VNĐ) *</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="w-full border px-3 py-2 rounded-lg"
                                            {...register("roomPrice")}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block font-semibold mb-2 text-gray-700">
                                    Ảnh khách sạn
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                                {previewUrls.length > 0 && (
                                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                                        {previewUrls.map((url, idx) => (
                                            <div
                                                key={idx}
                                                className="relative overflow-hidden rounded-xl border border-gray-200 "
                                            >
                                                <img
                                                    src={url}
                                                    alt={`preview-${idx}`}
                                                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {imgsRoom && (
                                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                                        {imgsRoom.map((img, index) => (
                                            <div key={index} className="relative overflow-hidden rounded-xl border border-gray-200">
                                                <button type="button"
                                                    onClick={() => deleteImageTemp(img.id)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center 
                               rounded-full text-sm hover:bg-red-600 transition z-10">
                                                    ✕
                                                </button>
                                                <img src={img.imgUrl} alt={`preview-${index}`}
                                                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>

                            {/* Preview ảnh */}
                            <div className="flex col-span-2 -mt-5 justify-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-5 cursor-pointer text-white py-2 rounded-xl bg-green-600 flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}>
                                    {loading && (<span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>)}
                                    {!room
                                        ? (loading ? "Đang thêm phòng..." : "Thêm")
                                        : (loading ? "Đang cập nhật..." : "Cập nhật")}
                                </button>

                            </div>
                        </form>
                    </ModelForm>
                )
            }
            {
                openStatus && (
                    <ModelForm onClose={() => setOpenStatus(false)} width="500px" title="Cập nhật trạng thái phòng">
                        <div className="flex w-[520px] bg-white rounded-xl shadow-md p-4 gap-4">
                            <div className="flex-1 flex flex-col gap-3">
                                {statusList.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => { setSelected(item.status) }}
                                        className={`border py-2 rounded-lg w-full text-left cursor-pointer px-4 transition ${selected === item.status
                                            ? "bg-gray-800 text-white"
                                            : "bg-gray-100 hover:bg-gray-200 text-black"}  `}>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-1 flex-col justify-center items-center rounded-lg bg-gray-50">
                                <span className="text-gray-700 font-medium text-lg">
                                    Trạng thái phòng:
                                </span>
                                {renderStatus(selected)}
                            </div>
                        </div>
                        <div className="flex justify-center"><button onClick={() => { setStatusRoom(selected), setOpenStatus(false) }} className="px-4 py-2 bg-green-500 rounded-md text-white cursor-pointer ">Cập nhật</button></div>
                    </ModelForm>
                )
            }
        </div>
    )
}