package edu.poly.hotel_management.dto.respone;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomRespone {
    private int roomId;
    private String roomName;
    private int capacity;
    private double price;
    private int roomCount;
    private int bedCount;
    private int hotelId;
    private String hotelName;
    private String hotelAddress;
}
