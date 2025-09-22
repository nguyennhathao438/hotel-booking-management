package com.hotelbooking.hotel_booking.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class InvoiceRequest {

        private LocalDate checkInDate;
        private LocalDate checkOutDate;
        private Double totalAmount;
        private Integer payment;
        private Integer status;
        private Integer roomId;
        private Integer userId;
}
