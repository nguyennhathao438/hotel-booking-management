package edu.poly.hotel_management.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class AppException extends RuntimeException {
    private ErrorCode err;
    public AppException(ErrorCode err){
        super(err.getMessage());
        this.err=err;
    }
}
