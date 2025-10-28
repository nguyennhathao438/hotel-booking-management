package com.hotelbooking.hotel_booking.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReviewRequest {
    int hotelId;
    int userId;
    int invoiceId;
    String feedback;
    @Min(value = 0 , message = "Sao phải ừ 0->5")
    @Max(value = 5 , message = "Sao phải ừ 0->5")
    int star;
}
