package edu.poly.hotel_management.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomCreationRequest {
    private String roomName;
    private int capacity;
    private double price;
    private int roomCount;
    private int bedCount;
    private int hotelId;
}
