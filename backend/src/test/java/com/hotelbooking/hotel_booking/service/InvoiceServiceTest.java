package com.hotelbooking.hotel_booking.service;
//lay hoa don huy hoa don chua co phan quyen
import com.hotelbooking.hotel_booking.dto.request.InvoiceRequest;
import com.hotelbooking.hotel_booking.dto.response.InvoiceResponse;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.Invoice;
import com.hotelbooking.hotel_booking.entity.Room;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.InvoiceRepository;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class InvoiceServiceTest {
    @Autowired
    private InvoiceService invoiceService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    private User testUser;
    private Room testRoom;
    private User hotelOwner;
    private Hotel testHotel;
    @BeforeEach
    void setup() {
        testUser = User.builder()
                .email("user@test.com")
                .password("123456")
                .roles(Set.of())
                .build();
        userRepository.save(testUser);

        hotelOwner = User.builder()
                .email("owner@test.com")
                .password("123456")
                .roles(Set.of())
                .build();
        userRepository.save(hotelOwner);

        testHotel = Hotel.builder()
                .hotelName("Hotel A")
                .hotelAddress("123 Street")
                .hotelPhone("0123456789")
                .hotelCost(500.0)
                .hotelTotalRoom(20.0)
                .hotelRating(4.5)
                .status(1)
                .user(hotelOwner)
                .build();
        hotelRepository.save(testHotel);

        testRoom = Room.builder()
                .roomName("Room A")
                .roomType("Deluxe")
                .roomCapacity(2)
                .roomPrice(150.0)
                .invoices(new ArrayList<>())
                .hotel(testHotel)
                .status(1)
                .build();

        roomRepository.save(testRoom);
    }


    @Test
    @DisplayName("Tạo hóa đơn thành công")
    @WithMockUser(username = "user@test.com")
    void createInvoice_Success() {
        InvoiceRequest request = new InvoiceRequest();
        request.setCheckInDate(LocalDate.now().plusDays(1));
        request.setCheckOutDate(LocalDate.now().plusDays(3));
        request.setTotalAmount(300.0);
        request.setPayment(1);

        InvoiceResponse response = invoiceService.createInvoice(testRoom.getRoomId(), request);

        assertThat(response).isNotNull();
        assertThat(response.getRoom().getRoomId()).isEqualTo(testRoom.getRoomId());
        assertThat(response.getUser().getEmail()).isEqualTo(testUser.getEmail());
        assertThat(response.getTotalAmount()).isEqualTo(300.0);
    }

    @Test
    @DisplayName("Tạo hóa đơn thất bại khi ngày check-out trước check-in")
    @WithMockUser(username = "user@test.com")
    void createInvoice_CheckOutBeforeCheckIn_Throws() {
        InvoiceRequest request = new InvoiceRequest();
        request.setCheckInDate(LocalDate.now().plusDays(3));
        request.setCheckOutDate(LocalDate.now().plusDays(1));

        AppException ex = assertThrows(AppException.class,
                () -> invoiceService.createInvoice(testRoom.getRoomId(), request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.INVOICE_FAILED);
    }


    //thay đổi từ getReferenceById trong service create invoice thành findbyid nếu có lỗi alo H
    @Test
    @DisplayName("Tạo hóa đơn thất bại khi phòng đã được đặt trước")
    @WithMockUser(username = "user@test.com")
    void createInvoice_RoomAlreadyBooked_Throws() {
        userRepository.save(testUser);
        roomRepository.save(testRoom);

        Invoice existing = Invoice.builder()
                .room(testRoom)
                .user(testUser)
                .checkInDate(LocalDate.now().plusDays(1))
                .checkOutDate(LocalDate.now().plusDays(5))
                .totalAmount(400.0)
                .payment(1)
                .status(0)
                .build();
        testRoom.addInvoice(existing);
        invoiceRepository.save(existing);

        InvoiceRequest request = new InvoiceRequest();
        request.setCheckInDate(LocalDate.now().plusDays(2));
        request.setCheckOutDate(LocalDate.now().plusDays(3));
        AppException ex = assertThrows(AppException.class,
                () -> invoiceService.createInvoice(testRoom.getRoomId(), request));

        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROOM_ALREADY_BOOKED);
    }


    @Test
    @DisplayName("Tạo hóa đơn thất bại khi phòng không tồn tại")
    @WithMockUser(username = "user@test.com")
    void createInvoice_RoomNotFound_Throws() {
        InvoiceRequest request = new InvoiceRequest();
        request.setCheckInDate(LocalDate.now().plusDays(1));
        request.setCheckOutDate(LocalDate.now().plusDays(2));

        AppException ex = assertThrows(AppException.class,
                () -> invoiceService.createInvoice(9999, request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROOM_NOT_EXISTED);
    }

    @Test
    @DisplayName("Tạo hóa đơn thất bại khi user không tồn tại")
    @WithMockUser(username = "nonexistent@test.com")
    void createInvoice_UserNotFound_Throws() {
        InvoiceRequest request = new InvoiceRequest();
        request.setCheckInDate(LocalDate.now().plusDays(1));
        request.setCheckOutDate(LocalDate.now().plusDays(2));

        AppException ex = assertThrows(AppException.class,
                () -> invoiceService.createInvoice(testRoom.getRoomId(), request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.USER_NOT_EXISTED);
    }

    @Test
    @DisplayName("Cập nhật hóa đơn thất bại khi trạng thái không hợp lệ")
    @WithMockUser(username = "user@test.com",authorities = {"UPDATE_INVOICE"})
    void updateInvoice_InvalidStatusTransition_Throws() {
        Invoice existing = Invoice.builder()
                .room(testRoom)
                .user(testUser)
                .checkInDate(LocalDate.now().plusDays(1))
                .checkOutDate(LocalDate.now().plusDays(3))
                .totalAmount(300.0)
                .payment(1)
                .status(0)
                .build();
        testRoom.addInvoice(existing);
        invoiceRepository.save(existing);

        InvoiceRequest request = new InvoiceRequest();
        request.setStatus(99);

        AppException ex = assertThrows(AppException.class,
                () -> invoiceService.updateInvoice(existing.getId(), request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.INVALID_STATUS_TRANSITION);
    }

    @Test
    @DisplayName("Cập nhật hóa đơn thành công")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_INVOICE"})
    void updateInvoice_Success() {
        InvoiceRequest createRequest = new InvoiceRequest();
        createRequest.setCheckInDate(LocalDate.now().plusDays(1));
        createRequest.setCheckOutDate(LocalDate.now().plusDays(3));
        createRequest.setTotalAmount(300.0);
        createRequest.setPayment(1);
        createRequest.setStatus(0);

        InvoiceResponse createdInvoice = invoiceService.createInvoice(testRoom.getRoomId(), createRequest);

        InvoiceRequest updateRequest = new InvoiceRequest();
        updateRequest.setCheckInDate(LocalDate.now().plusDays(2));
        updateRequest.setCheckOutDate(LocalDate.now().plusDays(4));
        updateRequest.setTotalAmount(400.0);
        updateRequest.setPayment(2);
        updateRequest.setStatus(1);

        InvoiceResponse updatedInvoice = invoiceService.updateInvoice(createdInvoice.getId(), updateRequest);

        assertThat(updatedInvoice.getCheckInDate()).isEqualTo(updateRequest.getCheckInDate());
        assertThat(updatedInvoice.getCheckOutDate()).isEqualTo(updateRequest.getCheckOutDate());
        assertThat(updatedInvoice.getTotalAmount()).isEqualTo(updateRequest.getTotalAmount());
        assertThat(updatedInvoice.getPayment()).isEqualTo(updateRequest.getPayment());
        assertThat(updatedInvoice.getStatus()).isEqualTo(updateRequest.getStatus());
    }

    @Test
    @DisplayName("Cập nhật hóa đơn thất bại khi hóa đơn không tồn tại")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_INVOICE"})
    void updateInvoice_InvoiceNotFound_Throws() {

        InvoiceRequest updateRequest = new InvoiceRequest();
        updateRequest.setCheckInDate(LocalDate.now().plusDays(2));
        updateRequest.setCheckOutDate(LocalDate.now().plusDays(4));
        updateRequest.setTotalAmount(400.0);
        updateRequest.setPayment(2);
        updateRequest.setStatus(1);

        AppException ex = assertThrows(AppException.class,
                () -> invoiceService.updateInvoice(9999, updateRequest));

        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.INVOICE_NOT_EXISTED);
    }

    @Test
    @DisplayName("Cập nhật hóa đơn thất bại khi phòng không tồn tại")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_INVOICE"})
    void updateInvoice_RoomNotFound_Throws() {

        InvoiceRequest createRequest = new InvoiceRequest();
        createRequest.setCheckInDate(LocalDate.now().plusDays(2));
        createRequest.setCheckOutDate(LocalDate.now().plusDays(4));
        createRequest.setTotalAmount(400.0);
        createRequest.setPayment(2);
        createRequest.setStatus(1);

        InvoiceResponse invoice = invoiceService.createInvoice(testRoom.getRoomId(), createRequest);

        InvoiceRequest updateRequest = new InvoiceRequest();
        updateRequest.setRoomId(99999);

        AppException ex = assertThrows(AppException.class,
                () -> invoiceService.updateInvoice(invoice.getId(), updateRequest));


        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROOM_NOT_EXISTED);    }

    @Test
    @DisplayName("Cập nhật hóa đơn thất bại khi user không tồn tại")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_INVOICE"})
    void updateInvoice_UserNotFound_Throws() {

        InvoiceRequest createRequest = new InvoiceRequest();
        createRequest.setCheckInDate(LocalDate.now().plusDays(2));
        createRequest.setCheckOutDate(LocalDate.now().plusDays(4));
        createRequest.setTotalAmount(400.0);
        createRequest.setPayment(2);
        createRequest.setStatus(1);

        InvoiceResponse invoice = invoiceService.createInvoice(testRoom.getRoomId(), createRequest);

        InvoiceRequest updateRequest = new InvoiceRequest();
        updateRequest.setUserId(99999);

        AppException ex = assertThrows(AppException.class,
                () -> invoiceService.updateInvoice(invoice.getId(), updateRequest));


        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.USER_NOT_EXISTED);    }

    @Test
    @DisplayName("Cập nhật hóa đơn thất bại khi ngày không hợp lệ")
    @WithMockUser(username = "user@test.com", authorities = {"UPDATE_INVOICE"})
    void updateInvoice_InvalidDate_Throws() {

        InvoiceRequest createRequest = new InvoiceRequest();
        createRequest.setCheckInDate(LocalDate.now().plusDays(2));
        createRequest.setCheckOutDate(LocalDate.now().plusDays(4));
        createRequest.setTotalAmount(400.0);
        createRequest.setPayment(2);
        createRequest.setStatus(1);

        InvoiceResponse invoice = invoiceService.createInvoice(testRoom.getRoomId(), createRequest);

        InvoiceRequest updateRequest = new InvoiceRequest();
        updateRequest.setCheckInDate(LocalDate.now().plusDays(10));
        updateRequest.setCheckOutDate(LocalDate.now().plusDays(4));

        AppException ex = assertThrows(AppException.class,
                () -> invoiceService.updateInvoice(invoice.getId(), updateRequest));


        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.INVALID_DATE_RANGE);    }

    @Test
    @DisplayName("Lấy hóa đơn thành công theo ID")
    @WithMockUser(username = "user@test.com")
    void getInvoiceById_Success() {
        InvoiceRequest createRequest = new InvoiceRequest();
        createRequest.setCheckInDate(LocalDate.now().plusDays(2));
        createRequest.setCheckOutDate(LocalDate.now().plusDays(4));
        createRequest.setTotalAmount(400.0);
        createRequest.setPayment(2);
        createRequest.setStatus(1);

        InvoiceResponse invoice = invoiceService.createInvoice(testRoom.getRoomId(), createRequest);

        InvoiceResponse response = invoiceService.getInvoiceById(invoice.getId());

        assertThat(response).isNotNull();
        assertThat(response.getId()).isEqualTo(invoice.getId());
        assertThat(response.getRoom().getRoomId()).isEqualTo(testRoom.getRoomId());
        assertThat(response.getUser().getEmail()).isEqualTo(testUser.getEmail());
        assertThat(response.getTotalAmount()).isEqualTo(400.0);



    }
    @Test
    @DisplayName("Lấy hóa đơn thất bại")
    @WithMockUser(username = "user@test.com")
    void getInvoiceById_NotFound_Throws() {
        AppException ex = assertThrows(AppException.class,
                () -> invoiceService.getInvoiceById(9999));

        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.INVOICE_NOT_EXISTED);
    }

    @Test
    @DisplayName("Hủy hóa đơn thành công")
    @WithMockUser(username = "user@test.com")
    void cancelInvoice_Success() {
        InvoiceRequest createRequest = new InvoiceRequest();
        createRequest.setCheckInDate(LocalDate.now().plusDays(1));
        createRequest.setCheckOutDate(LocalDate.now().plusDays(3));
        createRequest.setTotalAmount(300.0);
        createRequest.setPayment(1);
        createRequest.setStatus(0);

        InvoiceResponse invoice = invoiceService.createInvoice(testRoom.getRoomId(), createRequest);

        InvoiceResponse canceledInvoice = invoiceService.cancelInvoice(invoice.getId());
        assertThat(canceledInvoice.getStatus()).isEqualTo(3);
    }
    @Test
    @DisplayName("Hủy hóa đơn thất bại do id không tồn tại")
    @WithMockUser(username = "user@test.com")
    void cancelInvoice_NotFound_Throws() {

        AppException ex = assertThrows(AppException.class,
                () -> invoiceService.cancelInvoice(9999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.INVOICE_NOT_EXISTED);


    }
    @Test
    @DisplayName("Lấy tất cả hóa đơn thành công")
    @WithMockUser(username = "user@test.com")
    void getAllInvoices_Success() {
        InvoiceRequest createRequest = new InvoiceRequest();
        createRequest.setCheckInDate(LocalDate.now().plusDays(1));
        createRequest.setCheckOutDate(LocalDate.now().plusDays(3));
        createRequest.setTotalAmount(300.0);
        createRequest.setPayment(1);
        createRequest.setStatus(0);

        invoiceService.createInvoice(testRoom.getRoomId(), createRequest);

        List<InvoiceResponse> invoices = invoiceService.getAllInvoices();

        assertFalse(invoices.isEmpty());
        assertThat(invoices.get(0).getRoom().getRoomId()).isEqualTo(testRoom.getRoomId());
    }

    @Test
    @DisplayName("Lấy hóa đơn theo phân trang thành công")
    @WithMockUser(username = "user@test.com",authorities = {"READ_INVOICE_LIST"} )
    void getAllInvoice_Paging_Success() {
        for (int i = 0; i < 5; i++) {
            InvoiceRequest request = new InvoiceRequest();
            request.setCheckInDate(LocalDate.now().plusDays(i + 1));
            request.setCheckOutDate(LocalDate.now().plusDays(i + 2));
            request.setTotalAmount(100.0 + i * 50);
            request.setPayment(1);
            request.setStatus(0);

            invoiceService.createInvoice(testRoom.getRoomId(), request);
        }

        int pageNo = 1;
        int pageSize = 3;
        Page<InvoiceResponse> page = invoiceService.getAllInvoice(pageNo, pageSize);

        assertFalse(page.isEmpty(), "Danh sách hóa đơn không được rỗng");
        assertEquals(3, page.getContent().size(), "Số hóa đơn trả về bằng pageSize");

        InvoiceResponse firstInvoice = page.getContent().get(0);
        assertNotNull(firstInvoice.getId());
        assertEquals(testRoom.getRoomId(), firstInvoice.getRoom().getRoomId());

    }

    @Test
    @DisplayName("Lọc hóa đơn theo tất cả tổ hợp tham số thành công")
    @WithMockUser(username = "user@test.com" ,authorities = {"READ_INVOICE_LIST"})
    void filterInvoice_AllCombinations_Success() {
        for (int i = 0; i < 5; i++) {
            InvoiceRequest request = new InvoiceRequest();
            request.setCheckInDate(LocalDate.now().plusDays(i + 1));
            request.setCheckOutDate(LocalDate.now().plusDays(i + 2));
            request.setTotalAmount(100.0 + i * 50);
            request.setPayment(i % 2);
            request.setStatus(1);

            invoiceService.createInvoice(testRoom.getRoomId(), request);
        }

        int pageNo = 1;
        int pageSize = 5;

        //loc theo status

        Page<InvoiceResponse> byStatus = invoiceService.filterInvoice(1, null, null, null, pageNo, pageSize);
//        assertFalse(byStatus.isEmpty());

        byStatus.getContent().forEach(invoice -> assertEquals(1, invoice.getStatus()));

        //loc theo payment

        Page<InvoiceResponse> byPayment = invoiceService.filterInvoice(null, 1, null, null, pageNo, pageSize);
        assertFalse(byPayment.isEmpty());
        byPayment.getContent().forEach(invoice -> assertEquals(1, invoice.getPayment()));

        //loc theo khoang ngay

        LocalDate dateFrom = LocalDate.now().plusDays(2);
        LocalDate dateTo = LocalDate.now().plusDays(4);
        Page<InvoiceResponse> byDateRange = invoiceService.filterInvoice(null, null, dateFrom, dateTo, pageNo, pageSize);
        assertFalse(byDateRange.isEmpty());
        byDateRange.getContent().forEach(invoice -> {
            assertTrue(!invoice.getCheckInDate().isBefore(dateFrom));
            assertTrue(!invoice.getCheckOutDate().isAfter(dateTo));
        });

        //ket hop 3 cai

        Page<InvoiceResponse> combined = invoiceService.filterInvoice(1, 0, dateFrom, dateTo, pageNo, pageSize);
        combined.getContent().forEach(invoice -> {
            assertEquals(1, invoice.getStatus());
            assertEquals(0, invoice.getPayment());
            assertTrue(!invoice.getCheckInDate().isBefore(dateFrom));
            assertTrue(!invoice.getCheckOutDate().isAfter(dateTo));
        });


    }

    @Test
    @DisplayName("Lấy hóa đơn theo chủ khách sạn thành công khi người dùng có quyền hợp lệ")
    @WithMockUser(username = "owner@test.com", authorities = {"READ_INVOICE_LIST_(2)"})
    void getInvoiceByHotelOwner_Authorized_Success() {


        for (int i = 0; i < 3; i++) {
            InvoiceRequest request = new InvoiceRequest();
            request.setCheckInDate(LocalDate.now().plusDays(i + 1));
            request.setCheckOutDate(LocalDate.now().plusDays(i + 2));
            request.setTotalAmount(200.0 + i * 50);
            request.setPayment(1);
            request.setStatus(1);

            invoiceService.createInvoice(testRoom.getRoomId(), request);
        }

        List<InvoiceResponse> invoices = invoiceService.getInvoiceByHotelOwner(hotelOwner.getId());
        assertNotNull(invoices);
        assertFalse(invoices.isEmpty());
        invoices.forEach(invoice ->
                assertEquals(testRoom.getHotel().getUser().getId(), hotelOwner.getId())
        );
    }

    @Test
    @DisplayName("Lấy hóa đơn theo chủ khách sạn thất bại khi người dùng không có quyền")
    @WithMockUser(username = "user@test.com")
    void getInvoiceByHotelOwner_Unauthorized_Throws() {

        assertThrows(org.springframework.security.access.AccessDeniedException.class, () -> {
            invoiceService.getInvoiceByHotelOwner(hotelOwner.getId());
        });
    }


}





