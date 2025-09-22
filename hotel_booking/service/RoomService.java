package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.RoomRequest;
import com.hotelbooking.hotel_booking.dto.response.HotelResponse;
import com.hotelbooking.hotel_booking.dto.response.RoomResponse;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.Room;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.hotelbooking.hotel_booking.service.UserSevice.mapToUserResponse;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomService {

    private RoomRepository roomRepository;
    private HotelRepository hotelRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository, HotelRepository hotelRepository) {
        this.roomRepository = roomRepository;
        this.hotelRepository = hotelRepository;
    }

    public RoomResponse createRoom(RoomRequest request) {
        if (roomRepository.existsByRoomName(request.getRoomName())) {
            throw new AppException(ErrorCode.ROOM_EXISTED);
        }

        Hotel hotel = hotelRepository.findById(request.getHotelID())
                .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));

        Room room = Room.builder()
                .roomName(request.getRoomName())
                .roomType(request.getRoomType())
                .roomCapacity(request.getRoomCapacity())
                .bedCount(request.getBedCount())
                .roomPrice(request.getRoomPrice())
                .status(0)
                .hotel(hotel)
                .build();

        roomRepository.save(room);

        return mapToRoomResponse(room);
    }

    public List<RoomResponse> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::mapToRoomResponse)
                .toList();
    }

    public RoomResponse getRoomById(int id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
        return mapToRoomResponse(room);
    }

    public RoomResponse updateRoom(int id, RoomRequest request) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));

        if (request.getRoomName() != null && !request.getRoomName().isBlank())
            room.setRoomName(request.getRoomName());
        if (request.getRoomType() != null)
            room.setRoomType(request.getRoomType());
        if (request.getRoomCapacity() != null)
            room.setRoomCapacity(request.getRoomCapacity());
        if (request.getBedCount() != null)
            room.setBedCount(request.getBedCount());
        if (request.getRoomPrice() != null)
            room.setRoomPrice(request.getRoomPrice());
        if (request.getStatus() != null)
            room.setStatus(request.getStatus());
        if (request.getHotelID() != null) {
            Hotel hotel = hotelRepository.findById(request.getHotelID())
                    .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
            room.setHotel(hotel);
        }

        roomRepository.save(room);

        return mapToRoomResponse(room);
    }

    public void deleteRoom(Integer id) {
        if (!roomRepository.existsById(id)) {
            throw new AppException(ErrorCode.ROOM_NOT_EXISTED);
        }
        roomRepository.deleteById(id);
    }

    private RoomResponse mapToRoomResponse(Room room) {
        return RoomResponse.builder()
                .roomId(room.getRoomId())
                .roomName(room.getRoomName())
                .roomType(room.getRoomType())
                .roomCapacity(room.getRoomCapacity())
                .bedCount(room.getBedCount())
                .roomPrice(room.getRoomPrice())
                .status(room.getStatus())
                .hotel(room.getHotel() != null ? mapToHotelResponse(room.getHotel()) : null)
                .roomCreateAt(room.getRoomCreateAt())
                .roomUpdateAt(room.getRoomUpdateAt())
                .build();
    }
    private HotelResponse mapToHotelResponse(Hotel hotel) {
        if (hotel == null) return null;

        return HotelResponse.builder()
                .hotelId(hotel.getHotelId())
                .hotelName(hotel.getHotelName())
                .hotelAddress(hotel.getHotelAddress())
                .hotelPhone(hotel.getHotelPhone())
                .hotelRating(hotel.getHotelRating())
                .hotelTotalRoom(hotel.getHotelTotalRoom())
                .hotelCost(hotel.getHotelCost())
                .hotelDescription(hotel.getHotelDescription())
                .status(hotel.getStatus())
                .user(hotel.getUser() != null ? mapToUserResponse(hotel.getUser()) : null)
                .build();
    }
}
