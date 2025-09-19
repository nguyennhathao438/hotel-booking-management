package com.hotelbooking.hotel_booking.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserRegisterRequest {
    @Email(message = "Phải đúng định dạng email")
    private String email;
    @Size(min = 8 , message = "Mật khẩu phải từ 8 ký tự trở lên ")
    private String password;
    @NotBlank(message = "Họ không được để trống")
    private String fistName;
    @NotBlank(message = "Tên không được để trống")
    private String lastName;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFistName() {
        return fistName;
    }

    public void setFistName(String fistName) {
        this.fistName = fistName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
