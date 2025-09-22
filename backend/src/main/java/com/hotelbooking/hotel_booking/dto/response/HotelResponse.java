package com.hotelbooking.hotel_booking.dto.response;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HotelResponse {
    Integer hotelId;
    String hotelName;
    String hotelAddress;
    String hotelPhone;
    Double hotelRating;
    @Column(name = "hotel_total", nullable = false)
    Double hotelTotalRoom;
    Double hotelCost;
    String hotelDescription;
    Integer status;
    UserResponse user;
}
