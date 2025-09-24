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
    private Integer roomId;
    private String roomName;
    private String roomType;
    private Integer roomCapacity;
    private Integer bedCount;
    private Double roomPrice;
    private String ownerName;
    private LocalDateTime roomCreateAt;
    private LocalDateTime roomUpdateAt;
    private Integer status;
    HotelResponse hotel;
}
