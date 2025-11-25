package com.hotelbooking.hotel_booking.dto.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequest {

    @NotBlank(message = "Tên phòng không được để trống")
    @Size(max = 255, message = "Tên phòng không được dài quá 255 ký tự")
    private String roomName;

    @NotBlank(message = "Loại phòng không được để trống")
    @Size(max = 100, message = "Loại phòng không được dài quá 100 ký tự")
    private String roomType;

    @Min(value = 1, message = "Sức chứa phòng phải lớn hơn 0")
    private int roomCapacity;

    @Positive(message = "Diện tích phòng phải lớn hơn 0")
    private Double roomArea;

    @Min(value = 0, message = "Số phòng ngủ phải >= 0")
    private Integer bedRoomCount;

    @Min(value = 0, message = "Số giường phải >= 0")
    private Integer bedCount;

    @PositiveOrZero(message = "Giá phòng phải >= 0")
    private Double roomPrice;

    private int status;

    private int hotelID;
}
