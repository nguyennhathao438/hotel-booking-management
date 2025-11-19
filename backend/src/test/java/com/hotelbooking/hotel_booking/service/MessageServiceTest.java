package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.dto.request.MessageRequest;
import com.hotelbooking.hotel_booking.dto.response.MessageResponse;
import com.hotelbooking.hotel_booking.entity.Message;
import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.exception.ErrorCode;
import com.hotelbooking.hotel_booking.repository.MessageRepository;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class MessageServiceTest {

    @Autowired
    private MessageService messageService;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    private User sender;
    private User receiver;

    @BeforeEach
    void setup() {
        sender = User.builder()
                .firstName("Sender")
                .lastName("User")
                .email("sender@test.com")
                .phone("0123456789")
                .build();

        receiver = User.builder()
                .firstName("Receiver")
                .lastName("User")
                .email("receiver@test.com")
                .phone("0987654321")
                .build();

        userRepository.save(sender);
        userRepository.save(receiver);
    }

    @Test
    @WithMockUser(authorities = {"CHAT"})
    @DisplayName("Tạo message thành công")
    void createMessage_Success() {
        MessageRequest request = new MessageRequest();
        request.setSenderId(sender.getId());
        request.setReceiverId(receiver.getId());
        request.setContent("Hello!");

        MessageResponse response = messageService.createMessage(request);

        assertThat(response).isNotNull();
        assertThat(response.getContent()).isEqualTo("Hello!");
        assertThat(response.getSenderId()).isEqualTo(sender.getId());
        assertThat(response.getReceiverId()).isEqualTo(receiver.getId());

        List<Message> savedMessages = messageRepository.findAll();
        assertThat(savedMessages).hasSize(1);
        assertThat(savedMessages.get(0).getContent()).isEqualTo("Hello!");
    }

    @Test
    @WithMockUser(authorities = {"CHAT"})

    @DisplayName("Tạo message thất bại khi gửi cho chính mình")
    void createMessage_SendToSelf_Throws() {
        MessageRequest request = new MessageRequest();
        request.setSenderId(sender.getId());
        request.setReceiverId(sender.getId());
        request.setContent("Hello!");

        AppException ex = assertThrows(AppException.class, () -> messageService.createMessage(request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.CANNOT_SEND_MESSAGE_TO_SELF);
    }

    @Test
    @WithMockUser(authorities = {"CHAT"})

    @DisplayName("Tạo message thất bại khi sender không tồn tại")
    void createMessage_SenderNotExist_Throws() {
        MessageRequest request = new MessageRequest();
        request.setSenderId(9999);
        request.setReceiverId(receiver.getId());
        request.setContent("Hello!");

        AppException ex = assertThrows(AppException.class, () -> messageService.createMessage(request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.USER_NOT_EXISTED);
    }

    @Test
    @WithMockUser(authorities = {"CHAT"})

    @DisplayName("Tạo message thất bại khi receiver không tồn tại")
    void createMessage_ReceiverNotExist_Throws() {
        MessageRequest request = new MessageRequest();
        request.setSenderId(sender.getId());
        request.setReceiverId(9999);
        request.setContent("Hello!");

        AppException ex = assertThrows(AppException.class, () -> messageService.createMessage(request));
        assertThat(ex.getErrorCode()).isEqualTo(ErrorCode.USER_NOT_EXISTED);
    }

    @Test
    @WithMockUser(authorities = {"READ_MESSAGES","CHAT"})
    @DisplayName("Lấy danh sách message giữa hai người")
    void getMessageTwoPerson_Success() {

        messageService.createMessage(new MessageRequest(sender.getId(), receiver.getId(), "Hi"));
        messageService.createMessage(new MessageRequest(receiver.getId(), sender.getId(), "Hello"));

        List<Message> messages = messageService.getMessageTwoPerson(sender.getId(), receiver.getId());
        assertThat(messages).hasSize(2);
        assertThat(messages.get(0).getContent()).isEqualTo("Hi");
        assertThat(messages.get(1).getContent()).isEqualTo("Hello");
    }

    @Test
    @WithMockUser(authorities = {"READ_MESSAGES","CHAT"})
    @DisplayName("Lấy danh sách user nhắn cho sender với keyword")
    void getAllMessageByUser_Success() {
        messageService.createMessage(new MessageRequest(sender.getId(), receiver.getId(), "Hi"));
        messageService.createMessage(new MessageRequest(receiver.getId(), sender.getId(), "Hello"));

        List<User> users = messageService.getAllMessageByUser(sender.getId(), "receiver");
        assertThat(users).isNotEmpty();
        assertThat(users.get(0).getEmail()).isEqualTo(receiver.getEmail());
    }

    @Test
    @WithMockUser(authorities = {"READ_MESSAGES","CHAT"})
    @DisplayName("Lấy message giữa hai người khi chưa có message → list rỗng")
    void getMessageTwoPerson_EmptyList() {
        List<Message> messages = messageService.getMessageTwoPerson(sender.getId(), receiver.getId());
        assertThat(messages).isEmpty();
    }

    @Test
    @DisplayName("mapToMessageResponse trả về đúng response từ message")
    void mapToMessageResponse_Success() {
        Message message = Message.builder()
                .id(1)
                .sender(sender)
                .receiver(receiver)
                .content("Test message")
                .build();

        MessageResponse response = messageService.mapToMessageResponse(message);

        assertThat(response.getSenderId()).isEqualTo(sender.getId());
        assertThat(response.getReceiverId()).isEqualTo(receiver.getId());
        assertThat(response.getContent()).isEqualTo("Test message");
        assertThat(response.getCreateAt()).isEqualTo(message.getCreateAt());
    }
}
