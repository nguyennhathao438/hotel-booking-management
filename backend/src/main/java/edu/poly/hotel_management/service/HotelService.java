package edu.poly.hotel_management.service;

import edu.poly.hotel_management.dto.request.HotelCreationRequest;
import edu.poly.hotel_management.dto.respone.HotelRespone;
import edu.poly.hotel_management.entity.Hotel;
import edu.poly.hotel_management.exception.AppException;
import edu.poly.hotel_management.exception.ErrorCode;
import edu.poly.hotel_management.mapper.HotelMapper;
import edu.poly.hotel_management.respository.HotelRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class HotelService {
    @Autowired
    private HotelMapper mapper;
    @Autowired
    private HotelRespository respository;
    public HotelRespone insertHotel(@RequestBody HotelCreationRequest request){
        Hotel ht = mapper.toHotel(request);
        return mapper.toHotelRespone(respository.save(ht));
    }
    public HotelRespone findHotelById(int id){
        return mapper.toHotelRespone(respository.findById(id).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED)));
    }
    public List<Hotel> findAllHotel(){
        return respository.findAll();
    }
}
