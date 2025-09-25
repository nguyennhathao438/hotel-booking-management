package edu.poly.hotel_management.respository;

import edu.poly.hotel_management.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRespository extends JpaRepository<Room,Integer> {

}
