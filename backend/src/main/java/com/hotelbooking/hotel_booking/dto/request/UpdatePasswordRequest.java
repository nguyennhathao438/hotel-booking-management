package com.hotelbooking.hotel_booking.dto.request;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdatePasswordRequest {
    String password;
    @Size(min = 8 , message = "Mật khẩu phải từ 8 ký tự trở lên ")
    String passwordnew1;
    String passwordnew2;
}
