package com.hotelbooking.hotel_booking.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VnpayResponse {
    public String code;
    public String message;
    public String paymentUrl;
}
