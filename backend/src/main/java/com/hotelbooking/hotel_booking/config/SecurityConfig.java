package com.hotelbooking.hotel_booking.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // tạm thời disable CSRF để test POST
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/users/register").permitAll() // cho phép register
                        .anyRequest().permitAll()
                )
                .httpBasic(httpBasic -> {}); // nếu muốn dùng Basic Auth

        return http.build();
    }

}
