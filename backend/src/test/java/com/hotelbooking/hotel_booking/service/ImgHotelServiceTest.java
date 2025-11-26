package com.hotelbooking.hotel_booking.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.Uploader;
import com.hotelbooking.hotel_booking.dto.response.ImgHotelRespone;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.ImgHotel;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.ImgHotelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
//ham update img chua co throw CLOUDINARY_UPLOAD_FAILED

import org.springframework.test.annotation.Rollback;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class ImgHotelServiceTest {

    @Autowired
    private ImgHotelService imgHotelService;

    @Autowired
    private ImgHotelRepository imgHotelRepository;

    @Autowired
    private HotelRepository hotelRepository;

@Mock
    private Cloudinary cloudinary;
    @Mock
    private Uploader uploader;

    private Hotel testHotel;

    @BeforeEach
    void setup() throws IOException {
        testHotel = Hotel.builder()
                .hotelName("Hotel Test")
                .hotelAddress("123 Street")
                .hotelPhone("0123456789")
                .hotelCost(500.0)
                .hotelTotalRoom(20.0)
                .hotelRating(4.5)
                .status(1)
                .build();
        hotelRepository.save(testHotel);

        cloudinary = mock(Cloudinary.class);
        uploader = mock(Uploader.class);

        uploader = mock(Uploader.class);
        when(cloudinary.uploader()).thenReturn(uploader);
        when(uploader.upload(any(byte[].class), any(Map.class)))
                .thenReturn(Map.of("secure_url", "http://dummy.url/image.png"));

        ReflectionTestUtils.setField(imgHotelService, "cloudinary", cloudinary);
    }

    @Test
    @DisplayName("Upload image thành công")
    void uploadImages_Success() throws IOException {
        MultipartFile file = mock(MultipartFile.class);
        when(file.getBytes()).thenReturn(new byte[]{1,2,3});

        List<ImgHotelRespone> responses = imgHotelService.uploadImages(new MultipartFile[]{file}, testHotel.getHotelId());

        assertThat(responses).isNotEmpty();
        assertThat(responses.get(0).getImgUrl()).isEqualTo("http://dummy.url/image.png");
        assertThat(responses.get(0).getHotel().getHotelId()).isEqualTo(testHotel.getHotelId());
    }

    @Test
    @DisplayName("Upload image thất bại khi hotel không tồn tại")
    void uploadImages_HotelNotFound_Throws() {
        MultipartFile file = mock(MultipartFile.class);
        AppException ex = assertThrows(AppException.class,
                () -> imgHotelService.uploadImages(new MultipartFile[]{file}, 9999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.HOTEL_NOT_EXISTED);
    }


    @Test
    @DisplayName("Xóa image thất bại khi Cloudinary destroy ném IOException")
    void deleteImage_CloudinaryIOException_Throws() throws IOException {
        ImgHotel imgHotel = ImgHotel.builder()
                .imgUrl("http://dummy.url/image.png")
                .hotel(testHotel)
                .build();
        imgHotelRepository.save(imgHotel);


        when(uploader.destroy(any(String.class), any(Map.class))).thenThrow(new IOException("Cloudinary error"));
        ReflectionTestUtils.setField(imgHotelService, "cloudinary", cloudinary);

        AppException ex = assertThrows(AppException.class,
                () -> imgHotelService.deleteImage(imgHotel.getImgHotelId()));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.CLOUDINARY_DELETE_FAILED);
    }

    @Test
    @DisplayName("Get image by id thất bại khi id không tồn tại")
    void getImgHotelById_NotFound_Throws() {
        AppException ex = assertThrows(AppException.class,
                () -> imgHotelService.getImgHotelById(9999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.ROOM_NOT_EXISTED);
    }

    @Test
    @DisplayName("Get images by hotelId trả về list rỗng khi hotel không có ảnh")
    void getImgHotelsBy_HotelId_EmptyList() {
        List<ImgHotelRespone> responses = imgHotelService.getImgHotelsBy_HotelId(testHotel.getHotelId());
        assertThat(responses).isEmpty();
    }

    @Test
    @DisplayName("mapToImgHotelRespone trực tiếp")
    void mapToImgHotelRespone_Direct() {
        ImgHotel imgHotel = ImgHotel.builder()
                .imgHotelId(1)
                .imgUrl("http://dummy.url/test.png")
                .hotel(testHotel)
                .build();

        ImgHotelRespone response = imgHotelService.mapToImgHotelRespone(imgHotel);
        assertThat(response.getImgHotelId()).isEqualTo(imgHotel.getImgHotelId());
        assertThat(response.getImgUrl()).isEqualTo(imgHotel.getImgUrl());
        assertThat(response.getHotel()).isEqualTo(testHotel);
    }

    @Test
    @DisplayName("Xóa image thành công")
    void deleteImage_Success() throws IOException {
        ImgHotel imgHotel = ImgHotel.builder()
                .imgUrl("http://dummy.url/image.png")
                .hotel(testHotel)
                .build();
        imgHotelRepository.save(imgHotel);

        imgHotelService.deleteImage(imgHotel.getImgHotelId());

        assertThat(imgHotelRepository.findById(imgHotel.getImgHotelId())).isEmpty();
    }

    @Test
    @DisplayName("Xóa image thất bại khi image không tồn tại")
    void deleteImage_NotFound_Throws() {
        AppException ex = assertThrows(AppException.class,
                () -> imgHotelService.deleteImage(9999));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.IMAGE_NOT_FOUND);
    }

    @Test
    @DisplayName("Get image by hotelId thành công")
    void getImgHotelsBy_HotelId_Success() throws IOException {
        ImgHotel imgHotel = ImgHotel.builder()
                .imgUrl("http://dummy.url/image.png")
                .hotel(testHotel)
                .build();
        imgHotelRepository.save(imgHotel);

        List<ImgHotelRespone> responses = imgHotelService.getImgHotelsBy_HotelId(testHotel.getHotelId());
        assertThat(responses).isNotEmpty();
        assertThat(responses.get(0).getHotel().getHotelId()).isEqualTo(testHotel.getHotelId());
    }

    @Test
    @DisplayName("Get image by id thành công")
    void getImgHotelById_Success() throws IOException {
        ImgHotel imgHotel = ImgHotel.builder()
                .imgUrl("http://dummy.url/image.png")
                .hotel(testHotel)
                .build();
        imgHotelRepository.save(imgHotel);

        ImgHotelRespone response = imgHotelService.getImgHotelById(imgHotel.getImgHotelId());
        assertThat(response.getImgHotelId()).isEqualTo(imgHotel.getImgHotelId());
    }


}
