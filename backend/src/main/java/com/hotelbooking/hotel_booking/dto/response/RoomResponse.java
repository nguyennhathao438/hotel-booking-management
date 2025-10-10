package com.hotelbooking.hotel_booking.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomResponse {
    private int roomId;
    private String roomName;
    private String roomType;
    private int roomCapacity;
    private double roomArea;
    private int bedRoomCount;
    private int bedCount;
    private double roomPrice;
    private String ownerName;
    private LocalDateTime roomCreateAt;
    private LocalDateTime roomUpdateAt;
    private int status;
    HotelResponse hotel;
}
