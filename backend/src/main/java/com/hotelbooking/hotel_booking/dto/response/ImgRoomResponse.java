package com.hotelbooking.hotel_booking.dto.response;

import com.hotelbooking.hotel_booking.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ImgRoomResponse {
    int id;
    String imgUrl;
    int roomId;
}
