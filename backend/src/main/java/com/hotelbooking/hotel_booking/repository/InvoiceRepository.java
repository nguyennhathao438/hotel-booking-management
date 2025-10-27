package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Invoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

import java.time.LocalDateTime;
import java.util.List;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {
    @Query(value = """
            SELECT i.id, i.check_in_date, i.check_out_date, i.created_at,
                   i.total_amount, i.payment, i.status, i.roomid, i.userid
            FROM invoice i
            JOIN room r ON i.roomid = r.room_id
            JOIN hotel h ON r.hotelid = h.hotel_id
            WHERE h.userid = :userId
            """, nativeQuery = true)
    List<Invoice> findByHotelOwnerId(@Param("userId") Integer userId);

    @Query("SELECT i FROM Invoice i WHERE i.checkOutDate = :today")
    List<Invoice> findInvoicesToday(@Param("today") LocalDate today);

    boolean existsByRoom_RoomId(int roomId);

    @Query("SELECT i FROM Invoice i " +
            "WHERE (:status IS NULL OR i.status = :status) " +
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

    public List<Invoice> getAllInvoicesByUser_Email(String user_email);
    public List<Invoice> getByUser_Id(int user_id);
}
