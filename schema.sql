Create DATABASE hotel_booking_management;

USE hotel_booking_management;

CREATE TABLE ROLES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE USERS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    avatar VARCHAR(255),
    date_of_birth DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1,
    role_id BIGINT,
    FOREIGN KEY (role_id) REFERENCES roles (id)
);
-- Insert Permission
INSERT INTO
    permission (name, description)
VALUES (
        'ADD_HOTEL',
        'Đăng ký khách sạn, thêm khách sạn'
    ),
    (
        'UPDATE_HOTEL',
        'Chỉnh sửa thông tin khách sạn'
    ),
    (
        'DELETE_HOTEL',
        'Xóa khách sạn'
    ),
    ('ADD_ROOM', 'Tạo phòng'),
    (
        'UPDATE_ROOM',
        'Chỉnh sửa phòng'
    ),
    ('DELETE_ROOM', 'Xóa phòng'),
    ('CHAT', 'Gửi tin nhắn'),
    (
        'READ_MESSAGES',
        'Xem tin nhắn đến bản than'
    ),
    (
        'UPDATE_USER',
        'Chỉnh sửa user'
    ),
    (
        'READ_USER_LIST',
        'Xem danh sách user'
    ),
    (
        'READ_INVOICE_LIST',
        'Xem danh sách tất cả hóa đơn'
    ),
    (
        'READ_INVOICE_LIST_(2)',
        'Xem danh sách hóa đơn của khách sạn mình'
    ),
    (
        'ADMIN_STATISTIC',
        'Xem thống kê tất cả'
    ),
    (
        'CUSTOMER_STATISTIC',
        'Xem thống kê doanh thu'
    );

-- Insert Role
INSERT INTO
    role (name, description)
VALUES (
        'ADMIN',
        'Vai trò quản trị viên hệ thống'
    ),
    ('CUSTOMER', 'Chủ khách sạn'),
    (
        'USER',
        'Các quyền cơ bản hệ thống'
    );

-- Gán Permission cho Role
INSERT INTO
    role_permissions (role_name, permissions_name)
VALUES ('ADMIN', 'ADMIN_STATISTIC'),
    (
        'CUSTOMER',
        'CUSTOMER_STATISTIC'
    );