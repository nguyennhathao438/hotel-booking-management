package com.hotelbooking.hotel_booking.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int roomId;
    @Column(nullable = false)
    String roomName;
    String roomType;
    double roomArea;
    int bedRoomCount;
    int roomCapacity;
    @Column(nullable = false)
    int bedCount;
    @Column(nullable = false)
    double roomPrice;
    @CreationTimestamp
    LocalDateTime roomCreateAt;
    @UpdateTimestamp
    LocalDateTime roomUpdateAt;
    int status;
    @ManyToOne
    @JoinColumn(name = "hotelID", nullable = true)
    Hotel hotel;
}
