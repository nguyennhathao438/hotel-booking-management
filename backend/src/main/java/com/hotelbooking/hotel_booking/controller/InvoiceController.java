package com.hotelbooking.hotel_booking.controller;

import com.cloudinary.Api;
import com.hotelbooking.hotel_booking.dto.request.InvoiceRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.InvoiceResponse;
import com.hotelbooking.hotel_booking.entity.Invoice;
import com.hotelbooking.hotel_booking.service.InvoiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/invoice")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping("/room/{roomId}/create")
    public ResponseEntity<ApiResponse<InvoiceResponse>> createInvoice(@PathVariable int roomId,
            @RequestBody @Valid InvoiceRequest request) {
        InvoiceResponse invoiceResponse = invoiceService.createInvoice(roomId, request);
        return ResponseEntity.ok(ApiResponse.<InvoiceResponse>builder()
                .message("Tạo hóa đơn thành công")
                .result(invoiceResponse)
                .build());
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<InvoiceResponse>>> getAllInvoices() {
        List<InvoiceResponse> invoices = invoiceService.getAllInvoices();
        return ResponseEntity.ok(ApiResponse.<List<InvoiceResponse>>builder()
                .message("Lấy danh sách hóa đơn thành công")
                .result(invoices)
                .build());
    }

    @GetMapping("/all-get-page")
    public ResponseEntity<ApiResponse<Page<InvoiceResponse>>> getAllInvoice(
            @RequestParam(defaultValue = "1") Integer pageNo,
            @RequestParam(defaultValue = "7") int pageSize) {
        Page<InvoiceResponse> invoices = invoiceService.getAllInvoice(pageNo, pageSize);
        return ResponseEntity.ok(ApiResponse.<Page<InvoiceResponse>>builder()
                .message("Lấy danh sách hóa đơn thành công")
                .result(invoices)
                .build());
    }

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<Page<InvoiceResponse>>> getFilterInvoice(
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) Integer payment,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo,
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "7") int pageSize) {
        Page<InvoiceResponse> invoices = invoiceService.filterInvoice(status, payment, dateFrom, dateTo, pageNo,
                pageSize);
        return ResponseEntity.ok(ApiResponse.<Page<InvoiceResponse>>builder()
                .message("Lấy filer danh sách thành công")
                .result(invoices)
                .build());
    }
    @GetMapping("/order/{userId}")
    public ResponseEntity<ApiResponse<Page<InvoiceResponse>>> getUserFilterInvoices(
            @PathVariable Integer userId,
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo,
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "5") int pageSize
    ) {
        Page<InvoiceResponse> invoices = invoiceService.filterGetUserInvoice(userId, status, dateFrom, dateTo, pageNo,
                pageSize);
        return  ResponseEntity.ok(ApiResponse.<Page<InvoiceResponse>>builder()
                .message("Lấy danh sách order User thành công")
                .result(invoices)
                .build());
    }
    @GetMapping("/{invoiceID}")
    public ResponseEntity<ApiResponse<InvoiceResponse>> getInvoice(@PathVariable int invoiceID) {
        InvoiceResponse invoiceResponse = invoiceService.getInvoiceById(invoiceID);
        return ResponseEntity.ok(ApiResponse.<InvoiceResponse>builder()
                .message("Lấy thông tin hóa đơn thành công")
                .result(invoiceResponse)
                .build());
    }

    @DeleteMapping("/{invoiceId}")
    public ResponseEntity<ApiResponse<InvoiceResponse>> deleteInvoice(@PathVariable int invoiceId) {
        InvoiceResponse invoiceResponse = invoiceService.cancelInvoice(invoiceId);
        return ResponseEntity.ok(ApiResponse.<InvoiceResponse>builder()
                .message("Huỷ hóa đơn thành công")
                .result(invoiceResponse)
                .build());
    }

    // InvoiceController
    @GetMapping("/owner/{userId}")
    public ResponseEntity<ApiResponse<Page<InvoiceResponse>>> getInvoicesByOwner(
            @PathVariable Integer userId,
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) Integer payment,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(defaultValue = "1") int pageNo,
            @RequestParam(defaultValue = "6") int pageSize) {
        Page<InvoiceResponse> invoices = invoiceService.getInvoicesByHotelOwner(
                userId,status,payment,checkInDate,checkOutDate,pageNo,pageSize);
        return ResponseEntity.ok(ApiResponse.<Page<InvoiceResponse>>builder()
                .message("Lấy danh sách hóa đơn của khách sạn thuộc customer thành công")
                .result(invoices)
                .build());
    }
    @GetMapping("/owner/noPage/{userId}")
    public ResponseEntity<ApiResponse<List<InvoiceResponse>>> getInvoicesByOwnerNoPage(
            @PathVariable Integer userId
    ) {
        List<InvoiceResponse> invoices = invoiceService.getInvoiceByHotelOwner(userId);
        return ResponseEntity.ok(ApiResponse.<List<InvoiceResponse>>builder()
                .message("Lấy danh sách hóa đơn không phan trang success")
                .result(invoices)
                .build());
    }

    @GetMapping("/checkouttoday")
    public ResponseEntity<ApiResponse<List<InvoiceResponse>>> getCheckoutToday() {
        List<InvoiceResponse> invoices = invoiceService.getInvoicesToday();
        return ResponseEntity.ok(ApiResponse.<List<InvoiceResponse>>builder()
                .message("Lấy danh sách hóa đơn hôm nay thành công")
                .result(invoices)
                .build());
    }

    @PutMapping("/{invoiceID}")
    public ResponseEntity<ApiResponse<InvoiceResponse>> updateInvoice(
            @PathVariable Integer invoiceID,
            @RequestBody @Valid InvoiceRequest request) {
        InvoiceResponse invoiceResponse = invoiceService.updateInvoice(invoiceID, request);
        return ResponseEntity.ok(ApiResponse.<InvoiceResponse>builder()
                .message("Cập nhật hóa đơn thành công")
                .result(invoiceResponse)
                .build());
    }

}
