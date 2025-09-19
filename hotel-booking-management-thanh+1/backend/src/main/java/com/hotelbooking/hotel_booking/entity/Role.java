package com.hotelbooking.hotel_booking.entity;

import jakarta.persistence.*;

import java.util.Set;
@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id ;
    private String roleName;
    @OneToMany(mappedBy = "role")
    private Set<User> users;

    public int getId() {
        return id;
    }

    public String getRoleName() {
        return roleName;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
