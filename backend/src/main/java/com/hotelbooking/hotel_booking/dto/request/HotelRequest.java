package com.hotelbooking.hotel_booking.dto.request;

import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HotelRequest {
    private String hotelName;
    private String hotelAddress;
    private String hotelPhone;
    private Double hotelRating;
    @Column(name = "hotel_total", nullable = false)
    private Double hotelTotalRoom;
    private Double hotelCost;
    private String hotelDescription;
    private Integer status;
    private Integer userId;
}
