package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.RoomRequest.RoomRegisterRequest;
import com.hotelbooking.hotel_booking.dto.request.RoomRequest.RoomUpdateRequest;
import com.hotelbooking.hotel_booking.entity.Room;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;
    public Room registerRoom(RoomRegisterRequest request) {
        if (roomRepository.existsByRoomName(request.getRoomName())) {
            throw new AppException(ErrorCode.ROOM_EXISTED);
        }

        Room room = new Room();
        room.setRoomName(request.getRoomName());
        room.setRoomType(request.getRoomType());
        room.setRoomCapacity(request.getRoomCapacity());
        room.setRoomPrice(request.getRoomPrice());

        return roomRepository.save(room);
    }

    // Lấy tất cả phòng
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }
    // Tìm phòng theo ID
    public Room getRoomById(int id) {
        return roomRepository.findById(id).orElseThrow(()->new RuntimeException("Không tìm thấy phòng"));
    }
    // Thêm mới phòng
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }
    // Cập nhật phòng
    public Room updateRoom(RoomUpdateRequest request, int  roomID) {
        Room room = getRoomById(roomID);
                    room.setRoomName(request.getRoomName());
                    room.setRoomType(request.getRoomType());
                    room.setRoomCapacity(request.getRoomCapacity());
                    room.setBedCount(request.getBedCount());
                    room.setRoomPrice(request.getRoomPrice());
                    room.setUser(request.getUser());
                    return roomRepository.save(room);
    }
    // Xóa phòng
    public void deleteRoom(Integer id) {
        roomRepository.deleteById(id);
    }
}
