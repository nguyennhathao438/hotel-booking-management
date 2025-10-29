package com.hotelbooking.hotel_booking.repository;
import com.hotelbooking.hotel_booking.entity.Service;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
@Repository
public interface ServiceRepository extends JpaRepository<Service,Integer> {
}
