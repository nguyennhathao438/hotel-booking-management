package com.hotelbooking.hotel_booking.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MessageResponse {
    int senderId;
    int receiverId;
    String content;
    LocalDateTime createAt;
}
