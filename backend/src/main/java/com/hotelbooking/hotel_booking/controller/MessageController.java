package com.hotelbooking.hotel_booking.controller;

import com.hotelbooking.hotel_booking.dto.request.MessageRequest;
import com.hotelbooking.hotel_booking.dto.response.ApiResponse;
import com.hotelbooking.hotel_booking.dto.response.MessageResponse;
import com.hotelbooking.hotel_booking.entity.Message;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.service.MessageService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

import java.util.List;

@RestController
@RequestMapping("/api/message")
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
public class MessageController {
    MessageService messageService;
    SimpMessagingTemplate simpMessagingTemplate;
    @PostMapping
    ResponseEntity<ApiResponse<MessageResponse>> createMessage(@RequestBody @Valid MessageRequest request){
        MessageResponse messageResponse = messageService.createMessage(request);
        simpMessagingTemplate.convertAndSend("/topic/messages", messageResponse);
        return ResponseEntity.ok(
                ApiResponse.<MessageResponse>builder()
                        .message("Success")
                        .result(messageResponse)
                        .build()
        );
    }
    @GetMapping("/conversation")
    ResponseEntity<ApiResponse<List<Message>>> getConversation(@RequestParam int senderId,@RequestParam int receiverId){
        List<Message> messageList = messageService.getMessageTwoPerson(senderId,receiverId);
        return ResponseEntity.ok(
                ApiResponse.<List<Message>>builder()
                        .message("Succes")
                        .result(messageList)
                        .build()
        );
    }
    @GetMapping("/{userId}")
    ResponseEntity<ApiResponse<List<User>>> getConversation(@PathVariable int userId,
                                                            @RequestParam(required = false) String key){
        List<User> messageList = messageService.getAllMessageByUser(userId,key);
        return ResponseEntity.ok(
                ApiResponse.<List<User>>builder()
                        .message("Succes")
                        .result(messageList)
                        .build()
        );
    }
}
