package com.hotelbooking.hotel_booking.dto.response;

import com.hotelbooking.hotel_booking.entity.Hotel;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceResponse {
    Integer serviceId;
    String icon;
    String description;
    HotelResponse hotel;
}