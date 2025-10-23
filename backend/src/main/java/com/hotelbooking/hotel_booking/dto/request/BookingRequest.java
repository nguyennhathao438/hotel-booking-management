package com.hotelbooking.hotel_booking.dto.request;


import com.hotelbooking.hotel_booking.entity.Room;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequest {
    private int adults;
    private int children;
    private int totalPerson;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private int roomId;
    private int userId;
}
