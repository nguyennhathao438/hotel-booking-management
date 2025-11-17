package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Invoice;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

import java.time.LocalDateTime;
import java.util.List;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
        Page<Invoice> findAllByRoom_Hotel_User_IdAndIsDeleteNot(Integer userId,Integer isDelete,Pageable pageable);

        List<Invoice> findAllByRoom_Hotel_User_IdAndIsDeleteNot(Integer userId, Integer isDelete);
        List<Invoice> findAllByIsDeleteNot(Integer isDelete);
        Page<Invoice> findAllByRoom_Hotel_User_IdAndStatusAndIsDeleteNot(Integer userId,
                        Integer status,
                        Integer isDelete,
                        Pageable pageable);

        Page<Invoice> findAllByRoom_Hotel_User_IdAndPaymentAndIsDeleteNot(Integer userId,
                        Integer payment,
                        Integer isDelete,
                        Pageable pageable);

        Page<Invoice> findAllByRoom_Hotel_User_IdAndCheckInDateGreaterThanEqualAndCheckOutDateLessThanEqualAndIsDeleteNot(
                        Integer userId,
                        LocalDate checkInDate,
                        LocalDate checkOutDate,
                        Integer isDelete,
                        Pageable pageable);

        Page<Invoice> findAllByRoom_Hotel_User_IdAndStatusAndCheckInDateGreaterThanEqualAndCheckOutDateLessThanEqualAndIsDeleteNot(
                        Integer userId,
                        Integer status,
                        LocalDate checkInDate,
                        LocalDate checkOutDate,
                        Integer isDelete,
                        Pageable pageable);

        Page<Invoice> findAllByRoom_Hotel_User_IdAndPaymentAndCheckInDateGreaterThanEqualAndCheckOutDateLessThanEqualAndIsDeleteNot(
                        Integer userId,
                        Integer payment,
                        LocalDate checkInDate,
                        LocalDate checkOutDate,
                        Integer isDelete,
                        Pageable pageable);

        Page<Invoice> findAllByRoom_Hotel_User_IdAndStatusAndPaymentAndIsDeleteNot(Integer userId,
                        Integer status,
                        Integer payment,
                        Integer isDelete,
                        Pageable pageable);

        Page<Invoice> findAllByRoom_Hotel_User_IdAndStatusAndPaymentAndCheckInDateGreaterThanEqualAndCheckOutDateLessThanEqualAndIsDeleteNot(
                        Integer userId,
                        Integer status,
                        Integer payment,
                        LocalDate checkInDate,
                        LocalDate checkOutDate,
                        Integer isDelete,
                        Pageable pageable);

        @Query("SELECT i FROM Invoice i WHERE i.checkOutDate = :today")
        List<Invoice> findInvoicesToday(@Param("today") LocalDate today);

        boolean existsByRoom_RoomId(int roomId);

        @Query("SELECT i FROM Invoice i " +
                        "WHERE i.isDelete = 0" +
                        "AND (:status IS NULL OR i.status = :status) " +
                        "AND (:payment IS NULL OR i.payment = :payment) " +
                        "AND (:dateFrom IS NULL OR i.checkInDate >= :dateFrom) " +
                        "AND (:dateTo IS NULL OR i.checkOutDate <= :dateTo)")
        Page<Invoice> filteredInvoice(
                        @Param("status") Integer status,
                        @Param("payment") Integer payment,
                        @Param("dateFrom") LocalDate dateFrom,
                        @Param("dateTo") LocalDate dateTo,
                        Pageable pageable);

        public List<Invoice> getAllInvoicesByRoom_RoomId(int room_id);
        Page<Invoice> findAllByIsDeleteNot(Integer isDelete, Pageable pageable);
        public List<Invoice> getAllInvoicesByUser_Email(String user_email);

        @Query("""
                        SELECT i FROM Invoice i
                        WHERE i.user.id = :userId
                          AND (:status IS NULL OR i.status = :status)
                          AND (:dateFrom IS NULL OR i.checkInDate >= :dateFrom)
                          AND (:dateTo IS NULL OR i.checkOutDate <= :dateTo)
                        """)
        Page<Invoice> findUserFilteredInvoice(
                        @Param("userId") Integer userId,
                        @Param("status") Integer status,
                        @Param("dateFrom") LocalDate dateFrom,
                        @Param("dateTo") LocalDate dateTo,
                        Pageable pageable);

        public Page<Invoice> findAllByUser_Id(Integer userId, Pageable pageable);

        public List<Invoice> findByRoom_RoomId(int roomId);
        public List<Invoice> getByUser_Id(int user_id);
    @Query(value = """
        SELECT h.hotel_id, h.hotel_name, COUNT(i.id)
        FROM invoice i
        JOIN room r ON i.roomid = r.room_id
        JOIN hotel h ON r.hotelid = h.hotel_id
        WHERE i.status = 2
        GROUP BY h.hotel_id, h.hotel_name
        ORDER BY COUNT(i.id) DESC
    """, nativeQuery = true)
        List<Object[]> countInvoicesGroupedByHotelNative();
}
