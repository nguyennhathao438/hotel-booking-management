package com.hotelbooking.hotel_booking.dto.response;


import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String accessToken;
    String refreshToken;
    boolean authenticated;
    int userId;
    String firstName;
    String lastName;
    String avatar;
    Set<Role> roles;
}
