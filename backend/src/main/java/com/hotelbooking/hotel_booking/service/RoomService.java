package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.RoomRequest;
import com.hotelbooking.hotel_booking.dto.response.HotelResponse;
import com.hotelbooking.hotel_booking.dto.response.RoomResponse;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.Room;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.InvoiceRepository;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static com.hotelbooking.hotel_booking.service.UserSevice.mapToUserResponse;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private HotelRepository hotelRepository;
@Autowired
private InvoiceRepository invoiceRepository;

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
                .roomArea(request.getRoomArea())
                .bedRoomCount(request.getBedRoomCount())
                .bedCount(request.getBedCount())
                .roomPrice(request.getRoomPrice())
                .status(1)
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
    public List<RoomResponse> getRoomsByHotelId(int hotelId) {
        List<Room> rooms = roomRepository.findAllByHotel_HotelId(hotelId);

        List<Room> availableRooms = rooms.stream()
                .filter(room -> !invoiceRepository.existsByRoom_RoomId(room.getRoomId()))
                .toList();

        return availableRooms.stream()
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
        if (request.getRoomName() != null && !request.getRoomName().isBlank()) {
            room.setRoomName(request.getRoomName());
        }
        if (request.getRoomType() != null) {
            room.setRoomType(request.getRoomType());
        }
        if (request.getRoomCapacity() > 0) {
            room.setRoomCapacity(request.getRoomCapacity());
        }
        if (request.getBedCount() > 0) {
            room.setBedCount(request.getBedCount());
        }
        if (request.getRoomPrice() > 0) {
            room.setRoomPrice(request.getRoomPrice());
        }
        if (request.getStatus() >= 0) {
            room.setStatus(request.getStatus());
        }
        if (request.getHotelID() > 0) {
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
    public List<RoomResponse> getAvailableRooms(LocalDate startDate, LocalDate endDate) {
        return roomRepository.findAvailableRooms(startDate, endDate)
                .stream()
                .map(this::mapToRoomResponse)
                .collect(Collectors.toList());
    }

    public long countAvailableRooms(LocalDate startDate, LocalDate endDate) {
        return roomRepository.countAvailableRooms(startDate, endDate);
    }
    private RoomResponse mapToRoomResponse(Room room) {
        if (room == null) return null;

        RoomResponse.RoomResponseBuilder builder = RoomResponse.builder()
                .roomId(room.getRoomId())
                .roomName(room.getRoomName())
                .roomType(room.getRoomType())
                .roomCapacity(room.getRoomCapacity())
                .roomArea(room.getRoomArea())
                .bedRoomCount(room.getBedRoomCount())
                .bedCount(room.getBedCount())
                .roomPrice(room.getRoomPrice())
                .status(room.getStatus())
                .roomCreateAt(room.getRoomCreateAt())
                .roomUpdateAt(room.getRoomUpdateAt());

        if (room.getHotel() != null) {
            builder.hotel(mapToHotelResponse(room.getHotel()));
        }

        return builder.build();
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