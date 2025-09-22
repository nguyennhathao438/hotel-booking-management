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
    private Integer roomCapacity;
    private Integer bedCount;
    private Double roomPrice;
    private Integer status;
    private Integer hotelID;
}

