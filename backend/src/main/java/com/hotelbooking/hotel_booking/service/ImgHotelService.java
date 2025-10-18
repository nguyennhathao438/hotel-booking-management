package com.hotelbooking.hotel_booking.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hotelbooking.hotel_booking.dto.request.HotelRequest;
import com.hotelbooking.hotel_booking.dto.request.ImgHotelRequest;
import com.hotelbooking.hotel_booking.dto.response.ImgHotelRespone;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.ImgHotel;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.ImgHotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ImgHotelService {
    @Autowired
    private ImgHotelRepository imgHotelRepository;
    @Autowired
    private HotelRepository hotelRepository;
    @Autowired
    private Cloudinary cloudinary;
    public List<ImgHotelRespone> uploadImages(MultipartFile[] files, int hotelId) throws IOException {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(()     -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        List<ImgHotelRespone> responses = new ArrayList<>();
        for (MultipartFile file : files) {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("folder", "hotel_images"));
            String imageUrl = uploadResult.get("secure_url").toString();
            ImgHotel imgHotel = ImgHotel.builder()
                    .imgUrl(imageUrl)
                    .hotel(hotel)
                    .build();
            imgHotelRepository.save(imgHotel);
            responses.add(ImgHotelRespone.builder()
                    .imgUrl(imageUrl)
                    .hotel(hotel)
                    .build());
        }
        return responses;
    }

    public List<ImgHotelRespone> getImgHotelsBy_HotelId(int hotelId) {
        List<ImgHotel> imgHotels = imgHotelRepository.findImgHotelByHotel_HotelId(hotelId);
        return imgHotels.stream()
                .map(this::mapToImgHotelRespone)
                .toList();
    }

    public ImgHotelRespone getImgHotelById(int id){
        ImgHotel imgHotel=imgHotelRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
        return mapToImgHotelRespone(imgHotel);
    }

    public List<ImgHotelRespone> getAllImgHotels(){
        List<ImgHotel> imgHotels = imgHotelRepository.findAll();
        return imgHotels.stream()
                .map(this::mapToImgHotelRespone)
                .toList();
    }

    public ImgHotelRespone mapToImgHotelRespone(ImgHotel imgHotel){
        return ImgHotelRespone.builder()
                .imgHotelId(imgHotel.getImgHotelId())
                .imgUrl(imgHotel.getImgUrl())
                .hotel(imgHotel.getHotel())
                .build();
    }
}


