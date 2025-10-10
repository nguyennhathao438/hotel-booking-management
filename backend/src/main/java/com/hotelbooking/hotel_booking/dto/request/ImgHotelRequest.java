package com.hotelbooking.hotel_booking.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImgHotelRequest {
    private String imgUrl;
    private int hotelId;
}
