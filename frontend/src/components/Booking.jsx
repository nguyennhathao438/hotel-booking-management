import Checkin from "./Checkin";
import Checkout from "./Checkout";
import Adults from "./Adults";
import Kids from "./Kid";
import { Context } from "./RoomContext";
import { useContext } from "react";

function Booking() {
    const context = useContext(Context)
    return (
        <form className="h-[300px] w-full lg:h-[70px] flex flex-col lg:flex-row ">
            <div className="border-r flex-1 border-b">
                <p>Tỉnh thành</p>
            </div>
            <div className="flex-1 border-r border-b">
                <Checkin />
            </div>
            <div className="flex-1 border-r border-b ">
                <Checkout />
            </div>
            <div className="flex-1 border-r border-b ">
                <Adults />
            </div>
            <div className="flex-1 border-r border-b ">
                <Kids />
            </div>

            <button type="submit" onClick={context.handleClick} className="bg-[#d2b48c] flex-1 cursor-pointer">
                CHECK NOW
            </button>
        </form>
    );

}
export default Booking