-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 19, 2025 lúc 02:51 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `hotel_booking_management`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `adults` int(11) NOT NULL,
  `check_in_date` date DEFAULT NULL,
  `check_out_date` date DEFAULT NULL,
  `children` int(11) NOT NULL,
  `total_person` int(11) NOT NULL,
  `room_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotel`
--

CREATE TABLE `hotel` (
  `hotel_id` int(11) NOT NULL,
  `hotel_address` varchar(255) DEFAULT NULL,
  `hotel_cost` double DEFAULT NULL,
  `hotel_created_at` datetime(6) DEFAULT NULL,
  `hotel_description` varchar(255) DEFAULT NULL,
  `hotel_name` varchar(255) DEFAULT NULL,
  `hotel_phone` varchar(255) DEFAULT NULL,
  `hotel_rating` double DEFAULT NULL,
  `hotel_total` double NOT NULL,
  `hotel_updated_at` datetime(6) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotel_seq`
--

CREATE TABLE `hotel_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `hotel_seq`
--

INSERT INTO `hotel_seq` (`next_val`) VALUES
(14951);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `hotel_service`
--

CREATE TABLE `hotel_service` (
  `service_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `service_name` varchar(255) NOT NULL,
  `hotel_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `img_hotel`
--

CREATE TABLE `img_hotel` (
  `img_hotel_id` int(11) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `hotel_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `img_hotel_seq`
--

CREATE TABLE `img_hotel_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `img_hotel_seq`
--

INSERT INTO `img_hotel_seq` (`next_val`) VALUES
(2751);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invalidate_token`
--

CREATE TABLE `invalidate_token` (
  `id` varchar(255) NOT NULL,
  `expiry_time` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `invalidate_token`
--

INSERT INTO `invalidate_token` (`id`, `expiry_time`) VALUES
('00ffa3ad-85ed-4ccc-b583-bd82a5687106', '2025-11-16 05:10:35.000000'),
('024acf28-a442-412c-a081-f430632f5a76', '2025-11-16 18:27:10.000000'),
('0cf884c0-2f49-4c15-a319-1706035a4601', '2025-11-16 05:10:43.000000'),
('12685b77-f9b3-4b89-8ce1-543c72b85473', '2025-11-16 05:10:35.000000'),
('170d08a1-4763-4739-9593-deef32f65a65', '2025-11-16 05:08:57.000000'),
('1a0d9e61-72cc-4fb2-b99d-b4e038f8097c', '2025-11-16 05:10:28.000000'),
('1a6996cf-032b-4149-9907-4ea5e194138c', '2025-11-16 05:09:05.000000'),
('1f0a8d5d-b68c-4511-b967-683cc7f78bee', '2025-11-16 05:09:00.000000'),
('1f200903-3b12-49b3-ac48-04be4dc48369', '2025-11-16 05:10:41.000000'),
('22b1de61-41d2-4945-b42e-ec2a996fb22d', '2025-11-16 05:07:51.000000'),
('232bd5af-bc9d-4468-b278-24d826493ee0', '2025-11-16 05:07:51.000000'),
('23e9b221-a22e-432a-af89-8c3384c1e254', '2025-11-16 05:10:08.000000'),
('269e8352-4516-477b-84aa-0407cfca6dd5', '2025-11-16 18:27:31.000000'),
('285ac5a5-e8b3-4a92-8e7e-54b4db7289b2', '2025-11-16 05:08:44.000000'),
('2b20a4d2-a4a3-4db8-837e-e0541a00af16', '2025-11-16 05:09:15.000000'),
('2c4679d3-6a11-4ff2-86cd-27f44bc14d5a', '2025-11-16 18:27:25.000000'),
('2db94cce-914c-4fe2-a273-0ade7035dc88', '2025-11-16 18:27:16.000000'),
('2e072c86-93bf-4815-8d32-57d754c2eb0e', '2025-11-16 05:08:31.000000'),
('32613fd1-8c30-48e6-9e92-621b56ca8190', '2025-11-16 05:08:57.000000'),
('39f1132e-5fae-4f57-a52f-62b1042dc82c', '2025-11-16 05:09:00.000000'),
('4032f4b4-4733-45c8-8602-b5768fa20919', '2025-11-16 05:09:07.000000'),
('40d68780-fee2-4af0-8007-cbc555a53b1b', '2025-11-15 13:54:14.000000'),
('44c12c8c-db1a-45b4-91b3-9dbfe922ace3', '2025-11-16 05:09:25.000000'),
('44fa1b00-5f31-44ac-b009-1a830e81de41', '2025-11-15 13:54:14.000000'),
('4913f65e-7143-41e5-903b-3f5778fd07e6', '2025-11-16 05:07:58.000000'),
('4b6d00da-964c-4ded-8bd1-e7311c215c15', '2025-11-16 05:10:52.000000'),
('4e73bdec-0f3e-4cf3-92f0-1441a8ed3d80', '2025-11-16 05:09:06.000000'),
('4e8ca972-0328-45ed-b379-54cab34e126b', '2025-11-16 05:10:41.000000'),
('51e7ceb3-0f83-4edb-9be6-762753255da0', '2025-11-16 05:09:01.000000'),
('557e17e0-8d85-453e-9e92-1e7a15b6104b', '2025-11-16 05:07:59.000000'),
('55fe26c1-4b5e-4bb0-8821-64f0d2ab7cbd', '2025-11-17 00:36:33.000000'),
('578fa2b0-4849-4a2e-b541-f7b20d1875a3', '2025-11-16 05:09:23.000000'),
('5bd4a46f-c1d3-4f25-bc53-ad4fc12e4294', '2025-11-16 05:10:10.000000'),
('5f99b14c-4a39-41cc-aa71-16f01fc33f2c', '2025-11-16 18:27:08.000000'),
('66304ad2-162c-43d9-bf9f-05cb01949f34', '2025-11-16 05:08:01.000000'),
('6972c6f3-2447-44c5-a06e-a15e30058594', '2025-11-16 05:07:56.000000'),
('6cc1b77e-18bd-4ec9-a1a4-a601bf85d205', '2025-11-16 05:10:17.000000'),
('6dfb8e61-dc21-482e-8a07-6b8aa448a28f', '2025-11-16 05:10:53.000000'),
('6ec62ee6-8990-41ae-8ebb-5c4f74c0e75b', '2025-11-16 05:09:26.000000'),
('6eee2046-3458-4db3-acdf-42c24b4475d0', '2025-11-16 05:08:44.000000'),
('6f67c05b-4c47-4049-9f65-1fac30f045e7', '2025-11-16 05:09:01.000000'),
('749cadf9-a676-42e1-b5a0-1485dc36ad49', '2025-11-16 18:27:17.000000'),
('76172606-596d-4a84-9217-c701b8d25740', '2025-11-16 05:10:22.000000'),
('7bfb0cc3-5412-4d5c-9590-d0414a12510b', '2025-11-16 05:09:07.000000'),
('7d241821-7621-43e0-9759-1f6638ad9531', '2025-11-16 05:08:11.000000'),
('808a77ec-da20-44cc-b202-e30549e3534f', '2025-11-16 05:09:08.000000'),
('8372dd19-80f1-46fe-b0f6-343192d910f4', '2025-11-16 18:27:24.000000'),
('838d8604-1e69-41af-928e-baa262103293', '2025-11-16 05:08:06.000000'),
('84147648-7e0d-47a5-b9ab-498bec1a8f58', '2025-11-16 05:08:04.000000'),
('85f04e63-3216-4f49-8cfc-489759715a23', '2025-11-16 18:27:21.000000'),
('8746a10a-9d18-496b-937e-22dbfa143ba5', '2025-11-16 05:08:09.000000'),
('89db7f4c-09ad-4859-8a6d-7bfc36da6303', '2025-11-16 05:10:11.000000'),
('8b55fa0b-f0fe-469b-9ce5-dfda69b71b83', '2025-11-16 05:10:42.000000'),
('8ce34b7f-029a-46f7-86d6-34200cda7c38', '2025-11-16 18:27:18.000000'),
('8f55c9a1-41df-49a9-a9db-b30e9968c70d', '2025-11-16 05:10:46.000000'),
('8fc9e1c7-5ef5-4de3-b78a-826c4cfd5c51', '2025-11-16 05:10:22.000000'),
('91751575-b194-413a-9b4f-45c18f63f3f9', '2025-11-16 05:10:43.000000'),
('91c2cd62-ce90-4209-88bc-7134ecbb9d09', '2025-11-16 05:09:01.000000'),
('9541ff3a-4cf9-4b00-bdbc-531e36e797b6', '2025-11-16 05:08:53.000000'),
('9b11a144-36ae-4026-a3aa-fea4f75bb913', '2025-11-16 05:08:06.000000'),
('a008b0b0-a251-4acc-84ea-76a377155fb2', '2025-11-16 18:27:08.000000'),
('a2ab0ac4-a232-44f8-963e-3a772d21be08', '2025-11-15 13:02:44.000000'),
('a41c0aac-b5b4-4e4c-9aa9-e776bb9cf777', '2025-11-16 05:08:57.000000'),
('aafa6c22-4068-40a9-bd47-04a7cb4e71f5', '2025-11-16 05:10:15.000000'),
('ac966b83-a5d0-46bb-bb45-d8da7661e008', '2025-11-16 05:08:47.000000'),
('ad9c5800-95ee-4d3f-a7e2-93d0059b01f3', '2025-11-16 05:10:53.000000'),
('af031724-afc8-4ec3-b432-af791845d59d', '2025-11-16 05:07:56.000000'),
('af08d4f3-55a3-4660-b8ad-605d5961c598', '2025-11-16 18:27:22.000000'),
('b04b8cb9-d8f6-49a2-9712-44bd369165f0', '2025-11-16 05:09:08.000000'),
('b54a66e1-0708-4b8f-b7d4-9702bcee9bc7', '2025-11-16 05:10:08.000000'),
('bc24188f-a16a-46eb-bcc6-b9805c92d793', '2025-11-16 05:09:05.000000'),
('be9d54d8-c5a9-4d5b-982a-b47e8feb76ea', '2025-11-16 05:10:22.000000'),
('c60d4a54-920f-4ea9-8cc0-eaaa0af3a804', '2025-11-16 05:08:02.000000'),
('c6660286-8ff9-4b8a-b9d5-9bd24d0646a5', '2025-11-15 13:54:14.000000'),
('c7bbcbb1-a6da-46f3-a715-995d98f0a8c4', '2025-11-16 18:27:15.000000'),
('cef753f1-6aed-4f83-86cb-c7a434011d74', '2025-11-16 05:09:15.000000'),
('d428f166-7096-4a41-bc82-9310bc262bc9', '2025-11-16 05:10:46.000000'),
('dd9157a0-d0f6-4d79-8f04-218675f9b01d', '2025-11-16 05:08:12.000000'),
('ddf87e71-fb10-4bc2-81d0-6fbe1256723e', '2025-11-16 05:09:06.000000'),
('df5bfac2-ed68-4a83-9fb6-322a3fb02f71', '2025-11-16 05:08:49.000000'),
('e39c88ee-b307-4a76-bc9a-b68e343acb87', '2025-11-16 05:08:00.000000'),
('eb8425b4-f6fa-4f2b-b6d3-a19e955be0ed', '2025-11-16 05:08:51.000000'),
('f2565b89-aaef-43a3-8537-c6cef273b0ff', '2025-11-16 05:08:59.000000'),
('ff490df2-ffed-4244-926f-34d946610faf', '2025-11-16 05:09:28.000000'),
('ffa73f09-bbde-437f-a3af-6fb6c96db0ce', '2025-11-16 05:09:26.000000'),
('fff97057-1373-4d20-8d53-6510e08231c8', '2025-11-16 05:10:53.000000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoice`
--

CREATE TABLE `invoice` (
  `id` int(11) NOT NULL,
  `check_in_date` date DEFAULT NULL,
  `check_out_date` date DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `payment` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `roomid` int(11) NOT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `message`
--

CREATE TABLE `message` (
  `id` bigint(20) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permission`
--

CREATE TABLE `permission` (
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `permission`
--

INSERT INTO `permission` (`name`, `description`) VALUES
('ADD_HOTEL', 'Quyền thêm khách sạn'),
('CREATE_HOTEL', 'Quyền tạo khách sạn'),
('DELETE_HOTEL', 'Quyền xóa khách sạn'),
('DELETE_ROOM', NULL),
('INVOICE', NULL),
('READ_INVOICE_LIST', NULL),
('READ_INVOICE_LIST_(2)', NULL),
('READ_USER_LIST', NULL),
('UPDATE_HOTEL', 'Quyền cập nhật khách sạn'),
('UPDATE_INVOICE', NULL),
('UPDATE_ROOM', '1'),
('UPDATE_USER', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `description`) VALUES
(1, 'READ_DATA', 'Xem dữ liệu'),
(2, 'UPDATE_DATA', 'Cập nhật dữ liệu'),
(3, 'CREATE_DATA', 'Tạo dữ liệu'),
(4, 'CREATE_ROOM', 'Tạo phòng'),
(5, 'UPDATE_ROOM', 'Cập nhật phòng'),
(6, 'DELETE_ROOM', 'Xóa phòng'),
(7, 'UPDATE_HOTEL', 'Cập nhật khách sạn'),
(8, 'ACCEPT_RESERVATION', 'Chấp nhận đơn hàng'),
(9, 'VIEW_STATISTIC', 'Xem thống kê'),
(10, 'ADD_HOTEL', NULL),
(11, 'CREATE_HOTEL', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `feedback` varchar(255) DEFAULT NULL,
  `star` int(11) NOT NULL,
  `hotel_id` int(11) DEFAULT NULL,
  `invoice_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `review_seq`
--

CREATE TABLE `review_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `review_seq`
--

INSERT INTO `review_seq` (`next_val`) VALUES
(1751);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id`, `name`, `description`) VALUES
(1, 'ADMIN', 'Quyền quản trị toàn bộ'),
(2, 'USER', 'Quyền user bình thường'),
(3, 'HOTEL', 'Quản lý khách sạn'),
(4, 'INVOICE', 'Quản lý hóa đơn'),
(5, 'CHAT', 'Trò chuyện'),
(6, 'CREATE_HOTEL', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'ADMIN', 'Quyền quản trị toàn bộ'),
(2, 'USER', 'Quyền user bình thường'),
(3, 'HOTEL', 'Quản lý khách sạn'),
(4, 'INVOICE', 'Quản lý hóa đơn'),
(5, 'CHAT', 'Trò chuyện'),
(6, 'CREATE_HOTEL', NULL),
(7, 'TEST_DELETE_USED', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role_permissions`
--

CREATE TABLE `role_permissions` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `permissions_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `role_permissions`
--

INSERT INTO `role_permissions` (`role_id`, `permission_id`, `role_name`, `permissions_name`) VALUES
(1, 1, 'ADMIN', 'ADD_HOTEL'),
(1, 4, 'ADMIN', 'UPDATE_HOTEL'),
(1, 5, 'ADMIN', 'UPDATE_ROOM'),
(1, 6, 'ADMIN', 'DELETE_ROOM'),
(1, 7, 'ADMIN', 'UPDATE_INVOICE'),
(1, 11, 'ADMIN', 'UPDATE_USER'),
(4, 1, 'ADMIN', 'UPDATE_INVOICE'),
(4, 8, 'ADMIN', 'INVOICE'),
(4, 9, 'ADMIN', 'READ_INVOICE_LIST'),
(4, 10, 'ADMIN', 'READ_INVOICE_LIST_(2)'),
(4, 11, 'ADMIN', 'READ_USER_LIST');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room`
--

CREATE TABLE `room` (
  `room_id` int(11) NOT NULL,
  `bed_count` int(11) NOT NULL,
  `bed_room_count` int(11) NOT NULL,
  `room_area` double NOT NULL,
  `room_capacity` int(11) NOT NULL,
  `room_create_at` datetime(6) DEFAULT NULL,
  `room_name` varchar(255) NOT NULL,
  `room_price` double NOT NULL,
  `room_type` varchar(255) DEFAULT NULL,
  `room_update_at` datetime(6) DEFAULT NULL,
  `status` int(11) NOT NULL,
  `hotelid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `room_seq`
--

CREATE TABLE `room_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `room_seq`
--

INSERT INTO `room_seq` (`next_val`) VALUES
(10901);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `create_at` datetime(6) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `is_delete` int(11) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `provider` enum('FACEBOOK','GOOGLE','LOCATION') DEFAULT NULL,
  `status` int(11) NOT NULL,
  `update_at` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `avatar`, `create_at`, `date_of_birth`, `email`, `first_name`, `is_delete`, `last_name`, `password`, `phone`, `provider`, `status`, `update_at`) VALUES
(1, NULL, '2025-11-12 12:58:53.000000', NULL, 'admin@gmail.com', NULL, 0, NULL, '$2a$10$ZIvFk5UaXN6Q6Gta3yBgNO5W.Ve1SDU3fzfkpNm/Am22GuWcyMfUK', NULL, NULL, 0, '2025-11-12 12:58:53.000000');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_roles`
--

CREATE TABLE `user_roles` (
  `user_id` int(11) NOT NULL,
  `roles_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `roles_name`) VALUES
(1, 'ADMIN'),
(1, 'CHAT'),
(1, 'CREATE_HOTEL'),
(1, 'HOTEL'),
(1, 'INVOICE'),
(1, 'USER');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_seq`
--

CREATE TABLE `user_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user_seq`
--

INSERT INTO `user_seq` (`next_val`) VALUES
(16401);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKq83pan5xy2a6rn0qsl9bckqai` (`room_id`),
  ADD KEY `FKkgseyy7t56x7lkjgu3wah5s3t` (`user_id`);

--
-- Chỉ mục cho bảng `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`hotel_id`),
  ADD KEY `FKcrege2m9owvjmfxqelos1d980` (`userid`);

--
-- Chỉ mục cho bảng `hotel_service`
--
ALTER TABLE `hotel_service`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `FKa94xlwpvda1q3kh1gvcrxxhfa` (`hotel_id`);

--
-- Chỉ mục cho bảng `img_hotel`
--
ALTER TABLE `img_hotel`
  ADD PRIMARY KEY (`img_hotel_id`),
  ADD KEY `FKlpuv97vsio59q711dyhr10a75` (`hotel_id`);

--
-- Chỉ mục cho bảng `invalidate_token`
--
ALTER TABLE `invalidate_token`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK61x26kfmspdd735ij5hgoo6so` (`roomid`),
  ADD KEY `FKe7mop857we1ou3wh7hanv5gsf` (`userid`);

--
-- Chỉ mục cho bảng `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK86f0kc2mt26ifwupnivu6v8oa` (`receiver_id`),
  ADD KEY `FKcnj2qaf5yc36v2f90jw2ipl9b` (`sender_id`);

--
-- Chỉ mục cho bảng `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`name`);

--
-- Chỉ mục cho bảng `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKi0ly7ivbh8ijdgoi7cwtuoavt` (`hotel_id`),
  ADD KEY `FK9jndgnmv1a90phdj54j012l57` (`invoice_id`),
  ADD KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`role_id`,`permission_id`),
  ADD KEY `permission_id` (`permission_id`),
  ADD KEY `FKf5aljih4mxtdgalvr7xvngfn1` (`permissions_name`),
  ADD KEY `FKcppvu8fk24eqqn6q4hws7ajux` (`role_name`);

--
-- Chỉ mục cho bảng `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `FK7bt2oc7b3h1cqba9crblkx1c4` (`hotelid`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_id`,`roles_name`),
  ADD KEY `FK6pmbiap985ue1c0qjic44pxlc` (`roles_name`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `hotel_service`
--
ALTER TABLE `hotel_service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=272;

--
-- AUTO_INCREMENT cho bảng `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1277;

--
-- AUTO_INCREMENT cho bảng `message`
--
ALTER TABLE `message`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT cho bảng `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=357;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `FKkgseyy7t56x7lkjgu3wah5s3t` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKq83pan5xy2a6rn0qsl9bckqai` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`);

--
-- Các ràng buộc cho bảng `hotel`
--
ALTER TABLE `hotel`
  ADD CONSTRAINT `FKcrege2m9owvjmfxqelos1d980` FOREIGN KEY (`userid`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `hotel_service`
--
ALTER TABLE `hotel_service`
  ADD CONSTRAINT `FKa94xlwpvda1q3kh1gvcrxxhfa` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`);

--
-- Các ràng buộc cho bảng `img_hotel`
--
ALTER TABLE `img_hotel`
  ADD CONSTRAINT `FKlpuv97vsio59q711dyhr10a75` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`);

--
-- Các ràng buộc cho bảng `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `FK61x26kfmspdd735ij5hgoo6so` FOREIGN KEY (`roomid`) REFERENCES `room` (`room_id`),
  ADD CONSTRAINT `FKe7mop857we1ou3wh7hanv5gsf` FOREIGN KEY (`userid`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `FK86f0kc2mt26ifwupnivu6v8oa` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKcnj2qaf5yc36v2f90jw2ipl9b` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK9jndgnmv1a90phdj54j012l57` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`),
  ADD CONSTRAINT `FKi0ly7ivbh8ijdgoi7cwtuoavt` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`),
  ADD CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `FKcppvu8fk24eqqn6q4hws7ajux` FOREIGN KEY (`role_name`) REFERENCES `role` (`name`),
  ADD CONSTRAINT `FKf5aljih4mxtdgalvr7xvngfn1` FOREIGN KEY (`permissions_name`) REFERENCES `permission` (`name`),
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `FK7bt2oc7b3h1cqba9crblkx1c4` FOREIGN KEY (`hotelid`) REFERENCES `hotel` (`hotel_id`);

--
-- Các ràng buộc cho bảng `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `FK6pmbiap985ue1c0qjic44pxlc` FOREIGN KEY (`roles_name`) REFERENCES `role` (`name`),
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`roles_name`) REFERENCES `roles` (`name`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
