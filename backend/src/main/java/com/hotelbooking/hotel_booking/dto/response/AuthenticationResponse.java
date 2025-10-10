package com.hotelbooking.hotel_booking.dto.response;

<<<<<<< HEAD
import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

=======
import lombok.*;
import lombok.experimental.FieldDefaults;

>>>>>>> 8073ad60180736bb716b2d7ab6ae03f290d4ba37
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String token;
    boolean authenticated;
<<<<<<< HEAD
    int userId;
    String firstName;
    String lastName;
    String avatar;
    Set<Role> roles;
=======
>>>>>>> 8073ad60180736bb716b2d7ab6ae03f290d4ba37
}
