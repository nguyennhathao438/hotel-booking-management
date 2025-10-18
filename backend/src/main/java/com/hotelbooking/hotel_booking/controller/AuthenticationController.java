package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.AuthenticationRequest;
import com.hotelbooking.hotel_booking.dto.request.IntrospectRequest;
import com.hotelbooking.hotel_booking.dto.request.LogoutRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.AuthenticationResponse;
import com.hotelbooking.hotel_booking.dto.response.IntrospectResponse;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    //-------------------------
    //--Dang nhap
    //-------------------------
    @PostMapping("/login")
    ResponseEntity<ApiResponse<AuthenticationResponse>> authenticate(@RequestBody AuthenticationRequest request) {
        var result = authenticationService.authenticate(request);
        ResponseCookie cookie = ResponseCookie.from("refreshToken",
                result.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(7))
                .sameSite("Strict")
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(ApiResponse.<AuthenticationResponse>builder()
                        .result(result)
                        .build());

    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody IntrospectRequest request,@CookieValue(value="refreshToken", required = false) String refreshToken) throws ParseException, JOSEException {
        LogoutRequest req = LogoutRequest.builder()
                .accessToken(request.getToken())
                .refreshToken(refreshToken)
                .build();
        authenticationService.logout(req);
        return ApiResponse.<Void>builder()
                .build();
    }

    //-------------------------
    //--Kiem tra thu token
    //-------------------------
    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }
    //-------------------------
    //--Refresh token
    //-------------------------
    @PostMapping("/refresh")
    ResponseEntity<ApiResponse<AuthenticationResponse>> refreshToken(@CookieValue(value="refreshToken", required = false) String token) throws ParseException, JOSEException {
        if(token == null ){
            throw new AppException(ErrorCode.TOKEN_NOT_FOUND);
        }
        System.out.println(token);
        var result = authenticationService.refreshToken(token);
//        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
//                .httpOnly(true)
//                .path("/")
//                .maxAge(0)
//                .build();
        ResponseCookie cookie = ResponseCookie.from("refreshToken",
                        result.getRefreshToken())
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(Duration.ofDays(7))
                .sameSite("Strict")
                .build();
        return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body(ApiResponse.<AuthenticationResponse>builder()
                        .result(result)
                        .build());
    }

}
