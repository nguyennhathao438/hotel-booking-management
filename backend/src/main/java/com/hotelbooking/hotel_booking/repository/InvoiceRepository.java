package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

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
    @Query("SELECT i FROM Invoice i WHERE i.checkOutDate = :today")
    List<Invoice> findByHotelOwnerId(@Param("userId") Integer userId);
    List<Invoice> findInvoicesToday(@Param("today") LocalDate today);
    boolean existsByRoom_RoomId(int roomId);
}
