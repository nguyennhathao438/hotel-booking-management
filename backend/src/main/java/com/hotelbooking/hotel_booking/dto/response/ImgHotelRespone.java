package com.hotelbooking.hotel_booking.dto.response;

import com.hotelbooking.hotel_booking.entity.Hotel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImgHotelRespone {
    private int imgHotelId;
    private String imgUrl;
    private Hotel hotel;
}
