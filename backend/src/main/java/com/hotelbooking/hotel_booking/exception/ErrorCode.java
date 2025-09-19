package com.hotelbooking.hotel_booking.exception;

public enum ErrorCode {
    EMAIL_EXISTED(1001,"Email đã tồn tại "),
    UNCATEGORED_EXCEPTION(9999,"Uncategored exception")
    ;
    private int code;
    private String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
