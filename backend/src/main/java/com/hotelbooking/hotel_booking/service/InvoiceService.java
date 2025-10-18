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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.hotelbooking.hotel_booking.service.UserSevice.mapToUserResponse;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public InvoiceService(InvoiceRepository invoiceRepository, RoomRepository roomRepository, UserRepository userRepository) {
        this.invoiceRepository = invoiceRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

        public InvoiceResponse createInvoice(int roomId,InvoiceRequest request) {
            if(request.getCheckOutDate().isBefore(request.getCheckInDate())){
                throw new AppException(ErrorCode.INVOICE_FAILED);
            }
            Room room = roomRepository.getReferenceById(roomId);
            List<Invoice> existInvoices = room.getInvoices();
            User user = getCurrentUser();
            Invoice invoice = Invoice.builder()
                    .checkInDate(request.getCheckInDate())
                    .checkOutDate(request.getCheckOutDate())
                    .totalAmount(request.getTotalAmount())
                    .payment(request.getPayment())
                    .status(0)
                    .room(room)
                    .user(user)
                    .build();
            if(validateDates(request,existInvoices)){
                room.addInvoice(invoice);
                invoiceRepository.save(invoice);
            }
            else
                throw new AppException(ErrorCode.INVOICE_NOT_EXISTED);
            return mapToInvoiceResponse(invoice);
        }

    public List<InvoiceResponse> getAllInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        return invoices.stream()
                .map(this::mapToInvoiceResponse)
                .toList();
    }

    public InvoiceResponse getInvoiceById(int id) {
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        return mapToInvoiceResponse(invoice);
    }
    public InvoiceResponse cancelInvoice(int id){
        Invoice invoice = invoiceRepository.findById(id).orElseThrow(()->new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        invoice.setStatus(3);
        invoiceRepository.save(invoice);
        return mapToInvoiceResponse(invoice);
    }

    public List<InvoiceResponse> getAllInvoiceByRoom_RoomId(int roomId){
        List<Invoice> invoices = invoiceRepository.getAllInvoicesByRoom_RoomId(roomId);
        return invoices.stream()
                .map(this::mapToInvoiceResponse)
                .toList();
    }

    private boolean validateDates(InvoiceRequest request,List<Invoice> exitsInvoices) {
        return exitsInvoices.stream()
                .noneMatch(exitsInvoice ->
                        request.getCheckInDate().isBefore(exitsInvoice.getCheckOutDate())
                                && request.getCheckOutDate().isAfter(exitsInvoice.getCheckInDate())
                );

    }



    private RoomResponse mapToRoomResponse(Room room) {
        return RoomResponse.builder()
                .roomId(room.getRoomId())
                .roomName(room.getRoomName())
                .roomType(room.getRoomType())
                .roomArea(room.getRoomArea())
                .bedRoomCount(room.getBedRoomCount())
                .roomCapacity(room.getRoomCapacity())
                .bedCount(room.getBedCount())
                .roomPrice(room.getRoomPrice())
                .status(room.getStatus())
                .hotel(room.getHotel() != null ? mapToHotelResponse(room.getHotel()) : null)
                .roomCreateAt(room.getRoomCreateAt())
                .roomUpdateAt(room.getRoomUpdateAt())
                .build();
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
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

}
