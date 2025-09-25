package edu.poly.hotel_management.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Room {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int roomId;
    private String roomName;
    private int capacity;
    private double price;
    private int roomCount;
    private int bedCount;
    @ManyToOne
    @JoinColumn(name = "hotel_id") // tên cột khóa ngoại trong bảng Room
    private Hotel hotel;
}
