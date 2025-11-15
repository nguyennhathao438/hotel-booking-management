package com.hotelbooking.hotel_booking.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServiceRequest {
    Integer serviceId;

    @NotBlank(message = "Tên dịch vụ không được để trống")
    String serviceName;

    String description;
    String icon;

    @NotNull(message = "Giá dịch vụ không được null")
    Double price;

    @NotNull(message = "HotelID không được null")
    Integer hotelID;
}
