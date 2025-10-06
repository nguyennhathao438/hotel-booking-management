import ItemHeader from "./ItemHeader.jsx";
import Customers from "../pages/Customers.jsx";
import RoomAvailable from "../pages/RoomAvailable.jsx";
import SideBar from "./SideBar.jsx";
import { BedDoubleIcon, ShoppingCartIcon, BellRingIcon ,MessageCircleQuestionIcon,CircleDollarSignIcon} from "lucide-react";
import RoomAvailableKid from "./RoomAvailableKid.jsx";
import { detailbookings, rooms } from "../data.js";
import ItemRoom from "./ItemRoom.jsx";
export default function DashBoard(){

    return( 
        <div className="bg-gray-300 ml-[300px] w-full">

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 px-7 py-8 ">
                <ItemHeader
                    Icon ={BedDoubleIcon}
                    title="Available Rooms"
                    value="35"
                    detail="VIEW DETAILS"
                />
                <ItemHeader
                    Icon ={ShoppingCartIcon}
                    title="Today Checkout"
                    value="15"
                    detail="VIEW DETAILS"
                />
                <ItemHeader
                    Icon ={BellRingIcon}
                    title="Cancellation"
                    value="25"
                    detail="VIEW DETAILS"
                />
                <ItemHeader
                    Icon ={MessageCircleQuestionIcon}
                    title="Enquiries"
                    value="21"
                    detail="VIEW DETAILS"
                />
                <ItemHeader
                    Icon ={CircleDollarSignIcon}
                    title="Pending Payments"
                    value="08"
                    detail="VIEW DETAILS"
                />
            </div>
            <div className="bg-gray-100 ml-7 mr-10">
                <div className="w-full h-[400px]">
                    <h2>Booking Status</h2>
                </div>
            </div>

            <div className="px-7 py-4">
                <h2 className="text-lg py-2">Available Rooms</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 ">
                   {rooms.map((room,index) => (
                    <RoomAvailableKid key={index} {...room}/>
                   ))}          
                </div>
            </div>

            <div className="">
                <h2 className="text-lg bg-gray-100 text-black font-bold p-3 ml-7 mr-10">Booking Details</h2>
                <div className="mt-3">
                    <div className="text-md grid-cols-7 flex justify-center text-center">
                        <p>Booking Date</p>
                        <p>Customer</p>
                        <p>Persons</p>
                        <p>Phone</p>
                        <p className="mr-6">Check-in</p>
                        <p className="mr-7">Check-out</p>
                        <p className="mr-3">Payment</p>
                    </div>
                    <div className="py-3">
                        {detailbookings.map((detailbooking,index) => (
                            <ItemRoom key={index} {...detailbooking}/>
                        ))}
                    </div>
                </div>
            </div>

        </div>

    );
};