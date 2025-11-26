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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
class ImgRoomServiceTest {

    @Autowired
    private ImgRoomService imgRoomService;

    @Autowired
    private ImgRoomRepository imgRoomRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private Cloudinary cloudinary;

    private Room testRoom;

    @BeforeEach
    void setup() {
        testRoom = Room.builder()
                .roomName("Test Room")
                .roomType("Deluxe")
                .roomCapacity(2)
                .roomPrice(100.0)
                .status(1)
                .build();
        roomRepository.save(testRoom);
    }

    @Test
    @DisplayName("Upload ảnh phòng thất bại khi phòng không tồn tại")
    void uploadRoomImage_RoomNotFound_Throws() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file", "image.jpg", "image/jpeg", "test image".getBytes()
        );

        AppException ex = assertThrows(AppException.class, () -> {
            imgRoomService.uploadRoomImage(new MockMultipartFile[]{file}, 9999);
        });

        assertEquals(ErrorCode.ROOM_NOT_EXISTED, ex.getErrorCode());
    }

    @Test
    @DisplayName("Tìm tất cả ảnh của phòng thành công")
    void findByRoom_RoomId_Success() throws Exception {
        ImgRoom img = ImgRoom.builder()
                .room(testRoom)
                .imgUrl("http://example.com/img1.jpg")
                .build();
        imgRoomRepository.save(img);

        List<ImgRoomResponse> responses = imgRoomService.findByRoom_RoomId(testRoom.getRoomId());

        assertFalse(responses.isEmpty());
        assertEquals(testRoom.getRoomId(), responses.get(0).getRoomId());
        assertEquals("http://example.com/img1.jpg", responses.get(0).getImgUrl());
    }

    @Test
    @DisplayName("Tìm ảnh đầu tiên của phòng thành công")
    void findFirstImageByRoomId_Success() throws Exception {
        ImgRoom img1 = ImgRoom.builder().room(testRoom).imgUrl("http://example.com/img1.jpg").build();
        ImgRoom img2 = ImgRoom.builder().room(testRoom).imgUrl("http://example.com/img2.jpg").build();
        imgRoomRepository.save(img1);
        imgRoomRepository.save(img2);

        ImgRoomResponse response = imgRoomService.findFirstImageByRoomId(testRoom.getRoomId());

        assertNotNull(response);
        assertEquals(testRoom.getRoomId(), response.getRoomId());
        assertEquals("http://example.com/img1.jpg", response.getImgUrl());
    }

    @Test
    @DisplayName("Tìm ảnh đầu tiên của phòng trả về null khi không có ảnh")
    void findFirstImageByRoomId_Empty_ReturnsNull() {
        ImgRoomResponse response = imgRoomService.findFirstImageByRoomId(testRoom.getRoomId());
        assertNull(response);
    }

    @Test
    @DisplayName("Xóa ảnh phòng thành công")
    void deleteImgRoomById_Success() {
        ImgRoom img = ImgRoom.builder().room(testRoom).imgUrl("http://example.com/img.jpg").build();
        imgRoomRepository.save(img);

        imgRoomService.deleteImgRoomById(img.getId());

        assertFalse(imgRoomRepository.findById(img.getId()).isPresent());
    }

    @Test
    @DisplayName("mapToImgRoomResponse trả về đúng dữ liệu")
    void mapToImgRoomResponse_CorrectMapping() {
        ImgRoom img = ImgRoom.builder()
                .room(testRoom)
                .imgUrl("http://example.com/img.jpg")
                .build();
        imgRoomRepository.save(img);

        ImgRoomResponse response = imgRoomService.mapToImgRoomResponse(img);

        assertEquals(img.getId(), response.getId());
        assertEquals(img.getImgUrl(), response.getImgUrl());
        assertEquals(testRoom.getRoomId(), response.getRoomId());
    }
}
