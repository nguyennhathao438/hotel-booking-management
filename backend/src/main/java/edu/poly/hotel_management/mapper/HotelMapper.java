package edu.poly.hotel_management.mapper;

import edu.poly.hotel_management.dto.request.HotelCreationRequest;
import edu.poly.hotel_management.dto.respone.HotelRespone;
import edu.poly.hotel_management.entity.Hotel;
import org.mapstruct.Mapper;

@Mapper (componentModel = "spring")
public interface HotelMapper {
    public Hotel toHotel (HotelCreationRequest request);
    public HotelRespone toHotelRespone (Hotel ht);
}
