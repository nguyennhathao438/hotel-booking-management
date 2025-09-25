package edu.poly.hotel_management.controller;

import edu.poly.hotel_management.dto.request.HotelCreationRequest;
import edu.poly.hotel_management.dto.respone.ApiRespone;
import edu.poly.hotel_management.dto.respone.HotelRespone;
import edu.poly.hotel_management.entity.Hotel;
import edu.poly.hotel_management.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/hotels")
public class HotelController {
    @Autowired
    private HotelService hotelService;
    @PostMapping
    public ApiRespone<HotelRespone> insertHotel(@RequestBody HotelCreationRequest request){
        ApiRespone<HotelRespone> api = new ApiRespone<HotelRespone>();
        api.setResult(hotelService.insertHotel(request));
        return api;
    }
    @GetMapping("/{id}")
    public ApiRespone<HotelRespone> findHotelById(@PathVariable int id){
        ApiRespone<HotelRespone> api = new ApiRespone<HotelRespone>();
        api.setResult(hotelService.findHotelById(id));
        return api;
    }
    @GetMapping
    public List<Hotel> getHotels(){
        return hotelService.findAllHotel();
    }
}
