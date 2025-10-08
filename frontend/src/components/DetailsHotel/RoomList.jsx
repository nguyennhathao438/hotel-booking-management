// src/components/DetailsHotel/RoomList.jsx
import React from "react";
import RoomCard from "./RoomCard";

export default function RoomList({ rooms }) {
    return (
        <div className="w-[90%] m-auto">
            {rooms.map((room) => (
                <RoomCard key={room.roomId} room={room} />
            ))}
        </div>
    );
}
