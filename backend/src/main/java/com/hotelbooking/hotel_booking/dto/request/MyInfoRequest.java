package com.hotelbooking.hotel_booking.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MyInfoRequest {
    @NotBlank(message = "Họ không được để trống")
    String firstName;
    @NotBlank(message = "Tên không được để trống")
    String lastName;
    @Pattern(regexp = "0\\d{9,10}", message = "Số điện thoại không hợp lệ")
    String phone;
    LocalDate dateOfBirth;
    MultipartFile file;
}
