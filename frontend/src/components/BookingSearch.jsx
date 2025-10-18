import Checkin from "./Checkin";
import Checkout from "./Checkout";
import Adults from "./Adults";
import Kids from "./Kid";
import Province from "./Province";
import { Context } from "./RoomContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
function BookingSearch() {
    const { checkInDate, checkOutDate, province } = useContext(Context);
    console.log("province hahaha", typeof province)
    console.log("checkInDate", checkInDate)
    console.log("checkOutdate", checkOutDate)
    return (
        <form className="h-[300px] w-full lg:h-[90px] flex flex-col lg:flex-row ">
            <div className="border-r flex-1 border-b">
                <Province />
            </div>
            <div className="flex-1 border-r px-3 py-1 border-b">
                <Checkin />
            </div>
            <div className="flex-1 border-r border-b px-3 py-1 ">
                <Checkout />
            </div>
            {/* <div className="flex-1 border-r border-b ">
                <Adults />
            </div>
            <div className="flex-1 border-r border-b ">
                <Kids />
            </div> */}
            <Link className="flex-1" to={`/search-result/${province}`}>
                <button type="submit" className="bg-[#d2b48c] w-full h-full flex-1 cursor-pointer">
                    CHECK NOW
                </button>
            </Link>
        </form>
    );

}
export default BookingSearch