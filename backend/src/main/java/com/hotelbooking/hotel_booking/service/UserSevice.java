package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.UserRegisterRequest;
import com.hotelbooking.hotel_booking.dto.request.UserUpdateRequest;
import com.hotelbooking.hotel_booking.dto.response.UserResponse;
import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.RoleRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserSevice {
    UserRepository userRepository;
    PasswordEncoder pwdEncoder;
    RoleRepository roleRepository;

    @Autowired
    public UserSevice(UserRepository userRepository,
                       PasswordEncoder pwdEncoder,
                       RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.pwdEncoder = pwdEncoder;
        this.roleRepository = roleRepository;
    }
    public UserResponse registerUser(UserRegisterRequest request){
        if(!request.getPassword().equals(request.getPassword2())){
            throw new AppException(ErrorCode.INVALID_PASSWORD);
        }
        if(userRepository.existsByEmail(request.getEmail())){
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }
        Set<Role> roles = new HashSet<>();
        roleRepository.findById("USER").ifPresent(roles::add);
        User user = User.builder()
                        .email(request.getEmail())
                        .password(pwdEncoder.encode(request.getPassword()))
                                .firstName(request.getFirstName())
                                        .lastName(request.getLastName())
                .roles(roles)
                .build();
        System.out.println(user.getFirstName()+ user.getRoles());
        userRepository.save(user);
        return mapToUserResponse(user);
    }
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUser(){
        return userRepository.findAll();
    }
    @PostAuthorize("returnObject.email == authentication.name || hasRole('ADMIN')")
    public UserResponse getUser(int id){
        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
        return mapToUserResponse(user);
    }
    @PostAuthorize("returnObject.email == authentication.name || hasRole('ADMIN')")
    public UserResponse updateUser(UserUpdateRequest request,int userId){
        System.out.println("alo") ;
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
        user.setAvatar(request.getAvatar());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setPhone(request.getPhone());
        System.out.println("alo" +request.getRoles()) ;
        var roles = roleRepository.findAllById(request.getRoles());
        System.out.println("alo" + roles);
        user.setRoles(new HashSet<>(roles));
        userRepository.save(user);
        return mapToUserResponse(user);
    }
    @PostAuthorize("returnObject.email == authentication.name ")
    public UserResponse getMyInfo(){
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();
        User user = userRepository.findByEmail(name).orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));
        return mapToUserResponse(user);
    }
    @PostAuthorize("hasRole('ADMIN')")
    public void deleteUser(int userID){
        User user = userRepository.findById(userID).orElseThrow(() -> new AppException(ErrorCode.EMAIL_EXISTED));

        user.setStatus(1);
         userRepository.save(user);
    }
    public List<User> searchUser(String key){
        List<User> userList = userRepository.findByEmailContainingIgnoreCaseOrFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrPhoneContainingIgnoreCase(key,key,key,key);
        return userList;
    }
    public static UserResponse mapToUserResponse(User user){
        Set<String> roleNames = user.getRoles().stream().map(Role::getName).collect(Collectors.toSet());
        return UserResponse.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .roles(roleNames)
                .dateOfBirth(user.getDateOfBirth())
                .avatar(user.getAvatar())
                .createAt(user.getCreateAt())
                .updateAt(user.getUpdateAt())
                .build();
    }
}
