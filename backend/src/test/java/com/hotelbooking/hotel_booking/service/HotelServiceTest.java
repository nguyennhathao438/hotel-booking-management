package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.HotelRequest;
import com.hotelbooking.hotel_booking.dto.response.HotelResponse;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.RoleRepository;
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

import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class HotelServiceTest {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private User testUser;

    @BeforeEach
    void setup() {
        if (!roleRepository.existsById("ADD_HOTEL")) {
            Role role = Role.builder()
                    .name("ADD_HOTEL")
                    .description("Role thêm khách sạn")
                    .build();
            roleRepository.save(role);
        }

        testUser = User.builder()
                .email("user@test.com")
                .password(passwordEncoder.encode("123456"))
                .roles(Set.of())
                .build();
        userRepository.save(testUser);
    }
    //createHotel
    @Test
    @DisplayName("Tạo khách sạn thành công")
    @WithMockUser(username = "user@test.com", authorities = {"ADD_HOTEL"})
    void createHotel_Success() {
        HotelRequest request = new HotelRequest();
        request.setHotelName("Hotel A");
        request.setHotelAddress("Hanoi");
        request.setHotelPhone("0123456789");
        request.setHotelRating(4.5);
        request.setHotelTotalRoom(50.0);
        request.setHotelCost(200.0);
        request.setHotelDescription("Khách sạn đẹp");

        HotelResponse response = hotelService.createHotel(request);

        assertThat(response).isNotNull();
        assertThat(response.getHotelName()).isEqualTo("Hotel A");

        Hotel savedHotel = hotelRepository.findById(response.getHotelId()).orElse(null);
        assertThat(savedHotel).isNotNull();
        assertThat(savedHotel.getUser().getEmail()).isEqualTo("user@test.com");
    }

    @Test
    @DisplayName("Tạo khách sạn thất bại khi tên đã tồn tại")
    @WithMockUser(username = "user@test.com", authorities = {"ADD_HOTEL"})
    void createHotel_NameExisted() {
        Hotel hotel = Hotel.builder()
                .hotelName("Hotel B")
                .user(testUser)
                .hotelTotalRoom(50.0)
                .status(0)
                .build();
        hotelRepository.save(hotel);

        HotelRequest request = new HotelRequest();
        request.setHotelName("Hotel B");
        request.setHotelAddress("Hanoi");

        AppException ex = assertThrows(AppException.class, () -> hotelService.createHotel(request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.HOTEL_EXISTED);
    }

    @Test
    @DisplayName("Không thể tạo khách sạn khác khi khách sạn trước chưa duyệt")
    @WithMockUser(username = "user@test.com", authorities = {"ADD_HOTEL"})
    void createHotel_UserAlreadyRequested() {
        Hotel hotel = Hotel.builder()
                .hotelName("Hotel C")
                .user(testUser)
                .hotelTotalRoom(50.0)
                .status(0)
                .build();
        hotelRepository.save(hotel);

        HotelRequest request = new HotelRequest();
        request.setHotelName("Hotel D");
        request.setHotelAddress("Hanoi");
        request.setHotelTotalRoom(40.0);
        request.setHotelCost(150.0);

        AppException ex = assertThrows(AppException.class, () -> hotelService.createHotel(request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.REQUEST_HOTEL_EXISTED);
    }

    @Test
    @DisplayName("Tạo khách sạn thất bại khi input không hợp lệ")
    @WithMockUser(username = "user@test.com", authorities = {"ADD_HOTEL"})
    void createHotel_InvalidInput() {
        // Tên null
        HotelRequest requestNullName = new HotelRequest();
        requestNullName.setHotelName(null);
        AppException ex1 = assertThrows(AppException.class, () -> hotelService.createHotel(requestNullName));
        assertThat(ex1.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        //Số phòng âm
        HotelRequest requestNegativeRoom = new HotelRequest();
        requestNegativeRoom.setHotelName("Valid Name");
        requestNegativeRoom.setHotelTotalRoom(-5.0);
        AppException ex2 = assertThrows(AppException.class, () -> hotelService.createHotel(requestNegativeRoom));
        assertThat(ex2.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        //Giá tiền âm
        HotelRequest requestNegativeCost = new HotelRequest();
        requestNegativeCost.setHotelName("Valid Name");
        requestNegativeCost.setHotelCost(-100.0);
        AppException ex3 = assertThrows(AppException.class, () -> hotelService.createHotel(requestNegativeCost));
        assertThat(ex3.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        //Rating > 5
        HotelRequest requestHighRating = new HotelRequest();
        requestHighRating.setHotelName("Valid Name");
        requestHighRating.setHotelRating(6.0);
        AppException ex4 = assertThrows(AppException.class, () -> hotelService.createHotel(requestHighRating));
        assertThat(ex4.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);
    }

    //getAllHotels
    @Test
    @DisplayName("Lấy tất cả khách sạn status=1")
    void getAllHotels_Success() {
        Hotel hotel = Hotel.builder()
                .hotelName("Hotel E")
                .user(testUser)
                .hotelTotalRoom(20.0)
                .hotelCost(100.0)
                .status(1)
                .build();
        hotelRepository.save(hotel);

        List<HotelResponse> hotels = hotelService.getAllHotels();
        assertThat(hotels).isNotEmpty();
        assertThat(hotels.get(0).getStatus()).isEqualTo(1);
    }

    @Test
    @DisplayName("Lấy khách sạn theo id thành công")
    void getHotelById_Success() {
        Hotel hotel = Hotel.builder()
                .hotelName("Hotel F")
                .user(testUser)
                .hotelTotalRoom(30.0)
                .hotelCost(120.0)
                .status(1)
                .build();
        hotelRepository.save(hotel);

        HotelResponse response = hotelService.getHotelById(hotel.getHotelId());
        assertThat(response).isNotNull();
        assertThat(response.getHotelId()).isEqualTo(hotel.getHotelId());
    }

    @Test
    @DisplayName("Lấy khách sạn theo id thất bại khi không tồn tại")
    void getHotelById_NotExist() {
        AppException ex = assertThrows(AppException.class, () -> hotelService.getHotelById(999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.HOTEL_NOT_EXISTED);
    }

    //updateHotel
    @Test
    @DisplayName("Cập nhật khách sạn thành công")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_HOTEL"})
    void updateHotel_Success() {
        Hotel hotel = Hotel.builder()
                .hotelName("Hotel G")
                .user(testUser)
                .hotelTotalRoom(30.0)
                .hotelCost(100.0)
                .status(0)
                .build();
        hotelRepository.save(hotel);

        HotelRequest request = new HotelRequest();
        request.setHotelName("Hotel G Updated");
        request.setHotelTotalRoom(40.0);
        request.setHotelCost(150.0);

        HotelResponse response = hotelService.updateHotel(hotel.getHotelId(), request);
        assertThat(response.getHotelName()).isEqualTo("Hotel G Updated");
        assertThat(response.getHotelTotalRoom()).isEqualTo(40.0);
        assertThat(response.getHotelCost()).isEqualTo(150.0);
    }

    @Test
    @DisplayName("Cập nhật khách sạn thất bại khi không tồn tại")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_HOTEL"})
    void updateHotel_NotExist() {
        HotelRequest request = new HotelRequest();
        request.setHotelName("Nonexistent Hotel");
        AppException ex = assertThrows(AppException.class, () -> hotelService.updateHotel(999, request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.HOTEL_NOT_EXISTED);
    }

    @Test
    @DisplayName("Cập nhật khách sạn thất bại khi tên trùng")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_HOTEL"})
    void updateHotel_NameExisted() {
        Hotel hotel1 = Hotel.builder()
                .hotelName("Hotel X")
                .user(testUser)
                .hotelTotalRoom(30.0)
                .hotelCost(100.0)
                .status(1)
                .build();
        hotelRepository.save(hotel1);

        Hotel hotel2 = Hotel.builder()
                .hotelName("Hotel Y")
                .user(testUser)
                .hotelTotalRoom(40.0)
                .hotelCost(150.0)
                .status(1)
                .build();
        hotelRepository.save(hotel2);

        HotelRequest request = new HotelRequest();
        request.setHotelName("Hotel X");


        AppException ex = assertThrows(AppException.class, () -> hotelService.updateHotel(hotel2.getHotelId(), request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.HOTEL_EXISTED);
    }

    @Test
    @DisplayName("Cập nhật khách sạn thất bại khi user không có quyền")
    @WithMockUser(username = "user@test.com", authorities = {})
    void updateHotel_NoAuthority() {
        Hotel hotel = Hotel.builder()
                .hotelName("Hotel Z")
                .user(testUser)
                .hotelTotalRoom(30.0)
                .hotelCost(100.0)
                .status(1)
                .build();
        hotelRepository.save(hotel);

        HotelRequest request = new HotelRequest();
        request.setHotelName("Hotel Z Updated");

        org.junit.jupiter.api.Assertions.assertThrows(
                org.springframework.security.authorization.AuthorizationDeniedException.class,
                () -> hotelService.updateHotel(hotel.getHotelId(), request)
        );
        // khi user khong co quyen thì nó throw AuthorizationDeniedException chứ service khong kip throw AppException
    }

    @Test
    @DisplayName("Cập nhật khách sạn thất bại khi input không hợp lệ")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_HOTEL"})
    void updateHotel_InvalidInput() {
        Hotel hotel = Hotel.builder()
                .hotelName("Hotel Invalid")
                .user(testUser)
                .hotelTotalRoom(30.0)
                .hotelCost(100.0)
                .status(1)
                .build();
        hotelRepository.save(hotel);

        // Tên rỗng
        HotelRequest requestEmptyName = new HotelRequest();
        requestEmptyName.setHotelName("");
        AppException ex1 = assertThrows(AppException.class,
                () -> hotelService.updateHotel(hotel.getHotelId(), requestEmptyName));
        assertThat(ex1.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        //  Số phòng âm
        HotelRequest requestNegativeRoom = new HotelRequest();
        requestNegativeRoom.setHotelName("Valid Name");
        requestNegativeRoom.setHotelTotalRoom(-10.0);
        AppException ex2 = assertThrows(AppException.class,
                () -> hotelService.updateHotel(hotel.getHotelId(), requestNegativeRoom));
        assertThat(ex2.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        // Giá tiền âm
        HotelRequest requestNegativeCost = new HotelRequest();
        requestNegativeCost.setHotelName("Valid Name");
        requestNegativeCost.setHotelCost(-200.0);
        AppException ex3 = assertThrows(AppException.class,
                () -> hotelService.updateHotel(hotel.getHotelId(), requestNegativeCost));
        assertThat(ex3.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);

        //  Rating > 5
        HotelRequest requestHighRating = new HotelRequest();
        requestHighRating.setHotelName("Valid Name");
        requestHighRating.setHotelRating(6.0);
        AppException ex4 = assertThrows(AppException.class,
                () -> hotelService.updateHotel(hotel.getHotelId(), requestHighRating));
        assertThat(ex4.getErrorCode()).isEqualTo(ErrorCode.INVALID_INPUT);
    }

    @Test
    @DisplayName("Approve hotel thành công")
    @WithMockUser(username = "admin@test.com", roles = {"ADMIN"})
    void approveHotel_Success() {
        Hotel hotel = Hotel.builder()
                .hotelName("Hotel H")
                .user(testUser)
                .hotelTotalRoom(30.0)
                .hotelCost(100.0)
                .status(0)
                .build();
        hotelRepository.save(hotel);

        HotelResponse response = hotelService.approveHotel(hotel.getHotelId());
        assertThat(response.getStatus()).isEqualTo(1);
    }

    @Test
    @DisplayName("Approve khách sạn thất bại khi không tồn tại")
    @WithMockUser(username = "admin@test.com", roles = {"ADMIN"})
    void approveHotel_NotExist() {
        AppException ex = assertThrows(AppException.class, () -> hotelService.approveHotel(999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.HOTEL_NOT_EXISTED);
    }

    @Test
    @DisplayName("Approve khách sạn thất bại khi user không phải admin")
    @WithMockUser(username = "user@test.com", roles = {"USER"})
    void approveHotel_NoAdmin() {
        Hotel hotel = Hotel.builder()
                .hotelName("Hotel W")
                .user(testUser)
                .hotelTotalRoom(30.0)
                .hotelCost(100.0)
                .status(0)
                .build();
        hotelRepository.save(hotel);

        org.junit.jupiter.api.Assertions.assertThrows(
                org.springframework.security.authorization.AuthorizationDeniedException.class,
                () -> hotelService.approveHotel(hotel.getHotelId())
        );
    }
    @Test
    @DisplayName("Tìm khách sạn theo địa chỉ")
    void findByHotelAddressContainingIgnoreCase_Success() {
        Hotel hotel1 = Hotel.builder()
                .hotelName("Hotel Hanoi")
                .hotelAddress("Hanoi")
                .user(testUser)
                .hotelTotalRoom(20.0)
                .status(1)
                .build();
        hotelRepository.save(hotel1);

        Hotel hotel2 = Hotel.builder()
                .hotelName("Hotel HCM")
                .hotelAddress("Ho Chi Minh")
                .user(testUser)
                .hotelTotalRoom(25.0)
                .status(1)
                .build();
        hotelRepository.save(hotel2);

        List<HotelResponse> hotels = hotelService.findByHotelAddressContainingIgnoreCase("hanoi");
        assertThat(hotels).hasSize(1);
        assertThat(hotels.get(0).getHotelAddress()).containsIgnoringCase("hanoi");
    }

    @Test
    @DisplayName("Lấy khách sạn status=0")
    void getAllHotels0_Success() {
        Hotel hotel = Hotel.builder()
                .hotelName("Hotel Pending")
                .user(testUser)
                .hotelTotalRoom(15.0)
                .status(0)
                .build();
        hotelRepository.save(hotel);

        List<HotelResponse> hotels = hotelService.getAllHotels0();
        assertThat(hotels).isNotEmpty();
        assertThat(hotels.get(0).getStatus()).isEqualTo(0);
    }

    @Test
    @DisplayName("Tìm kiếm khách sạn có paging và sort")
    void getAllHotelSearch_Success() {
        Hotel hotel1 = Hotel.builder()
                .hotelName("Hotel Low")
                .hotelCost(100.0)
                .hotelRating(3.0)
                .status(1)
                .user(testUser)
                .hotelTotalRoom(20.0)
                .build();
        hotelRepository.save(hotel1);

        Hotel hotel2 = Hotel.builder()
                .hotelName("Hotel High")
                .hotelCost(200.0)
                .hotelRating(4.5)
                .status(1)
                .user(testUser)
                .hotelTotalRoom(30.0)
                .build();
        hotelRepository.save(hotel2);

        var page = hotelService.getAllHotelSearch(1, 10, null, "asc","");
        assertThat(page.getContent()).hasSizeGreaterThanOrEqualTo(2);
        assertThat(page.getContent().get(0).getHotelCost()).isLessThanOrEqualTo(page.getContent().get(1).getHotelCost());
    }


    @Test
    @DisplayName("Lấy khách sạn theo userId")
    void getHotelsByUserId_Success() {
        Hotel hotel = Hotel.builder()
                .hotelName("User Hotel")
                .user(testUser)
                .hotelTotalRoom(20.0)
                .status(1)
                .build();
        hotelRepository.save(hotel);

        List<HotelResponse> hotels = hotelService.getHotelsByUserId(testUser.getId());
        assertThat(hotels).isNotEmpty();
        assertThat(hotels.get(0).getUser().getEmail()).isEqualTo(testUser.getEmail());
    }

}
