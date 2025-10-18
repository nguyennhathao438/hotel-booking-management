import DatePicker from "react-datepicker";
import { BsCalendar } from "react-icons/bs";
import { useContext } from "react";
import { Context } from "./RoomContext";
import "react-datepicker/dist/react-datepicker.css"
function Checkout() {
    const { checkOutDate, setCheckOutDate } = useContext(Context)
    return (
        <div className="flex flex-col w-full">
            {/* Tiêu đề với icon nhỏ */}
            <div className="flex items-center gap-1 mb-3">
                <BsCalendar className="text-blue-500 text-sm" />
                <span className="text-gray-800 font-medium text-sm tracking-wide">
                    Ngày trả phòng
                </span>
            </div>

            {/* Ô chọn ngày giống ngày nhận phòng */}
            <div className="relative flex items-center w-full">
                <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    placeholderText="dd/mm/yyyy"
                    dateFormat="dd/MM/yyyy"
                    className="w-full py-2.5 pl-4 pr-10 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-700 placeholder:text-gray-400"
                />
                {/* Icon lịch bên phải */}
                <BsCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
            </div>
        </div>
    );
    // return (
    //     <div className=" relative flex items-center justify-end h-full w-full">
    //         <div className="absolute z-10 mr-4">
    //                 <BsCalendar className="text-base" />
    //         </div>
    //         <DatePicker
    //             className="w-full h-full lg:w-51 sm:w-159.5 md:w-191.5 p-4"
    //             selected={checkOutDate}
    //             onChange={(date) => {setCheckOutDate(date)}}
    //             placeholderText="Checkout"
    //         />
    //     </div>
    // );
}
export default Checkout