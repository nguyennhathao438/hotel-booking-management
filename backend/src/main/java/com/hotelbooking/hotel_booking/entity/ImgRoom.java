package com.hotelbooking.hotel_booking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ImgRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String imgUrl;
    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;
}
