package com.hotelbooking.hotel_booking.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int roomId;

    @Column(nullable = false)
    private String roomName;

    private String roomType;

    private String roomCapacity;

    @Column(nullable = false)
    private int bedCount;

    @CreationTimestamp
    private LocalDateTime roomCreateAt;

    @UpdateTimestamp
    private LocalDateTime roomUpdateAt;

    @Column(nullable = false)
    private double roomPrice;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = true)
    private User user;

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public String getRoomCapacity() {
        return roomCapacity;
    }

    public void setRoomCapacity(String roomCapacity) {
        this.roomCapacity = roomCapacity;
    }

    public int getBedCount() {
        return bedCount;
    }

    public void setBedCount(int bedCount) {
        this.bedCount = bedCount;
    }

    public LocalDateTime getRoomCreateAt() {
        return roomCreateAt;
    }

    public void setRoomCreateAt(LocalDateTime roomCreateAt) {
        this.roomCreateAt = roomCreateAt;
    }

    public LocalDateTime getRoomUpdateAt() {
        return roomUpdateAt;
    }

    public void setRoomUpdateAt(LocalDateTime roomUpdateAt) {
        this.roomUpdateAt = roomUpdateAt;
    }

    public double getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(double roomPrice) {
        this.roomPrice = roomPrice;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
