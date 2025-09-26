import DatePicker from "react-datepicker";
import { BsCalendar } from "react-icons/bs";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"
function Checkout() {
    const [endDate, setEndDate] = useState(false)
    return (
        <div className=" relative flex items-center justify-end h-full w-full">
            <div className="absolute z-10 mr-4">
                    <BsCalendar className="text-base" />
            </div>
            <DatePicker
                className="w-full h-full lg:w-51 sm:w-159.5 md:w-191.5 p-4"
                selected={endDate}
                onChange={(date) => {setEndDate(date)}}
                placeholderText="Checkout"
            />
        </div>
    );
}
export default Checkout