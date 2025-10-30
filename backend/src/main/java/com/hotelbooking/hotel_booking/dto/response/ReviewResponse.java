package com.hotelbooking.hotel_booking.dto.response;

import com.hotelbooking.hotel_booking.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewResponse {
    int id;
    HotelResponse hotel;
    UserResponse user;
    InvoiceResponse invoice;
    String feedback;
    int star;
    LocalDateTime createAt;
}
