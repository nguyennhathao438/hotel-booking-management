package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission,String> {
}
