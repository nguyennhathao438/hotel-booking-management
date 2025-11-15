package com.hotelbooking.hotel_booking.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HotelRequest {
    @NotBlank(message = "Tên khách sạn không được để trống")
    @Size(max = 255, message = "Tên khách sạn không được dài quá 255 ký tự")
    private String hotelName;

    @NotBlank(message = "Địa chỉ khách sạn không được để trống")
    private String hotelAddress;

    @Pattern(regexp = "\\d{10,15}", message = "Số điện thoại không hợp lệ")
    private String hotelPhone;

    @DecimalMin(value = "0.0", inclusive = true, message = "Đánh giá không được âm")
    @DecimalMax(value = "5.0", inclusive = true, message = "Đánh giá không vượt quá 5")
    private Double hotelRating;

    @NotNull(message = "Tổng số phòng không được để trống")
    @Positive(message = "Tổng số phòng phải lớn hơn 0")
    private Double hotelTotalRoom;

    @PositiveOrZero(message = "Giá phòng phải >= 0")
    private Double hotelCost;

    @Size(max = 1000, message = "Mô tả không được dài quá 1000 ký tự")
    private String hotelDescription;

    private Integer status;
    private Integer userId;
}
