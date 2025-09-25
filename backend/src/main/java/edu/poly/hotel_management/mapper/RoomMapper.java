package edu.poly.hotel_management.mapper;

import edu.poly.hotel_management.dto.request.RoomCreationRequest;
import edu.poly.hotel_management.dto.respone.RoomRespone;
import edu.poly.hotel_management.entity.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    public Room toRoom(RoomCreationRequest request);
    @Mapping(source = "hotel.hotelId", target = "hotelId")
    @Mapping(source = "hotel.hotelName", target = "hotelName")
    @Mapping(source = "hotel.hotelAddress", target = "hotelAddress")
    public RoomRespone toRoomRespone(Room room);
}
