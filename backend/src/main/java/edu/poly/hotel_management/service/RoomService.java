package edu.poly.hotel_management.service;

import edu.poly.hotel_management.dto.request.RoomCreationRequest;
import edu.poly.hotel_management.dto.respone.HotelRespone;
import edu.poly.hotel_management.dto.respone.RoomRespone;
import edu.poly.hotel_management.entity.Hotel;
import edu.poly.hotel_management.entity.Room;
import edu.poly.hotel_management.exception.AppException;
import edu.poly.hotel_management.exception.ErrorCode;
import edu.poly.hotel_management.mapper.RoomMapper;
import edu.poly.hotel_management.respository.HotelRespository;
import edu.poly.hotel_management.respository.RoomRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
    @Autowired
    private RoomRespository respository;
    @Autowired
    private RoomMapper mapper;
    @Autowired
    private HotelRespository hotelRespository;
    public RoomRespone insertRoom(RoomCreationRequest request){
        Room room = mapper.toRoom(request);
        Hotel ht = hotelRespository.findById(request.getHotelId()).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        // Gán Hotel vào Room
        room.setHotel(ht);
        return mapper.toRoomRespone(respository.save(room));
    }
    public RoomRespone getRoomById(int id){
        return mapper.toRoomRespone(respository.findById(id).orElseThrow(() ->new AppException(ErrorCode.USER_NOT_EXISTED)));
    }
}
