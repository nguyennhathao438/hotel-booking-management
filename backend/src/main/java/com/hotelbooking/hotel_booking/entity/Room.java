package com.hotelbooking.hotel_booking.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int roomId;
    @Column(nullable = false)
    String roomName;
    String roomType;
    double roomArea;
    int bedRoomCount;
    int roomCapacity;
    @Column(nullable = false)
    int bedCount;
    @Column(nullable = false)
    double roomPrice;
    @CreationTimestamp
    LocalDateTime roomCreateAt;
    @UpdateTimestamp
    LocalDateTime roomUpdateAt;
    int status;
    @ManyToOne
    @JoinColumn(name = "hotelID", nullable = true)
    Hotel hotel;
    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "room")
    List<Invoice> invoices = new ArrayList<>();
    public void addInvoice(Invoice invoice){
        if(invoices==null){
            invoices=new ArrayList<>();
        }
        invoices.add(invoice);
        invoice.setRoom(this);
        status=1;
    }
}
