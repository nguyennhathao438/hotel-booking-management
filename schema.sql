
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
                       FOREIGN KEY (role_id) REFERENCES roles(id)
);
-- Insert Permission
INSERT INTO permission (name, description) VALUES
                                               ('READ_DATA', 'Xem dữ liệu'),
                                               ('UPDATE_DATA', 'Cập nhật dữ liệu'),
                                               ('CREATE_DATA', 'Tạo dữ liệu');

-- Insert Role
INSERT INTO role (name, description) VALUES
                                         ('ADMIN', 'Quyền quản trị toàn bộ'),
                                         ('USER', 'Quyền user bình thường');

-- Gán Permission cho Role
INSERT INTO role_permissions (role_name, permissions_name) VALUES
                                                               ('ADMIN', 'READ_DATA'),
                                                               ('ADMIN', 'CREATE_DATA'),
                                                               ('ADMIN', 'UPDATE_DATA'),
                                                               ('USER', 'READ_USER');
