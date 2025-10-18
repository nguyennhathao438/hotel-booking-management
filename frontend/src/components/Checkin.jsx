import { BsCalendar } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { useContext } from "react";
import "react-datepicker/dist/react-datepicker.css"
import { Context } from "./RoomContext";
function Checkin() {
    const { checkInDate, setCheckInDate } = useContext(Context);
   return (
    <div className="flex flex-col w-full">
      {/* Tiêu đề có icon nhỏ bên trái */}
      <div className="flex items-center gap-1 mb-3">
        <BsCalendar className="text-blue-500 text-sm" />
        <span className="text-gray-800 font-medium text-sm tracking-wide">
          Ngày nhận phòng
        </span>
      </div>

      {/* Ô chọn ngày */}
      <div className="relative">
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          dateFormat="dd/MM/yyyy"
          className="w-full border-gray-300 py-2.5 pl-4 pr-10 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-700 placeholder:text-gray-400"
        />
        {/* Icon lịch bên phải trong ô */}
        <BsCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
      </div>
    </div>
  );

    // return (
    //     <div className=" relative flex items-center justify-end w-full h-full ">
    //         <div className="absolute z-10 mr-4">
    //             <BsCalendar className="text-base" />
    //         </div>
    //         <DatePicker
    //             className="w-full h-full lg:w-51 z-60 sm:w-159.5 md:w-191.5 p-4"
    //             selected={checkInDate}
    //             onChange={date => setCheckInDate(date)}
    //             placeholderText="Checkin"
    //         />
    //     </div>
    // );
}

export default Checkin