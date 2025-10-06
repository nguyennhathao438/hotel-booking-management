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
    Integer roomId;

    @Column(nullable = false)
    String roomName;

    String roomType;

    Integer roomCapacity;

    @Column(nullable = false)
    Integer bedCount;

    @Column(nullable = false)
    Double roomPrice;

    @CreationTimestamp
    LocalDateTime roomCreateAt;

    @UpdateTimestamp
    LocalDateTime roomUpdateAt;
    Integer status;
    @ManyToOne
    @JoinColumn(name = "hotelID", nullable = true)
    Hotel hotel;
}
