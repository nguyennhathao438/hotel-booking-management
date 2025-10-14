import { BsCalendar } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css"

function Checkin() {
    const [startDate, setStartDate] = useState(false)
    return (
        <div className=" relative flex items-center justify-end w-full h-full ">
            <div className="absolute z-10 mr-4">
                <BsCalendar className="text-base" />
            </div>
            <DatePicker
                className="w-full h-full lg:w-51 sm:w-159.5 md:w-191.5 p-4"
                selected={startDate}
                onChange={date => setStartDate(date)}
                placeholderText="Checkin"
            />
        </div>
    );
}

export default Checkin