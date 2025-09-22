package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.AuthenticationRequest;
import com.hotelbooking.hotel_booking.dto.request.IntrospectRequest;
import com.hotelbooking.hotel_booking.dto.response.AuthenticationResponse;
import com.hotelbooking.hotel_booking.dto.response.IntrospectResponse;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationService {
    @Autowired
    UserRepository userRepository;
    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY ;
    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        var verified = signedJWT.verify(verifier);
        return IntrospectResponse.builder()
                .valid(verified && expiryTime.after(new Date()))
                .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request){
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->new AppException(ErrorCode.EMAIL_NOT_EXISTED));
        PasswordEncoder pwdEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated= pwdEncoder.matches(request.getPassword(), user.getPassword());
        if(!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                        .build();

    }
    private String generateToken(User user){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512); //Định nghĩa thuật toán trong Header
        JWTClaimsSet jwtClaimSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())//email người dùng
                .issuer("hotel-booking.com")//ai phát hành ??
                .issueTime(new Date())//thời gian phát hành
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))//thời gian hết hạn
                .claim("scope",buildScope(user))//custom scope quyền user
                .build();
        Payload payload = new Payload(jwtClaimSet.toJSONObject());//Đóng gói payload vào jwsobject
        JWSObject jwsObject = new JWSObject(header,payload);
        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY));//Ký JWT bằng khóa bí mật
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
}
