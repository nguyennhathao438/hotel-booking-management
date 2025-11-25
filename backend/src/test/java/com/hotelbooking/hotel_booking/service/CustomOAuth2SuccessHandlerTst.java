package com.hotelbooking.hotel_booking.service;

import com.hotelbooking.hotel_booking.entity.User;
import com.hotelbooking.hotel_booking.exception.AppException;
import com.hotelbooking.hotel_booking.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest(properties = {
        "jwt.signerKey=mySecretSignerKey",
        "jwt.refreshKey=mySecretRefreshKey"
})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class CustomOAuth2SuccessHandlerTst {

    @InjectMocks
    CustomOAuth2SuccessHandler successHandler;

    @Mock
    AuthenticationService authenticationService;

    @Mock
    UserRepository userRepository;

    @Mock
    HttpServletRequest request;

    @Mock
    HttpServletResponse response;

    @Mock
    Authentication authentication;

    @Mock
    OAuth2User oAuth2User;

    @Test
    @DisplayName("Đăng nhập OAuth2 thành công → Redirect về frontend với token")
    void onAuthenticationSuccess_UserExists_ShouldRedirectWithToken() throws Exception {
        String email = "test@example.com";
        User user = new User();
        user.setEmail(email);
        String token = "dummy-token";

        when(authentication.getPrincipal()).thenReturn(oAuth2User);
        when(oAuth2User.getAttributes()).thenReturn(Map.of("email", email));
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(authenticationService.generateToken(user, false)).thenReturn(token);

        successHandler.onAuthenticationSuccess(request, response, authentication);

        verify(response).sendRedirect("http://localhost:5173/oauth2/redirect?token=" + token);
    }

    @Test
    @DisplayName("Đăng nhập OAuth2 thất bại → User không tồn tại → Ném AppException")
    void onAuthenticationSuccess_UserNotExist_ShouldThrowException() {
        String email = "notexist@example.com";

        when(authentication.getPrincipal()).thenReturn(oAuth2User);
        when(oAuth2User.getAttributes()).thenReturn(Map.of("email", email));
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(AppException.class, () -> {
            successHandler.onAuthenticationSuccess(request, response, authentication);
        });
    }


}
