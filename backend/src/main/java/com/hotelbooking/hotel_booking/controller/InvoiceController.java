package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.InvoiceRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.InvoiceResponse;
import com.hotelbooking.hotel_booking.service.InvoiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoice")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<InvoiceResponse>> createInvoice(@RequestBody @Valid InvoiceRequest request) {
        InvoiceResponse invoiceResponse = invoiceService.createInvoice(request);
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
    @GetMapping("/checkouttoday")
    public ResponseEntity<ApiResponse<List<InvoiceResponse>>> getCheckoutToday() {
        List<InvoiceResponse> invoices = invoiceService.getInvoicesToday();
        return ResponseEntity.ok(ApiResponse.<List<InvoiceResponse>>builder()
                .message("Lấy danh sách hóa đơn hôm nay thành công")
                .result(invoices)
                .build());
    }
    @GetMapping("/{invoiceID}")
    public ResponseEntity<ApiResponse<InvoiceResponse>> getInvoice(@PathVariable Integer invoiceID) {
        InvoiceResponse invoiceResponse = invoiceService.getInvoiceById(invoiceID);
        return ResponseEntity.ok(ApiResponse.<InvoiceResponse>builder()
                .message("Lấy thông tin hóa đơn thành công")
                .result(invoiceResponse)
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