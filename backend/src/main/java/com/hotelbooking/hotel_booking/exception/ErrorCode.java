package com.hotelbooking.hotel_booking.exception;


import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
@Getter
public enum ErrorCode {
    ROOM_EXISTED(1001, "Phòng đã tồn tại", HttpStatus.CONFLICT),
    EMAIL_EXISTED(1002, "Email đã tồn tại", HttpStatus.CONFLICT),
    EMAIL_NOT_EXISTED(1003, "Tài khoản không tồn tại", HttpStatus.NOT_FOUND),
    UNCATEGORED_EXCEPTION(9999, "Uncategorized exception", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHENTICATED(1004, "Yêu cầu chưa được xác thực", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1005, "Không có quyền truy cập", HttpStatus.FORBIDDEN),
    USER_NOT_EXISTED(1007,"Người dùng không tồn tại", HttpStatus.NOT_FOUND),
    HOTEL_EXISTED(1006, "Khách sạn đã tồn tại", HttpStatus.CONFLICT),
    HOTEL_NOT_EXISTED(1008, "Khách sạn không tồn tại",HttpStatus.NOT_FOUND),
    ROOM_NOT_EXISTED(1009, "Phòng không tồn tại",HttpStatus.NOT_FOUND),
    INVOICE_NOT_EXISTED(1010, "Hóa đơn không tồn tại",HttpStatus.NOT_FOUND),
    INVALID_DATE_RANGE(1011,"Ngày trả phòng không được nhỏ hơn ngày nhận",HttpStatus.BAD_REQUEST),
    INVALID_STATUS_TRANSITION(1015, "Trạng thái chuyển đổi không hợp lệ",HttpStatus.BAD_REQUEST),

    INVALID_PASSWORD(1012,"Mật khẩu không chính xác",HttpStatus.UNAUTHORIZED),
    ROLE_NOT_EXISTED(1010, "Vai trò không tồn tại",HttpStatus.NOT_FOUND),
    TOKEN_NOT_FOUND(1011, "Không tìm thấy refresh token trên cookie",HttpStatus.NOT_FOUND),
    TOKEN_NOT_VALID(1012, "Token đã hết hạn",HttpStatus.UNAUTHORIZED);

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

}
