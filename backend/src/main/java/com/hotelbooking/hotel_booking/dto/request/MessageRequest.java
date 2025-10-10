package com.hotelbooking.hotel_booking.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MessageRequest {
    int senderId;
    int receiverId;
    @NotBlank(message = "không thể gửi khi chưa có nội dung")
    String content;
}
