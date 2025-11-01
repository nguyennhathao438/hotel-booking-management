
import api from "../../api";
import { FaRegUser, FaClock } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import success from "../../assets/img/success.png"

export default function SuccessBooking() {
    // const {selected} = useContext(Context)
    //  console.log("phuong thuc thanh toan o success-booking la : ",selected)
    const invoice = localStorage.getItem("invoice")
    const objectInvoice = JSON.parse(invoice)
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };
    const [room, setRoom] = useState([])
    const [user, setUser] = useState([])
    const checkIn = new Date(objectInvoice.checkInDate);
    const checkOut = new Date(objectInvoice.checkOutDate);
    const night = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    useEffect(() => {
        const postInvoice = async () => {
            await api.post(`/invoice/room/${objectInvoice.roomId}/create`, objectInvoice)
            alert("đặt phòng thành công")
        }
        postInvoice()
    }, [])
    useEffect(() => {
        const fecthRoomById = async () => {
            const respone = await api.get(`/rooms/${objectInvoice.roomId}`)
            setRoom(respone.data.result)
        }
        fecthRoomById()
    }, [objectInvoice.roomId])
    useEffect(() => {
        const fecthUserById = async () => {
            const respone = await api.get(`/users/${objectInvoice.userId}`)
            setUser(respone.data.result)
        }
        fecthUserById()
    }, [objectInvoice.userId])
    return (
        <div className="border h-[auto] bg-gray-50">
            <div className="mx-auto w-[60%] flex flex-col bg-white border px-2 py-7 border-gray-300">
                <div className="flex flex-col w-full h-auto p-6 mx-auto rounded-2xl items-center border border-gray-300">
                    <img className="w-[60px] h-[70px]" src={success} alt="" />
                    <span className="block text-3xl text-center font-bold py-3 px-2">Đặt phòng thành công</span>
                    <span className="block text-md text-center">Cảm ơn bạn đã đặt phòng . Chúng tôi sẽ liên hệ với bạn sớm nhất để nhận phòng</span>
                    <div className="flex items-center text-center bg-amber-200 rounded-2xl px-4 py-2 mt-4">
                        <FaClock />
                        <span className="px-2 block"> Chờ xác nhận</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-3 mx-1 md:flex-row h-auto lg:flex-row">
                    <div className="border border-gray-300 flex-1 p-2 rounded-2xl">
                        <span className="font-bold block text-center px-3 py-2">Thông tin đặt phòng</span>
                        <div className="flex flex-col md:flex-row lg:flex-row py-2">
                            <div className="border-r flex-1 border-gray-300">
                                <span className="block text-sm text-center">Nhận phòng</span>
                                <span className="text-center block text-md font-bold">Ngày {formatDate(objectInvoice.checkInDate)}</span>
                            </div>
                            <div className="flex-1 ">
                                <span className="block text-sm text-center">Trả phòng</span>
                                <span className="text-center block text-md font-bold">Ngày {formatDate(objectInvoice.checkOutDate)}</span>
                            </div>
                        </div>
                        <span className="block border-gray-300 border-t px-2 py-1">Loại phòng : <span className="font-bold text-blue-500">{room.roomType}</span></span>
                        <span className="block px-2 py-1">Số người : <span className="font-bold text-blue-500">{room.roomCapacity} người</span></span>
                        <span className="block px-2 py-1">Tổng số đêm : <span className="font-bold text-blue-500">{night} đêm</span></span>
                        <span className="block px-2 py-1">Giá một đêm : <span className="font-bold text-blue-500">{Number(room.roomPrice).toLocaleString()} VNĐ</span></span>
                        <div className="flex flex-row items-center py-1 px-2">
                            <FaRegCreditCard />
                            <div>
                                <span className="text-sm block px-2">Phương thức thanh toán</span>
                                {objectInvoice.payment == 1 && (
                                    <span className="font-bold text-blue-500 px-2 block text-md">Tiền mặt</span>
                                )}
                                {objectInvoice.payment == 2 && (
                                    <span className="font-bold text-blue-500 px-2 block text-md">Momo</span>
                                )}
                                {objectInvoice.payment == 3 && (
                                    <span className="font-bold px-2 block text-blue-500 text-md">VNPay</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="border border-gray-300 flex-1 p-2 rounded-2xl">
                        <span className="font-bold text-center block px-3 py-2">Thông tin khách hàng</span>
                        <div className="py-1 flex flex-row items-center">
                            <FaRegUser />
                            <div>
                                <span className="text-sm block px-2">Họ và tên</span>
                                <span className="font-bold text-md px-2">{user.firstName + " " + user.lastName}</span>
                            </div>
                        </div>
                        <div className="py-1 flex flex-row items-center">
                            <FaEnvelope />
                            <div>
                                <span className="text-sm block px-2">Email</span>
                                <span className="font-bold text-md px-2">{user.email}</span>
                            </div>
                        </div>
                        <div className="py-1 flex flex-row items-center">
                            <FaPhoneAlt />
                            <div>
                                <span className="text-sm block px-2">Số điện thoại</span>
                                <span className="font-bold text-md px-2">{user.phone}</span>
                            </div>
                        </div>
                        <div className="py-1 flex justify-end border-t border-gray-300">
                            <span>Tổng tiền : <span className="text-blue-500 font-bold">{(objectInvoice.totalAmount).toLocaleString()} VNĐ</span> </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}