package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,String> {
}
