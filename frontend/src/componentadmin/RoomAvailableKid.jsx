import banner2 from "./../assets/img/banner2.jpg"

export default function RoomAvailableKid({ Img, roomName, roomType, roomPrice }) {
    return (
        <div className="bg-gray-50 w-[210px] h-[200px] relative">
            <img src={banner2} className="w-[190px] h-[120px] absolute top-2 left-2.5" alt={roomName} />
            <h2 className="font-semibold text-lg absolute bottom-10 left-2">{roomName}</h2>
            <p className="text-sm text-shadow-yellow-700 absolute bottom-5 left-2">{roomType}</p>
            <p className="bg-yellow-600 text-amber-50 text-sm px-3 rounded-lg transition-transform duration-300 hover:-translate-y-2 absolute right-3 bottom-4">{roomPrice}</p>
        </div>
    );
}