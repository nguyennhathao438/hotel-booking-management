package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.RoomRequest;
import com.hotelbooking.hotel_booking.dto.response.RoomResponse;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.Invoice;
import com.hotelbooking.hotel_booking.entity.Room;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
///noite van con 1 vai cho như Double
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class RoomServiceTest {

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User testUser;
    private Hotel testHotel;

    @BeforeEach
    void setup() {
        testUser = User.builder()
                .email("user@test.com")
                .password(passwordEncoder.encode("123456"))
                .roles(Set.of())
                .build();
        userRepository.save(testUser);

        testHotel = Hotel.builder()
                .hotelName("Test Hotel")
                .user(testUser)
                .hotelTotalRoom(50.0)
                .hotelCost(200.0)
                .status(1)
                .build();
        hotelRepository.save(testHotel);
    }
//Háp pi path--------------------------------------------------------------------------------------------------------------------------
    @Test
    @DisplayName("Tạo phòng thành công")
    @WithMockUser(username = "user@test.com", authorities = {"ADD_HOTEL"})
    void createRoom_Success() {
        RoomRequest request = new RoomRequest();
        request.setRoomName("Room A");
        request.setRoomType("Deluxe");
        request.setRoomCapacity(2);
        request.setRoomArea(30.0);
        request.setBedCount(2);
        request.setBedRoomCount(1);
        request.setRoomPrice(150.0);
        request.setHotelID(testHotel.getHotelId());
        request.setStatus(1);

        RoomResponse response = roomService.createRoom(request);

        assertThat(response).isNotNull();
        assertThat(response.getRoomName()).isEqualTo("Room A");

        Room savedRoom = roomRepository.findById(response.getRoomId()).orElse(null);
        assertThat(savedRoom).isNotNull();
        assertThat(savedRoom.getHotel().getHotelId()).isEqualTo(testHotel.getHotelId());
    }

    @Test
    @DisplayName("Cập nhật phòng thành công")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_ROOM"})
    void updateRoom_Success() {
        Room room = Room.builder()
                .roomName("Room B")
                .roomType("Standard")
                .roomCapacity(2)
                .roomPrice(100.0)
                .status(1)
                .hotel(testHotel)
                .build();
        roomRepository.save(room);

        RoomRequest request = new RoomRequest();
        request.setRoomName("Room B Updated");
        request.setRoomCapacity(3);
        request.setRoomPrice(120.0);

        RoomResponse response = roomService.updateRoom(room.getRoomId(), request);

        assertThat(response.getRoomName()).isEqualTo("Room B Updated");
        assertThat(response.getRoomCapacity()).isEqualTo(3);
        assertThat(response.getRoomPrice()).isEqualTo(120.0);
    }

    @Test
    @DisplayName("Lấy phòng theo id thành công")
    @WithMockUser(username = "user@test.com")
    void getRoomById_Success() {
        Room room = Room.builder()
                .roomName("Room C")
                .roomType("Suite")
                .roomCapacity(4)
                .roomPrice(200.0)
                .status(1)
                .hotel(testHotel)
                .build();
        roomRepository.save(room);

        RoomResponse response = roomService.getRoomById(room.getRoomId());

        assertThat(response).isNotNull();
        assertThat(response.getRoomId()).isEqualTo(room.getRoomId());
        assertThat(response.getRoomName()).isEqualTo("Room C");
    }

    @Test
    @DisplayName("Xóa phòng thành công")
    @WithMockUser(username = "user@test.com", authorities = {"DELETE_ROOM"})
    void deleteRoom_Success() {
        Room room = Room.builder()
                .roomName("Room D")
                .roomType("Standard")
                .roomCapacity(2)
                .roomPrice(100.0)
                .status(1)
                .hotel(testHotel)
                .build();
        roomRepository.save(room);

        roomService.deleteRoom(room.getRoomId());

        assertThat(roomRepository.existsById(room.getRoomId())).isTrue();
    }
    // Test exception / edge cases
    @Test
    @DisplayName("Tạo phòng thất bại khi tên phòng đã tồn tại")
    @WithMockUser(username = "user@test.com", authorities = {"ADD_HOTEL"})
    void createRoom_RoomExisted() {
        Room room = Room.builder()
                .roomName("Room C")
                .roomType("Suite")
                .roomCapacity(4)
                .roomArea(30.0)
                .bedCount(2)
                .bedRoomCount(1)
                .roomPrice(200.0)
                .status(1)
                .hotel(testHotel)
                .build();
        roomRepository.saveAndFlush(room);

        RoomRequest request = new RoomRequest();
        request.setRoomName("Room C");
        request.setRoomType("Suite");
        request.setRoomCapacity(4);
        request.setRoomArea(30.0);
        request.setBedCount(2);
        request.setBedRoomCount(1);
        request.setRoomPrice(200.0);
        request.setHotelID(testHotel.getHotelId());
        request.setStatus(1);

        AppException ex = assertThrows(AppException.class, () -> roomService.createRoom(request));

        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROOM_EXISTED);
    }

    @Test
    @DisplayName("Tạo phòng thất bại khi khách sạn không tồn tại")
    @WithMockUser(username = "user@test.com", authorities = {"ADD_HOTEL"})
    void createRoom_HotelNotExisted() {
        RoomRequest request = new RoomRequest();
        request.setRoomName("Room 102");
        request.setHotelID(999);

        AppException ex = assertThrows(AppException.class, () -> roomService.createRoom(request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.HOTEL_NOT_EXISTED);
    }

    @Test
    @DisplayName("Cập nhật phòng thất bại khi phòng không tồn tại")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_ROOM"})
    void updateRoom_RoomNotExisted() {
        RoomRequest request = new RoomRequest();
        request.setRoomName("Room Updated");

        AppException ex = assertThrows(AppException.class, () -> roomService.updateRoom(999, request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROOM_NOT_EXISTED);
    }

    @Test
    @DisplayName("Xóa phòng thất bại khi phòng không tồn tại")
    @WithMockUser(username = "user@test.com", authorities = {"DELETE_ROOM"})
    void deleteRoom_RoomNotExisted() {
        AppException ex = assertThrows(AppException.class, () -> roomService.deleteRoom(999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROOM_NOT_EXISTED);
    }

    //Input invalid------------------------------------------------------------------------------------------------------------
    @Test
    @DisplayName("Tạo phòng thất bại khi input không hợp lệ")
    @WithMockUser(username = "user@test.com", authorities = {"ADD_HOTEL"})
    void createRoom_InvalidInput() {
        // Room name null
        RoomRequest requestNullName = new RoomRequest();
        requestNullName.setRoomName(null);
        requestNullName.setHotelID(testHotel.getHotelId());
        AppException ex1 = assertThrows(AppException.class, () -> roomService.createRoom(requestNullName));
        assertThat(ex1.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        // Room name empty
        RoomRequest requestEmptyName = new RoomRequest();
        requestEmptyName.setRoomName("");
        requestEmptyName.setHotelID(testHotel.getHotelId());
        AppException ex2 = assertThrows(AppException.class, () -> roomService.createRoom(requestEmptyName));
        assertThat(ex2.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        // Negative room capacity
        RoomRequest requestNegativeCapacity = new RoomRequest();
        requestNegativeCapacity.setRoomName("Room Negative");
        requestNegativeCapacity.setRoomCapacity(-1);
        requestNegativeCapacity.setHotelID(testHotel.getHotelId());
        AppException ex3 = assertThrows(AppException.class, () -> roomService.createRoom(requestNegativeCapacity));
        assertThat(ex3.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        // Negative room area
        RoomRequest requestNegativeArea = new RoomRequest();
        requestNegativeArea.setRoomName("Room Area Negative");
        requestNegativeArea.setRoomArea(-10.0);
        requestNegativeArea.setHotelID(testHotel.getHotelId());
        AppException ex4 = assertThrows(AppException.class, () -> roomService.createRoom(requestNegativeArea));
        assertThat(ex4.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        // Negative bed count
        RoomRequest requestNegativeBed = new RoomRequest();
        requestNegativeBed.setRoomName("Room Bed Negative");
        requestNegativeBed.setBedCount(-2);
        requestNegativeBed.setHotelID(testHotel.getHotelId());
        AppException ex5 = assertThrows(AppException.class, () -> roomService.createRoom(requestNegativeBed));
        assertThat(ex5.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        // Negative bedroom count
        RoomRequest requestNegativeBedRoom = new RoomRequest();
        requestNegativeBedRoom.setRoomName("Room Bedroom Negative");
        requestNegativeBedRoom.setBedRoomCount(-1);
        requestNegativeBedRoom.setHotelID(testHotel.getHotelId());
        AppException ex6 = assertThrows(AppException.class, () -> roomService.createRoom(requestNegativeBedRoom));
        assertThat(ex6.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        // Negative price
        RoomRequest requestNegativePrice = new RoomRequest();
        requestNegativePrice.setRoomName("Room Price Negative");
        requestNegativePrice.setRoomPrice(-100.0);
        requestNegativePrice.setHotelID(testHotel.getHotelId());
        AppException ex7 = assertThrows(AppException.class, () -> roomService.createRoom(requestNegativePrice));
        assertThat(ex7.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        // Room type null
        RoomRequest requestNullType = new RoomRequest();
        requestNullType.setRoomName("Room Null Type");
        requestNullType.setRoomType(null);
        requestNullType.setHotelID(testHotel.getHotelId());
        AppException ex8 = assertThrows(AppException.class, () -> roomService.createRoom(requestNullType));
        assertThat(ex8.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);
    }

    @Test
    @DisplayName("Cập nhật phòng thất bại khi input không hợp lệ")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_ROOM"})
    void updateRoom_InvalidInput() {
        Room room = Room.builder()
                .roomName("Room A")
                .roomType("Single")
                .roomCapacity(2)
                .roomArea(20.0)
                .bedRoomCount(1)
                .bedCount(1)
                .roomPrice(100.0)
                .status(1)
                .hotel(testHotel)
                .build();
        roomRepository.save(room);

        // Giá phòng âm
        RoomRequest requestNegativePrice = new RoomRequest();
        requestNegativePrice.setRoomPrice(-100.0);
        AppException ex1 = assertThrows(AppException.class,
                () -> roomService.updateRoom(room.getRoomId(), requestNegativePrice));
        assertThat(ex1.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        // Sức chứa âm
        RoomRequest requestNegativeCapacity = new RoomRequest();
        requestNegativeCapacity.setRoomCapacity(-5);
        AppException ex2 = assertThrows(AppException.class,
                () -> roomService.updateRoom(room.getRoomId(), requestNegativeCapacity));
        assertThat(ex2.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        //  Số giường âm
        RoomRequest requestNegativeBed = new RoomRequest();
        requestNegativeBed.setBedCount(-2);
        AppException ex3 = assertThrows(AppException.class,
                () -> roomService.updateRoom(room.getRoomId(), requestNegativeBed));
        assertThat(ex3.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        // Số phòng ngủ âm
        RoomRequest requestNegativeBedRoom = new RoomRequest();
        requestNegativeBedRoom.setBedRoomCount(-1);
        AppException ex4 = assertThrows(AppException.class,
                () -> roomService.updateRoom(room.getRoomId(), requestNegativeBedRoom));
        assertThat(ex4.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        //Tên phòng rỗng
        RoomRequest requestEmptyName = new RoomRequest();
        requestEmptyName.setRoomName("");
        AppException ex5 = assertThrows(AppException.class,
                () -> roomService.updateRoom(room.getRoomId(), requestEmptyName));
        assertThat(ex5.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);
    }






    @Test
    @DisplayName("Delete room không có quyền")
    @WithMockUser(username = "user@test.com", authorities = {"ADD_HOTEL"})
    void deleteRoom_NoAuthority() {
        Room room = Room.builder()
                .roomName("Room Sec3")
                .roomType("Standard")
                .roomCapacity(2)
                .roomArea(20.0)
                .bedRoomCount(1)
                .bedCount(1)
                .roomPrice(120.0)
                .status(1)
                .hotel(testHotel)
                .build();
        roomRepository.save(room);

        assertThrows(org.springframework.security.access.AccessDeniedException.class,
                () -> roomService.deleteRoom(room.getRoomId()));
    }

    //Mapping

    @Test
    @DisplayName("Map Room entity sang RoomResponse chính xác")
    void mapToRoomResponse_CorrectMapping() {
        Room room = Room.builder()
                .roomName("Room Map")
                .roomCapacity(2)
                .roomPrice(150.0)
                .hotel(testHotel)
                .status(1)
                .build();
        roomRepository.save(room);

        RoomResponse response = roomService.mapToRoomResponse(room);

        assertThat(response.getRoomName()).isEqualTo(room.getRoomName());
        assertThat(response.getRoomCapacity()).isEqualTo(room.getRoomCapacity());
        assertThat(response.getRoomPrice()).isEqualTo(room.getRoomPrice());
        assertThat(response.getHotel().getHotelId()).isEqualTo(testHotel.getHotelId());
    }

    //Repo trả empty list

    @Test
    @DisplayName("getAllRooms trả empty list khi repo rỗng")
    void getAllRooms_Empty() {
        roomRepository.deleteAll();
        List<RoomResponse> rooms = roomService.getAllRooms();
        assertThat(rooms).isEmpty();
    }

    @Test
    @DisplayName("getRoomsByHotelId trả empty list khi repo rỗng")
    void getRoomsByHotelId_Empty() {
        roomRepository.deleteAll();
        List<RoomResponse> rooms = roomService.getRoomsByHotelId(testHotel.getHotelId());
        assertThat(rooms).isEmpty();
    }

    @Test
    @DisplayName("getAvailableRooms trả empty list khi repo rỗng")
    void getAvailableRooms_Empty() {
        roomRepository.deleteAll();
        List<RoomResponse> rooms = roomService.getAvailableRooms(LocalDate.now(), LocalDate.now().plusDays(1));
        assertThat(rooms).isEmpty();
    }


    @Test
    @DisplayName("Cập nhật trạng thái phòng thành công")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_ROOM"})
    void setStatusRoom_Success() {
        Room room = Room.builder()
                .roomName("Room Status Test")
                .roomType("Standard")
                .roomCapacity(2)
                .roomArea(25.0)
                .bedCount(1)
                .bedRoomCount(1)
                .roomPrice(100.0)
                .status(1)
                .hotel(testHotel)
                .build();
        roomRepository.save(room);

        roomService.setStatusRoom(room.getRoomId(), 0);
        assertThat(roomRepository.findById(room.getRoomId()).get().getStatus()).isEqualTo(0);

        roomService.setStatusRoom(room.getRoomId(), 1);
        assertThat(roomRepository.findById(room.getRoomId()).get().getStatus()).isEqualTo(1);

        roomService.setStatusRoom(room.getRoomId(), 2);
        assertThat(roomRepository.findById(room.getRoomId()).get().getStatus()).isEqualTo(2);

        roomService.setStatusRoom(room.getRoomId(), 99);
        assertThat(roomRepository.findById(room.getRoomId()).get().getStatus()).isEqualTo(3);
    }

    @Test
    @DisplayName("Cập nhật trạng thái phòng thất bại khi room không tồn tại")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_ROOM"})
    void setStatusRoom_RoomNotExisted() {
        AppException ex = assertThrows(AppException.class,
                () -> roomService.setStatusRoom(9999, 1));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROOM_NOT_EXISTED);
    }


    @Test
    @DisplayName("Tìm phòng có giá thấp nhất theo hotelId thành công")
    @WithMockUser(username = "user@test.com")
    void findMinPriceByHotel_HotelId_Success() {
        Room room1 = Room.builder()
                .roomName("Room High")
                .roomType("Deluxe")
                .roomCapacity(2)
                .roomPrice(300.0)
                .status(1)
                .hotel(testHotel)
                .build();
        roomRepository.save(room1);

        Room room2 = Room.builder()
                .roomName("Room Low")
                .roomType("Standard")
                .roomCapacity(2)
                .roomPrice(100.0)
                .status(1)
                .hotel(testHotel)
                .build();
        roomRepository.save(room2);

        RoomResponse response = roomService.findMinPriceByHotel_HotelId(testHotel.getHotelId());

        assertThat(response).isNotNull();
        assertThat(response.getRoomName()).isEqualTo("Room Low");
        assertThat(response.getRoomPrice()).isEqualTo(100.0);
        assertThat(response.getHotel().getHotelId()).isEqualTo(testHotel.getHotelId());
    }

    @Test
    @DisplayName("Tìm phòng theo loại và hotelId thành công")
    @WithMockUser(username = "user@test.com")
    void findByRoomTypeAndHotel_HotelId_Success() {
        Room room1 = Room.builder()
                .roomName("Room A")
                .roomType("Deluxe")
                .roomCapacity(2)
                .roomPrice(150.0)
                .status(1)
                .hotel(testHotel)
                .build();
        Room room2 = Room.builder()
                .roomName("Room B")
                .roomType("Deluxe")
                .roomCapacity(3)
                .roomPrice(200.0)
                .status(1)
                .hotel(testHotel)
                .build();
        Room room3 = Room.builder()
                .roomName("Room C")
                .roomType("Standard")
                .roomCapacity(2)
                .roomPrice(100.0)
                .status(1)
                .hotel(testHotel)
                .build();

        roomRepository.save(room1);
        roomRepository.save(room2);
        roomRepository.save(room3);

        List<RoomResponse> result = roomService.findByRoomTypeAndHotel_HotelId("Deluxe", testHotel.getHotelId());

        assertThat(result).hasSize(2);
        assertThat(result).extracting("roomName").containsExactlyInAnyOrder("Room A", "Room B");
    }

    @Test
    @DisplayName("Tìm phòng theo loại và hotelId trả về empty list khi không có phòng")
    @WithMockUser(username = "user@test.com")
    void findByRoomTypeAndHotel_HotelId_Empty() {
        roomRepository.deleteAll();

        List<RoomResponse> result = roomService.findByRoomTypeAndHotel_HotelId("Deluxe", testHotel.getHotelId());

        assertThat(result).isEmpty();
    }

    @Test
    @DisplayName("getRoomStatus trả ROOM_NOT_EXISTED khi roomId không tồn tại")
    void getRoomStatus_RoomNotExisted() {
        AppException ex = assertThrows(AppException.class,
                () -> roomService.getRoomStatus(LocalDate.now(), LocalDate.now().plusDays(1), 999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROOM_NOT_EXISTED);
    }



    @Test
    @DisplayName("getRoomStatus bỏ qua invoice có status khác 1 và 2")
    void getRoomStatus_SkipInvoice() {
        Room room = Room.builder()
                .roomName("Room Test")
                .roomType("Standard")
                .roomCapacity(2)
                .status(1)
                .hotel(testHotel)
                .build();
        roomRepository.save(room);

        Invoice inv = Invoice.builder()
                .checkInDate(LocalDate.now().plusDays(5))
                .checkOutDate(LocalDate.now().plusDays(7))
                .status(1)
                .room(room)
                .user(testUser)
                .totalAmount(200.0)
                .build();

        room.setInvoices(new ArrayList<>(List.of(inv)));
        roomRepository.save(room);

        int status = roomService.getRoomStatus(LocalDate.now(), LocalDate.now().plusDays(1), room.getRoomId());
        assertThat(status).isEqualTo(0);
    }


    @Test
    @DisplayName("getRoomStatus trả 0 khi không có booking trùng")
    void getRoomStatus_NoOverlap() {
        Room room = Room.builder()
                .roomName("Room Test")
                .roomType("Standard")
                .roomCapacity(2)
                .status(1)
                .hotel(testHotel)
                .build();
        roomRepository.save(room);

        Invoice inv = Invoice.builder()
                .checkInDate(LocalDate.now().plusDays(5))
                .checkOutDate(LocalDate.now().plusDays(7))
                .status(1)
                .room(room)
                .user(testUser)
                .totalAmount(200.0)
                .build();

        room.setInvoices(new ArrayList<>(List.of(inv)));
        roomRepository.save(room);

        int status = roomService.getRoomStatus(LocalDate.now(), LocalDate.now().plusDays(1), room.getRoomId());
        assertThat(status).isEqualTo(0);
    }

}
