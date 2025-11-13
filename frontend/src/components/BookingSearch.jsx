import Checkin from "./Checkin";
import Checkout from "./Checkout";
import Province from "./Province";
import { Context } from "./RoomContext";
import {useNavigate } from "react-router-dom";
import api from "../api";
import { useContext } from "react";
function BookingSearch() {
    const { checkInDate, checkOutDate, province } = useContext(Context);// eslint-disable-line no-unused-vars
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const respone = await api.get(`/hotels/search/${encodeURIComponent(province)}`)
        const hotelProvinceTemp = respone.data.result;
        navigate(`/search-result/${province}`, {
            state: { hotelProvince: hotelProvinceTemp }
        })
    }

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
            {/* <Link className="flex-1" to={`/search-result/${province}`}>
                <button type="submit" className="bg-[#d2b48c] w-full h-full flex-1 cursor-pointer">
                    CHECK NOW
                </button>
            </Link> */}

            <button onClick={(e)=>handleSubmit(e)} type="submit" className="bg-[#d2b48c] w-full h-full flex-1 cursor-pointer">
                CHECK NOW
            </button>
        </form>
    );

}
export default BookingSearch