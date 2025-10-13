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
    @Query("SELECT i FROM Invoice i WHERE i.checkOutDate = :today")
    List<Invoice> findInvoicesToday(@Param("today") LocalDate today);
    boolean existsByRoom_RoomId(int roomId);}