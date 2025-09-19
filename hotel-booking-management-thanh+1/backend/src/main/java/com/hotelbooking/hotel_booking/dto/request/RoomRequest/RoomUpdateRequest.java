package com.hotelbooking.hotel_booking.dto.request.RoomRequest;

import com.hotelbooking.hotel_booking.entity.User;
import jakarta.validation.constraints.NotBlank;

public class RoomUpdateRequest {
    public String getRoomName() {
        return roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    @NotBlank(message = "Tên phòng không được để trống")
    private String roomName;
   @NotBlank(message = "Vui lòng nhập kiểu phòng")
    private String roomType;
   private String roomCapacity;
   private int bedCount;
   private double roomPrice;
private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public double getRoomPrice() {
        return roomPrice;
    }

    public void setRoomPrice(double roomPrice) {
        this.roomPrice = roomPrice;
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
}
