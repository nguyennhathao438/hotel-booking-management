package com.hotelbooking.hotel_booking.service;


import com.hotelbooking.hotel_booking.dto.request.ServiceRequest;
import com.hotelbooking.hotel_booking.dto.response.ServiceResponse;
import com.hotelbooking.hotel_booking.dto.response.UserResponse;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.ServiceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import com.hotelbooking.hotel_booking.entity.HotelService;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class DichvuTest {

    @Autowired
    private dichvu dichvuService;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    private Hotel testHotel;

    @BeforeEach
    void setup() {
        testHotel = Hotel.builder()
                .hotelName("Hotel A")
                .hotelAddress("123 Street")
                .hotelPhone("0123456789")
                .hotelCost(500.0)
                .hotelTotalRoom(20.0)
                .hotelRating(4.5)
                .status(1)
                .build();
        hotelRepository.save(testHotel);
    }

    @Test
    @DisplayName("Tạo dịch vụ thành công")
    void createService_Success() {
        ServiceRequest request = new ServiceRequest();
        request.setHotelID(testHotel.getHotelId());
        request.setServiceName("Spa");
        request.setDescription("Relaxing spa service");
        request.setPrice(100.0);
        request.setIcon("spa-icon.png");

        ServiceResponse response = dichvuService.createService(request);

        assertThat(response).isNotNull();
        assertThat(response.getServiceName()).isEqualTo("Spa");
        assertThat(response.getHotel().getHotelId()).isEqualTo(testHotel.getHotelId());
    }

    @Test
    @DisplayName("Tạo dịch vụ thất bại khi hotel không tồn tại")
    void createService_HotelNotFound_Throws() {
        ServiceRequest request = new ServiceRequest();
        request.setHotelID(9999);
        request.setServiceName("Spa");
        request.setDescription("Relaxing spa service");
        request.setPrice(100.0);
        request.setIcon("spa-icon.png");

        AppException ex = assertThrows(AppException.class, () -> dichvuService.createService(request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.HOTEL_NOT_EXISTED);
    }

    @Test
    @DisplayName("Xóa dịch vụ thành công")
    void deleteService_Success() {
        ServiceRequest request = new ServiceRequest();
        request.setHotelID(testHotel.getHotelId());
        request.setServiceName("Spa");
        request.setDescription("Relaxing spa service");
        request.setPrice(100.0);
        request.setIcon("spa-icon.png");
        ServiceResponse response = dichvuService.createService(request);

        dichvuService.deleteService(response.getServiceId());

        assertThat(serviceRepository.findById(response.getServiceId())).isEmpty();
    }

    @Test
    @DisplayName("Xóa dịch vụ thất bại khi id không tồn tại")
    void deleteService_NotFound_Throws() {
        AppException ex = assertThrows(AppException.class, () -> dichvuService.deleteService(9999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.SERVICE_NOT_EXISTED);
    }


    @Test
    @DisplayName("Lấy danh sách dịch vụ theo hotel thành công")
    void getServicesByHotelId_Success() {
        String[] names = {"Spa", "Gym", "Pool"};
        String[] descriptions = {"Relaxing spa", "Fitness service", "Swimming pool"};
        double[] prices = {100.0, 50.0, 150.0};

        for (int i = 0; i < names.length; i++) {
            ServiceRequest request = new ServiceRequest();
            request.setHotelID(testHotel.getHotelId());
            request.setServiceName(names[i]);
            request.setDescription(descriptions[i]);
            request.setPrice(prices[i]);
            request.setIcon(names[i].toLowerCase() + "-icon.png");

            dichvuService.createService(request);
        }

        List<HotelService> services = serviceRepository.findByHotel(testHotel);

        assertThat(services).isNotEmpty();
        assertThat(services.size()).isEqualTo(names.length);
        assertThat(services)
                .extracting(HotelService::getServiceName)
                .contains("Spa", "Gym");
    }

    @Test
    @DisplayName("Lấy dịch vụ thất bại khi hotel không tồn tại")
    void getServicesByHotelId_HotelNotFound_Throws() {
        AppException ex = assertThrows(AppException.class, () -> dichvuService.getServicesByHotelId(9999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.HOTEL_NOT_EXISTED);
    }

    @Test
    @DisplayName("Xóa dịch vụ đã xóa thất bại")
    void deleteService_AlreadyDeleted_Throws() {
        ServiceRequest request = new ServiceRequest();
        request.setHotelID(testHotel.getHotelId());
        request.setServiceName("Spa");
        request.setDescription("Relaxing spa service");
        request.setPrice(100.0);
        request.setIcon("spa-icon.png");
        ServiceResponse response = dichvuService.createService(request);

        dichvuService.deleteService(response.getServiceId());

        AppException ex = assertThrows(AppException.class, () -> dichvuService.deleteService(response.getServiceId()));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.SERVICE_NOT_EXISTED);
    }

    @Test
    @DisplayName("Tạo dịch vụ thất bại khi tên dịch vụ null hoặc rỗng")
    void createService_InvalidName_Throws() {
        ServiceRequest request = new ServiceRequest();
        request.setHotelID(testHotel.getHotelId());
        request.setServiceName(null);
        request.setDescription("Valid description");
        request.setPrice(100.0);
        request.setIcon("icon.png");

        assertThrows(AppException.class, () -> dichvuService.createService(request));

        request.setServiceName("");
        assertThrows(AppException.class, () -> dichvuService.createService(request));
    }

    @Test
    @DisplayName("Tạo dịch vụ thất bại khi price null hoặc âm")
    void createService_InvalidPrice_Throws() {
        ServiceRequest request = new ServiceRequest();
        request.setHotelID(testHotel.getHotelId());
        request.setServiceName("Valid Name");
        request.setDescription("Valid description");
        request.setIcon("icon.png");

        request.setPrice(null);
        assertThrows(AppException.class, () -> dichvuService.createService(request));

        request.setPrice(-50.0);
        assertThrows(AppException.class, () -> dichvuService.createService(request));
    }

    @Test
    @DisplayName("Tạo dịch vụ với icon hoặc description null hoặc rỗng")
    void createService_NullOrEmptyOptionalFields() {
        ServiceRequest request = new ServiceRequest();
        request.setHotelID(testHotel.getHotelId());
        request.setServiceName("Valid Name");
        request.setPrice(100.0);

        request.setDescription(null);
        request.setIcon("icon.png");
        ServiceResponse response1 = dichvuService.createService(request);
        assertThat(response1.getDescription()).isNull();

        request.setDescription("Some desc");
        request.setIcon(null);
        ServiceResponse response2 = dichvuService.createService(request);
        assertThat(response2.getIcon()).isNull();

        request.setDescription("");
        request.setIcon("");
        ServiceResponse response3 = dichvuService.createService(request);
        assertThat(response3.getDescription()).isEqualTo("");
        assertThat(response3.getIcon()).isEqualTo("");
    }

    @Test
    @DisplayName("getServicesByHotelId với hotel có user null")
    void getServicesByHotelId_HotelWithNullUser() {
        Hotel hotelWithoutUser = Hotel.builder()
                .hotelName("Hotel B")
                .hotelAddress("Address B")
                .hotelPhone("0987654321")
                .hotelCost(300.0)
                .hotelTotalRoom(10.0)
                .hotelRating(4.0)
                .status(1)
                .user(null)
                .build();
        hotelRepository.save(hotelWithoutUser);

        ServiceRequest request = new ServiceRequest();
        request.setHotelID(hotelWithoutUser.getHotelId());
        request.setServiceName("Service X");
        request.setDescription("Desc X");
        request.setPrice(50.0);
        request.setIcon("icon-x.png");

        dichvuService.createService(request);

        List<ServiceResponse> services = dichvuService.getServicesByHotelId(hotelWithoutUser.getHotelId());
        assertThat(services).isNotEmpty();
        assertThat(services.get(0).getHotel().getUser()).isNull();
    }

    @Test
    @DisplayName("mapToUserResponse với user không có roles")
    void mapToUserResponse_UserWithoutRoles() {
        User userWithoutRoles = User.builder()
                .firstName("NoRole")
                .lastName("User")
                .email("norole@example.com")
                .phone("0123456789")
                .build();

        UserResponse userResponse = dichvu.mapToUserResponse(userWithoutRoles);
        assertThat(userResponse.getRoles()).isEmpty();
    }


}
