package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.InvoiceRequest;
import com.hotelbooking.hotel_booking.dto.response.*;
import com.hotelbooking.hotel_booking.entity.*;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.InvoiceRepository;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.time.LocalDate;

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
    public InvoiceService(InvoiceRepository invoiceRepository, RoomRepository roomRepository,
            UserRepository userRepository) {
        this.invoiceRepository = invoiceRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    public InvoiceResponse createInvoice(int roomId, InvoiceRequest request) {
        if (request.getCheckOutDate().isBefore(request.getCheckInDate())) {
            throw new AppException(ErrorCode.INVOICE_FAILED);
        }
        // thay đổi từ getReferenceById trong service create invoice thành
        // findByIdWithInvoices nếu có lỗi alo H

        Room room = roomRepository.findByIdWithInvoices(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
        List<Invoice> existInvoices = room.getInvoices() != null ? room.getInvoices() : new ArrayList<>();

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
        // if (validateDates(request, existInvoices)) {
        // room.addInvoice(invoice);
        // invoiceRepository.save(invoice);
        // } else
        // throw new AppException(ErrorCode.ROOM_ALREADY_BOOKED);
        invoiceRepository.save(invoice);
        return mapToInvoiceResponse(invoice);
    }

    public List<InvoiceResponse> getAllInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        return invoices.stream()
                .map(this::mapToInvoiceResponse)
                .toList();
    }
    public List<InvoiceResponse> getAllInvoiceByRoom_RoomId(int roomId) {
        List<Invoice> invoices = invoiceRepository.getAllInvoicesByRoom_RoomId(roomId);
        return invoices.stream()
                .map(this::mapToInvoiceResponse)
                .toList();
    }
    public List<InvoiceResponse> getAllInvoicesNoStatistic() {
        List<Invoice> invoices = invoiceRepository.findAllByIsDeleteNot(1);
        return invoices.stream()
                .map(this::mapToInvoiceResponse)
                .toList();
    }

    public List<InvoiceResponse> getByUser_Id(int user_id) {
        List<Invoice> invoices = invoiceRepository.getByUser_Id(user_id);
        return invoices.stream()
                .map(this::mapToInvoiceResponse)
                .toList();
    }

    public InvoiceResponse cancelInvoice(int id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        invoice.setStatus(3);
        invoiceRepository.save(invoice);
        return mapToInvoiceResponse(invoice);
    }

    public InvoiceResponse getInvoiceById(int id) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        return mapToInvoiceResponse(invoice);
    }

    // InvoiceService
    @PreAuthorize("hasAuthority('READ_INVOICE_LIST_(2)')")
    public List<InvoiceResponse> getInvoiceByHotelOwner(Integer userId) {
        List<Invoice> invoices = invoiceRepository.findAllByRoom_Hotel_User_IdAndIsDeleteNot(userId, 1);
        return invoices.stream()
                .map(this::mapToInvoiceResponse)
                .toList();
    }

    @PreAuthorize("hasAuthority('READ_INVOICE_LIST_(2)')")
    public Page<InvoiceResponse> getInvoicesByHotelOwner(Integer userId,
            Integer status,
            Integer payment,
            LocalDate checkInDate,
            LocalDate checkOutDate,
            int pageNo, int pageSize) {

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<Invoice> invoicesPage;
        if (status != null && payment == null && checkInDate == null && checkOutDate == null) {
            invoicesPage = invoiceRepository.findAllByRoom_Hotel_User_IdAndStatusAndIsDeleteNot(userId, status, 1,
                    pageable);
        } else if (status == null && payment != null && checkInDate == null && checkOutDate == null) {
            invoicesPage = invoiceRepository.findAllByRoom_Hotel_User_IdAndPaymentAndIsDeleteNot(userId, payment, 1,
                    pageable);
        } else if (status == null && payment == null && checkInDate != null && checkOutDate != null) {
            invoicesPage = invoiceRepository
                    .findAllByRoom_Hotel_User_IdAndCheckInDateGreaterThanEqualAndCheckOutDateLessThanEqualAndIsDeleteNot(
                            userId, checkInDate, checkOutDate, 1, pageable);
        } else if (status != null && payment == null && checkInDate != null && checkOutDate != null) {
            invoicesPage = invoiceRepository
                    .findAllByRoom_Hotel_User_IdAndStatusAndCheckInDateGreaterThanEqualAndCheckOutDateLessThanEqualAndIsDeleteNot(
                            userId, status, checkInDate, checkOutDate, 1, pageable);
        } else if (status == null && payment != null && checkInDate != null && checkOutDate != null) {
            invoicesPage = invoiceRepository
                    .findAllByRoom_Hotel_User_IdAndPaymentAndCheckInDateGreaterThanEqualAndCheckOutDateLessThanEqualAndIsDeleteNot(
                            userId, payment, checkInDate, checkOutDate, 1, pageable);
        } else if (status != null && payment != null && checkInDate == null && checkOutDate == null) {
            invoicesPage = invoiceRepository.findAllByRoom_Hotel_User_IdAndStatusAndPaymentAndIsDeleteNot(userId,
                    status, payment, 1, pageable);
        } else if (status != null && payment != null && checkInDate != null && checkOutDate != null) {
            invoicesPage = invoiceRepository
                    .findAllByRoom_Hotel_User_IdAndStatusAndPaymentAndCheckInDateGreaterThanEqualAndCheckOutDateLessThanEqualAndIsDeleteNot(
                            userId, status, payment, checkInDate, checkOutDate, 1, pageable);
        } else {
            invoicesPage = invoiceRepository.findAllByRoom_Hotel_User_IdAndIsDeleteNot(userId, 1, pageable);
        }
        return invoicesPage.map(this::mapToInvoiceResponse);
    }

    @PreAuthorize("hasAuthority('UPDATE_INVOICE')")
    public InvoiceResponse updateInvoice(Integer id, InvoiceRequest request) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        validateDate(request);
        if (request.getCheckInDate() != null)
            invoice.setCheckInDate(request.getCheckInDate());
        if (request.getCheckOutDate() != null)
            invoice.setCheckOutDate(request.getCheckOutDate());
        if (request.getTotalAmount() != null)
            invoice.setTotalAmount(request.getTotalAmount());
        if (request.getPayment() != null)
            invoice.setPayment(request.getPayment());
        if (request.getStatus() != null) {
            int oldStatus = invoice.getStatus();
            int newStatus = request.getStatus();
            // Logic kiểm tra chuyển trạng thái hợp lệ
            boolean validTransition = false;
            switch (oldStatus) {
                case 0: // Chờ xác nhận
                    validTransition = (newStatus == 1 || newStatus == 4);
                    break;
                case 1: // Đã xác nhận
                    validTransition = (newStatus == 2);
                    break;
                case 2: // Đã thanh toán
                    validTransition = (newStatus == 3);
                    break;
                case 3: // Hoàn thành
                    break;
                case 4: // Đã hủy
                    validTransition = false; // Không thể đổi nữa
                    break;
                default:
                    validTransition = false;
            }
            if (!validTransition) {
                throw new AppException(ErrorCode.INVALID_STATUS_TRANSITION);
            }
            invoice.setStatus(newStatus);
        }
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

    @PreAuthorize("hasAuthority('READ_INVOICE_LIST')")
    public List<InvoiceResponse> getInvoicesToday() {
        LocalDate today = LocalDate.now();
        return invoiceRepository.findAll().stream()
                .filter(invoice -> invoice.getCheckOutDate().isEqual(today))
                .map(this::mapToInvoiceResponse)
                .toList();
    }

    @PreAuthorize("hasAuthority('READ_INVOICE_LIST')")
    public Page<InvoiceResponse> getAllInvoice(int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<Invoice> invoices = invoiceRepository.findAllByIsDeleteNot(1, pageable);
        return invoices.map(this::mapToInvoiceResponse);
    }

    @PreAuthorize("hasAuthority('READ_INVOICE_LIST')")
    public Page<InvoiceResponse> filterInvoice(Integer status, Integer payment, LocalDate dateFrom, LocalDate dateTo,
            int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<Invoice> invoices = invoiceRepository.filteredInvoice(status, payment, dateFrom, dateTo, pageable);
        return invoices.map(this::mapToInvoiceResponse);
    }

    public Page<InvoiceResponse> filterGetUserInvoice(Integer userId, Integer status, LocalDate dateFrom,
            LocalDate dateTo,
            int pageNo, int pageSize) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        if (status == null && dateFrom == null & dateTo == null) {
            Page<Invoice> invoices = invoiceRepository.findAllByUser_Id(userId, pageable);
            return invoices.map(this::mapToInvoiceResponse);
        }
        Page<Invoice> invoices = invoiceRepository.findUserFilteredInvoice(userId, status, dateFrom, dateTo, pageable);
        return invoices.map(this::mapToInvoiceResponse);
    }

    public void deleteInvoice(int invoiceId) {
        Invoice invoices = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        invoices.setIsDelete(1);
        invoiceRepository.saveAndFlush(invoices);
    }

    public List<InvoiceProjectionResponse> hotelCount() {
        List<Object[]> results = invoiceRepository.countInvoicesGroupedByHotelNative();
        return results.stream()
                .map(obj -> InvoiceProjectionResponse.builder()
                        .hotelId((Integer) obj[0])
                        .hotelName((String) obj[1])
                        .invoiceCount(((Number) obj[2]).longValue())
                        .build())
                .collect(Collectors.toList());
    }

    private boolean validateDates(InvoiceRequest request, List<Invoice> exitsInvoices) {
        return exitsInvoices.stream()
                .noneMatch(exitsInvoice -> request.getCheckInDate().isBefore(exitsInvoice.getCheckOutDate())
                        && request.getCheckOutDate().isAfter(exitsInvoice.getCheckInDate()));

    }

    // public boolean invoiceCheck(LocalDate checkInDate, LocalDate checkOutDate,
    // int roomId) {
    // Room room = roomRepository.findById(roomId).orElseThrow(() -> new
    // AppException(ErrorCode.ROOM_NOT_EXISTED));
    // List<Invoice> existInvoices = room.getInvoices();
    // return existInvoices.stream()
    // .noneMatch(exitsInvoice ->
    // checkInDate.isBefore(exitsInvoice.getCheckOutDate())
    // && checkOutDate.isAfter(exitsInvoice.getCheckInDate()));
    // }

    public void changeStatusAfterPayment(int invoiceId, int status) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_EXISTED));
        invoice.setStatus(status);
        invoiceRepository.save(invoice);
    }

    public boolean invoiceCheck(LocalDate checkInDate, LocalDate checkOutDate, int roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
        List<Invoice> existInvoices = room.getInvoices().stream()
                .filter(invoice -> invoice.getStatus() == 1)
                .toList();
        System.out.println("exitsInvoice" + existInvoices);
        System.out.println("exitsInvoice" + existInvoices.size());
        return existInvoices.stream()
                .noneMatch(existInvoice -> checkInDate.isBefore(existInvoice.getCheckOutDate()) &&
                        checkOutDate.isAfter(existInvoice.getCheckInDate()));
    }

    private void validateDate(InvoiceRequest request) {
        if (request.getCheckInDate() != null && request.getCheckOutDate() != null) {
            if (!request.getCheckOutDate().isAfter(request.getCheckInDate())) {
                throw new AppException(ErrorCode.INVALID_DATE_RANGE);
            }
        }
    }

    public RoomResponse mapToRoomResponse(Room room) {
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

    public UserResponse mapToUserResponse(User user) {
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

    public InvoiceResponse mapToInvoiceResponse(Invoice invoice) {
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

    public HotelResponse mapToHotelResponse(Hotel hotel) {
        if (hotel == null)
            return null;
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
                .user(mapToUserResponse(hotel.getUser()))
                .build();
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

}
