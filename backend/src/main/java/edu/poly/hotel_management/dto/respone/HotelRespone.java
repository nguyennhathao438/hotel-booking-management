package edu.poly.hotel_management.dto.respone;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class HotelRespone {
    private int hotelId;
    private String hotelName;
    private String hotelAddress;
    private double hotelPrice;
    private String hotelDescription;
    private  String hotelEmail;
}
