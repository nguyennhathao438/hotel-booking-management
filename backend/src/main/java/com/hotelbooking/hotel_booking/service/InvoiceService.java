package com.hotelbooking.hotel_booking.service;


import com.hotelbooking.hotel_booking.dto.request.InvoiceRequest;
import com.hotelbooking.hotel_booking.dto.response.HotelResponse;
import com.hotelbooking.hotel_booking.dto.response.InvoiceResponse;
import com.hotelbooking.hotel_booking.dto.response.RoomResponse;
import com.hotelbooking.hotel_booking.dto.response.UserResponse;
import com.hotelbooking.hotel_booking.entity.*;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.InvoiceRepository;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.hotelbooking.hotel_booking.service.UserSevice.mapToUserResponse;

@Service
public class InvoiceService {
    private InvoiceRepository invoiceRepository;
    private RoomRepository roomRepository;
    private UserRepository userRepository;

    @Autowired
    public InvoiceService(InvoiceRepository invoiceRepository, RoomRepository roomRepository, UserRepository userRepository) {
        this.invoiceRepository = invoiceRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }
    public InvoiceResponse createInvoice(InvoiceRequest request) {

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        validateDates(request);
        Invoice invoice = Invoice.builder()
                .checkInDate(request.getCheckInDate())
                .checkOutDate(request.getCheckOutDate())
                .totalAmount(request.getTotalAmount())
                .payment(request.getPayment())
                .status(0)
                .room(room)
                .user(user)
                .build();

        invoiceRepository.save(invoice);

        return mapToInvoiceResponse(invoice);
    }
    public List<InvoiceResponse> getAllInvoices() {
        return invoiceRepository.findAll().stream()
                .map(this::mapToInvoiceResponse)
                .toList();
    }
    public InvoiceResponse getInvoiceById(Integer id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        return mapToInvoiceResponse(invoice);
    }
    public InvoiceResponse updateInvoice(Integer id, InvoiceRequest request) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        validateDates(request);
        if (request.getCheckInDate() != null) invoice.setCheckInDate(request.getCheckInDate());
        if (request.getCheckOutDate() != null) invoice.setCheckOutDate(request.getCheckOutDate());
        if (request.getTotalAmount() != null) invoice.setTotalAmount(request.getTotalAmount());
        if (request.getPayment() != null) invoice.setPayment(request.getPayment());
        if (request.getStatus() != null) invoice.setStatus(request.getStatus());

        if (request.getRoomId() != null) {
            Room room = roomRepository.findById(request.getRoomId())
                    .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
            invoice.setRoom(room);
        }

        if (request.getUserId() != null) {
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
            invoice.setUser(user);
        }

        invoiceRepository.save(invoice);
        return mapToInvoiceResponse(invoice);
    }
    private void validateDates(InvoiceRequest request) {
        if (request.getCheckInDate() != null && request.getCheckOutDate() != null) {
            if (!request.getCheckOutDate().isAfter(request.getCheckInDate())) {
                throw new AppException(ErrorCode.INVALID_DATE_RANGE);
            }
        }
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
    public List<InvoiceResponse> getInvoicesToday() {
        LocalDate today = LocalDate.now();

        return invoiceRepository.findAll().stream()
                .filter(invoice -> invoice.getCheckOutDate().isEqual(today))
                .map(this::mapToInvoiceResponse)
                .toList();
    }
    public static UserResponse mapToUserResponse(User user){
        Set<String> roleNames = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .roles(roleNames)
                .dateOfBirth(user.getDateOfBirth())
                .avatar(user.getAvatar())
                .createAt(user.getCreateAt())
                .updateAt(user.getUpdateAt())
                .build();
    }

    private InvoiceResponse mapToInvoiceResponse(Invoice invoice) {
        return InvoiceResponse.builder()
                .id(invoice.getId())
                .checkInDate(invoice.getCheckInDate())
                .checkOutDate(invoice.getCheckOutDate())
                .createdAt(invoice.getCreatedAt())
                .totalAmount(invoice.getTotalAmount())
                .payment(invoice.getPayment())
                .status(invoice.getStatus())
                .room(mapToRoomResponse(invoice.getRoom()))
                .user(mapToUserResponse(invoice.getUser()))
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