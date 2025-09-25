package edu.poly.hotel_management.respository;

import edu.poly.hotel_management.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface HotelRespository extends JpaRepository<Hotel,Integer> {

}
