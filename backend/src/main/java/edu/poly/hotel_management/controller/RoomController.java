package edu.poly.hotel_management.controller;

import edu.poly.hotel_management.dto.request.RoomCreationRequest;
import edu.poly.hotel_management.dto.respone.ApiRespone;
import edu.poly.hotel_management.dto.respone.RoomRespone;
import edu.poly.hotel_management.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;
    @PostMapping
    public ApiRespone<RoomRespone> insertRoom(@RequestBody RoomCreationRequest request){
        ApiRespone<RoomRespone> api = new ApiRespone<RoomRespone>();
        api.setResult(roomService.insertRoom(request));
        return api;
    }
    @GetMapping("/{id}")
    public ApiRespone<RoomRespone> getRoomById(@PathVariable int id){
        ApiRespone<RoomRespone> api = new ApiRespone<RoomRespone>();
        api.setResult(roomService.getRoomById(id));
        return api;
    }
}
