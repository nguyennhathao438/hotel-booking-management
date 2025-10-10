package com.hotelbooking.hotel_booking.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewResponse {
    int hotelId;
    int userId;
    String feedback;
    int star;
    LocalDateTime createAt;
}
