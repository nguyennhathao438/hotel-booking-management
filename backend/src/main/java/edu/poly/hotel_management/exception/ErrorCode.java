package edu.poly.hotel_management.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public enum ErrorCode {
    USER_EXISTED( 1001 , "User exists"),
    USERNAME_INVALID(9999,"Tài khoản phải dài hơn or bằng 3 kí tự"),
    PASSWORD_INVALID(9999,"Mật khẩu phải dài hơn or bằng 8 kí tự"),
    USER_NOT_EXISTED( 1990 , "User not exists");
    private int code;
    private String message;
    public  int getCode(){
        return this.code;
    }
    public String getMessage(){
        return this.message;
    }
    public void setMessage(String message){
        this.message=message;
    }
    public void setCode(int code){
        this.code=code;
    }
}
