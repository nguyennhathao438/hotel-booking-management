package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
@Repository
public interface RoomRepository extends JpaRepository<Room,Integer> {
    boolean existsByRoomName(String roomName);

    List<Room> findAllByHotel_HotelId(Integer hotelHotelId);

    @Query("""
        SELECT r
        FROM Room r
        WHERE r.status = 1
          AND r.id NOT IN (
              SELECT i.room.id
              FROM Invoice i
              WHERE (i.checkInDate <= :endDate AND i.checkOutDate >= :startDate)
          )
    """)
    List<Room> findAvailableRooms(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("""
        SELECT COUNT(r)
        FROM Room r
        WHERE r.status = 1
          AND r.id NOT IN (
              SELECT i.room.id
              FROM Invoice i
              WHERE (i.checkInDate <= :endDate AND i.checkOutDate >= :startDate)
          )
    """)
    long countAvailableRooms(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}