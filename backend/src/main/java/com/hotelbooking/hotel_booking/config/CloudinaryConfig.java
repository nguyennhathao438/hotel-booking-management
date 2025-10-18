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
        config.put("cloud_name","dm2gmucce");
        config.put("api_key","768699196193148");
        config.put("api_secret","-Z2iLQDQi1sUShgbPkKGrCHlz4I");
        return new Cloudinary(config);
    }
}
