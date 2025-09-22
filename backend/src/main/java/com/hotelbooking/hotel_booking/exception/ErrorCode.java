package com.hotelbooking.hotel_booking.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
@Getter
public enum ErrorCode {
    EMAIL_EXISTED(1001,"Email đã tồn tại ",HttpStatus.NOT_FOUND),
    EMAIL_NOT_EXISTED(1002,"Tài khoản không tồn tại",HttpStatus.NOT_FOUND),
    UNCATEGORED_EXCEPTION(9999,"Uncategored exception", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHENTICATED(1004,"Yêu cầu chưa được xác thực ",HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1005,"Không có quyền truy cập ",HttpStatus.FORBIDDEN)
    ;
    private int code;
    private String message;
    private HttpStatusCode statusCode;
    ErrorCode(int code, String message,HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

}
