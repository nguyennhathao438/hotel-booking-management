package com.hotelbooking.hotel_booking.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ImgRoomRequest {
    int id;
    String imgUrl;
    int roomId;
}
