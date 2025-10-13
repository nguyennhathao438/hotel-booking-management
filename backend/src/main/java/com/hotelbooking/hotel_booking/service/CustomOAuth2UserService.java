package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.entity.Provider;
import com.hotelbooking.hotel_booking.entity.Role;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.repository.RoleRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String email;
        String firstName;
        String lastName;
        String avatar;
        Provider provider =null;
        if(registrationId.equals("google")){
            // Lấy thông tin cơ bản từ Google
            provider = Provider.GOOGLE;
             email = oAuth2User.getAttribute("email");
            firstName = oAuth2User.getAttribute("first_name");
             lastName = oAuth2User.getAttribute("last_name");
             avatar = oAuth2User.getAttribute("picture");
        }else if(registrationId.equals("facebook")){
            // Lấy thông tin cơ bản từ Facebook
            provider = Provider.FACEBOOK;
            email = oAuth2User.getAttribute("email");
            firstName = oAuth2User.getAttribute("given_name");
            lastName = oAuth2User.getAttribute("family_name");
            Map<String, Object> pictureObj = (Map<String, Object>) oAuth2User.getAttributes().get("picture");
            Map<String, Object> dataObj = (Map<String, Object>) pictureObj.get("data");
            avatar = (String) dataObj.get("url");
        }else{
            email = "";
            avatar = "";
            lastName = "";
            firstName = "";
            provider = Provider.LOCATION;
        }
        Map<String, Object> attributes = new HashMap<>(oAuth2User.getAttributes());
        if (email == null || email.isEmpty()) {
            email = registrationId + "_" + oAuth2User.getAttribute("id") + "@example.com";

        }
        
        attributes.put("email", email);

        // Kiểm tra user trong DB, nếu chưa có thì tạo mới
        Provider finalProvider = provider;
        System.out.println(finalProvider);
        String finalEmail = email;
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            Set<Role> roles = new HashSet<>();
            roleRepository.findById("USER").ifPresent(roles::add);
            User newUser = User.builder()
                    .email(finalEmail)
                    .firstName(firstName != null ? firstName : "")
                    .lastName(lastName != null ? lastName : "")
                    .avatar(avatar != null ? avatar : "")
                    .roles(roles)
                    .provider(finalProvider)
                    .build();
            return userRepository.save(newUser);
        });
        // Tạo DefaultOAuth2User để Spring Security dùng
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        attributes.put("id", user.getId());

        return new DefaultOAuth2User(authorities, attributes, "email");
    }
}
