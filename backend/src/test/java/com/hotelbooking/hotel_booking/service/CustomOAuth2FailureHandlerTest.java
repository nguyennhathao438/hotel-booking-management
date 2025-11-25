package com.hotelbooking.hotel_booking.service;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.AuthenticationException;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import static org.mockito.Mockito.*;
@SpringBootTest(properties = {
        "jwt.signerKey=mySecretSignerKey",
        "jwt.refreshKey=mySecretRefreshKey"
})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@Rollback
public class CustomOAuth2FailureHandlerTest {
    @InjectMocks
    CustomOAuth2FailureHandler failureHandler;


    @Mock
    HttpServletRequest request;

    @Mock
    HttpServletResponse response;


    @Test
    @DisplayName("Đăng nhập OAuth2 thất bại → Redirect về trang login với thông báo lỗi đã encode")
    void onAuthenticationFailure_ShouldRedirectWithErrorMessage() throws Exception {
        String expectedMessage = URLEncoder.encode("Tài khoản của bạn đã bị khóa", StandardCharsets.UTF_8);
        String expectedUrl = "http://localhost:5173/login?error=" + expectedMessage;

        AuthenticationException authException = mock(AuthenticationException.class);

        failureHandler.onAuthenticationFailure(request, response, authException);

        verify(response).sendRedirect(expectedUrl);
    }
}
