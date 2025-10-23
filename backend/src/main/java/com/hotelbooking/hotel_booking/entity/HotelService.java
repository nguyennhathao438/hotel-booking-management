package com.hotelbooking.hotel_booking.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HotelService {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer serviceId;
    private String icon;
    private String description;
    @ManyToOne
    @JoinColumn(name="hotel_id")
    private Hotel hotel;
}
