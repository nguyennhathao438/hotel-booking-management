package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.AuthenticationRequest;
import com.hotelbooking.hotel_booking.dto.request.IntrospectRequest;
import com.hotelbooking.hotel_booking.dto.response.AuthenticationResponse;
import com.hotelbooking.hotel_booking.dto.response.IntrospectResponse;
import com.hotelbooking.hotel_booking.entity.InvalidateToken;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.InvalidatedTokenRepository;
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
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    InvalidatedTokenRepository invalidatedTokenRepository;
    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY ;
    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;
        try {
            verifyToken(token);
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
        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .avatar(user.getAvatar())
                .roles(user.getRoles())
                        .build();

    }
    public void logout(IntrospectRequest request) throws ParseException, JOSEException {
        var signToken = verifyToken(request.getToken());
        String jid = signToken.getJWTClaimsSet().getJWTID();
        Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();
        InvalidateToken invalidateToken = InvalidateToken.builder()
                .id(jid)
                .expiryTime(expiryTime)
                .build();
        invalidatedTokenRepository.save(invalidateToken);
    }
    private SignedJWT verifyToken(String token) throws JOSEException, ParseException {

        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();
        var verified = signedJWT.verify(verifier);
        if(!(verified && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        if(invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        return signedJWT;
    }
    private String generateToken(User user){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512); //Định nghĩa thuật toán trong Header
        JWTClaimsSet jwtClaimSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())//email người dùng
                .issuer("hotel-booking.com")//ai phát hành ??
                .issueTime(new Date())//thời gian phát hành
                .expirationTime(new Date(
                        Instant.now().plus(2, ChronoUnit.HOURS).toEpochMilli()
                ))//thời gian hết hạn
                .jwtID(UUID.randomUUID().toString())//id
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
