package com.hotelbooking.hotel_booking.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hotelbooking.hotel_booking.dto.response.ImgRoomResponse;
import com.hotelbooking.hotel_booking.entity.ImgRoom;
import com.hotelbooking.hotel_booking.entity.Room;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.ImgRoomRepository;
import com.hotelbooking.hotel_booking.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ImgRoomService {
    @Autowired
    ImgRoomRepository imgRoomRepository;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    Cloudinary cloudinary;

    public List<ImgRoomResponse> uploadRoomImage(MultipartFile[] files, int roomId) throws IOException {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_EXISTED));
        List<ImgRoomResponse> listImg = new ArrayList<>();
        for (MultipartFile file : files) {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("folder", "room_images"));
            String imgUrl = uploadResult.get("secure_url").toString();
            ImgRoom imgRoom = ImgRoom.builder()
                    .room(room)
                    .imgUrl(imgUrl)
                    .build();
            imgRoomRepository.save(imgRoom);
            listImg.add(mapToImgRoomResponse(imgRoom));
        }
        return listImg;
    }

    public List<ImgRoomResponse> findByRoom_RoomId(int roomId){
        List<ImgRoom> listImg = imgRoomRepository.findByRoom_RoomId(roomId);
        return listImg.stream()
                .map(this::mapToImgRoomResponse)
                .toList();
    }
    public void deleteImgRoomById(int imgRoomId){
        imgRoomRepository.deleteById(imgRoomId);
    }
    public ImgRoomResponse mapToImgRoomResponse(ImgRoom imgRoom) {
        return ImgRoomResponse.builder()
                .id(imgRoom.getId())
                .imgUrl(imgRoom.getImgUrl())
                .room(imgRoom.getRoom())
                .build();
    }
}
