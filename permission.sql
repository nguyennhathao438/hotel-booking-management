#PERMISSION
INSERT INTO `permission` (`name`, `description`) VALUES ('ADD_HOTEL', 'Đăng ký khách sạn, thêm khách sạn');

INSERT INTO
    `permission` (`name`, `description`)
VALUES ('ADD_ROLE', 'Thêm vai trò');

INSERT INTO
    `permission` (`name`, `description`)
VALUES ('ADD_ROOM', 'Tạo phòng');

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'ADMIN_STATISTIC',
        'Xem thống kê tất cả'
    );

INSERT INTO
    `permission` (`name`, `description`)
VALUES ('CHAT', 'Gửi tin nhắn');

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'CUSTOMER_STATISTIC',
        'Xem thống kê doanh thu'
    );

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'DELETE_HOTEL',
        'Xóa khách sạn'
    );

INSERT INTO
    `permission` (`name`, `description`)
VALUES ('DELETE_ROLE', 'Xóa vai trò');

INSERT INTO
    `permission` (`name`, `description`)
VALUES ('DELETE_ROOM', 'Xóa phòng');

INSERT INTO
    `permission` (`name`, `description`)
VALUES ('DELETE_USER', 'Xóa user');

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'READ_INVOICE_LIST',
        'Xem danh sách tất cả hóa đơn'
    );

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'READ_INVOICE_LIST_(2)',
        'Xem danh sách hóa đơn của khách sạn mình'
    );

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'READ_MESSAGES',
        'Xem tin nhắn đến bản thân'
    );

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'READ_USER_LIST',
        'Xem danh sách user'
    );

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'UPDATE_HOTEL',
        'Chỉnh sửa thông tin khách sạn'
    );

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'UPDATE_INVOICE',
        'Cập nhật trạng thái hóa đơn'
    );

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'UPDATE_ROLE',
        'Chỉnh sửa vai trò'
    );

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'UPDATE_ROOM',
        'Chỉnh sửa phòng'
    );

INSERT INTO
    `permission` (`name`, `description`)
VALUES (
        'UPDATE_USER',
        'Chỉnh sửa user'
    );

#ROLE
INSERT INTO `role` (`name`, `description`) VALUES ('ADMIN', 'Quyền quản trị toàn bộ');

INSERT INTO
    `role` (`name`, `description`)
VALUES ('CHAT', 'Nhắn tin');

INSERT INTO
    `role` (`name`, `description`)
VALUES ('CUSTOMER', 'Chủ khách sạn');

INSERT INTO
    `role` (`name`, `description`)
VALUES ('HOTEL', 'Quản lý khách sạn');

INSERT INTO
    `role` (`name`, `description`)
VALUES (
        'INVOICE',
        'Quản lý hóa đơn đặt phòng'
    );

INSERT INTO
    `role` (`name`, `description`)
VALUES (
        'INVOICE_(2)',
        'Quản lý hóa đơn của khách sạn mình'
    );

INSERT INTO
    `role` (`name`, `description`)
VALUES ('ROLE', 'Phân quyền');

INSERT INTO
    `role` (`name`, `description`)
VALUES ('Role Test', 'test role');

INSERT INTO
    `role` (`name`, `description`)
VALUES ('ROOM', 'Quản lý phòng');

INSERT INTO
    `role` (`name`, `description`)
VALUES ('TESTROLE', 'TEST VAI TRÒ');

INSERT INTO
    `role` (`name`, `description`)
VALUES ('USER', 'người dùng');

ROLE_PERMISSION
INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('ADMIN', 'ADD_HOTEL');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('HOTEL', 'ADD_HOTEL');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('USER', 'ADD_HOTEL');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('ROLE', 'ADD_ROLE');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('ROOM', 'ADD_ROOM');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('ADMIN', 'ADMIN_STATISTIC');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('CHAT', 'CHAT');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES (
        'CUSTOMER',
        'CUSTOMER_STATISTIC'
    );

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('ADMIN', 'DELETE_HOTEL');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('ROLE', 'DELETE_ROLE');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('ROOM', 'DELETE_ROOM');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES (
        'INVOICE',
        'READ_INVOICE_LIST'
    );

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES (
        'INVOICE_(2)',
        'READ_INVOICE_LIST_(2)'
    );

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('CHAT', 'READ_MESSAGES');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('USER', 'READ_USER_LIST');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('HOTEL', 'UPDATE_HOTEL');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES (
        'INVOICE_(2)',
        'UPDATE_INVOICE'
    );

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('ROLE', 'UPDATE_ROLE');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('ROOM', 'UPDATE_ROOM');

INSERT INTO
    `role_permission` (
        `role_name`,
        `permissions_name`
    )
VALUES ('USER', 'UPDATE_USER');