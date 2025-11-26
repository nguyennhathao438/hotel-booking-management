package com.hotelbooking.hotel_booking.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class InvoiceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String accessToken;
    private int testHotelId;
    private int testRoomId;

    @BeforeEach
    void setUp() throws Exception {
        String loginJson = """
        {
            "email": "admin@gmail.com",
            "password": "123456"
        }
        """;

        String loginResponse = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode loginNode = objectMapper.readTree(loginResponse).get("result");
        accessToken = loginNode.get("accessToken").asText();

        String hotelJson = """
        {
            "hotelName": "Hotel Test",
            "hotelAddress": "Hanoi",
            "hotelPhone": "0123456789",
            "hotelRating": 4.5,
            "hotelTotalRoom": 50,
            "hotelCost": 200,
            "status": 1,
            "hotelDescription": "Khách sạn đẹp"
        }
        """;

        String hotelResponse = mockMvc.perform(post("/api/hotels/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(hotelJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        testHotelId = objectMapper.readTree(hotelResponse)
                .get("result")
                .get("hotelId").asInt();

        testRoomId = createTestRoom();
    }

    private int createTestRoom() throws Exception {
        String roomJson = """
        {
            "roomName": "Temp Room",
            "roomType": "Standard",
            "roomPrice": 100,
            "roomCapacity": 2,
            "bedCount": 2,
            "bedRoomCount": 1,
            "hotelID": %d,
            "roomArea": 30.0
        }
        """.formatted(testHotelId);

        String response = mockMvc.perform(post("/api/rooms/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(roomJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        return objectMapper.readTree(response)
                .get("result")
                .get("roomId").asInt();
    }

    private int createTestInvoice() throws Exception {
        String invoiceJson = """
        {
            "userId": 1,
            "payment": 1,
            "checkInDate": "%s",
            "checkOutDate": "%s",
            "totalPrice": 200
        
        }
        """.formatted(LocalDate.now().plusDays(1), LocalDate.now().plusDays(2));

        String response = mockMvc.perform(post("/api/invoice/room/%d/create".formatted(testRoomId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(invoiceJson))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode node = objectMapper.readTree(response).get("result");
        return node.get("id").asInt();  // Lưu ý: dùng "id" thay vì "invoiceId"
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Tạo hóa đơn thành công")
    void createInvoice_Success() throws Exception {
        String invoiceJson = """
        {
            "userId": 1,
            "payment": 1,
            "checkInDate": "%s",
            "checkOutDate": "%s",
            "totalPrice": 200
        }
        """.formatted(LocalDate.now().plusDays(1), LocalDate.now().plusDays(2));

        mockMvc.perform(post("/api/invoice/room/%d/create".formatted(testRoomId))
                        .contentType(MediaType.APPLICATION_JSON)
                        .header("Authorization", "Bearer " + accessToken)
                        .content(invoiceJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Tạo hóa đơn thành công"))
                .andExpect(jsonPath("$.result.room.roomId").value(testRoomId))
                .andExpect(jsonPath("$.result.user.id").value(1));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy hóa đơn theo ID")
    void getInvoiceById_Success() throws Exception {
        int invoiceId = createTestInvoice();

        mockMvc.perform(get("/api/invoice/%d".formatted(invoiceId))
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.id").value(invoiceId));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Xóa hóa đơn thành công")
    void deleteInvoice_Success() throws Exception {
        int invoiceId = createTestInvoice();

        mockMvc.perform(delete("/api/invoice/%d".formatted(invoiceId))
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Huỷ hóa đơn thành công"));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy tất cả hóa đơn")
    void getAllInvoices_Success() throws Exception {
        createTestInvoice();

        mockMvc.perform(get("/api/invoice/all")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").isArray());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lọc hóa đơn theo user")
    void getInvoicesByUser_Success() throws Exception {
        createTestInvoice();

        mockMvc.perform(get("/api/invoice/user/1")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").isArray());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Cập nhật hóa đơn thành công")
    void updateInvoice_Success() throws Exception {
        int invoiceId = createTestInvoice();

        String updateJson = """
        {
            "checkInDate": "%s",
            "checkOutDate": "%s",
            "totalPrice": 400,
            "payment": 2,
            "status": 1
        }
        """.formatted(LocalDate.now().plusDays(2), LocalDate.now().plusDays(4));

        mockMvc.perform(put("/api/invoice/%d".formatted(invoiceId))
                        .header("Authorization", "Bearer " + accessToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.payment").value(2))
                .andExpect(jsonPath("$.result.status").value(1));
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Hủy hóa đơn không tồn tại trả về 404")
    void cancelInvoice_NotFound() throws Exception {
        mockMvc.perform(delete("/api/invoice/9999")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(1021))
                .andExpect(jsonPath("$.message").value("Không tìm thấy phòng"));
    }


    @Test
    @Rollback
    @Transactional
    @DisplayName("Lọc hóa đơn theo payment và status")
    void filterInvoice_ByPaymentAndStatus() throws Exception {
        createTestInvoice();

        mockMvc.perform(get("/api/invoice/filter")
                        .param("status", "0")
                        .param("payment", "1")
                        .param("pageNo", "1")
                        .param("pageSize", "5")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.content").isArray())
                .andExpect(jsonPath("$.result.content.length()").value(1));
    }


//
//    @Test
//    @Rollback
//    @Transactional
//    @DisplayName("Lấy hóa đơn theo chủ khách sạn có quyền")
//    void getInvoiceByHotelOwner_Authorized() throws Exception {
//        createTestInvoice();
//
//        mockMvc.perform(get("/api/invoice/owner/%d".formatted(1))
//                        .header("Authorization", "Bearer " + accessToken))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.result").isArray())
//                .andExpect(jsonPath("$.result[0].room.hotel.hotelId").value(testHotelId));
//    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Phân trang hóa đơn thành công")
    void getAllInvoicePaging_Success() throws Exception {

            createTestInvoice();


        mockMvc.perform(get("/api/invoice/all")
                        .param("pageNo", "1")
                        .param("pageSize", "1")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").isArray());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy hóa đơn theo hotel owner có phân trang")
    void getInvoicesByOwnerPaging_Success() throws Exception {
        createTestInvoice();

        mockMvc.perform(get("/api/invoice/owner/{userId}", 1)
                        .param("pageNo", "1")
                        .param("pageSize", "5")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.content").isArray());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy hóa đơn theo hotel owner không phân trang")
    void getInvoicesByOwnerNoPage_Success() throws Exception {
        createTestInvoice();

        mockMvc.perform(get("/api/invoice/owner/noPage/{userId}", 1)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").isArray());
    }


    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy hóa đơn checkout hôm nay")
    void getCheckoutToday_Success() throws Exception {
        createTestInvoice();

        mockMvc.perform(get("/api/invoice/checkouttoday")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result").isArray());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy hóa đơn user theo filter và phân trang")
    void getUserFilterInvoices_Success() throws Exception {
        createTestInvoice();

        mockMvc.perform(get("/api/invoice/order/{userId}", 1)
                        .param("status", "0")
                        .param("pageNo", "1")
                        .param("pageSize", "5")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.content").isArray());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Hủy hóa đơn không tồn tại trả về lỗi")
    void deleteInvoice_NotFound() throws Exception {
        mockMvc.perform(delete("/api/invoice/{invoiceId}", 9999)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isNotFound());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lấy hóa đơn không tồn tại trả về lỗi")
    void getInvoice_NotFound() throws Exception {
        mockMvc.perform(get("/api/invoice/{invoiceID}", 9999)
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isNotFound());
    }

    @Test
    @Rollback
    @Transactional
    @DisplayName("Lọc hóa đơn theo tất cả tham số")
    void filterInvoice_AllParams() throws Exception {
        createTestInvoice();

        mockMvc.perform(get("/api/invoice/filter")
                        .param("status", "0")
                        .param("payment", "1")
                        .param("dateFrom", LocalDate.now().toString())
                        .param("dateTo", LocalDate.now().plusDays(5).toString())
                        .param("pageNo", "1")
                        .param("pageSize", "5")
                        .header("Authorization", "Bearer " + accessToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.content").isArray());
    }


}
