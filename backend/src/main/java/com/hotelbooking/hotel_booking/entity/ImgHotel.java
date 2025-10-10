package com.hotelbooking.hotel_booking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class ImgHotel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int imgHotelId;
    private String imgUrl;
    @ManyToOne
    @JoinColumn(name="hotel_id")
    private Hotel hotel;
}
