package com.hotelbooking.hotel_booking.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary configKey(){
        Map<String,String> config = new HashMap<>();
        config.put("cloud_name","dnniedh2d");
        config.put("api_key","339479465969265");
        config.put("api_secret","SiPsDFRBkGrHWpssqrC94rV43Mk");
        return new Cloudinary(config);
    }
}
