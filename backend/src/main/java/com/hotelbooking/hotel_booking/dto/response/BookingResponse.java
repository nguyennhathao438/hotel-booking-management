package com.hotelbooking.hotel_booking.dto.response;

import com.hotelbooking.hotel_booking.entity.Room;
import com.hotelbooking.hotel_booking.entity.User;
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
public class BookingResponse {
    private int id;
    private int adults;
    private int children;
    private int totalPerson;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Room room;
    private User user;
}
