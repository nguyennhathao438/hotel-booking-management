package edu.poly.hotel_management.exception;

import edu.poly.hotel_management.dto.respone.ApiRespone;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler (value = AppException.class)
    public ResponseEntity<ApiRespone> handleAppException (AppException e){
        ApiRespone apiRespone = new ApiRespone();
        ErrorCode err = e.getErr();
        apiRespone.setCode(err.getCode());
        apiRespone.setMessage(err.getMessage());
        return ResponseEntity.badRequest().body(apiRespone);
    }
}
