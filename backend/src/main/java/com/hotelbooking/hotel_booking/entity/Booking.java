package com.hotelbooking.hotel_booking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    private int adults;
    private int children;
    private int totalPerson;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name="room_id")
    private Room room;
    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

}
