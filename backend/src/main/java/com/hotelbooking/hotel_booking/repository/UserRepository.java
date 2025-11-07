package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    List<User> findByIsDeleteNot(int isDelete);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    List<User> findByEmailContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrPhoneContainingIgnoreCase(String email,String firstName,String lastName,String phone);
    boolean existsByRolesContains(Role role);
    Optional<User> findById(int id);
    @Query("""
    SELECT u FROM User u
    WHERE u.isDelete = 0 AND (
        LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(u.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
        OR LOWER(u.phone) LIKE LOWER(CONCAT('%', :keyword, '%'))
    )
""")
    Page<User> searchActiveUsers(@Param("keyword") String keyword, Pageable pageable);
}
