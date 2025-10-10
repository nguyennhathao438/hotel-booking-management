package com.hotelbooking.hotel_booking.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequest {
    private String roomName;
    private String roomType;
    private int roomCapacity;
    private double roomArea;
    private int bedRoomCount;
    private int bedCount;
    private double roomPrice;
    private int status;
    private int hotelID;
}

