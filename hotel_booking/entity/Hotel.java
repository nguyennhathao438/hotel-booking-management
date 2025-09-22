package com.hotelbooking.hotel_booking.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer hotelId;
    private String hotelName;
    private String hotelAddress;
    private String hotelPhone;
    private Double hotelRating;
    @Column(name = "hotel_total", nullable = false)
    private Double hotelTotalRoom;
    private Double hotelCost;
    private String hotelDescription;
    @CreationTimestamp
    private LocalDateTime hotelCreatedAt;
    @UpdateTimestamp
    private LocalDateTime hotelUpdatedAt;
    Integer status;
@ManyToOne
@JoinColumn(name = "userID", nullable = true)
private User user;


}
