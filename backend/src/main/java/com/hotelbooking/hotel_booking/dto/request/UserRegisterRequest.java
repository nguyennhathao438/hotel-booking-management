package com.hotelbooking.hotel_booking.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRegisterRequest {
    @Email(message = "Phải đúng định dạng email")
     String email;
    @Size(min = 8 , message = "Mật khẩu phải từ 8 ký tự trở lên ")
    String password;
    @NotBlank(message = "Họ không được để trống")
    String firstName;
    @NotBlank(message = "Tên không được để trống")
    String lastName;


}
