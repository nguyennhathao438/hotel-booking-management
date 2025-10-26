package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.MessageRequest;
import com.hotelbooking.hotel_booking.dto.response.MessageResponse;
import com.hotelbooking.hotel_booking.entity.Message;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.MessageRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE ,makeFinal = true)
public class MessageService {
    MessageRepository messageRepository;
    UserRepository userRepository;
    public MessageResponse createMessage(MessageRequest request){
        User sender = userRepository.findById(request.getSenderId()).orElseThrow(() ->new AppException(ErrorCode.USER_NOT_EXISTED));
        User receiver = userRepository.findById(request.getReceiverId()).orElseThrow(() ->new AppException(ErrorCode.USER_NOT_EXISTED));
        if(sender.getEmail().equals(receiver.getEmail())){
            throw new AppException(ErrorCode.CANNOT_SEND_MESSAGE_TO_SELF);
        }
        Message message = Message.builder()
                .sender(sender)
                .receiver(receiver)
                .content(request.getContent())
                .build();
        messageRepository.save(message);
        return mapToMessageResponse(message);
    }
    public List<Message> getMessageTwoPerson(int senderId,int receiverId){
        List<Message> messageList = messageRepository.getConversation(senderId,receiverId);
        return messageList;
    }
    public List<User> getAllMessageByUser(int userId,String keyword){
        System.out.println(keyword);
        List<User> userList = messageRepository.getLastSenders(userId,keyword);
        return userList;
    }
    MessageResponse mapToMessageResponse(Message message){
        return MessageResponse.builder()
                .content(message.getContent())
                .receiverId(message.getReceiver().getId())
                .senderId(message.getSender().getId())
                .createAt(message.getCreateAt())
                .build();
    }

}
