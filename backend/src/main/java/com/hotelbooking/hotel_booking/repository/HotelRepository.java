package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {
    boolean existsByHotelName(String hotelName);

    boolean existsByUser(User user);

    List<Hotel> findByStatus(Integer status);

    List<Hotel> findByHotelId(Integer hotelID);

    List<Hotel> findAllByUser_Id(int userId);

    Hotel findFirstByUser_Id(int userId);

    List<Hotel> findByHotelAddressContainingIgnoreCase(String province);

    Page<Hotel> findByStatusIn(List<Integer> status, Pageable pageable);


    Page<Hotel> findByHotelRatingBetweenAndStatusIn(Double minRating, Double maxRating, List<Integer> status,
            Pageable pageable);

    Page<Hotel> findByStatusInAndHotelNameContainingIgnoreCaseOrStatusInAndHotelAddressContainingIgnoreCase(
            List<Integer> status1, String namekeyword,
            List<Integer> status2, String addresskeyword,
            Pageable pageable);

    Page<Hotel> findByHotelRatingBetweenAndStatus(Double minRating, Double maxRating, Integer status,
            Pageable pageable);

    boolean existsByHotelNameAndHotelIdNot(String hotelName, Integer hotelId);
}
