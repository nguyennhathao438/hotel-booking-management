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
import banner2 from "../assets/img/banner2.jpg"
import { Context } from "../components/RoomContext";
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
    status: z.enum(["0", "1", "2", "3"]),
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
    // const { checkInDate, checkOutDate } = useContext(Context)

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
    // const formatDate = (date) => {
    //     const d = new Date(date);
    //     const year = d.getFullYear();
    //     const month = String(d.getMonth() + 1).padStart(2, "0");
    //     const day = String(d.getDate()).padStart(2, "0");
    //     return `${year}-${month}-${day}`;
    // };

    // const checkRoomStatus = async (roomId, checkInDate, checkOutDate) => {
    //     try {
    //         const response = await api.get("/rooms/check-room-status", {
    //             params: {
    //                 roomId,
    //                 checkInDate: formatDate(checkInDate),
    //                 checkOutDate: formatDate(checkOutDate),
    //             }
    //         });
    //         return response.data.result;
    //     } catch (error) {
    //         console.error("Lỗi khi kiểm tra trạng thái phòng:", error);
    //         return 0;
    //     }
    // };

    // const fetchRoomsByHotelId = async () => {
    //     try {
    //         const roomData = await api.get(`rooms/hotel/${hotelId}`);
    //         const roomsWithStatus = await Promise.all(
    //             roomData.data.result.map(async (room) => {
    //                 const status = await checkRoomStatus(room.roomId, checkInDate, checkOutDate);
    //                 return { ...room, status };
    //             })
    //         );
    //         setRooms(roomsWithStatus);
    //         const imageData = await api.get(`/images/hotel/${hotelId}`);
    //         setImages(imageData.data.result);
    //     } catch (error) {
    //         console.error("Lỗi khi load phòng:", error);
    //     }
    // };
    useEffect(() => {
        fetchRoomsByHotelId(hotelId)
    }, [hotelId])

    const { handleSubmit, register, reset } = useForm({
        resolver: zodResolver(roomSchema)
    })


    const [room, setRoom] = useState([])
    const defaultAdd = () => {
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
        setRoom(r)
        reset({
            roomArea: String(r.roomArea),
            roomName: r.roomName,
            roomType: r.roomType,
            status: r.status,
            roomCapacity: String(r.roomCapacity),
            bedCount: String(r.bedCount),
            bedRoomCount: String(r.bedRoomCount),
            roomPrice: String(r.roomPrice)
        })
    }

    const onError = (err) => {
        const firstErr = Object.values(err)[0]
        if (firstErr)
            toast.error(firstErr.message)
    }

    const onSubmit = async (data) => {
        console.log("du lieu ban vua click de cap nhat la", data)
        const dataNew = {
            ...data,
            hotelID: hotelId,
        }
        if (!room) {
            try {
                const response = await api.post("/rooms/create", dataNew)
                if (response.data.code) {
                    toast.success("Thêm phòng thành công")
                    fetchRoomsByHotelId(hotelId)
                    setOpenCreate(false)
                }
            } catch (error) {
                toast.error("Không thể thêm phòng")
                console.log("Không thể thêm phòng", error)
            }
        } else {
            try {
                const response = await api.put(`rooms/${room.roomId}`, dataNew)
                if (response.data.code) {
                    toast.success("Cập nhật thành công")
                    fetchRoomsByHotelId(hotelId)
                    setOpenCreate(false)
                }
            } catch (error) {
                toast.error("Không thể cập nhật")
                console.log("Không thể cập nhật", error)
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



    // const handleChangeRoomStatus = async (roomId, newStatus) => {
    //     try {
    //         await api.put(`/rooms/${roomId}/status`, { status: newStatus });
    //         toast.success("Cập nhật trạng thái phòng thành công");

    //         // Cập nhật lại danh sách rooms tại chỗ (nếu không refetch)
    //         setRooms((prev) =>
    //             prev.map((r) => (r.roomId === roomId ? { ...r, status: newStatus } : r))
    //         );
    //     } catch (error) {
    //         toast.error("Không thể cập nhật trạng thái phòng", error);
    //     }
    // };

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
            return (<span className="text-green-600 text-sm font-medium">Con trong</span>)
        if (status === 1)
            return (<span className="text-red-500 text-sm font-medium">Khach dang o</span>)
        if (status === 2)
            return (<span className="text-blue-500 text-sm font-medium">Da duoc dat</span>)
        else
            return (<span className="text-yellow-500 text-sm font-medium">Bao tri</span>)
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
                            {rooms.map((room) => (
                                <div key={room.roomId} className="rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition bg-white">
                                    {/* Ảnh phòng */}
                                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">
                                        <img src={banner2} alt="" />
                                    </div>

                                    <div className="px-4 pb-2 pt-1">
                                        <p className="mt-1 font-medium text-gray-800">
                                            {room.roomName} ({room.roomType})
                                        </p>

                                        <p className="text-sm text-gray-600 mt-1">
                                            🛏️ {room.bedCount} giường • {room.bedRoomCount} phòng ngủ • {room.roomCapacity} khách
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            📐 Diện tích: {room.roomArea} m²
                                        </p>

                                        <div className="flex justify-between items-center mt-3">
                                            <span className="text-lg font-bold text-green-600">
                                                {room.roomPrice.toLocaleString()} ₫/đêm
                                            </span>
                                            {renderStatus(room.status)}
                                        </div>

                                        {/* Trạng thái phòng */}
                                        <div className="flex flex-col gap-2 mt-3">
                                            {/* <p
                                                className={`text-sm font-medium ${room.status === 0
                                                    ? "text-green-600"
                                                    : room.status === 1
                                                        ? "text-orange-500"
                                                        : "text-red-500"
                                                    }`}
                                            >
                                                {room.status === 0
                                                    ? "Phòng còn trống"
                                                    : room.status === 1
                                                        ? "Khách đang ở"
                                                        : "Hết chỗ"}
                                            </p> */}



                                            {/* Các nút hành động */}
                                            <div className="flex gap-3 justify-end mt-3">
                                                <button onClick={() => { setOpenCreate(true); defaultUpdate(room); }}
                                                    className="bg-yellow-500 cursor-pointer text-white px-3 py-1.5 rounded-lg hover:bg-yellow-600"
                                                >
                                                    <Edit className="inline-block mr-1" />
                                                    Sửa
                                                </button>

                                                <button onClick={() => { deleteRoom(room.roomId); }}
                                                    className="bg-red-500 cursor-pointer text-white px-3 py-1.5 rounded-lg hover:bg-red-600"
                                                >
                                                    <Trash className="inline-block mr-1" />
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) :
                        <div className="font-md text-xl text-center py-4">
                            Bạn chưa có phòng nào cho khách sạn của mình
                        </div>
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

                                <div className="grid grid-cols-2 gap-2">
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

                                    {room && (
                                        <div>
                                            <label className="block text-sm font-medium">Trạng thái phòng</label>
                                            <select
                                                // value={room.status}
                                                // onChange={(e) => handleChangeRoomStatus(room.roomId, Number(e.target.value))}
                                                // disabled={room.status === 3} 
                                                // className={`w-full border px-3 py-2 rounded-lg ${room.status === 3 ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                                                className={`w-full border px-3 py-2 rounded-lg bg-gray-100 cursor-pointer`}
                                                {...register("status")}
                                            >
                                                <option value={0}>Phòng còn trống</option>
                                                <option value={1}>Khách đang ở</option>
                                                <option value={2}>Hết chỗ</option>
                                                <option value={3}>Bao tri</option>
                                            </select>
                                        </div>
                                    )}
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
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
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
                            </div>

                            {/* Preview ảnh */}
                            <div className="flex col-span-2 -mt-5 justify-center">
                                <button type="submit" className="px-5 cursor-pointer text-white py-2 rounded-xl bg-green-600">{!room ? "Thêm" : "Cập nhật"}</button>
                            </div>
                        </form>
                    </ModelForm>
                )
            }

        </div>
    )
}