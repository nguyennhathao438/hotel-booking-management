package com.hotelbooking.hotel_booking.service;

<<<<<<< HEAD

import com.hotelbooking.hotel_booking.dto.request.AuthenticationRequest;
import com.hotelbooking.hotel_booking.dto.request.IntrospectRequest;
import com.hotelbooking.hotel_booking.dto.request.LogoutRequest;
import com.hotelbooking.hotel_booking.dto.response.AuthenticationResponse;
import com.hotelbooking.hotel_booking.dto.response.IntrospectResponse;
import com.hotelbooking.hotel_booking.entity.InvalidateToken;
import com.hotelbooking.hotel_booking.entity.Provider;
import com.hotelbooking.hotel_booking.entity.Role;
=======
import com.hotelbooking.hotel_booking.dto.request.AuthenticationRequest;
import com.hotelbooking.hotel_booking.dto.request.IntrospectRequest;
import com.hotelbooking.hotel_booking.dto.response.AuthenticationResponse;
import com.hotelbooking.hotel_booking.dto.response.IntrospectResponse;
import com.hotelbooking.hotel_booking.entity.InvalidateToken;
>>>>>>> origin/thanh
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.InvalidatedTokenRepository;
<<<<<<< HEAD
import com.hotelbooking.hotel_booking.repository.RoleRepository;
=======
>>>>>>> origin/thanh
import com.hotelbooking.hotel_booking.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
<<<<<<< HEAD
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
=======
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;
>>>>>>> origin/thanh

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationService {
<<<<<<< HEAD

=======
>>>>>>> origin/thanh
    @Autowired
    UserRepository userRepository;
    @Autowired
    InvalidatedTokenRepository invalidatedTokenRepository;
    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY ;
<<<<<<< HEAD
    @Value("${jwt.refreshKey}")
    protected String REFRESH_KEY ;

=======
>>>>>>> origin/thanh
    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;
        try {
<<<<<<< HEAD
            verifyToken(token,false);
=======
            verifyToken(token);
>>>>>>> origin/thanh
        }catch (AppException e){
            isValid = false;
        }
        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request){
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->new AppException(ErrorCode.EMAIL_NOT_EXISTED));
        PasswordEncoder pwdEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated= pwdEncoder.matches(request.getPassword(), user.getPassword());
        if(!authenticated)
            throw new AppException(ErrorCode.INVALID_PASSWORD);
<<<<<<< HEAD
        var accessToken = generateToken(user,false);
        var refreshToken= generateToken(user,true );
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
=======
        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
>>>>>>> origin/thanh
                .authenticated(true)
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatar(user.getAvatar())
                .roles(user.getRoles())
                        .build();

    }
    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        //Lưu access token
        try{
            var signToken = verifyToken(request.getAccessToken(), false);
            String jid = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();
            InvalidateToken invalidateToken = InvalidateToken.builder()
                    .id(jid)
                    .expiryTime(expiryTime)
                    .build();
            invalidatedTokenRepository.save(invalidateToken);
        }catch(AppException e){

        }

        //Lưu refresh token
        try {
            var refreshToken = verifyToken(request.getRefreshToken(), true);
            String jid = refreshToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = refreshToken.getJWTClaimsSet().getExpirationTime();
            InvalidateToken refreshInvalidateToken = InvalidateToken.builder()
                    .id(jid)
                    .expiryTime(expiryTime)
                    .build();
            invalidatedTokenRepository.save(refreshInvalidateToken);
        }catch(AppException e) {

        }
    }
    private SignedJWT verifyToken(String token ,boolean isRefresh) throws JOSEException, ParseException {

        JWSVerifier verifier = isRefresh
         ?  new MACVerifier(REFRESH_KEY.getBytes())
        : new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        boolean verified = signedJWT.verify(verifier);
        if(!verified)
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        if(!expiryTime.after(new Date()))
            throw new AppException(ErrorCode.TOKEN_NOT_VALID);
        if(invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        return signedJWT;
    }
    public AuthenticationResponse refreshToken(String token) throws ParseException, JOSEException {
        var signedJWT = verifyToken(token,true);
        var jid =signedJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        InvalidateToken invalidateToken = InvalidateToken.builder()
                .id(jid)
                .expiryTime(expiryTime)
                .build();
        try {
            invalidatedTokenRepository.save(invalidateToken);
        } catch (DataIntegrityViolationException e){
        }

        var email = signedJWT.getJWTClaimsSet().getSubject();
        var user = userRepository.findByEmail(email).orElseThrow(()-> new AppException(ErrorCode.USER_NOT_EXISTED));
        var accessToken = generateToken(user,false);
        var refreshToken = generateToken(user,true);
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .authenticated(true)
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatar(user.getAvatar())
                .roles(user.getRoles())
                .build();
    }
    public String generateToken(User user,boolean isRefresh){
        Date expirationTime = isRefresh
                ? Date.from(Instant.now().plus(1,ChronoUnit.DAYS))
                : Date.from(Instant.now().plus(15,ChronoUnit.MINUTES));

        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512); //Định nghĩa thuật toán trong Header
        JWTClaimsSet jwtClaimSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())//email người dùng
                .issuer("hotel-booking.com")//ai phát hành ??
                .issueTime(new Date())//thời gian phát hành
                .expirationTime(expirationTime)//thời gian hết hạn
                .jwtID(UUID.randomUUID().toString())//id
                .claim("scope",buildScope(user))//custom scope quyền user
                .build();
        Payload payload = new Payload(jwtClaimSet.toJSONObject());//Đóng gói payload vào jwsobject
        JWSObject jwsObject = new JWSObject(header,payload);
        try {
            if(isRefresh) {
                jwsObject.sign(new MACSigner(REFRESH_KEY));
            }else {
                jwsObject.sign(new MACSigner(SIGNER_KEY));//Ký JWT bằng khóa bí mật
            }
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Không thể tạo token");
            throw new RuntimeException(e);
        }
    }
    private String buildScope(User user){
        StringJoiner stringJoiner = new StringJoiner(" ");
        if(!CollectionUtils.isEmpty(user.getRoles())) {
            user.getRoles().forEach(
                    role ->{
                        stringJoiner.add("ROLE_"+role.getName());
                        if(!CollectionUtils.isEmpty(role.getPermissions())) {
                            role.getPermissions().forEach(
                                    permission -> {
                                        stringJoiner.add(permission.getName());
                                    }
                            );
                        }
                    }
            );

        }
            return stringJoiner.toString();
    }

    public AuthenticationResponse loginWithGoogle(String token) throws ParseException, JOSEException {
        var signJWT = verifyToken(token,false);
        String email = signJWT.getJWTClaimsSet().getSubject();
        System.out.println(email);
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        String refreshToken = generateToken(user, true);

        return AuthenticationResponse.builder()
                .accessToken(token)
                .refreshToken(refreshToken)
                .authenticated(true)
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatar(user.getAvatar())
                .roles(user.getRoles())
                .build();
    }
}
