package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.InvalidateToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidateToken,String> {
}
