package com.hotelbooking.hotel_booking.repository;

import com.hotelbooking.hotel_booking.entity.Message;
import com.hotelbooking.hotel_booking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message,Long> {
    @Query("SELECT m FROM Message m " +
            "WHERE (m.sender.id = :user1 AND m.receiver.id = :user2) " +
            "   OR (m.sender.id = :user2 AND m.receiver.id = :user1) " +
            "ORDER BY m.createAt ASC")
    List<Message> getConversation(@Param("user1") int senderId, @Param("user2") int receiverId);
    @Query("""
    SELECT m FROM Message m
    WHERE m.receiver.id = :userId
      AND m.createAt = (
          SELECT MAX(m2.createAt) 
          FROM Message m2 
          WHERE m2.sender = m.sender 
            AND m2.receiver.id = :userId
      )
    ORDER BY m.createAt DESC
    """)
    List<Message> getAllLastMessagesForUser(@Param("userId") int receiverId);
    @Query(value = """
    SELECT u.*
    FROM user u
    JOIN message m ON m.sender_id = u.id
    WHERE m.receiver_id = :userId
      AND (
          :keyword IS NULL OR
          LOWER(CONCAT(u.first_name, ' ', u.last_name)) LIKE LOWER(CONCAT('%', :keyword, '%'))
      )
    GROUP BY u.id
    ORDER BY MAX(m.create_at) DESC
    LIMIT 20
""", nativeQuery = true)
    List<User> getLastSenders(@Param("userId") int userId,
                              @Param("keyword") String keyword);


}
