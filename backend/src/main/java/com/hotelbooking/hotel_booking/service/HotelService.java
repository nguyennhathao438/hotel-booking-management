package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.HotelRequest;
import com.hotelbooking.hotel_booking.dto.response.HotelResponse;
import com.hotelbooking.hotel_booking.entity.Hotel;
import com.hotelbooking.hotel_booking.entity.ImgHotel;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.HotelRepository;
import com.hotelbooking.hotel_booking.repository.ImgHotelRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.hotelbooking.hotel_booking.service.UserSevice.mapToUserResponse;

@Builder
@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HotelService {
    @Autowired
    HotelRepository hotelRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ImgHotelRepository imgHotelRepository;
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
    }

    public List<HotelResponse> findByHotelAddressContainingIgnoreCase(String province) {
        List<Hotel> hotels = hotelRepository.findByHotelAddressContainingIgnoreCase(province);
        return hotels.stream()
                .map(this::mapToHotelResponse)
                .toList();
    }
    @PreAuthorize("hasAuthority('ADD_HOTEL')")
    public HotelResponse createHotel(HotelRequest request) {
        if (hotelRepository.existsByHotelName(request.getHotelName())) {
            throw new AppException(ErrorCode.HOTEL_EXISTED);
        }
        User user = getCurrentUser();
        if(hotelRepository.existsByUser(user)){
            throw new AppException(ErrorCode.REQUEST_HOTEL_EXISTED);
        }
        Hotel hotel = Hotel.builder()
                .hotelName(request.getHotelName())
                .hotelAddress(request.getHotelAddress())
                .hotelPhone(request.getHotelPhone())
                .hotelRating(request.getHotelRating())
                .hotelTotalRoom(request.getHotelTotalRoom())
                .hotelCost(request.getHotelCost())
                .hotelDescription(request.getHotelDescription())
                .status(0)
                .user(user)
                .build();
        hotelRepository.save(hotel);
        return mapToHotelResponse(hotel);
    }

    public List<HotelResponse> getAllHotels() {
        List<Hotel> hotels = hotelRepository.findByStatus(1);

        return hotels.stream()
                .map(this::mapToHotelResponse)
                .toList();
    }

    public List<HotelResponse> getAllHotels0() {
        List<Hotel> hotels = hotelRepository.findByStatus(0);
        System.out.println(">>> Số lượng hotel status=0: " + (hotels != null ? hotels.size() : "null"));
        return hotels == null ? List.of()
                : hotels.stream()
                        .map(this::mapToHotelResponse)
                        .toList();
    }

    public HotelResponse getHotelById(int id) {
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        return mapToHotelResponse(hotel);
    }
    @PreAuthorize("hasAuthority('UPDATE_HOTEL')")
    public HotelResponse updateHotel(int hotelId, HotelRequest request) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));

        if (request.getHotelName() != null && !request.getHotelName().isBlank()) {
            hotel.setHotelName(request.getHotelName());
        }
        if (request.getHotelAddress() != null && !request.getHotelAddress().isBlank()) {
            hotel.setHotelAddress(request.getHotelAddress());
        }
        if (request.getHotelPhone() != null && !request.getHotelPhone().isBlank()) {
            hotel.setHotelPhone(request.getHotelPhone());
        }
        if (request.getHotelRating() != null) {
            hotel.setHotelRating(request.getHotelRating());
        }
        if (request.getHotelTotalRoom() != null) {
            hotel.setHotelTotalRoom(request.getHotelTotalRoom());
        }
        if (request.getHotelCost() != null) {
            hotel.setHotelCost(request.getHotelCost());
        }
        if (request.getHotelDescription() != null && !request.getHotelDescription().isBlank()) {
            hotel.setHotelDescription(request.getHotelDescription());
        }
        if (request.getStatus() != null) {
            hotel.setStatus(request.getStatus());
        }
        hotelRepository.save(hotel);
        return mapToHotelResponse(hotel);
    }
    @PreAuthorize("hasRole('ADMIN')")
    public HotelResponse approveHotel(int hotelId) {
        Hotel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));

        hotel.setStatus(1);
        hotelRepository.save(hotel);

        return mapToHotelResponse(hotel);
    }

    public Page<HotelResponse> getAllHotelSearch(int pageNo, int pageSize, Double hotelRating, String sortByCost,
                                                 String keyword){
        Sort sort = Sort.unsorted();
        if ("asc".equalsIgnoreCase(sortByCost)) {
            sort = Sort.by("hotelCost").ascending();
        } else if ("desc".equalsIgnoreCase(sortByCost)) {
            sort = Sort.by("hotelCost").descending();
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize,sort);
        Page<Hotel> hotelPage;
        List<Integer> statues = Arrays.asList(1);
        if(hotelRating != null){
            double minRating = hotelRating;
            double maxRating = Math.min(5.0, hotelRating + 0.9);
            hotelPage = hotelRepository.findByHotelRatingBetweenAndStatusIn(minRating,maxRating,statues,pageable);
        } else if(keyword != null && !keyword.isEmpty()){
            hotelPage = hotelRepository.findByStatusInAndHotelNameContainingIgnoreCaseOrStatusInAndHotelAddressContainingIgnoreCase(
                    statues ,keyword, statues, keyword, pageable);
        } else {
            hotelPage = hotelRepository.findByStatusIn(statues,pageable);
        }
        return hotelPage.map(this::mapToHotelResponse);
    }
    public Page<HotelResponse> getAdminHotel(int pageNo, int pageSize, Double hotelRating, String sortByCost,
                                             String keyword){
        Sort sort = Sort.unsorted();
        if ("asc".equalsIgnoreCase(sortByCost)) {
            sort = Sort.by("hotelCost").ascending();
        } else if ("desc".equalsIgnoreCase(sortByCost)) {
            sort = Sort.by("hotelCost").descending();
        }
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize,sort);
        Page<Hotel> hotelPage;
        List<Integer> statues = Arrays.asList(0,1);
        if(hotelRating != null){
            double minRating = hotelRating;
            double maxRating = Math.min(5.0, hotelRating + 0.9);
            hotelPage = hotelRepository.findByHotelRatingBetweenAndStatusIn(minRating,maxRating,statues,pageable);
        } else if(keyword != null && !keyword.isEmpty()){
            hotelPage = hotelRepository.findByStatusInAndHotelNameContainingIgnoreCaseOrStatusInAndHotelAddressContainingIgnoreCase(
                    statues ,keyword, statues, keyword, pageable);
        } else {
            hotelPage = hotelRepository.findByStatusIn(statues,pageable);
        }
        return hotelPage.map(this::mapToHotelResponse);
    }
    public HotelResponse banHotel(int id){
        Hotel hotel = hotelRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        hotel.setStatus(2);
        hotelRepository.save(hotel);
        return mapToHotelResponse(hotel);
    }
    private HotelResponse mapToHotelResponse(Hotel hotel) {
        return HotelResponse.builder()
                .hotelId(hotel.getHotelId())
                .hotelName(hotel.getHotelName())
                .hotelAddress(hotel.getHotelAddress())
                .hotelPhone(hotel.getHotelPhone())
                .hotelRating(hotel.getHotelRating())
                .hotelTotalRoom(hotel.getHotelTotalRoom())
                .hotelCost(hotel.getHotelCost())
                .hotelDescription(hotel.getHotelDescription())
                .status(hotel.getStatus())
                .user(hotel.getUser() != null ? mapToUserResponse(hotel.getUser()) : null)
                .build();
    }
    public List<HotelResponse> getHotelsByUserId(int userId) {
        List<Hotel> hotels = new ArrayList<>();
        Hotel hotel = hotelRepository.findFirstByUser_Id(userId);
        if (hotel != null) {
            hotels.add(hotel);
        }        return hotels.stream()
                .map(this::mapToHotelResponse)
                .toList();
    }
    @PreAuthorize("hasRole('ADMIN')")
    @Transactional
    public void deleteRequestAddHotel(int hotelId){
        Hotel hotel = hotelRepository.findById(hotelId).orElseThrow(()->new AppException(ErrorCode.HOTEL_NOT_EXISTED));
        if(hotel.getStatus() != 0){
            throw new AppException(ErrorCode.REQUEST_HOTEL_NOT_DELETED);
        }
        List<ImgHotel> listImgHotel = imgHotelRepository.findImgHotelByHotel_HotelId(hotelId);
        if(!listImgHotel.isEmpty()){
            imgHotelRepository.deleteAllByHotel_HotelId(hotelId);
        }
        hotelRepository.delete(hotel);
    }
}
