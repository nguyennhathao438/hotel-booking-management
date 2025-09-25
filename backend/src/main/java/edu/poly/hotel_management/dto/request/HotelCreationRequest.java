package edu.poly.hotel_management.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotelCreationRequest {
    private String hotelName;
    private String hotelAddress;
    private double hotelPrice;
    private String hotelDescription;
    private  String hotelEmail;
}
