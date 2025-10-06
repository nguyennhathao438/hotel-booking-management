import roseHotel from "../assets/img/roseHotel.jpg"

export default function RoomAvailable(){
    return(
        <div className="bg-gray-300 ml-[300px] w-full">
                    <h1 className="m-10 text-2xl font-bold">Rooms</h1>
                    <div className="bg-white rounded-md m-10 flex">
                        <div className="w-max">
                            <div className="flex w-[600px] relative">
                            <span className="absolute left-5 top-6  text-gray-500">🔍</span>
                                <input type="text" placeholder="      Search room type, number, etc" className="bg-gray-200 h-[30px] w-[250px] rounded-sm text-sm m-5"></input>
                                <button className="bg-yellow-100 w-[100px] h-[30px] rounded-md text-sm font-bold absolute top-5 right-3">AddRoom</button>
                            </div>
                            <div className="border-3 border-gray-200 rounded-2xl flex m-3">
                                <img src={roseHotel} className="w-[180px] h-[140px] rounded-lg m-4"></img>
                                <div className="m-4 relative w-full">
                                    <h1 className="text-3xl font-bold">Standard</h1>
                                    <p className="absolute right-1 top-1 bg-green-300 font-bold rounded-lg px-1 py-1 text-sm">Available</p>
                                    <p className="absolute top-9 left-1">description</p>
                                    <p className="absolute bottom-1 right-1">
                                        <span className="text-2xl font-bold">$100</span>
                                        <span className="text-base font-semibold">/night</span>
                                    </p>
                                    <p className="absolute bottom-2 ">Availability:</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-red-500 fixed ml-[600px]">
                            <div>
                                <h2>Room Detail</h2>
                                <button>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
    );
}