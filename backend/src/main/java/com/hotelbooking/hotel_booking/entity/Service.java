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
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer serviceId;
    private String name;
    private String icon;
    private String description;
    @ManyToOne
    @JoinColumn(name = "hotelId")
    private Hotel hotel;
}
