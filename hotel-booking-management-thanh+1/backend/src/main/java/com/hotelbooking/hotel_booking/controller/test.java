package com.hotelbooking.hotel_booking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class test {
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    public test(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @GetMapping("/")
    public String test() {
        Integer result = jdbcTemplate.queryForObject("SELECT 1", Integer.class);
        return "DB OK: " + result;
    }
}
