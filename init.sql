CREATE DATABASE IF NOT EXISTS `hotel_booking_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `hotel_booking_management`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hotel_booking_management
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `booking` (
    `id` int NOT NULL AUTO_INCREMENT,
    `adults` int NOT NULL,
    `check_in_date` date DEFAULT NULL,
    `check_out_date` date DEFAULT NULL,
    `children` int NOT NULL,
    `total_person` int NOT NULL,
    `room_id` int DEFAULT NULL,
    `user_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FKq83pan5xy2a6rn0qsl9bckqai` (`room_id`),
    KEY `FKkgseyy7t56x7lkjgu3wah5s3t` (`user_id`),
    CONSTRAINT `FKkgseyy7t56x7lkjgu3wah5s3t` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `FKq83pan5xy2a6rn0qsl9bckqai` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */
;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `hotel` (
    `hotel_id` int NOT NULL,
    `hotel_address` varchar(255) DEFAULT NULL,
    `hotel_cost` double DEFAULT NULL,
    `hotel_created_at` datetime(6) DEFAULT NULL,
    `hotel_description` varchar(255) DEFAULT NULL,
    `hotel_name` varchar(255) DEFAULT NULL,
    `hotel_phone` varchar(255) DEFAULT NULL,
    `hotel_rating` double DEFAULT NULL,
    `hotel_total` double NOT NULL,
    `hotel_updated_at` datetime(6) DEFAULT NULL,
    `status` int DEFAULT NULL,
    `userid` int DEFAULT NULL,
    PRIMARY KEY (`hotel_id`),
    KEY `FKcrege2m9owvjmfxqelos1d980` (`userid`),
    CONSTRAINT `FKcrege2m9owvjmfxqelos1d980` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `hotel`
--

LOCK TABLES `hotel` WRITE;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */
;
INSERT INTO
    `hotel`
VALUES (
        1,
        '123 Nguyễn Trãi, Thành Phố Hà Nội Quận Tây Hồ',
        450000,
        '2025-09-20 10:15:11.000000',
        'Khách sạn sang trọng tọa lạc tại trung tâm thủ đô, nội thất hiện đại và dịch vụ chuẩn 4 sao.',
        'ADMIN HOTEL',
        '0912000001',
        4,
        10,
        '2025-11-27 04:04:17.511012',
        1,
        1
    ),
    (
        2,
        '912 Nguyễn Huệ, Thành phố Hà Nội Quận Đống Đa',
        520000,
        '2025-10-01 09:12:41.000000',
        'Khách sạn cao cấp với thiết kế tinh tế, gần các điểm vui chơi và trung tâm thương mại.',
        'Grand Palace Saigon',
        '0912000002',
        5,
        46,
        '2025-10-04 11:32:10.000000',
        1,
        2
    ),
    (
        3,
        '388/19 Ấp 2, Long Thới, Thành phố Hồ Chí Minh quận Gò Vấp',
        65000,
        '2025-10-02 14:05:33.000000',
        'Không gian yên tĩnh, phù hợp nghỉ dưỡng, phòng nghỉ rộng rãi và sạch sẽ.',
        'Sunrise Garden Resort',
        '0912000003',
        3,
        13,
        '2025-10-03 10:00:32.000000',
        1,
        3
    ),
    (
        4,
        '199 Đường Biển, Tỉnh Bà Rịa Vũng Tàu ',
        350000,
        '2025-10-04 08:22:10.000000',
        'Khách sạn view biển tuyệt đẹp, dịch vụ chuyên nghiệp, gần bãi tắm.',
        'Ocean Pearl Hotel',
        '0912000004',
        4,
        16,
        '2025-10-05 08:30:00.000000',
        1,
        4
    ),
    (
        5,
        '21 Lê Duẩn, Thành phố Đà Nẵng',
        330000,
        '2025-10-06 10:11:58.000000',
        'Khách sạn tiện nghi, gần sông Hàn, nội thất hiện đại và dịch vụ chất lượng.',
        'Royal Danang Hotel',
        '0912000005',
        5,
        19,
        '2025-10-07 09:22:00.000000',
        1,
        5
    ),
    (
        6,
        '31 Nguyễn Văn Cừ,Thành phố Cần Thơ',
        310000,
        '2025-10-07 12:14:10.000000',
        'Không gian thoáng mát, thích hợp nghỉ dưỡng khi du lịch miền Tây.',
        'Mekong Riverside Hotel',
        '0912000006',
        3,
        24,
        '2025-10-09 14:00:20.000000',
        1,
        6
    ),
    (
        7,
        '52 Lạc Long Quân, Hội An,Tỉnh Quảng Nam',
        360000,
        '2025-10-08 11:22:45.000000',
        'Khách sạn mang phong cách cổ điển, gần phố cổ Hội An, dịch vụ tận tâm.',
        'Ancient Charm Boutique',
        '0912000007',
        5,
        24,
        '2025-10-09 16:23:11.000000',
        1,
        7
    ),
    (
        8,
        '123 Phạm Văn Đồng, Thành phố Hồ Chí Minh quận 12',
        300500,
        '2025-09-29 13:00:00.000000',
        'Khung cảnh biển đẹp, phù hợp du lịch nghỉ dưỡng và gia đình.',
        'Blue Ocean Retreat',
        '0912000008',
        4,
        23,
        '2025-10-01 14:32:44.000000',
        1,
        8
    ),
    (
        9,
        '22 Hùng Vương,Thành phố Huế',
        340000,
        '2025-10-02 16:11:22.000000',
        'Khách sạn mang phong cách hoàng gia, gần các di tích nổi tiếng của Huế.',
        'Imperial Lotus Hotel',
        '0912000009',
        5,
        27,
        '2025-10-04 16:40:00.000000',
        1,
        9
    ),
    (
        10,
        '19 Trần Hưng Đạo, Tỉnh Khánh Hòa',
        420000,
        '2025-10-03 15:12:50.000000',
        'Khách sạn gần biển, phòng view hướng biển cực đẹp, dịch vụ chất lượng.',
        'Crystal Bay Resort',
        '0912000010',
        4,
        21,
        '2025-10-05 12:14:20.000000',
        1,
        10
    ),
    (
        11,
        '18 Phan Chu Trinh, Thành phố Hồ Chí Minh Quận 1',
        310000,
        '2025-10-04 08:22:14.000000',
        'Không gian ấm cúng, phù hợp nghỉ chân khi khám phá Tây Nguyên.',
        'Highland Retreat Hotel',
        '0912000011',
        3,
        20,
        '2025-10-05 13:41:11.000000',
        1,
        11
    ),
    (
        12,
        '892 Trương Định,Tỉnh Hải Dương',
        350000,
        '2025-10-04 09:44:33.000000',
        'Khách sạn hiện đại, tiện nghi, giá hợp lý, gần các khu công nghiệp.',
        'Diamond Central Hotel',
        '0912000012',
        4,
        26,
        '2025-10-05 10:20:00.000000',
        1,
        12
    ),
    (
        13,
        '44 Hai Bà Trưng,Thành phố Hà Nội Quận Hai Bà Trưng',
        450000,
        '2025-10-05 11:54:21.000000',
        'Khách sạn đẳng cấp, tiện nghi sang trọng, ngay trung tâm thủ đô.',
        'Golden Heritage Hotel',
        '0912000013',
        5,
        22,
        '2025-10-07 09:32:10.000000',
        1,
        13
    ),
    (
        14,
        '381 Lý Thái Tổ,Tỉnh Quảng Ngãi Huyện Ba Tơ',
        301000,
        '2025-10-06 10:11:22.000000',
        'Khách sạn sạch sẽ, giá tốt, thích hợp cho du khách công tác.',
        'Central Plaza Inn',
        '0912000014',
        3,
        24,
        '2025-10-07 15:00:20.000000',
        1,
        14
    ),
    (
        15,
        '92 Pasteur, Thành phố Hồ Chí Minh quận 5',
        520000,
        '2025-10-07 12:01:33.000000',
        'Khách sạn cao cấp trung tâm Quận 1, tiện nghi sang trọng và dịch vụ chuẩn 4 sao.',
        'Prestige Luxury Hotel',
        '0912000015',
        5,
        21,
        '2025-10-09 17:20:40.000000',
        1,
        15
    ),
    (
        16,
        '121 Bạch Đằng, Thành phố Đà Nẵng',
        310000,
        '2025-10-08 13:00:00.000000',
        'View sông tuyệt đẹp, không gian thư giãn, phù hợp gia đình và cặp đôi.',
        'Riverside Harmony Hotel',
        '0912000016',
        4,
        18,
        '2025-10-10 13:40:00.000000',
        1,
        16
    ),
    (
        17,
        '77 Lê Lợi, Thành phố Huế',
        350000,
        '2025-10-09 10:44:33.000000',
        'Phong cách cổ kính, gần trung tâm và các điểm tham quan nổi tiếng.',
        'Royal Garden Inn',
        '0912000017',
        3,
        14,
        '2025-10-11 07:55:00.000000',
        1,
        17
    ),
    (
        18,
        '53 Đinh Tiên Hoàng,Thành phố Hà Nội Quận Tây Hồ',
        380000,
        '2025-10-10 11:22:11.000000',
        'Khách sạn hiện đại, tiện nghi, gần hồ Gươm.',
        'Hanoi Opera Hotel',
        '0912000018',
        4,
        22,
        '2025-10-12 12:22:00.000000',
        1,
        18
    ),
    (
        19,
        '910 Phạm Ngũ Lão, Thành phố Hồ Chí Minh quận 1',
        450000,
        '2025-10-11 12:55:41.000000',
        'Khách sạn dành cho khách du lịch nước ngoài, không gian trẻ trung.',
        'CityLight Urban Hotel',
        '0912000019',
        5,
        30,
        '2025-10-13 15:22:00.000000',
        1,
        19
    ),
    (
        20,
        '122 Võ Văn Kiệt,Thành phố Hà Nội quận Ba Đình',
        330000,
        '2025-10-12 14:41:22.000000',
        'Khách sạn gần trung tâm, giá hợp lý, dịch vụ tốt.',
        'Lotus Riverside Inn',
        '0912000020',
        3,
        13,
        '2025-10-14 16:00:00.000000',
        1,
        20
    ),
    (
        21,
        '289 Lê Hồng Phong,Thành phố Hà Nội Quận Thanh Xuân',
        420000,
        '2025-10-13 10:10:01.000000',
        'Phòng rộng rãi, view đẹp, gần biển.',
        'SeaWind Resort Hotel',
        '0912000021',
        4,
        18,
        '2025-10-14 17:10:00.000000',
        1,
        21
    ),
    (
        22,
        '32 Cách Mạng Tháng 8, Thành phố Đà Lạt',
        305000,
        '2025-10-13 13:22:11.000000',
        'Khách sạn hiện đại, phù hợp nghỉ dưỡng và công tác.',
        'Harmony Central Hotel',
        '0912000022',
        3,
        12,
        '2025-10-15 09:30:00.000000',
        1,
        22
    ),
    (
        23,
        '18 Quang Trung, Thành phố Đà Lạt',
        300500,
        '2025-10-14 09:00:00.000000',
        'Phòng tiện nghi, nhân viên thân thiện, giá cả phải chăng.',
        'GreenField Hotel',
        '0912000023',
        3,
        11,
        '2025-10-15 10:10:00.000000',
        1,
        23
    ),
    (
        24,
        '67 Trần Quốc Toản, Thành phố Đà Lạt',
        360000,
        '2025-10-15 10:22:22.000000',
        'Khách sạn đẹp, không gian thoải mái, gần trung tâm.',
        'Royal Orchid Inn',
        '0912000024',
        4,
        17,
        '2025-10-16 08:00:00.000000',
        1,
        24
    ),
    (
        25,
        '199 Lê Duẩn, Thành phố Bà Rịa Vũng Tàu',
        480000,
        '2025-10-15 15:33:10.000000',
        'Khách sạn sang trọng, gần biển Nhật Lệ, đầy đủ tiện nghi.',
        'Crystal Sands Hotel',
        '0912000025',
        5,
        29,
        '2025-10-16 18:11:00.000000',
        1,
        25
    ),
    (
        26,
        '52 Nguyễn Trãi, Thành phố Hà Nội',
        410000,
        '2025-10-16 14:01:21.000000',
        'Không gian mát mẻ, gần Đà Lạt, phong cách châu Âu.',
        'Alpine Valley Resort',
        '0912000026',
        4,
        20,
        '2025-10-18 11:22:00.000000',
        0,
        26
    ),
    (
        27,
        '31 Tôn Đức Thắng, Tỉnh Khánh Hòa',
        365000,
        '2025-10-17 13:22:11.000000',
        'Khách sạn gần biển, phòng đẹp, giá hợp lý.',
        'Ocean Dream Hotel',
        '0912000027',
        4,
        25,
        '2025-10-19 10:00:00.000000',
        0,
        27
    ),
    (
        28,
        '102 Lê Thánh Tông, Tỉnh Thanh Hóa',
        330000,
        '2025-10-18 15:44:10.000000',
        'Khách sạn tiện nghi, phòng sạch đẹp, giá dễ chịu.',
        'Emerald Star Inn',
        '0912000028',
        3,
        15,
        '2025-10-20 13:10:00.000000',
        0,
        28
    ),
    (
        29,
        '12 Nguyễn Trãi, Thành phố Hà Nội Huyện Đông Anh',
        305000,
        '2025-10-19 10:55:22.000000',
        'Không gian yên tĩnh, phù hợp khách công tác và gia đình.',
        'Golden River Hotel',
        '0912000029',
        3,
        12,
        '2025-10-21 11:11:00.000000',
        0,
        29
    ),
    (
        30,
        '98 Hoàng Sa, Thành phố Đà Nẵng',
        490000,
        '2025-10-20 12:22:33.000000',
        'Khách sạn view biển đẹp, dịch vụ chuyên nghiệp, gần biển Mỹ Khê.',
        'Azure Coast Resort',
        '0912000030',
        5,
        30,
        '2025-10-22 09:00:00.000000',
        0,
        30
    );
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `hotel_seq`
--

DROP TABLE IF EXISTS `hotel_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `hotel_seq` (
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `hotel_seq`
--

LOCK TABLES `hotel_seq` WRITE;
/*!40000 ALTER TABLE `hotel_seq` DISABLE KEYS */
;
INSERT INTO `hotel_seq` VALUES (1);
/*!40000 ALTER TABLE `hotel_seq` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `hotel_service`
--

DROP TABLE IF EXISTS `hotel_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `hotel_service` (
    `service_id` int NOT NULL AUTO_INCREMENT,
    `description` varchar(255) DEFAULT NULL,
    `icon` varchar(255) DEFAULT NULL,
    `service_name` varchar(255) NOT NULL,
    `hotel_id` int NOT NULL,
    PRIMARY KEY (`service_id`),
    KEY `FKa94xlwpvda1q3kh1gvcrxxhfa` (`hotel_id`),
    CONSTRAINT `FKa94xlwpvda1q3kh1gvcrxxhfa` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 25 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `hotel_service`
--

LOCK TABLES `hotel_service` WRITE;
/*!40000 ALTER TABLE `hotel_service` DISABLE KEYS */
;
INSERT INTO
    `hotel_service`
VALUES (
        1,
        'Giữ phòng của bạn luôn sạch sẽ và gọn gàng mỗi ngày.',
        'https://cdn-icons-png.flaticon.com/128/5443/5443535.png',
        'Dọn phòng hằng ngày',
        1
    ),
    (
        14,
        'Giữ phòng của bạn luôn sạch sẽ và gọn gàng mỗi ngày.',
        'https://cdn-icons-png.flaticon.com/128/5443/5443535.png',
        'Dọn phòng hằng ngày',
        2
    ),
    (
        15,
        'Giặt, sấy và ủi chuyên nghiệp cho khách lưu trú.',
        'https://cdn-icons-png.flaticon.com/128/2990/2990631.png',
        'Giặt ủi quần áo',
        2
    ),
    (
        16,
        'Xe đưa đón tận nơi, an toàn và đúng giờ.',
        'https://cdn-icons-png.flaticon.com/512/854/854878.png',
        'Đưa đón sân bay',
        2
    ),
    (
        17,
        'Đặt món ăn yêu thích và nhận ngay tại phòng.',
        'https://cdn-icons-png.flaticon.com/512/562/562678.png',
        'Giao đồ ăn tận phòng',
        2
    ),
    (
        18,
        'Kết nối internet nhanh và ổn định trong toàn bộ khu vực khách sạn.',
        'https://cdn-icons-png.flaticon.com/128/17902/17902763.png',
        'Wi-Fi tốc độ cao',
        2
    ),
    (
        19,
        'Gửi hành lý an toàn trước khi nhận hoặc sau khi trả phòng.',
        'https://cdn-icons-png.flaticon.com/512/2331/2331970.png',
        'Giữ hành lý',
        2
    ),
    (
        20,
        'Thưởng thức bữa sáng đa dạng với món Á - Âu mỗi ngày.',
        'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
        'Buffet sáng',
        2
    ),
    (
        21,
        'Thuê xe máy tiện lợi để khám phá thành phố.',
        'https://cdn-icons-png.flaticon.com/128/7053/7053332.png',
        'Thuê xe máy',
        2
    ),
    (
        22,
        'Giặt, sấy và ủi chuyên nghiệp cho khách lưu trú.',
        'https://cdn-icons-png.flaticon.com/128/2990/2990631.png',
        'Giặt ủi quần áo',
        3
    ),
    (
        23,
        'Đặt món ăn yêu thích và nhận ngay tại phòng.',
        'https://cdn-icons-png.flaticon.com/512/562/562678.png',
        'Giao đồ ăn tận phòng',
        3
    ),
    (
        24,
        'Thưởng thức bữa sáng đa dạng với món Á - Âu mỗi ngày.',
        'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
        'Buffet sáng',
        3
    );
/*!40000 ALTER TABLE `hotel_service` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `hotel_service_seq`
--

DROP TABLE IF EXISTS `hotel_service_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `hotel_service_seq` (
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `hotel_service_seq`
--

LOCK TABLES `hotel_service_seq` WRITE;
/*!40000 ALTER TABLE `hotel_service_seq` DISABLE KEYS */
;
INSERT INTO `hotel_service_seq` VALUES (51);
/*!40000 ALTER TABLE `hotel_service_seq` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `img_hotel`
--

DROP TABLE IF EXISTS `img_hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `img_hotel` (
    `img_hotel_id` int NOT NULL,
    `img_url` varchar(255) DEFAULT NULL,
    `hotel_id` int DEFAULT NULL,
    PRIMARY KEY (`img_hotel_id`),
    KEY `FKlpuv97vsio59q711dyhr10a75` (`hotel_id`),
    CONSTRAINT `FKlpuv97vsio59q711dyhr10a75` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `img_hotel`
--

LOCK TABLES `img_hotel` WRITE;
/*!40000 ALTER TABLE `img_hotel` DISABLE KEYS */
;
INSERT INTO
    `img_hotel`
VALUES (
        52,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203246/hotel_images/iu8p3qb91wopbkczstdq.jpg',
        1
    ),
    (
        54,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203314/hotel_images/ushngl8zv1tfykeclvtb.jpg',
        2
    ),
    (
        55,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203318/hotel_images/ybsb9velw4kokti8wmk5.jpg',
        2
    ),
    (
        56,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203321/hotel_images/f75ivtubydnndfednicr.jpg',
        2
    ),
    (
        57,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203423/hotel_images/gjshhl63w1lp2jxilikf.jpg',
        2
    ),
    (
        58,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203427/hotel_images/yd7fmcjbklp4f1kbidqn.jpg',
        2
    ),
    (
        59,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203494/hotel_images/rhtnlvtihnig8heoukmd.jpg',
        4
    ),
    (
        60,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203605/hotel_images/qec5qfkip1yrexo4nyi4.jpg',
        5
    ),
    (
        61,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203609/hotel_images/h7gmc6nac0nkdlx16eha.jpg',
        5
    ),
    (
        62,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203672/hotel_images/ethwudjv82o7oobmso7c.jpg',
        6
    ),
    (
        63,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203807/hotel_images/wl4a6uol77nojckc0xrq.jpg',
        7
    ),
    (
        64,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203852/hotel_images/aus9p9wobn59rfldrdkd.jpg',
        8
    ),
    (
        65,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203855/hotel_images/yedgp7flrlgkg7on27mn.jpg',
        8
    ),
    (
        66,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203908/hotel_images/z2b8wvam1o8p5dlm2muk.jpg',
        9
    ),
    (
        67,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203913/hotel_images/ufgrhw8jl1hxi8wvsvrs.jpg',
        9
    ),
    (
        68,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203984/hotel_images/xijplu2ml555yelvqwco.jpg',
        10
    ),
    (
        69,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764203987/hotel_images/gu4hssqq1xscxjiyojos.jpg',
        10
    ),
    (
        70,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764204045/hotel_images/j1m9oyo2buoqg2p2mqsk.jpg',
        11
    ),
    (
        71,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764204102/hotel_images/xw9iu8wk6r9o5bt6vybl.jpg',
        12
    ),
    (
        72,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764204106/hotel_images/vd00civx9oyny4krlhdc.jpg',
        12
    ),
    (
        73,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764204227/hotel_images/z9yyuogqfze9m8aao2ef.jpg',
        13
    ),
    (
        74,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764204229/hotel_images/emrkxwvflqt6tv11bpob.jpg',
        13
    ),
    (
        75,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764204277/hotel_images/uifi7cmd7i4bzlrgjchl.jpg',
        14
    ),
    (
        76,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764204337/hotel_images/ujnc23qbaobzjexjewle.jpg',
        15
    ),
    (
        102,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764205531/hotel_images/hpus85ld72hjcqqj1xth.jpg',
        16
    ),
    (
        103,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764205654/hotel_images/ime3jeao2ponlxeguwj9.jpg',
        18
    ),
    (
        104,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764205845/hotel_images/n14y9ovkqmb0xirikhwz.jpg',
        20
    ),
    (
        105,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764205941/hotel_images/bru5fp7zms1dvnmfjogu.jpg',
        21
    ),
    (
        106,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764205992/hotel_images/najukfch500pqcxjdel0.jpg',
        22
    ),
    (
        107,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764205995/hotel_images/ahuroqb1eta7jdik2ucm.jpg',
        22
    ),
    (
        108,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206074/hotel_images/trp6esly0j4ydduetabl.jpg',
        23
    ),
    (
        109,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206145/hotel_images/d4nnjwlwtz7okwjnwmsf.jpg',
        24
    ),
    (
        110,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206248/hotel_images/tf1vuueyy3m9wklxjdyx.jpg',
        19
    ),
    (
        111,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206250/hotel_images/xxlae3ucfx2kjuasvbtm.jpg',
        19
    ),
    (
        112,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206319/hotel_images/cpumltr3uyzs08x4rwdk.jpg',
        25
    ),
    (
        113,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206321/hotel_images/zw7pdjqqz82oed5iuxbg.jpg',
        25
    ),
    (
        114,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206454/hotel_images/hgkdjafap7q0bzgzo6zm.jpg',
        26
    ),
    (
        115,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206528/hotel_images/vugjkmkdnr2moxhlutxh.jpg',
        27
    ),
    (
        116,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206586/hotel_images/hileiu7tgjggrfqgrvb7.jpg',
        28
    ),
    (
        117,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206588/hotel_images/a5bu122hcfdxgdxzrvmw.jpg',
        28
    ),
    (
        118,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206643/hotel_images/udugvgzmxmu2uhf1jpyz.jpg',
        29
    ),
    (
        119,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206645/hotel_images/p0srq4n2h7lvi0gg8dzp.jpg',
        29
    ),
    (
        120,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206791/hotel_images/kkwtzivkvgwan3gyopem.jpg',
        30
    ),
    (
        121,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764206792/hotel_images/hmgkjhmpbmhhjiyaiuga.jpg',
        30
    ),
    (
        122,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764208179/hotel_images/o1gk0dd58uolxkgozyu9.jpg',
        3
    );
/*!40000 ALTER TABLE `img_hotel` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `img_hotel_seq`
--

DROP TABLE IF EXISTS `img_hotel_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `img_hotel_seq` (
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `img_hotel_seq`
--

LOCK TABLES `img_hotel_seq` WRITE;
/*!40000 ALTER TABLE `img_hotel_seq` DISABLE KEYS */
;
INSERT INTO `img_hotel_seq` VALUES (201);
/*!40000 ALTER TABLE `img_hotel_seq` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `img_room`
--

DROP TABLE IF EXISTS `img_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `img_room` (
    `id` int NOT NULL AUTO_INCREMENT,
    `img_url` varchar(255) DEFAULT NULL,
    `room_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FKk8suu3s7e78hybm9eljr8vwsk` (`room_id`),
    CONSTRAINT `FKk8suu3s7e78hybm9eljr8vwsk` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 34 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `img_room`
--

LOCK TABLES `img_room` WRITE;
/*!40000 ALTER TABLE `img_room` DISABLE KEYS */
;
INSERT INTO
    `img_room`
VALUES (
        1,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210815/room_images/xbknazbs88htgrp2q6ug.jpg',
        11
    ),
    (
        2,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210823/room_images/kdi5icnt6edo0j30kk07.jpg',
        12
    ),
    (
        3,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210834/room_images/wv3vbzkanlscfuwrkod1.jpg',
        13
    ),
    (
        4,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210867/room_images/ssmc9wxjhznq1pprgfpz.jpg',
        14
    ),
    (
        5,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210883/room_images/jci9yhndajxtpxkfneve.jpg',
        15
    ),
    (
        6,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210895/room_images/ovnakvzbuczbdxfdxrep.jpg',
        16
    ),
    (
        7,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210907/room_images/zz7xi2strse2r15c3yaa.jpg',
        17
    ),
    (
        8,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210920/room_images/d7snhl845gw1cmh4vqjx.jpg',
        18
    ),
    (
        9,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210930/room_images/oqbilgynfko6sltihme8.jpg',
        19
    ),
    (
        10,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210946/room_images/was2fiue5lr7blklpegc.jpg',
        20
    ),
    (
        11,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210972/room_images/u4pnnqv8dkhhixv9evmc.jpg',
        21
    ),
    (
        12,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764210991/room_images/m1caofukcflzkcvobif4.jpg',
        22
    ),
    (
        13,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211004/room_images/ej2miha3rcyowmlcanyt.jpg',
        23
    ),
    (
        14,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211017/room_images/tf6a8izzjnbfxezao1az.jpg',
        24
    ),
    (
        15,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211029/room_images/yvkuqrvvm5mk4j0doi1t.jpg',
        25
    ),
    (
        16,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211111/room_images/fetxznl99a8ttwmlhd0r.jpg',
        26
    ),
    (
        17,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211121/room_images/tqt0zmuqe3smhrtjx2v6.jpg',
        27
    ),
    (
        18,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211147/room_images/j4nrgalnbvnzcfztez5b.jpg',
        28
    ),
    (
        19,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211156/room_images/dmhuvy6jj6e0xozdkrue.jpg',
        29
    ),
    (
        20,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211164/room_images/k177jduh9ozcnuimdgrz.jpg',
        30
    ),
    (
        21,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211175/room_images/qnhamjoic7sklulx9klz.jpg',
        31
    ),
    (
        22,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211196/room_images/wlsjdeewmlsv2jwkp0si.jpg',
        32
    ),
    (
        23,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211202/room_images/hcqhkacfc56wpcw9y06x.jpg',
        33
    ),
    (
        24,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211212/room_images/emsttdtjg8tvi33dsspg.jpg',
        34
    ),
    (
        25,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211230/room_images/kyzsftgqsibtxnsegryc.jpg',
        35
    ),
    (
        26,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211242/room_images/umlzltep9gjpddsdtiqy.jpg',
        36
    ),
    (
        27,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211251/room_images/xnw6e4elemfzgupqvqkc.jpg',
        37
    ),
    (
        28,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211261/room_images/aem9rwenjj03l3cq2uvg.jpg',
        38
    ),
    (
        29,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211279/room_images/ugd8qg7ejcy2f77qbirk.jpg',
        39
    ),
    (
        30,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211286/room_images/yta9klhc5rapqldrkq64.jpg',
        40
    ),
    (
        31,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211292/room_images/y0zsfvog3jljirkn4hlt.jpg',
        41
    ),
    (
        32,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211303/room_images/kcixuh2dqehnyaivbkuy.jpg',
        42
    ),
    (
        33,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764211316/room_images/o9yppjilh7mxr3qyeuix.jpg',
        43
    );
/*!40000 ALTER TABLE `img_room` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `invalidate_token`
--

DROP TABLE IF EXISTS `invalidate_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `invalidate_token` (
    `id` varchar(255) NOT NULL,
    `expiry_time` datetime(6) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `invalidate_token`
--

LOCK TABLES `invalidate_token` WRITE;
/*!40000 ALTER TABLE `invalidate_token` DISABLE KEYS */
;
INSERT INTO
    `invalidate_token`
VALUES (
        '00279d26-e587-4ae7-96ac-cd7677bf07ec',
        '2025-11-28 07:47:31.000000'
    ),
    (
        '003f8ff6-69df-414f-a1e0-56ce0fa6069c',
        '2025-11-28 07:34:43.000000'
    ),
    (
        '04ed4940-ac17-4c47-8204-4c63361c691e',
        '2025-11-28 08:23:20.000000'
    ),
    (
        '058e7aea-b8c8-464c-aa71-cdb38c969971',
        '2025-11-28 07:58:47.000000'
    ),
    (
        '098c28ee-9d0c-4a8d-a2a7-5fcbe25345b4',
        '2025-11-28 07:39:13.000000'
    ),
    (
        '0a1765b6-ba42-4950-b20a-432521696df2',
        '2025-11-27 08:21:37.000000'
    ),
    (
        '0ab6c23e-f492-4986-b6da-df276232828e',
        '2025-11-27 01:21:00.000000'
    ),
    (
        '0c1d63a9-acc3-4401-8601-49369a76fb90',
        '2025-11-27 08:25:57.000000'
    ),
    (
        '0efcebaf-7db1-4b88-9836-1fce69c1cca9',
        '2025-11-27 00:39:28.000000'
    ),
    (
        '10c3ae6d-65c5-4cea-a1b5-a51b41757edc',
        '2025-11-27 07:55:14.000000'
    ),
    (
        '10c604cc-e6c1-4e2b-816b-1ff5eae17a6b',
        '2025-11-26 23:07:03.000000'
    ),
    (
        '11fac08e-b9be-4942-9076-307fe18551be',
        '2025-11-28 04:00:56.000000'
    ),
    (
        '1285d61c-5962-4230-a1a4-c79165f8357d',
        '2025-11-27 23:04:07.000000'
    ),
    (
        '12ba0e61-70ce-470d-9d95-b4c085966ee6',
        '2025-11-27 10:21:32.000000'
    ),
    (
        '17656f68-c0be-4524-8d58-3c82639f7e71',
        '2025-11-27 08:38:27.000000'
    ),
    (
        '177b77b0-82cb-4b43-8281-62332b7cd536',
        '2025-11-26 23:59:14.000000'
    ),
    (
        '18f6744e-64a9-413d-914f-c03f1d5db800',
        '2025-11-26 23:19:07.000000'
    ),
    (
        '1a01f662-f594-4b6d-a4d4-7f22022974a9',
        '2025-11-27 14:17:48.000000'
    ),
    (
        '1a67d229-e601-463b-bc91-6c48bd30e53d',
        '2025-11-27 23:53:05.000000'
    ),
    (
        '1abce598-bcb3-46ca-9176-545e14057264',
        '2025-11-27 23:35:06.000000'
    ),
    (
        '1aefca2b-2276-4f16-b6bb-a34f55a36ff7',
        '2025-11-28 07:37:52.000000'
    ),
    (
        '1afb6037-db82-46dc-9c08-a15b904c3eec',
        '2025-11-28 09:02:17.000000'
    ),
    (
        '1b21402a-7dcd-49e6-97dc-cd3f87399e5b',
        '2025-11-27 00:10:36.000000'
    ),
    (
        '1c052b05-5db1-4732-a5ff-c61023c7b0ab',
        '2025-11-28 00:55:05.000000'
    ),
    (
        '1c055b7f-c6db-4d09-84f6-36f4f9b5ee37',
        '2025-11-26 23:50:06.000000'
    ),
    (
        '1c831a6a-da77-4f41-9c1f-c43e69d5eaa6',
        '2025-11-27 04:15:46.000000'
    ),
    (
        '1cba9d63-8841-47a8-865c-9cfeed007368',
        '2025-11-28 00:58:42.000000'
    ),
    (
        '1d3c47fa-4cd5-4e9c-9f1d-a06815682a0a',
        '2025-11-27 00:12:21.000000'
    ),
    (
        '1d6eceb0-e2e2-428e-8663-5ef36ddd29cf',
        '2025-11-28 07:29:40.000000'
    ),
    (
        '1e1497a1-996c-41ef-937e-b2d443bc5c69',
        '2025-11-27 07:55:54.000000'
    ),
    (
        '1fdd2cbf-31b1-40f2-9ade-1148a4429d3c',
        '2025-11-28 00:00:07.000000'
    ),
    (
        '243bb324-1859-4172-861e-132dc111a55c',
        '2025-11-27 01:14:25.000000'
    ),
    (
        '248a81e3-9115-4faf-bc4c-ba0d6bc4fb9c',
        '2025-11-27 01:25:49.000000'
    ),
    (
        '2548555e-805f-4782-b3ee-fccb9422805a',
        '2025-11-28 07:40:54.000000'
    ),
    (
        '2671c5c9-8280-4b2a-bf8c-70c79fc4d52a',
        '2025-11-28 07:34:57.000000'
    ),
    (
        '2a0d2996-e6b4-40ef-9dcc-3e50ba4694d8',
        '2025-11-27 00:46:58.000000'
    ),
    (
        '2b8494b9-da95-44aa-a0df-e51774dfec3b',
        '2025-11-28 01:05:21.000000'
    ),
    (
        '2d7b3896-3296-4238-86c9-88d2f57c6df2',
        '2025-11-28 07:32:10.000000'
    ),
    (
        '3179a817-9cf8-4d34-9562-5cb69f16acac',
        '2025-11-27 00:11:31.000000'
    ),
    (
        '336ac062-26b0-4284-833e-a2248d15a286',
        '2025-11-27 04:16:18.000000'
    ),
    (
        '347f81b6-9453-4479-81e4-e486e2da0798',
        '2025-11-27 02:03:05.000000'
    ),
    (
        '36bd63f4-c2a5-4415-84bf-f89d45c3671d',
        '2025-11-28 04:03:13.000000'
    ),
    (
        '371a9a8d-bab4-4b72-b9a8-5b7ddf89b917',
        '2025-11-27 00:35:41.000000'
    ),
    (
        '3776d05a-9143-45de-8b5a-59b95da881c3',
        '2025-11-28 01:00:19.000000'
    ),
    (
        '381063de-4f1f-4fa8-930a-7b3a40d7f2d4',
        '2025-11-27 01:24:57.000000'
    ),
    (
        '387ae603-5b65-4746-aab0-08830608e7cb',
        '2025-11-27 08:29:42.000000'
    ),
    (
        '3ad3449d-f21b-4c5e-9bd5-10b6d4a90ecb',
        '2025-11-27 23:40:22.000000'
    ),
    (
        '3b23f69f-991d-4639-9572-03aa454c4ab4',
        '2025-11-28 01:48:05.000000'
    ),
    (
        '3befed55-8d7d-4591-8d8e-343784d75805',
        '2025-11-27 00:49:13.000000'
    ),
    (
        '3c63ede2-5899-4f8f-b9d1-c5302c328a86',
        '2025-11-28 04:00:46.000000'
    ),
    (
        '3ce36164-99cd-4bec-ad1b-68d582f332e3',
        '2025-11-28 07:45:46.000000'
    ),
    (
        '3d959c58-7d44-44fd-bd9f-01dfaf6754e3',
        '2025-11-28 00:56:23.000000'
    ),
    (
        '3ee1651a-2413-477b-a6d8-4d55e726b869',
        '2025-11-27 00:30:38.000000'
    ),
    (
        '3f27414a-5528-4c8f-bde1-cfff0ccce8f5',
        '2025-11-27 00:02:27.000000'
    ),
    (
        '3f3f06db-3350-4d76-b592-b34067585118',
        '2025-11-28 08:18:48.000000'
    ),
    (
        '3fbeb015-377c-4aaf-943c-ff9396ae8ddb',
        '2025-11-27 08:28:26.000000'
    ),
    (
        '4034936e-0244-4f88-a4d0-21d5233f7ef8',
        '2025-11-27 07:54:13.000000'
    ),
    (
        '405cb8d2-cf4b-439f-b213-8aba0b583a41',
        '2025-11-27 04:15:56.000000'
    ),
    (
        '41da0b2c-50be-4e4d-8470-139babde9bc8',
        '2025-11-27 08:30:53.000000'
    ),
    (
        '41e0567f-693c-4531-a2de-106eacd970a8',
        '2025-11-27 01:11:23.000000'
    ),
    (
        '42a70b93-2e6a-439f-9199-44fa5b3d2d92',
        '2025-11-27 01:21:46.000000'
    ),
    (
        '42ce1068-d64d-4882-baf7-53e1467a15cd',
        '2025-11-28 01:10:49.000000'
    ),
    (
        '45c3ddbd-d813-4d6d-9d62-78064e54eb07',
        '2025-11-28 00:24:28.000000'
    ),
    (
        '46dc418d-c3c6-4a48-b159-6649cdc49e34',
        '2025-11-26 23:56:55.000000'
    ),
    (
        '4a740120-364f-47e0-9153-94b8f5ade439',
        '2025-11-28 01:06:00.000000'
    ),
    (
        '4bdf13df-b894-4e62-9bd9-452918dd80e9',
        '2025-11-27 08:36:49.000000'
    ),
    (
        '4c08e516-895e-48b1-8173-777c1c3ebd79',
        '2025-11-27 07:52:52.000000'
    ),
    (
        '4cc4ffc8-d6de-4998-9db3-79d4b41080b2',
        '2025-11-27 00:01:27.000000'
    ),
    (
        '4d97d3b3-7bd6-468b-aa5a-93796db667e4',
        '2025-11-28 00:36:20.000000'
    ),
    (
        '4e22a0f3-e025-4a86-97f2-73c1260bb211',
        '2025-11-28 08:14:42.000000'
    ),
    (
        '4ebef041-bd19-44d2-a5db-574a8c42c626',
        '2025-11-28 01:07:58.000000'
    ),
    (
        '4eeb9181-2662-4d75-9db7-cd54666bbbe5',
        '2025-11-27 04:21:21.000000'
    ),
    (
        '50d1c82b-6cb9-4c69-b817-48ca5b0b4be2',
        '2025-11-28 01:09:16.000000'
    ),
    (
        '51d1f910-0388-474b-a40b-6eb5cad6dbb0',
        '2025-11-26 23:51:10.000000'
    ),
    (
        '5202f108-0a93-4a09-a161-6c5b4411c57e',
        '2025-11-28 08:14:48.000000'
    ),
    (
        '52247012-ca9c-423a-96be-74f837122006',
        '2025-11-27 08:39:21.000000'
    ),
    (
        '524f8757-c1ac-4c40-b3c6-7dc74b060b82',
        '2025-11-27 00:51:20.000000'
    ),
    (
        '558c09f5-4b6b-4ab6-90b8-b2f12a03478c',
        '2025-11-27 08:37:17.000000'
    ),
    (
        '580fa096-25b8-4695-a9b7-c84ebdac1a11',
        '2025-11-28 08:46:42.000000'
    ),
    (
        '58650e85-c2fc-4edd-8242-e6471a3563d8',
        '2025-11-28 08:55:33.000000'
    ),
    (
        '5a492824-9141-472b-b424-ef28d4de106b',
        '2025-11-27 01:29:48.000000'
    ),
    (
        '5a9eb234-00f8-4d92-b49f-90b0b9ce3fc7',
        '2025-11-28 00:18:49.000000'
    ),
    (
        '5b269328-5291-4cbd-b709-21c3a6f28435',
        '2025-11-28 04:01:36.000000'
    ),
    (
        '5c948e7d-bf76-4c77-ad7e-728f54d1b6d3',
        '2025-11-28 00:19:45.000000'
    ),
    (
        '5fb02109-2624-46f6-82c7-beb0f0f4de79',
        '2025-11-28 04:03:58.000000'
    ),
    (
        '6096db06-ef79-429a-b981-5b1634ecb6d9',
        '2025-11-27 07:52:43.000000'
    ),
    (
        '610bc84a-2981-4bb2-9bf6-a93663dda76b',
        '2025-11-27 07:58:59.000000'
    ),
    (
        '6141c7ac-668a-429e-a0c3-c90233a4cd76',
        '2025-11-27 01:27:31.000000'
    ),
    (
        '636d71b9-5d94-465f-9779-b5a36c5ec61d',
        '2025-11-27 09:12:14.000000'
    ),
    (
        '654a4fec-65ab-425f-ad55-03de35cf4432',
        '2025-11-28 00:23:59.000000'
    ),
    (
        '67346aff-ed77-4725-ac7e-93aade53d676',
        '2025-11-27 00:48:17.000000'
    ),
    (
        '68c5f16e-7fa3-44e3-ad79-7dd3e5b5cec7',
        '2025-11-28 10:08:27.000000'
    ),
    (
        '693e725e-bdab-4c2b-9289-79df21cd2755',
        '2025-11-27 01:26:45.000000'
    ),
    (
        '6982c646-4d44-45f4-80d5-67b3f3386d1d',
        '2025-11-27 23:17:00.000000'
    ),
    (
        '6c309213-1f52-40c2-8131-f167e6bac390',
        '2025-11-27 08:32:52.000000'
    ),
    (
        '6c3b8345-01dc-4f9e-af97-b8d1bd2d15c5',
        '2025-11-27 23:55:36.000000'
    ),
    (
        '6d78bb0c-13e2-4771-956c-cc37c481c51d',
        '2025-11-27 07:48:59.000000'
    ),
    (
        '6e70c429-5b45-4028-b692-0eac0473db2f',
        '2025-11-27 23:39:09.000000'
    ),
    (
        '6f6a850e-62fb-4473-af29-88ab29f68ef2',
        '2025-11-27 07:59:47.000000'
    ),
    (
        '72f53487-2cc6-4019-bda3-e2dc03ab1dd3',
        '2025-11-27 01:22:20.000000'
    ),
    (
        '74fa873a-fc2c-41ef-8bab-9d5645540b87',
        '2025-11-27 22:52:04.000000'
    ),
    (
        '753600ec-df8a-40ec-be41-823d63650dfd',
        '2025-11-28 01:07:20.000000'
    ),
    (
        '76570653-804d-4e49-84c3-7f4792480b20',
        '2025-11-26 23:47:38.000000'
    ),
    (
        '766ff191-4ca8-4d79-b020-1f56706207fa',
        '2025-11-26 23:52:56.000000'
    ),
    (
        '76d6765e-431d-4c72-9f16-90ddbd4fea76',
        '2025-11-27 01:28:07.000000'
    ),
    (
        '7817219d-a907-4e56-9912-34490edcfd12',
        '2025-11-27 01:23:38.000000'
    ),
    (
        '7a816896-2c2f-4f82-b8e8-4ae1877b6fe3',
        '2025-11-28 09:17:17.000000'
    ),
    (
        '7b08085a-a064-44bb-9689-5bc707a91837',
        '2025-11-27 23:44:14.000000'
    ),
    (
        '7c330185-3946-42c8-b77c-6fa3f6e95ee4',
        '2025-11-27 10:23:27.000000'
    ),
    (
        '7e650eee-eee4-498f-872c-d9ae68d0ed6d',
        '2025-11-27 23:57:21.000000'
    ),
    (
        '7ed3c513-5d76-4c8b-975e-f04ab6acb28f',
        '2025-11-27 08:02:31.000000'
    ),
    (
        '7fd820d7-5087-4d71-bad1-4f81d58291b4',
        '2025-11-26 23:32:00.000000'
    ),
    (
        '808bc869-0358-418d-aa25-4725a3a2df46',
        '2025-11-28 08:24:21.000000'
    ),
    (
        '82023143-e6c3-4146-8b1b-b6316d6ba4ca',
        '2025-11-28 01:11:45.000000'
    ),
    (
        '83a38603-f6d6-4a4d-affc-ec1679086eb6',
        '2025-11-28 08:54:36.000000'
    ),
    (
        '84b7c709-2a1c-4a8f-a9f6-cc8411ad40eb',
        '2025-11-27 00:28:50.000000'
    ),
    (
        '84cc862d-ebb8-4f95-a3c2-b70b02a331e6',
        '2025-11-27 21:05:24.000000'
    ),
    (
        '855509aa-8d1a-4e4a-9c69-2aa879c9f5eb',
        '2025-11-28 01:06:46.000000'
    ),
    (
        '86fe66ce-c8e2-4785-aae1-37359aa1a30b',
        '2025-11-27 21:58:28.000000'
    ),
    (
        '8752ebec-3dfa-4566-bbf0-bd1a72baa8ca',
        '2025-11-28 07:26:58.000000'
    ),
    (
        '883e4fee-7dbc-4a24-9be1-3a31474fd4fd',
        '2025-11-28 10:06:32.000000'
    ),
    (
        '88a56e31-1374-41f0-83c9-d2de207ba2d5',
        '2025-11-27 07:49:43.000000'
    ),
    (
        '88d78846-4b86-44f3-961d-d40ff9359619',
        '2025-11-27 23:41:55.000000'
    ),
    (
        '89ab9e34-651a-4799-aca5-749d2b268b56',
        '2025-11-28 00:42:59.000000'
    ),
    (
        '89b396b9-0794-4b71-b3d9-d68e593ca1aa',
        '2025-11-27 07:56:58.000000'
    ),
    (
        '8adb0461-2efc-433c-a9d5-50c009d6db00',
        '2025-11-27 01:28:42.000000'
    ),
    (
        '8c3aa4f0-f170-45d8-aa28-4efe09c9bb85',
        '2025-11-28 07:37:43.000000'
    ),
    (
        '8cbc5220-a230-47f8-bfdf-ad5e8d9b3449',
        '2025-11-27 00:33:16.000000'
    ),
    (
        '8d80fd0a-3227-4da8-b956-ac884196459e',
        '2025-11-27 00:08:05.000000'
    ),
    (
        '8eed87de-8dd8-42e2-9306-0ef9af4f50f2',
        '2025-11-28 10:10:04.000000'
    ),
    (
        '8f0adc40-9cdc-40a3-bab4-0b69ac191516',
        '2025-11-27 23:56:31.000000'
    ),
    (
        '8f526b0f-df2f-450e-914e-25dbc2201df6',
        '2025-11-27 09:10:33.000000'
    ),
    (
        '90702bbb-f6c3-41c9-a1a0-4de078aa8be2',
        '2025-11-28 00:57:08.000000'
    ),
    (
        '9162630e-d890-42f2-afe1-cb3b6ad64d1c',
        '2025-11-27 08:13:47.000000'
    ),
    (
        '91f7f0e3-4333-4976-8065-c231de61ec63',
        '2025-11-27 03:59:32.000000'
    ),
    (
        '9200c6ca-84ee-4c68-ab9d-cdb3ed9b19c2',
        '2025-11-28 00:22:19.000000'
    ),
    (
        '92b87876-c315-40a1-9359-1fbd1bf8a79a',
        '2025-11-27 04:16:36.000000'
    ),
    (
        '92d6e5ba-7974-4090-a680-d6bc7992f1d1',
        '2025-11-27 09:32:17.000000'
    ),
    (
        '93d4af9a-cbae-4b3b-a3a6-bbebc11b0eab',
        '2025-11-27 20:46:58.000000'
    ),
    (
        '947c4984-ddcc-4554-95de-da63d030b800',
        '2025-11-27 01:12:08.000000'
    ),
    (
        '94e32ca1-e0b1-4f05-9260-f17fac2545dd',
        '2025-11-28 00:31:58.000000'
    ),
    (
        '955c187d-16a7-4d78-82df-77638071619b',
        '2025-11-27 01:22:58.000000'
    ),
    (
        '96ad29f0-7808-426d-a2b6-519d7f3a72c9',
        '2025-11-27 01:15:19.000000'
    ),
    (
        '979c81a5-f932-436a-a01a-3aaa3e717dff',
        '2025-11-28 03:44:32.000000'
    ),
    (
        '97bda2cf-438f-4214-a771-eedb7d552ca3',
        '2025-11-28 00:33:17.000000'
    ),
    (
        '9804a578-5514-4987-8f9d-1a73dfe4992d',
        '2025-11-26 23:54:09.000000'
    ),
    (
        '9b2350ab-8827-467d-86f9-14193ebeea64',
        '2025-11-27 07:45:55.000000'
    ),
    (
        '9c3e334d-b5a3-4586-aec5-fe7ebc0fac86',
        '2025-11-27 23:47:27.000000'
    ),
    (
        'a00b490c-2984-442a-be9c-9966a4d27c55',
        '2025-11-27 23:32:38.000000'
    ),
    (
        'a2062d8f-3fdc-4dd7-b4f0-241521d5a6dd',
        '2025-11-27 01:13:42.000000'
    ),
    (
        'a23b2e85-979c-4209-b8ed-055777ab8518',
        '2025-11-28 10:18:39.000000'
    ),
    (
        'a285525e-5e4c-4214-9962-00aceb4cb63a',
        '2025-11-27 08:00:46.000000'
    ),
    (
        'a2e04f69-6e7c-46b2-9b98-8d10517035a7',
        '2025-11-28 07:40:14.000000'
    ),
    (
        'a317b449-9a91-450f-ae5d-73bfc7219f3a',
        '2025-11-27 00:50:04.000000'
    ),
    (
        'a5c54052-0052-4e1e-bbb7-9020ef693047',
        '2025-11-27 10:33:39.000000'
    ),
    (
        'a69db48c-81d7-43da-8563-936a7dc10186',
        '2025-11-28 00:13:50.000000'
    ),
    (
        'a750c9bf-eec3-4d55-8559-19fe3054e7eb',
        '2025-11-27 20:17:53.000000'
    ),
    (
        'a8bab959-6ac6-409e-bd7e-6cebe44155b6',
        '2025-11-28 08:23:27.000000'
    ),
    (
        'a908637e-12af-4086-9f52-f6b4fe7254ec',
        '2025-11-28 08:13:26.000000'
    ),
    (
        'aab7b41e-3b6d-4524-a280-4c49e57c9b3b',
        '2025-11-27 09:03:57.000000'
    ),
    (
        'ac7be0cd-37ed-4567-8d91-3eb0f420e18b',
        '2025-11-27 08:33:48.000000'
    ),
    (
        'aca6ca7c-cfde-4d06-bcb4-dacdc5ae25ce',
        '2025-11-27 09:56:02.000000'
    ),
    (
        'adb43fde-39e1-4673-92a3-479177ef72b6',
        '2025-11-28 04:01:18.000000'
    ),
    (
        'af66569e-e54a-4788-9319-e6c31dd5709f',
        '2025-11-27 09:01:42.000000'
    ),
    (
        'b029175e-d07b-4b5d-83f8-10ba59f94735',
        '2025-11-28 08:10:57.000000'
    ),
    (
        'b3f8e145-bd15-41a5-9cab-8ceff11c6e75',
        '2025-11-28 08:12:31.000000'
    ),
    (
        'b6060bad-9ff5-4f12-890c-08b187ec9c7e',
        '2025-11-27 07:47:10.000000'
    ),
    (
        'b63f7c9e-9c31-42d5-9f92-89de872c7fc7',
        '2025-11-28 08:17:52.000000'
    ),
    (
        'b681a5fd-c5fb-4c85-9752-a03cd7fad7b5',
        '2025-11-28 01:48:20.000000'
    ),
    (
        'b7aebd47-112a-4575-a85b-ee6c44e40f69',
        '2025-11-28 00:20:41.000000'
    ),
    (
        'b869e512-1c59-470e-a946-1ca928ab67d2',
        '2025-11-27 00:37:19.000000'
    ),
    (
        'b8c3d8f7-fb15-4696-acb9-951b3705ef62',
        '2025-11-27 00:33:49.000000'
    ),
    (
        'b9a8ecc1-ead4-4a78-bcac-7cfcf26fe598',
        '2025-11-27 00:34:45.000000'
    ),
    (
        'ba30eb9e-08e9-470a-9526-58756ddcce2e',
        '2025-11-27 23:46:27.000000'
    ),
    (
        'bdb5d181-b74c-4c50-9cda-9a6278cbef86',
        '2025-11-27 23:31:38.000000'
    ),
    (
        'bded2af3-a788-4871-9aca-26a98f62f3e9',
        '2025-11-28 01:13:07.000000'
    ),
    (
        'be785092-59cd-4b42-ba07-c4d7ab099a9e',
        '2025-11-28 00:34:13.000000'
    ),
    (
        'bf4564c8-d19f-4b31-b8b1-06d20972c1e3',
        '2025-11-28 07:44:47.000000'
    ),
    (
        'c2244127-51b0-4238-8b73-76d17e4a7c11',
        '2025-11-28 04:06:21.000000'
    ),
    (
        'c2262214-a22e-4f1b-bd52-b98160cbe137',
        '2025-11-27 07:51:59.000000'
    ),
    (
        'c3776887-58f6-4826-ad57-5bc0cbaaf285',
        '2025-11-28 03:50:53.000000'
    ),
    (
        'c4b4aadf-afe9-4a8e-9455-1cc42a524512',
        '2025-11-28 01:09:57.000000'
    ),
    (
        'c4b68fac-33bb-43db-ad01-13bf4a170a09',
        '2025-11-27 23:37:56.000000'
    ),
    (
        'c573e6f2-e7a3-461e-8536-13023019b12e',
        '2025-11-27 08:38:20.000000'
    ),
    (
        'c7fe7b0c-0dce-4f21-89e0-cf51aaf41ba9',
        '2025-11-27 01:12:44.000000'
    ),
    (
        'c8271f89-d023-44d9-ad46-987a6b3d4c0a',
        '2025-11-28 07:36:59.000000'
    ),
    (
        'c86bf2e3-c63e-438c-89ba-8de383fa415a',
        '2025-11-27 00:15:07.000000'
    ),
    (
        'c97f8d2b-f273-474a-964a-44caa47b9050',
        '2025-11-28 08:06:37.000000'
    ),
    (
        'ca134a1d-5112-44d0-9564-627854c3f99e',
        '2025-11-28 03:48:04.000000'
    ),
    (
        'ca1b4b5b-ac1f-468b-bde3-a3de41adaa56',
        '2025-11-28 08:22:18.000000'
    ),
    (
        'ca270a05-92e2-4b18-b8df-22b32ce34cce',
        '2025-11-28 09:26:02.000000'
    ),
    (
        'ca9685db-4d9b-4c18-be58-6533fd094796',
        '2025-11-27 04:03:04.000000'
    ),
    (
        'cb0e6eaf-6112-406f-b1a4-2e580d2444ed',
        '2025-11-28 09:41:02.000000'
    ),
    (
        'cbb74e03-a5d9-434c-ae37-26d9598bffbc',
        '2025-11-28 01:12:31.000000'
    ),
    (
        'cd55f176-7e96-42f5-b265-f6dc101f73d5',
        '2025-11-27 00:57:59.000000'
    ),
    (
        'ce6d6de5-187b-4b1f-8ab0-72dfc305ef36',
        '2025-11-27 14:26:08.000000'
    ),
    (
        'cf6b67f4-669e-4e73-a83e-d53d57bac197',
        '2025-11-27 00:13:39.000000'
    ),
    (
        'd052ee87-c304-4744-9652-36a92a70abe7',
        '2025-11-27 04:05:53.000000'
    ),
    (
        'd08b1f23-6aef-4e78-a910-a75aa85d40fe',
        '2025-11-27 10:25:04.000000'
    ),
    (
        'd0bb4692-f561-4706-bae7-abc4059bc143',
        '2025-11-26 23:46:38.000000'
    ),
    (
        'd0bfc477-e536-4908-aaf9-242cb061e167',
        '2025-11-28 08:48:57.000000'
    ),
    (
        'd1feb516-bdeb-4a44-841d-2c50c712c1fb',
        '2025-11-27 01:24:16.000000'
    ),
    (
        'd48050e0-2d17-4c2a-a8dc-9f20cfb55486',
        '2025-11-28 01:13:42.000000'
    ),
    (
        'd6122a19-b803-4947-8904-db6e26c548dc',
        '2025-11-27 08:20:05.000000'
    ),
    (
        'd68c41f8-9ca9-4a12-8b28-dee5fcebf585',
        '2025-11-28 07:41:58.000000'
    ),
    (
        'd8ed805f-62a4-4d6e-9377-d40bdef7b38d',
        '2025-11-28 01:14:48.000000'
    ),
    (
        'd90ff833-0eb9-4248-9811-38c948b072da',
        '2025-11-28 07:33:59.000000'
    ),
    (
        'db52cbec-cd83-46ee-a3c9-cca53c460e18',
        '2025-11-28 00:59:25.000000'
    ),
    (
        'db68b26b-8d0c-4adf-bfd6-9dad04c56b9c',
        '2025-11-28 08:07:53.000000'
    ),
    (
        'dd7d12e1-70ef-482f-b9d7-5e68b3541870',
        '2025-11-27 00:36:25.000000'
    ),
    (
        'df7b3c75-3158-4a84-af4a-acee101ad2da',
        '2025-11-27 00:37:04.000000'
    ),
    (
        'e0b9a858-8822-4a29-99f2-995a5e07c43d',
        '2025-11-28 08:57:14.000000'
    ),
    (
        'e13b40da-b910-47f4-a50f-0d65a94bfbd8',
        '2025-11-28 08:05:05.000000'
    ),
    (
        'e1888813-9008-4a4d-9c3e-1b67f289c074',
        '2025-11-28 00:57:44.000000'
    ),
    (
        'e1f1c068-43c7-4480-a437-97de51caa238',
        '2025-11-27 23:58:39.000000'
    ),
    (
        'e23075d8-fd6b-4cd5-b058-3e50cfd88b3f',
        '2025-11-28 10:09:19.000000'
    ),
    (
        'e37135e0-c4b6-4b13-95c9-a35d62f7be92',
        '2025-11-27 01:10:05.000000'
    ),
    (
        'e3a9aa42-5d6e-4a1b-86ac-58648bab8335',
        '2025-11-27 07:41:58.000000'
    ),
    (
        'e49e925d-c0f6-4b8c-ab0a-42e618d9833a',
        '2025-11-28 07:30:55.000000'
    ),
    (
        'e87a434e-5401-4c1c-ba4e-b1ecebf647cd',
        '2025-11-27 01:20:21.000000'
    ),
    (
        'e8990518-29d2-4b7b-a905-1ad1aa6519ef',
        '2025-11-27 23:36:10.000000'
    ),
    (
        'e8bf1cad-434f-4dec-8365-88d37c83715f',
        '2025-11-27 08:29:48.000000'
    ),
    (
        'e97efc73-7a2f-405b-aed8-2298791d3ed9',
        '2025-11-28 00:22:04.000000'
    ),
    (
        'eb5b4cb0-07c8-4426-9696-6c9ffb53db86',
        '2025-11-28 01:08:38.000000'
    ),
    (
        'eba3b423-842a-4376-b930-5b962b1f8c8a',
        '2025-11-28 00:35:04.000000'
    ),
    (
        'ec34013a-f0dc-4425-b650-5cfe4487b122',
        '2025-11-27 08:22:53.000000'
    ),
    (
        'ee882dbe-d311-456b-890f-5d676c305acf',
        '2025-11-27 08:27:31.000000'
    ),
    (
        'efdecbc2-632a-4e1a-a030-bb4ec765a687',
        '2025-11-27 00:38:59.000000'
    ),
    (
        'f1d8b1cf-a33f-4cd0-9bf9-31430acc362f',
        '2025-11-28 00:21:25.000000'
    ),
    (
        'f25b3b96-1185-459a-b5d4-7c76b45bddde',
        '2025-11-28 08:31:07.000000'
    ),
    (
        'f2c77676-3aba-44dd-b135-3e6603af676c',
        '2025-11-27 07:49:57.000000'
    ),
    (
        'f44219d2-fa8d-42fc-ad41-1c6a7c46219c',
        '2025-11-28 08:21:49.000000'
    ),
    (
        'f4b5e9b1-190e-4ef5-b843-680c333b958c',
        '2025-11-27 10:24:19.000000'
    ),
    (
        'f4d510d6-7cc8-4d95-8e71-0d1c4acb4ebd',
        '2025-11-28 00:15:38.000000'
    ),
    (
        'f5e119f7-b4e9-40bf-a0f0-41eeacf7c592',
        '2025-11-28 07:43:59.000000'
    ),
    (
        'f921e386-e6a4-4581-b693-77a9547b204a',
        '2025-11-27 22:35:55.000000'
    ),
    (
        'f9bfb751-599c-4f8e-97b0-57f8b01f6e61',
        '2025-11-27 07:44:40.000000'
    ),
    (
        'fbcc1680-9638-4cfd-a65d-bf769e3e45a4',
        '2025-11-28 08:15:53.000000'
    ),
    (
        'fc0cd108-761c-4940-8266-53b7f1954edd',
        '2025-11-26 23:55:22.000000'
    ),
    (
        'ff191023-059e-4bdc-a8d7-e9a2bd091803',
        '2025-11-27 04:18:13.000000'
    ),
    (
        'ff5c7775-e079-4a4f-829e-cf4238484b3f',
        '2025-11-28 00:18:16.000000'
    ),
    (
        'ffe351e3-06b5-4bcd-ae26-c44017428db8',
        '2025-11-27 09:09:36.000000'
    );
/*!40000 ALTER TABLE `invalidate_token` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `invoice` (
    `id` int NOT NULL AUTO_INCREMENT,
    `check_in_date` date DEFAULT NULL,
    `check_out_date` date DEFAULT NULL,
    `created_at` datetime(6) DEFAULT NULL,
    `is_delete` int NOT NULL,
    `payment` int DEFAULT NULL,
    `status` int DEFAULT NULL,
    `total_amount` double DEFAULT NULL,
    `roomid` int NOT NULL,
    `userid` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK61x26kfmspdd735ij5hgoo6so` (`roomid`),
    KEY `FKe7mop857we1ou3wh7hanv5gsf` (`userid`),
    CONSTRAINT `FK61x26kfmspdd735ij5hgoo6so` FOREIGN KEY (`roomid`) REFERENCES `room` (`room_id`),
    CONSTRAINT `FKe7mop857we1ou3wh7hanv5gsf` FOREIGN KEY (`userid`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 36 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */
;
INSERT INTO
    `invoice`
VALUES (
        1,
        '2025-01-05',
        '2025-01-07',
        '2025-01-04 10:12:34.000000',
        0,
        1,
        3,
        200000,
        11,
        30
    ),
    (
        2,
        '2025-02-10',
        '2025-02-12',
        '2025-02-09 11:45:12.000000',
        0,
        3,
        2,
        350000,
        12,
        31
    ),
    (
        3,
        '2025-01-15',
        '2025-01-17',
        '2025-01-14 10:07:04.000000',
        0,
        1,
        3,
        150000,
        13,
        32
    ),
    (
        4,
        '2025-03-20',
        '2025-03-22',
        '2025-03-19 14:22:55.000000',
        0,
        3,
        1,
        280000,
        14,
        33
    ),
    (
        5,
        '2025-04-25',
        '2025-04-27',
        '2025-04-24 08:55:11.000000',
        0,
        1,
        3,
        160000,
        15,
        34
    ),
    (
        6,
        '2025-01-07',
        '2025-01-09',
        '2025-01-06 12:10:45.000000',
        0,
        3,
        3,
        300000,
        16,
        35
    ),
    (
        7,
        '2025-02-14',
        '2025-02-16',
        '2025-02-13 09:30:22.000000',
        0,
        1,
        3,
        255000,
        17,
        36
    ),
    (
        8,
        '2025-03-18',
        '2025-03-20',
        '2025-03-17 10:05:17.000000',
        0,
        3,
        2,
        180000,
        18,
        37
    ),
    (
        9,
        '2025-04-12',
        '2025-04-14',
        '2025-04-11 15:33:44.000000',
        0,
        1,
        3,
        300000,
        19,
        38
    ),
    (
        10,
        '2025-02-22',
        '2025-02-24',
        '2025-02-21 16:12:12.000000',
        0,
        3,
        2,
        395000,
        20,
        39
    ),
    (
        11,
        '2025-05-03',
        '2025-05-05',
        '2025-05-02 13:45:33.000000',
        0,
        1,
        3,
        220000,
        21,
        40
    ),
    (
        12,
        '2025-06-08',
        '2025-06-10',
        '2025-06-07 09:50:18.000000',
        0,
        3,
        3,
        180000,
        22,
        41
    ),
    (
        13,
        '2025-07-12',
        '2025-07-14',
        '2025-07-11 11:05:59.000000',
        0,
        1,
        3,
        30000,
        23,
        42
    ),
    (
        14,
        '2025-08-18',
        '2025-08-20',
        '2025-08-17 10:15:12.000000',
        0,
        3,
        3,
        195000,
        24,
        43
    ),
    (
        15,
        '2025-09-05',
        '2025-09-07',
        '2025-09-04 08:42:07.000000',
        0,
        1,
        3,
        250000,
        25,
        44
    ),
    (
        16,
        '2025-10-10',
        '2025-10-12',
        '2025-10-09 14:20:33.000000',
        0,
        3,
        3,
        175000,
        26,
        45
    ),
    (
        17,
        '2025-05-15',
        '2025-05-17',
        '2025-05-14 09:12:44.000000',
        0,
        1,
        1,
        210000,
        27,
        46
    ),
    (
        18,
        '2025-06-20',
        '2025-06-22',
        '2025-06-19 16:17:51.000000',
        0,
        3,
        1,
        320000,
        28,
        47
    ),
    (
        19,
        '2025-07-25',
        '2025-07-27',
        '2025-07-24 10:42:33.000000',
        0,
        1,
        3,
        150000,
        29,
        48
    ),
    (
        20,
        '2025-08-30',
        '2025-09-01',
        '2025-08-29 12:30:18.000000',
        0,
        3,
        3,
        280000,
        30,
        49
    ),
    (
        21,
        '2025-09-12',
        '2025-09-14',
        '2025-09-11 09:55:11.000000',
        0,
        1,
        3,
        160000,
        31,
        50
    ),
    (
        22,
        '2025-10-05',
        '2025-10-07',
        '2025-10-04 10:22:44.000000',
        0,
        3,
        2,
        300000,
        32,
        30
    ),
    (
        23,
        '2025-06-15',
        '2025-06-17',
        '2025-06-14 14:18:09.000000',
        0,
        1,
        1,
        255000,
        33,
        31
    ),
    (
        24,
        '2025-07-20',
        '2025-07-22',
        '2025-07-19 11:33:22.000000',
        0,
        3,
        2,
        180000,
        34,
        32
    ),
    (
        25,
        '2025-08-25',
        '2025-08-27',
        '2025-08-24 13:55:44.000000',
        0,
        1,
        1,
        30000,
        35,
        33
    ),
    (
        26,
        '2025-11-01',
        '2025-11-03',
        '2025-11-01 08:45:17.000000',
        0,
        3,
        1,
        195000,
        36,
        34
    ),
    (
        27,
        '2025-11-03',
        '2025-11-05',
        '2025-11-03 10:12:33.000000',
        0,
        1,
        3,
        250000,
        37,
        35
    ),
    (
        28,
        '2025-11-05',
        '2025-11-07',
        '2025-11-05 09:22:18.000000',
        0,
        3,
        2,
        175000,
        38,
        36
    ),
    (
        29,
        '2025-11-10',
        '2025-11-12',
        '2025-11-09 12:15:59.000000',
        0,
        1,
        1,
        210000,
        39,
        37
    ),
    (
        30,
        '2025-11-12',
        '2025-11-14',
        '2025-11-11 11:45:33.000000',
        0,
        3,
        3,
        320000,
        40,
        38
    ),
    (
        31,
        '2025-11-15',
        '2025-11-17',
        '2025-11-14 10:30:12.000000',
        0,
        1,
        3,
        150000,
        41,
        39
    ),
    (
        32,
        '2025-11-17',
        '2025-11-19',
        '2025-11-16 09:12:44.000000',
        0,
        3,
        2,
        280000,
        42,
        40
    ),
    (
        33,
        '2025-11-20',
        '2025-11-22',
        '2025-11-19 14:55:18.000000',
        0,
        1,
        1,
        160000,
        43,
        41
    ),
    (
        34,
        '2025-11-23',
        '2025-11-25',
        '2025-11-22 10:42:33.000000',
        0,
        3,
        3,
        300000,
        44,
        42
    ),
    (
        35,
        '2025-11-26',
        '2025-11-28',
        '2025-11-25 11:12:44.000000',
        0,
        1,
        3,
        255000,
        45,
        43
    );
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `message` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `content` varchar(255) DEFAULT NULL,
    `create_at` datetime(6) DEFAULT NULL,
    `receiver_id` int DEFAULT NULL,
    `sender_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FK86f0kc2mt26ifwupnivu6v8oa` (`receiver_id`),
    KEY `FKcnj2qaf5yc36v2f90jw2ipl9b` (`sender_id`),
    CONSTRAINT `FK86f0kc2mt26ifwupnivu6v8oa` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`),
    CONSTRAINT `FKcnj2qaf5yc36v2f90jw2ipl9b` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */
;
INSERT INTO
    `message`
VALUES (
        1,
        'xin chào bạn còn phong khách sạn không',
        '2025-11-27 04:02:57.605931',
        2,
        52
    ),
    (
        2,
        'còn',
        '2025-11-27 04:03:05.057029',
        52,
        2
    ),
    (
        3,
        'Xin chào',
        '2025-11-27 04:03:41.908671',
        2,
        53
    ),
    (
        4,
        'xin chào tôi là admin',
        '2025-11-27 04:04:37.461471',
        2,
        1
    );
/*!40000 ALTER TABLE `message` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `permission` (
    `name` varchar(255) NOT NULL,
    `description` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */
;
INSERT INTO
    `permission`
VALUES (
        'ADD_HOTEL',
        'Đăng ký khách sạn, thêm khách sạn'
    ),
    ('ADD_ROLE', 'Thêm vai trò'),
    ('ADD_ROOM', 'Tạo phòng'),
    (
        'ADMIN_STATISTIC',
        'Xem thống kê tất cả'
    ),
    ('CHAT', 'Gửi tin nhắn'),
    (
        'CUSTOMER_STATISTIC',
        'Xem thống kê doanh thu'
    ),
    (
        'DELETE_HOTEL',
        'Xóa khách sạn'
    ),
    ('DELETE_ROLE', 'Xóa vai trò'),
    ('DELETE_ROOM', 'Xóa phòng'),
    ('DELETE_USER', 'Xóa user'),
    (
        'READ_INVOICE_LIST',
        'Xem danh sách tất cả hóa đơn'
    ),
    (
        'READ_INVOICE_LIST_(2)',
        'Xem danh sách hóa đơn của khách sạn mình'
    ),
    (
        'READ_MESSAGES',
        'Xem tin nhắn đến bản than'
    ),
    (
        'READ_USER_LIST',
        'Xem danh sách user'
    ),
    (
        'UPDATE_HOTEL',
        'Chỉnh sửa thông tin khách sạn'
    ),
    (
        'UPDATE_INVOICE',
        'Cập nhật trạng thái  hóa đơn'
    ),
    (
        'UPDATE_ROLE',
        'Chỉnh sửa vai trò'
    ),
    (
        'UPDATE_ROOM',
        'Chỉnh sửa phòng'
    ),
    (
        'UPDATE_USER',
        'Chỉnh sửa user'
    );
/*!40000 ALTER TABLE `permission` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `review` (
    `id` int NOT NULL,
    `create_at` datetime(6) DEFAULT NULL,
    `feedback` varchar(255) DEFAULT NULL,
    `star` int NOT NULL,
    `hotel_id` int DEFAULT NULL,
    `invoice_id` int DEFAULT NULL,
    `user_id` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `FKi0ly7ivbh8ijdgoi7cwtuoavt` (`hotel_id`),
    KEY `FK9jndgnmv1a90phdj54j012l57` (`invoice_id`),
    KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`),
    CONSTRAINT `FK9jndgnmv1a90phdj54j012l57` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`),
    CONSTRAINT `FKi0ly7ivbh8ijdgoi7cwtuoavt` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`),
    CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */
;
INSERT INTO
    `review`
VALUES (
        1,
        '2025-11-27 10:55:08.653804',
        'hay tuyệt vời',
        3,
        2,
        23,
        31
    ),
    (
        2,
        '2025-11-27 10:55:22.898563',
        'tuyệt vời ông mặt trời\n',
        4,
        2,
        2,
        31
    ),
    (
        3,
        '2025-11-27 10:56:42.284820',
        'view đẹp phong cảnh tốt',
        4,
        2,
        3,
        32
    ),
    (
        4,
        '2025-11-27 10:56:50.878295',
        'chất đấy người ae',
        4,
        2,
        24,
        32
    ),
    (
        5,
        '2025-11-27 10:57:39.438583',
        'hay và tuyệt vời',
        4,
        2,
        4,
        33
    ),
    (
        6,
        '2025-11-27 10:57:58.671288',
        'tôi ưa thích cảnh đẹp',
        4,
        2,
        25,
        33
    ),
    (
        7,
        '2025-11-27 10:58:46.810516',
        'thật là tuyệt vời',
        4,
        2,
        7,
        36
    ),
    (
        8,
        '2025-11-27 10:58:54.574231',
        'đỉnh cao khách sạn',
        5,
        2,
        28,
        36
    ),
    (
        9,
        '2025-11-27 11:09:57.674557',
        'xịn xò nha',
        4,
        2,
        29,
        37
    );
/*!40000 ALTER TABLE `review` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `review_seq`
--

DROP TABLE IF EXISTS `review_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `review_seq` (
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `review_seq`
--

LOCK TABLES `review_seq` WRITE;
/*!40000 ALTER TABLE `review_seq` DISABLE KEYS */
;
INSERT INTO `review_seq` VALUES (1);
/*!40000 ALTER TABLE `review_seq` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `role` (
    `name` varchar(255) NOT NULL,
    `description` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */
;
INSERT INTO
    `role`
VALUES (
        'ADMIN',
        'Quyền quản trị toàn bộ'
    ),
    ('CHAT', 'Nhắn tin'),
    ('CUSTOMER', 'Chủ khách sạn'),
    ('HOTEL', 'Quản lý khách sạn'),
    (
        'INVOICE',
        'Quản lý hóa đơn đặt phòng'
    ),
    (
        'INVOICE_(2)',
        'Quản lý hóa đơn của khách sạn mình'
    ),
    ('ROLE', 'Phân quyền'),
    ('ROOM', 'Quản lý phòng'),
    ('TESTROLE', 'TEST VAI TRÒ'),
    ('testrole2', 'teest 2'),
    ('USER', 'người dùng');
/*!40000 ALTER TABLE `role` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `role_permissions` (
    `role_name` varchar(255) NOT NULL,
    `permissions_name` varchar(255) NOT NULL,
    PRIMARY KEY (
        `role_name`,
        `permissions_name`
    ),
    KEY `FKf5aljih4mxtdgalvr7xvngfn1` (`permissions_name`),
    CONSTRAINT `FKcppvu8fk24eqqn6q4hws7ajux` FOREIGN KEY (`role_name`) REFERENCES `role` (`name`),
    CONSTRAINT `FKf5aljih4mxtdgalvr7xvngfn1` FOREIGN KEY (`permissions_name`) REFERENCES `permission` (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */
;
INSERT INTO
    `role_permissions`
VALUES ('ADMIN', 'ADD_HOTEL'),
    ('ROLE', 'ADD_ROLE'),
    ('ROOM', 'ADD_ROOM'),
    ('ADMIN', 'ADMIN_STATISTIC'),
    ('CHAT', 'CHAT'),
    ('USER', 'CHAT'),
    (
        'CUSTOMER',
        'CUSTOMER_STATISTIC'
    ),
    ('ROLE', 'DELETE_ROLE'),
    ('ROOM', 'DELETE_ROOM'),
    (
        'INVOICE',
        'READ_INVOICE_LIST'
    ),
    (
        'INVOICE_(2)',
        'READ_INVOICE_LIST_(2)'
    ),
    ('CHAT', 'READ_MESSAGES'),
    ('USER', 'READ_USER_LIST'),
    ('HOTEL', 'UPDATE_HOTEL'),
    (
        'INVOICE_(2)',
        'UPDATE_INVOICE'
    ),
    ('ROLE', 'UPDATE_ROLE'),
    ('ROOM', 'UPDATE_ROOM'),
    ('USER', 'UPDATE_USER');
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `room` (
    `room_id` int NOT NULL,
    `bed_count` int NOT NULL,
    `bed_room_count` int NOT NULL,
    `room_area` double NOT NULL,
    `room_capacity` int NOT NULL,
    `room_create_at` datetime(6) DEFAULT NULL,
    `room_name` varchar(255) NOT NULL,
    `room_price` double NOT NULL,
    `room_type` varchar(255) DEFAULT NULL,
    `room_update_at` datetime(6) DEFAULT NULL,
    `status` int NOT NULL,
    `hotelid` int DEFAULT NULL,
    PRIMARY KEY (`room_id`),
    KEY `FK7bt2oc7b3h1cqba9crblkx1c4` (`hotelid`),
    CONSTRAINT `FK7bt2oc7b3h1cqba9crblkx1c4` FOREIGN KEY (`hotelid`) REFERENCES `hotel` (`hotel_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */
;
INSERT INTO
    `room`
VALUES (
        1,
        2,
        2,
        45,
        2,
        '2025-01-04 10:22:51.000000',
        'Royal Deluxe Room 101',
        150000,
        'Presidential Suite',
        '2025-01-05 12:31:14.000000',
        0,
        1
    ),
    (
        2,
        1,
        1,
        55,
        2,
        '2025-01-06 08:11:12.000000',
        'Grand King Room 102',
        180000,
        'Suite',
        '2025-01-07 14:49:58.000000',
        0,
        1
    ),
    (
        3,
        3,
        2,
        70,
        3,
        '2025-01-08 09:32:45.000000',
        'Executive Vip Suite 103',
        250000,
        'Premium Deluxe',
        '2025-01-08 15:18:22.000000',
        0,
        1
    ),
    (
        4,
        2,
        1,
        40,
        2,
        '2025-01-10 11:25:37.000000',
        'Premium Standard Room 104',
        120000,
        'Royal Suite',
        '2025-01-11 10:20:45.000000',
        0,
        1
    ),
    (
        5,
        4,
        3,
        85,
        4,
        '2025-01-12 13:15:22.000000',
        'Luxury King Room 105',
        210000,
        'King',
        '2025-01-13 09:44:32.000000',
        0,
        1
    ),
    (
        6,
        1,
        1,
        35,
        1,
        '2025-01-14 08:41:17.000000',
        'Elegant Standard Room 106',
        110000,
        'Deluxe',
        '2025-01-14 16:21:11.000000',
        0,
        1
    ),
    (
        7,
        2,
        1,
        50,
        2,
        '2025-01-15 10:28:49.000000',
        'Classic Deluxe Room 107',
        140000,
        'Vip',
        '2025-01-16 14:16:28.000000',
        0,
        1
    ),
    (
        8,
        3,
        2,
        90,
        3,
        '2025-01-17 09:54:05.000000',
        'Imperial Vip Suite 108',
        260000,
        'Standard',
        '2025-01-17 18:22:40.000000',
        0,
        1
    ),
    (
        9,
        1,
        1,
        32,
        1,
        '2025-01-18 07:45:16.000000',
        'Serenity Standard Room 109',
        100000,
        'Superior',
        '2025-01-18 19:11:55.000000',
        0,
        1
    ),
    (
        10,
        2,
        2,
        60,
        2,
        '2025-01-20 11:44:29.000000',
        'Prestige King Room 110',
        190000,
        'Presidential Suite',
        '2025-01-20 21:33:12.000000',
        0,
        1
    ),
    (
        11,
        3,
        2,
        95,
        3,
        '2025-01-21 10:29:56.000000',
        'Diamond Vip Room 201',
        280000,
        'Suite',
        '2025-11-27 10:19:40.725848',
        1,
        2
    ),
    (
        12,
        1,
        1,
        48,
        1,
        '2025-01-22 08:10:44.000000',
        'Elegant Deluxe Room 202',
        160000,
        'Premium Deluxe',
        '2025-11-27 10:19:55.688084',
        1,
        2
    ),
    (
        13,
        2,
        1,
        38,
        2,
        '2025-01-23 09:33:21.000000',
        'Premium Standard Room 203',
        115000,
        'Royal Suite',
        '2025-11-27 10:20:23.562124',
        0,
        2
    ),
    (
        14,
        4,
        3,
        100,
        4,
        '2025-01-24 12:41:36.000000',
        'Royal Vip Suite 204',
        300000,
        'Standard',
        '2025-11-27 10:20:01.552577',
        1,
        2
    ),
    (
        15,
        2,
        1,
        58,
        2,
        '2025-01-25 09:17:44.000000',
        'Modern King Room 205',
        175000,
        'Deluxe',
        '2025-01-25 18:44:33.000000',
        0,
        2
    ),
    (
        16,
        1,
        1,
        33,
        1,
        '2025-01-26 13:45:22.000000',
        'Cozy Standard Room 206',
        105000,
        'Single Room',
        '2025-11-27 09:34:54.106794',
        0,
        2
    ),
    (
        17,
        3,
        2,
        72,
        3,
        '2025-01-27 11:40:08.000000',
        'Luxury Deluxe Room 207',
        170000,
        'Standard',
        '2025-01-27 22:10:18.000000',
        0,
        2
    ),
    (
        18,
        2,
        2,
        88,
        2,
        '2025-01-28 10:15:19.000000',
        'Magnolia Vip Suite 208',
        255000,
        'Superior',
        '2025-11-27 10:20:47.869119',
        1,
        2
    ),
    (
        19,
        1,
        1,
        57,
        1,
        '2025-01-29 07:50:41.000000',
        'Premium King Room 209',
        185000,
        'Presidential Suite',
        '2025-11-27 09:35:28.881018',
        0,
        2
    ),
    (
        20,
        4,
        3,
        78,
        4,
        '2025-01-30 12:58:14.000000',
        'Imperial Deluxe Room 210',
        165000,
        'Executive Suite',
        '2025-11-27 09:35:44.315783',
        0,
        2
    ),
    (
        21,
        2,
        2,
        45,
        2,
        '2025-10-05 10:12:45.000000',
        'Deluxe Room 201',
        320000,
        'Presidential Suite',
        '2025-10-05 10:52:12.000000',
        0,
        2
    ),
    (
        22,
        1,
        1,
        35,
        1,
        '2025-10-06 09:33:21.000000',
        'Standard Room 202',
        180000,
        'Suite',
        '2025-11-27 10:20:30.898751',
        1,
        2
    ),
    (
        23,
        3,
        3,
        60,
        3,
        '2025-10-06 14:22:18.000000',
        'King Room 203',
        410000,
        'Premium Deluxe',
        '2025-10-06 15:40:01.000000',
        0,
        2
    ),
    (
        24,
        2,
        2,
        70,
        2,
        '2025-10-07 12:19:55.000000',
        'Vip Room 204',
        480000,
        'Royal Suite',
        '2025-10-07 13:52:30.000000',
        0,
        2
    ),
    (
        25,
        4,
        3,
        55,
        3,
        '2025-10-07 17:10:33.000000',
        'Deluxe Room 205',
        350000,
        'Suite',
        '2025-11-27 09:37:07.189982',
        0,
        2
    ),
    (
        26,
        2,
        2,
        40,
        2,
        '2025-10-08 08:44:12.000000',
        'Standard Room 206',
        200000,
        'Deluxe',
        '2025-10-08 09:21:42.000000',
        0,
        2
    ),
    (
        27,
        3,
        3,
        65,
        3,
        '2025-10-08 13:11:39.000000',
        'King Room 207',
        395000,
        'Royal Suite',
        '2025-11-27 09:38:39.434716',
        0,
        2
    ),
    (
        28,
        1,
        1,
        75,
        1,
        '2025-10-09 10:33:25.000000',
        'Vip Room 208',
        470000,
        'Standard',
        '2025-10-09 10:59:14.000000',
        0,
        2
    ),
    (
        29,
        2,
        2,
        50,
        2,
        '2025-10-09 16:12:08.000000',
        'Deluxe Room 209',
        330000,
        'Superior',
        '2025-10-09 17:33:19.000000',
        0,
        2
    ),
    (
        30,
        3,
        2,
        38,
        2,
        '2025-10-10 09:55:42.000000',
        'Standard Room 210',
        190000,
        'Presidential Suite',
        '2025-10-10 11:01:22.000000',
        0,
        2
    ),
    (
        31,
        4,
        3,
        70,
        4,
        '2025-10-10 13:30:59.000000',
        'King Room 211',
        420000,
        'Suite',
        '2025-10-10 14:42:55.000000',
        0,
        2
    ),
    (
        32,
        1,
        1,
        78,
        1,
        '2025-10-11 09:29:26.000000',
        'Vip Room 212',
        500000,
        'Premium Deluxe',
        '2025-10-11 10:15:48.000000',
        0,
        2
    ),
    (
        33,
        2,
        2,
        48,
        2,
        '2025-10-11 15:41:33.000000',
        'Deluxe Room 213',
        310000,
        'Royal Suite',
        '2025-10-11 16:52:05.000000',
        0,
        2
    ),
    (
        34,
        3,
        3,
        37,
        3,
        '2025-10-12 11:26:40.000000',
        'Standard Room 214',
        170000,
        'Deluxe',
        '2025-11-27 09:40:11.165408',
        0,
        2
    ),
    (
        35,
        2,
        2,
        62,
        2,
        '2025-10-12 17:03:22.000000',
        'King Room 215',
        405000,
        'Deluxe',
        '2025-10-12 18:17:11.000000',
        0,
        2
    ),
    (
        36,
        1,
        1,
        80,
        1,
        '2025-10-13 09:14:55.000000',
        'Vip Room 216',
        490000,
        'Single Room',
        '2025-11-27 09:40:41.070293',
        0,
        2
    ),
    (
        37,
        4,
        3,
        58,
        4,
        '2025-10-13 15:55:28.000000',
        'Deluxe Room 217',
        345000,
        'Standard',
        '2025-10-13 16:47:19.000000',
        0,
        2
    ),
    (
        38,
        2,
        2,
        36,
        2,
        '2025-10-14 08:40:12.000000',
        'Standard Room 218',
        160000,
        'Superior',
        '2025-10-14 09:23:14.000000',
        0,
        2
    ),
    (
        39,
        3,
        3,
        68,
        3,
        '2025-10-14 14:18:59.000000',
        'King Room 219',
        415000,
        'Presidential Suite',
        '2025-10-14 15:09:33.000000',
        0,
        2
    ),
    (
        40,
        1,
        1,
        82,
        1,
        '2025-10-15 09:53:47.000000',
        'Vip Room 220',
        510000,
        'Suite',
        '2025-10-15 10:48:26.000000',
        0,
        2
    ),
    (
        41,
        4,
        3,
        57,
        3,
        '2025-10-15 16:22:10.000000',
        'Deluxe Room 221',
        360000,
        'Premium Deluxe',
        '2025-10-15 17:35:44.000000',
        0,
        2
    ),
    (
        42,
        2,
        2,
        39,
        2,
        '2025-10-16 10:32:15.000000',
        'Standard Room 222',
        175000,
        'Royal Suite',
        '2025-10-16 11:28:19.000000',
        0,
        2
    ),
    (
        43,
        3,
        2,
        63,
        2,
        '2025-10-16 17:40:09.000000',
        'King Room 223',
        400000,
        'Superior',
        '2025-11-27 09:41:55.166058',
        0,
        2
    ),
    (
        44,
        1,
        1,
        77,
        1,
        '2025-10-17 08:29:44.000000',
        'Vip Room 224',
        495000,
        'Vip',
        '2025-10-17 09:14:37.000000',
        0,
        2
    ),
    (
        45,
        4,
        3,
        52,
        4,
        '2025-10-17 14:55:33.000000',
        'Deluxe Room 225',
        340000,
        'Deluxe',
        '2025-10-17 15:40:52.000000',
        0,
        2
    ),
    (
        46,
        2,
        2,
        45,
        2,
        '2025-10-04 09:12:15.000000',
        'Deluxe Room 301',
        55000,
        'Presidential Suite',
        '2025-10-04 10:15:22.000000',
        0,
        2
    ),
    (
        47,
        1,
        1,
        35,
        1,
        '2025-10-04 11:33:42.000000',
        'Standard Room 302',
        30000,
        'Suite',
        '2025-11-27 10:21:12.368068',
        1,
        2
    ),
    (
        48,
        3,
        3,
        60,
        3,
        '2025-10-05 08:44:22.000000',
        'King Room 303',
        62000,
        'Premium Deluxe',
        '2025-10-05 09:50:15.000000',
        0,
        2
    ),
    (
        49,
        2,
        2,
        70,
        2,
        '2025-10-05 14:12:08.000000',
        'Vip Room 304',
        64000,
        'Royal Suite',
        '2025-10-05 15:20:33.000000',
        0,
        2
    ),
    (
        50,
        4,
        3,
        55,
        3,
        '2025-10-06 09:05:44.000000',
        'Deluxe Room 305',
        60000,
        'King',
        '2025-10-06 09:50:21.000000',
        0,
        2
    ),
    (
        51,
        2,
        2,
        40,
        2,
        '2025-10-06 11:22:11.000000',
        'Standard Room 306',
        32000,
        'Deluxe',
        '2025-10-06 12:10:33.000000',
        0,
        2
    ),
    (
        52,
        3,
        3,
        65,
        3,
        '2025-10-07 08:55:44.000000',
        'King Room 307',
        63000,
        'Vip',
        '2025-10-07 09:42:12.000000',
        0,
        2
    ),
    (
        53,
        1,
        1,
        75,
        1,
        '2025-10-07 14:11:22.000000',
        'Vip Room 308',
        65000,
        'Standard',
        '2025-10-07 14:59:55.000000',
        0,
        2
    ),
    (
        54,
        2,
        2,
        50,
        2,
        '2025-10-08 09:33:12.000000',
        'Deluxe Room 309',
        58000,
        'Superior',
        '2025-10-08 10:20:41.000000',
        0,
        2
    ),
    (
        55,
        3,
        2,
        38,
        2,
        '2025-10-08 15:12:08.000000',
        'Standard Room 310',
        30000,
        'Presidential Suite',
        '2025-10-08 16:01:22.000000',
        0,
        2
    ),
    (
        56,
        4,
        3,
        70,
        4,
        '2025-10-09 08:44:55.000000',
        'King Room 311',
        62000,
        'Suite',
        '2025-10-09 09:42:55.000000',
        0,
        2
    ),
    (
        57,
        1,
        1,
        78,
        1,
        '2025-10-09 14:12:22.000000',
        'Vip Room 312',
        64500,
        'Premium Deluxe',
        '2025-10-09 15:11:33.000000',
        0,
        3
    ),
    (
        58,
        2,
        2,
        48,
        2,
        '2025-10-10 09:21:33.000000',
        'Deluxe Room 313',
        59000,
        'Royal Suite',
        '2025-10-10 10:15:05.000000',
        0,
        3
    ),
    (
        59,
        3,
        3,
        37,
        3,
        '2025-10-10 15:11:40.000000',
        'Standard Room 314',
        31000,
        'King',
        '2025-10-10 16:01:33.000000',
        0,
        3
    ),
    (
        60,
        2,
        2,
        62,
        2,
        '2025-10-11 08:44:22.000000',
        'King Room 315',
        61500,
        'Deluxe',
        '2025-10-11 09:42:12.000000',
        0,
        3
    ),
    (
        61,
        1,
        1,
        80,
        1,
        '2025-10-11 14:12:55.000000',
        'Vip Room 316',
        65000,
        'Vip',
        '2025-10-11 15:31:29.000000',
        0,
        3
    ),
    (
        62,
        4,
        3,
        58,
        4,
        '2025-10-12 08:55:28.000000',
        'Deluxe Room 317',
        60000,
        'Standard',
        '2025-10-12 09:47:19.000000',
        0,
        3
    ),
    (
        63,
        2,
        2,
        36,
        2,
        '2025-10-12 14:40:12.000000',
        'Standard Room 318',
        32000,
        'Superior',
        '2025-10-12 15:23:14.000000',
        0,
        3
    ),
    (
        64,
        2,
        2,
        45,
        2,
        '2025-10-05 09:10:15.000000',
        'Deluxe Room 401',
        300000,
        'Presidential Suite',
        '2025-10-05 10:12:22.000000',
        0,
        3
    ),
    (
        65,
        1,
        1,
        35,
        1,
        '2025-10-05 11:25:33.000000',
        'Standard Room 402',
        320000,
        'Suite',
        '2025-10-05 12:10:55.000000',
        0,
        3
    ),
    (
        66,
        3,
        3,
        60,
        3,
        '2025-10-06 08:44:22.000000',
        'King Room 403',
        340000,
        'Premium Deluxe',
        '2025-10-06 09:50:10.000000',
        0,
        3
    ),
    (
        67,
        2,
        2,
        70,
        2,
        '2025-10-06 14:12:08.000000',
        'Vip Room 404',
        345000,
        'Royal Suite',
        '2025-10-06 15:20:33.000000',
        0,
        3
    ),
    (
        68,
        4,
        3,
        55,
        3,
        '2025-10-07 09:05:44.000000',
        'Deluxe Room 405',
        330000,
        'King',
        '2025-10-07 09:50:21.000000',
        0,
        3
    ),
    (
        69,
        2,
        2,
        40,
        2,
        '2025-10-07 11:22:11.000000',
        'Standard Room 406',
        310000,
        'Deluxe',
        '2025-10-07 12:10:33.000000',
        0,
        3
    ),
    (
        70,
        3,
        3,
        65,
        3,
        '2025-10-08 08:55:44.000000',
        'King Room 407',
        335000,
        'Vip',
        '2025-10-08 09:42:12.000000',
        0,
        4
    ),
    (
        71,
        1,
        1,
        75,
        1,
        '2025-10-08 14:11:22.000000',
        'Vip Room 408',
        345000,
        'Standard',
        '2025-10-08 14:59:55.000000',
        0,
        4
    ),
    (
        72,
        2,
        2,
        50,
        2,
        '2025-10-09 09:33:12.000000',
        'Deluxe Room 409',
        320000,
        'Superior',
        '2025-10-09 10:20:41.000000',
        0,
        4
    ),
    (
        73,
        3,
        2,
        38,
        2,
        '2025-10-09 15:12:08.000000',
        'Standard Room 410',
        300000,
        'Presidential Suite',
        '2025-10-09 16:01:22.000000',
        0,
        4
    ),
    (
        74,
        4,
        3,
        70,
        4,
        '2025-10-10 08:44:55.000000',
        'King Room 411',
        340000,
        'Suite',
        '2025-10-10 09:42:55.000000',
        0,
        4
    ),
    (
        75,
        1,
        1,
        78,
        1,
        '2025-10-10 14:12:22.000000',
        'Vip Room 412',
        345000,
        'Premium Deluxe',
        '2025-10-10 15:11:33.000000',
        0,
        4
    ),
    (
        76,
        2,
        2,
        48,
        2,
        '2025-10-11 09:21:33.000000',
        'Deluxe Room 413',
        325000,
        'Royal Suite',
        '2025-10-11 10:15:05.000000',
        0,
        4
    ),
    (
        77,
        3,
        3,
        37,
        3,
        '2025-10-11 15:11:40.000000',
        'Standard Room 414',
        310000,
        'King',
        '2025-10-11 16:01:33.000000',
        0,
        4
    ),
    (
        78,
        2,
        2,
        62,
        2,
        '2025-10-12 08:44:22.000000',
        'King Room 415',
        335000,
        'Deluxe',
        '2025-10-12 09:42:12.000000',
        0,
        4
    ),
    (
        79,
        1,
        1,
        80,
        1,
        '2025-10-12 14:12:55.000000',
        'Vip Room 416',
        345000,
        'Vip',
        '2025-10-12 15:31:29.000000',
        0,
        4
    ),
    (
        80,
        4,
        3,
        58,
        4,
        '2025-10-13 08:55:28.000000',
        'Deluxe Room 417',
        330000,
        'Standard',
        '2025-10-13 09:47:19.000000',
        0,
        4
    ),
    (
        81,
        2,
        2,
        36,
        2,
        '2025-10-13 14:40:12.000000',
        'Standard Room 418',
        315000,
        'Superior',
        '2025-10-13 15:23:14.000000',
        0,
        4
    ),
    (
        82,
        3,
        3,
        68,
        3,
        '2025-10-14 09:33:12.000000',
        'King Room 419',
        340000,
        'Presidential Suite',
        '2025-10-14 10:20:41.000000',
        0,
        4
    ),
    (
        83,
        2,
        2,
        72,
        2,
        '2025-10-14 15:12:08.000000',
        'Vip Room 420',
        345000,
        'Suite',
        '2025-10-14 16:01:22.000000',
        0,
        4
    ),
    (
        84,
        1,
        1,
        50,
        1,
        '2025-10-15 08:44:55.000000',
        'Deluxe Room 421',
        320000,
        'Premium Deluxe',
        '2025-10-15 09:42:55.000000',
        0,
        4
    ),
    (
        85,
        2,
        2,
        40,
        2,
        '2025-10-15 14:12:22.000000',
        'Standard Room 422',
        300000,
        'Royal Suite',
        '2025-10-15 15:11:33.000000',
        0,
        4
    ),
    (
        86,
        2,
        2,
        45,
        2,
        '2025-10-07 09:10:15.000000',
        'Deluxe Room 501',
        300000,
        'Presidential Suite',
        '2025-10-07 10:12:22.000000',
        0,
        5
    ),
    (
        87,
        1,
        1,
        35,
        1,
        '2025-10-07 11:25:33.000000',
        'Standard Room 502',
        310000,
        'Presidential Suite',
        '2025-10-07 12:10:55.000000',
        0,
        5
    ),
    (
        88,
        3,
        3,
        60,
        3,
        '2025-10-08 08:44:22.000000',
        'King Room 503',
        320000,
        'Presidential Suite',
        '2025-10-08 09:50:10.000000',
        0,
        5
    ),
    (
        89,
        2,
        2,
        70,
        2,
        '2025-10-08 14:12:08.000000',
        'Vip Room 504',
        325000,
        'Royal Suite',
        '2025-10-08 15:20:33.000000',
        0,
        5
    ),
    (
        90,
        4,
        3,
        55,
        3,
        '2025-10-09 09:05:44.000000',
        'Deluxe Room 505',
        310000,
        'Royal Suite',
        '2025-10-09 09:50:21.000000',
        0,
        5
    ),
    (
        91,
        2,
        2,
        40,
        2,
        '2025-10-09 11:22:11.000000',
        'Standard Room 506',
        305000,
        'Royal Suite',
        '2025-10-09 12:10:33.000000',
        0,
        5
    ),
    (
        92,
        3,
        3,
        65,
        3,
        '2025-10-10 08:55:44.000000',
        'King Room 507',
        320000,
        'Suite',
        '2025-10-10 09:42:12.000000',
        0,
        5
    ),
    (
        93,
        1,
        1,
        75,
        1,
        '2025-10-10 14:11:22.000000',
        'Vip Room 508',
        325000,
        'Suite',
        '2025-10-10 14:59:55.000000',
        0,
        5
    ),
    (
        94,
        2,
        2,
        50,
        2,
        '2025-10-11 09:33:12.000000',
        'Deluxe Room 509',
        310000,
        'Suite',
        '2025-10-11 10:20:41.000000',
        0,
        5
    ),
    (
        95,
        3,
        2,
        38,
        2,
        '2025-10-11 15:12:08.000000',
        'Standard Room 510',
        300000,
        'Premium Deluxe',
        '2025-10-11 16:01:22.000000',
        0,
        5
    ),
    (
        96,
        4,
        3,
        70,
        4,
        '2025-10-12 08:44:55.000000',
        'King Room 511',
        320000,
        'Premium Deluxe',
        '2025-10-12 09:42:55.000000',
        0,
        5
    ),
    (
        97,
        1,
        1,
        78,
        1,
        '2025-10-12 14:12:22.000000',
        'Vip Room 512',
        325000,
        'Premium Deluxe',
        '2025-10-12 15:11:33.000000',
        0,
        5
    ),
    (
        98,
        2,
        2,
        48,
        2,
        '2025-10-13 09:21:33.000000',
        'Deluxe Room 513',
        310000,
        'Deluxe',
        '2025-10-13 10:15:05.000000',
        0,
        5
    ),
    (
        99,
        3,
        3,
        37,
        3,
        '2025-10-13 15:11:40.000000',
        'Standard Room 514',
        300000,
        'Deluxe',
        '2025-10-13 16:01:33.000000',
        0,
        5
    ),
    (
        100,
        2,
        2,
        62,
        2,
        '2025-10-14 08:44:22.000000',
        'King Room 515',
        320000,
        'Deluxe',
        '2025-10-14 09:42:12.000000',
        0,
        5
    ),
    (
        101,
        1,
        1,
        80,
        1,
        '2025-10-14 14:12:55.000000',
        'Vip Room 516',
        325000,
        'Deluxe',
        '2025-10-14 15:31:29.000000',
        0,
        5
    ),
    (
        102,
        4,
        3,
        58,
        4,
        '2025-10-15 08:55:28.000000',
        'Deluxe Room 517',
        310000,
        'King',
        '2025-10-15 09:47:19.000000',
        0,
        5
    ),
    (
        103,
        2,
        2,
        36,
        2,
        '2025-10-15 14:40:12.000000',
        'Standard Room 518',
        305000,
        'King',
        '2025-10-15 15:23:14.000000',
        0,
        5
    ),
    (
        104,
        3,
        3,
        68,
        3,
        '2025-10-16 09:33:12.000000',
        'King Room 519',
        320000,
        'King',
        '2025-10-16 10:20:41.000000',
        0,
        5
    ),
    (
        105,
        2,
        2,
        72,
        2,
        '2025-10-16 15:12:08.000000',
        'Vip Room 520',
        325000,
        'King',
        '2025-10-16 16:01:22.000000',
        0,
        6
    ),
    (
        106,
        1,
        1,
        50,
        1,
        '2025-10-17 08:44:55.000000',
        'Deluxe Room 521',
        310000,
        'Superior',
        '2025-10-17 09:42:55.000000',
        0,
        6
    ),
    (
        107,
        2,
        2,
        40,
        2,
        '2025-10-17 14:12:22.000000',
        'Standard Room 522',
        300000,
        'Superior',
        '2025-10-17 15:11:33.000000',
        0,
        6
    ),
    (
        108,
        3,
        3,
        60,
        3,
        '2025-10-18 09:21:33.000000',
        'King Room 523',
        320000,
        'Superior',
        '2025-10-18 10:15:05.000000',
        0,
        6
    ),
    (
        109,
        2,
        2,
        72,
        2,
        '2025-10-18 15:11:40.000000',
        'Vip Room 524',
        325000,
        'Vip',
        '2025-10-18 16:01:33.000000',
        0,
        6
    ),
    (
        110,
        1,
        1,
        45,
        1,
        '2025-10-19 08:44:22.000000',
        'Deluxe Room 525',
        310000,
        'Vip',
        '2025-10-19 09:42:12.000000',
        0,
        6
    ),
    (
        111,
        2,
        2,
        38,
        2,
        '2025-10-19 14:12:55.000000',
        'Standard Room 526',
        305000,
        'Vip',
        '2025-10-19 15:31:29.000000',
        0,
        6
    ),
    (
        112,
        3,
        3,
        65,
        3,
        '2025-10-20 08:55:28.000000',
        'King Room 527',
        320000,
        'Standard',
        '2025-10-20 09:47:19.000000',
        0,
        6
    ),
    (
        113,
        2,
        2,
        70,
        2,
        '2025-10-20 14:40:12.000000',
        'Vip Room 528',
        325000,
        'Standard',
        '2025-10-20 15:23:14.000000',
        0,
        6
    ),
    (
        114,
        2,
        2,
        45,
        2,
        '2025-10-07 12:30:10.000000',
        'Deluxe Room 601',
        300000,
        'Presidential Suite',
        '2025-10-07 13:22:15.000000',
        0,
        6
    ),
    (
        115,
        1,
        1,
        35,
        1,
        '2025-10-07 14:15:22.000000',
        'Standard Room 602',
        290000,
        'Royal Suite',
        '2025-10-07 15:10:33.000000',
        0,
        6
    ),
    (
        116,
        3,
        3,
        60,
        3,
        '2025-10-08 09:10:44.000000',
        'King Room 603',
        305000,
        'Suite',
        '2025-10-08 10:20:11.000000',
        0,
        6
    ),
    (
        117,
        2,
        2,
        70,
        2,
        '2025-10-08 11:45:33.000000',
        'Vip Room 604',
        308000,
        'Premium Deluxe',
        '2025-10-08 12:50:22.000000',
        0,
        6
    ),
    (
        118,
        4,
        3,
        55,
        3,
        '2025-10-08 14:22:11.000000',
        'Deluxe Room 605',
        300000,
        'Deluxe',
        '2025-10-08 15:10:44.000000',
        0,
        6
    ),
    (
        119,
        2,
        2,
        40,
        2,
        '2025-10-09 08:44:22.000000',
        'Standard Room 606',
        295000,
        'King',
        '2025-10-09 09:35:10.000000',
        0,
        6
    ),
    (
        120,
        3,
        3,
        65,
        3,
        '2025-10-09 11:22:33.000000',
        'King Room 607',
        305000,
        'Superior',
        '2025-10-09 12:15:22.000000',
        0,
        6
    ),
    (
        121,
        1,
        1,
        75,
        1,
        '2025-10-09 14:12:08.000000',
        'Vip Room 608',
        308000,
        'Vip',
        '2025-10-09 15:00:44.000000',
        0,
        6
    ),
    (
        122,
        2,
        2,
        50,
        2,
        '2025-10-10 08:55:22.000000',
        'Deluxe Room 609',
        300000,
        'Standard',
        '2025-10-10 09:42:33.000000',
        0,
        6
    ),
    (
        123,
        3,
        2,
        38,
        2,
        '2025-10-10 11:33:11.000000',
        'Standard Room 610',
        290000,
        'Presidential Suite',
        '2025-10-10 12:22:44.000000',
        0,
        6
    ),
    (
        124,
        4,
        3,
        70,
        4,
        '2025-10-10 14:40:22.000000',
        'King Room 611',
        305000,
        'Royal Suite',
        '2025-10-10 15:30:11.000000',
        0,
        6
    ),
    (
        125,
        1,
        1,
        78,
        1,
        '2025-10-11 08:44:55.000000',
        'Vip Room 612',
        308000,
        'Suite',
        '2025-10-11 09:42:22.000000',
        0,
        6
    ),
    (
        126,
        2,
        2,
        48,
        2,
        '2025-10-11 14:12:33.000000',
        'Deluxe Room 613',
        300000,
        'Premium Deluxe',
        '2025-10-11 15:11:44.000000',
        0,
        6
    ),
    (
        127,
        3,
        3,
        37,
        3,
        '2025-10-12 08:55:44.000000',
        'Standard Room 614',
        295000,
        'Deluxe',
        '2025-10-12 09:50:22.000000',
        0,
        6
    ),
    (
        128,
        2,
        2,
        62,
        2,
        '2025-10-12 14:40:12.000000',
        'King Room 615',
        305000,
        'Superior',
        '2025-10-12 15:20:33.000000',
        0,
        6
    ),
    (
        129,
        2,
        2,
        45,
        2,
        '2025-10-09 08:22:11.000000',
        'Presidential Suite 701',
        400000,
        'Presidential Suite',
        '2025-10-09 09:10:22.000000',
        0,
        7
    ),
    (
        130,
        1,
        1,
        38,
        1,
        '2025-10-09 10:11:33.000000',
        'Suite 702',
        390000,
        'Suite',
        '2025-10-09 11:05:44.000000',
        0,
        7
    ),
    (
        131,
        3,
        3,
        60,
        3,
        '2025-10-09 12:22:11.000000',
        'Premium Deluxe 703',
        410000,
        'Premium Deluxe',
        '2025-10-09 13:15:22.000000',
        0,
        7
    ),
    (
        132,
        2,
        2,
        55,
        2,
        '2025-10-09 14:33:22.000000',
        'Royal Suite 704',
        405000,
        'Royal Suite',
        '2025-10-09 15:20:33.000000',
        0,
        7
    ),
    (
        133,
        4,
        3,
        50,
        3,
        '2025-10-10 08:44:11.000000',
        'King 705',
        355000,
        'King',
        '2025-10-10 09:30:22.000000',
        0,
        7
    ),
    (
        134,
        2,
        2,
        42,
        2,
        '2025-10-10 10:50:44.000000',
        'Deluxe 706',
        350000,
        'Deluxe',
        '2025-10-10 11:40:33.000000',
        0,
        7
    ),
    (
        135,
        3,
        3,
        65,
        3,
        '2025-10-10 12:22:11.000000',
        'Vip 707',
        352000,
        'Vip',
        '2025-10-10 13:15:22.000000',
        0,
        7
    ),
    (
        136,
        1,
        1,
        75,
        1,
        '2025-10-10 14:11:33.000000',
        'Standard 708',
        340000,
        'Standard',
        '2025-10-10 15:00:44.000000',
        0,
        7
    ),
    (
        137,
        2,
        2,
        48,
        2,
        '2025-10-11 08:22:11.000000',
        'Superior 709',
        360000,
        'Superior',
        '2025-10-11 09:10:22.000000',
        0,
        7
    ),
    (
        138,
        3,
        2,
        40,
        2,
        '2025-10-11 10:33:22.000000',
        'Presidential Suite 710',
        400000,
        'Presidential Suite',
        '2025-10-11 11:25:33.000000',
        0,
        7
    ),
    (
        139,
        4,
        3,
        70,
        4,
        '2025-10-11 12:44:11.000000',
        'Suite 711',
        390000,
        'Suite',
        '2025-10-11 13:30:22.000000',
        0,
        7
    ),
    (
        140,
        1,
        1,
        78,
        1,
        '2025-10-11 14:22:33.000000',
        'Premium Deluxe 712',
        410000,
        'Premium Deluxe',
        '2025-10-11 15:10:44.000000',
        0,
        7
    ),
    (
        141,
        2,
        2,
        52,
        2,
        '2025-10-12 08:10:11.000000',
        'Royal Suite 713',
        405000,
        'Royal Suite',
        '2025-10-12 09:00:22.000000',
        0,
        7
    ),
    (
        142,
        3,
        3,
        39,
        3,
        '2025-10-12 10:11:33.000000',
        'King 714',
        355000,
        'King',
        '2025-10-12 11:05:44.000000',
        0,
        7
    ),
    (
        143,
        2,
        2,
        62,
        2,
        '2025-10-12 12:22:11.000000',
        'Deluxe 715',
        350000,
        'Deluxe',
        '2025-10-12 13:15:22.000000',
        0,
        7
    ),
    (
        144,
        1,
        1,
        77,
        1,
        '2025-10-12 14:33:22.000000',
        'Vip 716',
        352000,
        'Vip',
        '2025-10-12 15:20:33.000000',
        0,
        7
    ),
    (
        145,
        2,
        2,
        50,
        2,
        '2025-10-13 08:44:11.000000',
        'Standard 717',
        340000,
        'Standard',
        '2025-10-13 09:30:22.000000',
        0,
        7
    ),
    (
        146,
        3,
        3,
        41,
        3,
        '2025-10-13 10:50:44.000000',
        'Superior 718',
        360000,
        'Superior',
        '2025-10-13 11:40:33.000000',
        0,
        7
    ),
    (
        147,
        4,
        3,
        68,
        3,
        '2025-10-13 12:22:11.000000',
        'Presidential Suite 719',
        400000,
        'Presidential Suite',
        '2025-10-13 13:15:22.000000',
        0,
        7
    ),
    (
        148,
        2,
        2,
        56,
        2,
        '2025-10-13 14:11:33.000000',
        'Suite 720',
        390000,
        'Suite',
        '2025-10-13 15:00:44.000000',
        0,
        7
    ),
    (
        149,
        1,
        1,
        49,
        1,
        '2025-10-14 08:22:11.000000',
        'Premium Deluxe 721',
        410000,
        'Premium Deluxe',
        '2025-10-14 09:10:22.000000',
        0,
        7
    ),
    (
        150,
        2,
        2,
        42,
        2,
        '2025-10-14 10:33:22.000000',
        'Royal Suite 722',
        405000,
        'Royal Suite',
        '2025-10-14 11:25:33.000000',
        0,
        7
    ),
    (
        151,
        3,
        3,
        65,
        3,
        '2025-10-14 12:44:11.000000',
        'King 723',
        355000,
        'King',
        '2025-10-14 13:30:22.000000',
        0,
        7
    ),
    (
        152,
        2,
        2,
        58,
        2,
        '2025-10-14 14:22:33.000000',
        'Deluxe 724',
        350000,
        'Deluxe',
        '2025-10-14 15:10:44.000000',
        0,
        7
    ),
    (
        153,
        1,
        1,
        47,
        1,
        '2025-10-15 08:10:11.000000',
        'Vip 725',
        352000,
        'Vip',
        '2025-10-15 09:00:22.000000',
        0,
        8
    ),
    (
        154,
        2,
        2,
        40,
        2,
        '2025-10-15 10:11:33.000000',
        'Standard 726',
        340000,
        'Standard',
        '2025-10-15 11:05:44.000000',
        0,
        8
    ),
    (
        155,
        3,
        3,
        70,
        3,
        '2025-10-15 12:22:11.000000',
        'Superior 727',
        360000,
        'Superior',
        '2025-10-15 13:15:22.000000',
        0,
        8
    ),
    (
        156,
        4,
        3,
        75,
        4,
        '2025-10-15 14:33:22.000000',
        'Presidential Suite 728',
        400000,
        'Presidential Suite',
        '2025-10-15 15:20:33.000000',
        0,
        8
    ),
    (
        157,
        2,
        2,
        53,
        2,
        '2025-10-16 08:44:11.000000',
        'Suite 729',
        390000,
        'Suite',
        '2025-10-16 09:30:22.000000',
        0,
        8
    ),
    (
        158,
        3,
        3,
        41,
        3,
        '2025-10-16 10:50:44.000000',
        'Premium Deluxe 730',
        410000,
        'Premium Deluxe',
        '2025-10-16 11:40:33.000000',
        0,
        8
    ),
    (
        159,
        2,
        2,
        45,
        2,
        '2025-10-01 08:22:11.000000',
        'Presidential Suite 801',
        400000,
        'Presidential Suite',
        '2025-10-01 09:10:22.000000',
        0,
        8
    ),
    (
        160,
        1,
        1,
        38,
        1,
        '2025-10-01 10:11:33.000000',
        'Suite 802',
        390000,
        'Suite',
        '2025-10-01 11:05:44.000000',
        0,
        8
    ),
    (
        161,
        3,
        3,
        60,
        3,
        '2025-10-01 12:22:11.000000',
        'Premium Deluxe 803',
        410000,
        'Premium Deluxe',
        '2025-10-01 13:15:22.000000',
        0,
        8
    ),
    (
        162,
        2,
        2,
        55,
        2,
        '2025-10-01 14:33:22.000000',
        'Royal Suite 804',
        405000,
        'Royal Suite',
        '2025-10-01 15:20:33.000000',
        0,
        8
    ),
    (
        163,
        4,
        3,
        50,
        3,
        '2025-10-02 08:44:11.000000',
        'King 805',
        355000,
        'King',
        '2025-10-02 09:30:22.000000',
        0,
        8
    ),
    (
        164,
        2,
        2,
        42,
        2,
        '2025-10-02 10:50:44.000000',
        'Deluxe 806',
        350000,
        'Deluxe',
        '2025-10-02 11:40:33.000000',
        0,
        8
    ),
    (
        165,
        3,
        3,
        65,
        3,
        '2025-10-02 12:22:11.000000',
        'Vip 807',
        352000,
        'Vip',
        '2025-10-02 13:15:22.000000',
        0,
        8
    ),
    (
        166,
        1,
        1,
        75,
        1,
        '2025-10-02 14:11:33.000000',
        'Standard 808',
        340000,
        'Standard',
        '2025-10-02 15:00:44.000000',
        0,
        8
    ),
    (
        167,
        2,
        2,
        48,
        2,
        '2025-10-03 08:22:11.000000',
        'Superior 809',
        360000,
        'Superior',
        '2025-10-03 09:10:22.000000',
        0,
        8
    ),
    (
        168,
        3,
        2,
        40,
        2,
        '2025-10-03 10:33:22.000000',
        'Presidential Suite 810',
        400000,
        'Presidential Suite',
        '2025-10-03 11:25:33.000000',
        0,
        8
    ),
    (
        169,
        4,
        3,
        70,
        4,
        '2025-10-03 12:44:11.000000',
        'Suite 811',
        390000,
        'Suite',
        '2025-10-03 13:30:22.000000',
        0,
        8
    ),
    (
        170,
        1,
        1,
        78,
        1,
        '2025-10-03 14:22:33.000000',
        'Premium Deluxe 812',
        410000,
        'Premium Deluxe',
        '2025-10-03 15:10:44.000000',
        0,
        8
    ),
    (
        171,
        2,
        2,
        52,
        2,
        '2025-10-04 08:10:11.000000',
        'Royal Suite 813',
        405000,
        'Royal Suite',
        '2025-10-04 09:00:22.000000',
        0,
        8
    ),
    (
        172,
        3,
        3,
        39,
        3,
        '2025-10-04 10:11:33.000000',
        'King 814',
        355000,
        'King',
        '2025-10-04 11:05:44.000000',
        0,
        8
    ),
    (
        173,
        2,
        2,
        62,
        2,
        '2025-10-04 12:22:11.000000',
        'Deluxe 815',
        350000,
        'Deluxe',
        '2025-10-04 13:15:22.000000',
        0,
        8
    ),
    (
        174,
        1,
        1,
        77,
        1,
        '2025-10-04 14:33:22.000000',
        'Vip 816',
        352000,
        'Vip',
        '2025-10-04 15:20:33.000000',
        0,
        8
    ),
    (
        175,
        2,
        2,
        50,
        2,
        '2025-10-05 08:44:11.000000',
        'Standard 817',
        340000,
        'Standard',
        '2025-10-05 09:30:22.000000',
        0,
        8
    ),
    (
        176,
        2,
        2,
        48,
        2,
        '2025-10-02 17:00:11.000000',
        'Presidential Suite 901',
        400000,
        'Presidential Suite',
        '2025-10-02 17:50:22.000000',
        0,
        9
    ),
    (
        177,
        1,
        1,
        40,
        1,
        '2025-10-02 18:10:33.000000',
        'Suite 902',
        390000,
        'Suite',
        '2025-10-02 19:05:44.000000',
        0,
        9
    ),
    (
        178,
        3,
        3,
        60,
        3,
        '2025-10-02 20:22:11.000000',
        'Premium Deluxe 903',
        410000,
        'Premium Deluxe',
        '2025-10-02 21:15:22.000000',
        0,
        9
    ),
    (
        179,
        2,
        2,
        55,
        2,
        '2025-10-03 08:33:22.000000',
        'Royal Suite 904',
        405000,
        'Royal Suite',
        '2025-10-03 09:20:33.000000',
        0,
        9
    ),
    (
        180,
        4,
        3,
        50,
        3,
        '2025-10-03 10:44:11.000000',
        'King 905',
        355000,
        'King',
        '2025-10-03 11:30:22.000000',
        0,
        9
    ),
    (
        181,
        2,
        2,
        42,
        2,
        '2025-10-03 12:50:44.000000',
        'Deluxe 906',
        350000,
        'Deluxe',
        '2025-10-03 13:40:33.000000',
        0,
        9
    ),
    (
        182,
        3,
        3,
        65,
        3,
        '2025-10-03 14:22:11.000000',
        'Vip 907',
        352000,
        'Vip',
        '2025-10-03 15:15:22.000000',
        0,
        9
    ),
    (
        183,
        1,
        1,
        75,
        1,
        '2025-10-03 16:11:33.000000',
        'Standard 908',
        340000,
        'Standard',
        '2025-10-03 17:00:44.000000',
        0,
        9
    ),
    (
        184,
        2,
        2,
        48,
        2,
        '2025-10-04 08:22:11.000000',
        'Superior 909',
        360000,
        'Superior',
        '2025-10-04 09:10:22.000000',
        0,
        9
    ),
    (
        185,
        3,
        2,
        40,
        2,
        '2025-10-04 10:33:22.000000',
        'Presidential Suite 910',
        400000,
        'Presidential Suite',
        '2025-10-04 11:25:33.000000',
        0,
        9
    ),
    (
        186,
        4,
        3,
        70,
        4,
        '2025-10-04 12:44:11.000000',
        'Suite 911',
        390000,
        'Suite',
        '2025-10-04 13:30:22.000000',
        0,
        9
    ),
    (
        187,
        1,
        1,
        78,
        1,
        '2025-10-04 14:22:33.000000',
        'Premium Deluxe 912',
        410000,
        'Premium Deluxe',
        '2025-10-04 15:10:44.000000',
        0,
        9
    ),
    (
        188,
        2,
        2,
        52,
        2,
        '2025-10-05 08:10:11.000000',
        'Royal Suite 913',
        405000,
        'Royal Suite',
        '2025-10-05 09:00:22.000000',
        0,
        9
    ),
    (
        189,
        3,
        3,
        39,
        3,
        '2025-10-05 10:11:33.000000',
        'King 914',
        355000,
        'King',
        '2025-10-05 11:05:44.000000',
        0,
        9
    ),
    (
        190,
        2,
        2,
        62,
        2,
        '2025-10-05 12:22:11.000000',
        'Deluxe 915',
        350000,
        'Deluxe',
        '2025-10-05 13:15:22.000000',
        0,
        9
    ),
    (
        191,
        1,
        1,
        77,
        1,
        '2025-10-05 14:33:22.000000',
        'Vip 916',
        352000,
        'Vip',
        '2025-10-05 15:20:33.000000',
        0,
        9
    ),
    (
        192,
        2,
        2,
        50,
        2,
        '2025-10-06 08:44:11.000000',
        'Standard 917',
        340000,
        'Standard',
        '2025-10-06 09:30:22.000000',
        0,
        9
    ),
    (
        193,
        3,
        3,
        42,
        3,
        '2025-10-06 10:50:44.000000',
        'Superior 918',
        360000,
        'Superior',
        '2025-10-06 11:40:33.000000',
        0,
        9
    ),
    (
        194,
        2,
        2,
        62,
        2,
        '2025-10-06 12:22:11.000000',
        'Presidential Suite 919',
        400000,
        'Presidential Suite',
        '2025-10-06 13:15:22.000000',
        0,
        9
    ),
    (
        195,
        1,
        1,
        78,
        1,
        '2025-10-06 14:33:22.000000',
        'Suite 920',
        390000,
        'Suite',
        '2025-10-06 15:20:33.000000',
        0,
        9
    ),
    (
        196,
        2,
        2,
        50,
        2,
        '2025-10-07 08:44:11.000000',
        'Premium Deluxe 921',
        410000,
        'Premium Deluxe',
        '2025-10-07 09:30:22.000000',
        0,
        9
    ),
    (
        197,
        3,
        3,
        42,
        3,
        '2025-10-07 10:50:44.000000',
        'Royal Suite 922',
        405000,
        'Royal Suite',
        '2025-10-07 11:40:33.000000',
        0,
        9
    ),
    (
        198,
        2,
        2,
        62,
        2,
        '2025-10-07 12:22:11.000000',
        'King 923',
        355000,
        'King',
        '2025-10-07 13:15:22.000000',
        0,
        9
    ),
    (
        199,
        1,
        1,
        77,
        1,
        '2025-10-07 14:33:22.000000',
        'Deluxe 924',
        350000,
        'Deluxe',
        '2025-10-07 15:20:33.000000',
        0,
        9
    ),
    (
        200,
        2,
        2,
        50,
        2,
        '2025-10-08 08:44:11.000000',
        'Vip 925',
        352000,
        'Vip',
        '2025-10-08 09:30:22.000000',
        0,
        9
    ),
    (
        201,
        3,
        3,
        42,
        3,
        '2025-10-08 10:50:44.000000',
        'Standard 926',
        340000,
        'Standard',
        '2025-10-08 11:40:33.000000',
        0,
        9
    ),
    (
        202,
        2,
        2,
        62,
        2,
        '2025-10-08 12:22:11.000000',
        'Superior 927',
        360000,
        'Superior',
        '2025-10-08 13:15:22.000000',
        0,
        9
    ),
    (
        203,
        2,
        1,
        55,
        2,
        '2025-10-03 16:00:11.000000',
        'Presidential Suite 1001',
        400000,
        'Presidential Suite',
        '2025-10-03 16:50:22.000000',
        0,
        10
    ),
    (
        204,
        1,
        2,
        42,
        1,
        '2025-10-03 17:10:33.000000',
        'Suite 1002',
        390000,
        'Suite',
        '2025-10-03 18:05:44.000000',
        0,
        10
    ),
    (
        205,
        3,
        3,
        65,
        3,
        '2025-10-03 19:22:11.000000',
        'Premium Deluxe 1003',
        410000,
        'Premium Deluxe',
        '2025-10-03 20:15:22.000000',
        0,
        10
    ),
    (
        206,
        2,
        4,
        60,
        2,
        '2025-10-04 08:33:22.000000',
        'Royal Suite 1004',
        405000,
        'Royal Suite',
        '2025-10-04 09:20:33.000000',
        0,
        10
    ),
    (
        207,
        4,
        5,
        50,
        3,
        '2025-10-04 10:44:11.000000',
        'King 1005',
        355000,
        'King',
        '2025-10-04 11:30:22.000000',
        0,
        10
    ),
    (
        208,
        2,
        6,
        45,
        2,
        '2025-10-04 12:50:44.000000',
        'Deluxe 1006',
        350000,
        'Deluxe',
        '2025-10-04 13:40:33.000000',
        0,
        10
    ),
    (
        209,
        3,
        7,
        70,
        3,
        '2025-10-04 14:22:11.000000',
        'Vip 1007',
        352000,
        'Vip',
        '2025-10-04 15:15:22.000000',
        0,
        10
    ),
    (
        210,
        1,
        8,
        75,
        1,
        '2025-10-04 16:11:33.000000',
        'Standard 1008',
        340000,
        'Standard',
        '2025-10-04 17:00:44.000000',
        0,
        10
    ),
    (
        211,
        2,
        9,
        52,
        2,
        '2025-10-05 08:22:11.000000',
        'Superior 1009',
        360000,
        'Superior',
        '2025-10-05 09:10:22.000000',
        0,
        10
    ),
    (
        212,
        3,
        1,
        48,
        2,
        '2025-10-05 10:33:22.000000',
        'Presidential Suite 1010',
        400000,
        'Presidential Suite',
        '2025-10-05 11:25:33.000000',
        0,
        10
    ),
    (
        213,
        4,
        2,
        80,
        4,
        '2025-10-05 12:44:11.000000',
        'Suite 1011',
        390000,
        'Suite',
        '2025-10-05 13:30:22.000000',
        0,
        10
    ),
    (
        214,
        1,
        3,
        70,
        1,
        '2025-10-05 14:22:33.000000',
        'Premium Deluxe 1012',
        410000,
        'Premium Deluxe',
        '2025-10-05 15:10:44.000000',
        0,
        10
    ),
    (
        215,
        2,
        4,
        55,
        2,
        '2025-10-06 08:10:11.000000',
        'Royal Suite 1013',
        405000,
        'Royal Suite',
        '2025-10-06 09:00:22.000000',
        0,
        10
    ),
    (
        216,
        3,
        5,
        48,
        3,
        '2025-10-06 10:11:33.000000',
        'King 1014',
        355000,
        'King',
        '2025-10-06 11:05:44.000000',
        0,
        10
    ),
    (
        217,
        2,
        6,
        65,
        2,
        '2025-10-06 12:22:11.000000',
        'Deluxe 1015',
        350000,
        'Deluxe',
        '2025-10-06 13:15:22.000000',
        0,
        10
    ),
    (
        218,
        1,
        7,
        72,
        1,
        '2025-10-06 14:33:22.000000',
        'Vip 1016',
        352000,
        'Vip',
        '2025-10-06 15:20:33.000000',
        0,
        10
    ),
    (
        219,
        2,
        8,
        60,
        2,
        '2025-10-07 08:44:11.000000',
        'Standard 1017',
        340000,
        'Standard',
        '2025-10-07 09:30:22.000000',
        0,
        10
    ),
    (
        220,
        3,
        9,
        50,
        3,
        '2025-10-07 10:50:44.000000',
        'Superior 1018',
        360000,
        'Superior',
        '2025-10-07 11:40:33.000000',
        0,
        10
    ),
    (
        221,
        2,
        1,
        68,
        2,
        '2025-10-07 12:22:11.000000',
        'Presidential Suite 1019',
        400000,
        'Presidential Suite',
        '2025-10-07 13:15:22.000000',
        0,
        10
    ),
    (
        222,
        1,
        2,
        75,
        1,
        '2025-10-07 14:33:22.000000',
        'Suite 1020',
        390000,
        'Suite',
        '2025-10-07 15:20:33.000000',
        0,
        10
    ),
    (
        223,
        2,
        3,
        55,
        2,
        '2025-10-08 08:44:11.000000',
        'Premium Deluxe 1021',
        410000,
        'Premium Deluxe',
        '2025-10-08 09:30:22.000000',
        0,
        10
    ),
    (
        224,
        2,
        2,
        50,
        2,
        '2025-10-04 09:00:11.000000',
        'Deluxe Room 1101',
        300000,
        'Deluxe',
        '2025-10-04 10:00:22.000000',
        0,
        11
    ),
    (
        225,
        1,
        1,
        42,
        1,
        '2025-10-04 10:22:33.000000',
        'Standard Room 1102',
        290000,
        'Standard',
        '2025-10-04 11:15:44.000000',
        0,
        11
    ),
    (
        226,
        3,
        3,
        60,
        2,
        '2025-10-04 11:44:11.000000',
        'King Room 1103',
        305000,
        'King',
        '2025-10-04 12:30:22.000000',
        0,
        11
    ),
    (
        227,
        2,
        2,
        55,
        2,
        '2025-10-04 13:10:22.000000',
        'Vip Room 1104',
        300000,
        'Premium Deluxe',
        '2025-10-04 14:05:33.000000',
        0,
        11
    ),
    (
        228,
        1,
        1,
        52,
        1,
        '2025-10-04 14:22:11.000000',
        'Deluxe Room 1105',
        300000,
        'Deluxe',
        '2025-10-04 15:10:22.000000',
        0,
        11
    ),
    (
        229,
        3,
        3,
        48,
        3,
        '2025-10-04 15:33:44.000000',
        'Standard Room 1106',
        290000,
        'Standard',
        '2025-10-04 16:20:33.000000',
        0,
        11
    ),
    (
        230,
        2,
        2,
        65,
        2,
        '2025-10-04 16:44:11.000000',
        'King Room 1107',
        305000,
        'King',
        '2025-10-04 17:30:22.000000',
        0,
        11
    ),
    (
        231,
        1,
        1,
        70,
        1,
        '2025-10-04 17:50:22.000000',
        'Vip Room 1108',
        300000,
        'Vip',
        '2025-10-04 18:40:33.000000',
        0,
        11
    ),
    (
        232,
        2,
        2,
        55,
        2,
        '2025-10-05 08:10:11.000000',
        'Deluxe Room 1109',
        300000,
        'Deluxe',
        '2025-10-05 09:00:22.000000',
        0,
        11
    ),
    (
        233,
        3,
        2,
        50,
        2,
        '2025-10-05 09:22:33.000000',
        'Standard Room 1110',
        290000,
        'Standard',
        '2025-10-05 10:15:44.000000',
        0,
        11
    ),
    (
        234,
        2,
        3,
        60,
        3,
        '2025-10-05 10:44:11.000000',
        'King Room 1111',
        305000,
        'Royal Suite',
        '2025-10-05 11:30:22.000000',
        0,
        11
    ),
    (
        235,
        1,
        1,
        55,
        1,
        '2025-10-05 11:50:22.000000',
        'Vip Room 1112',
        300000,
        'Vip',
        '2025-10-05 12:40:33.000000',
        0,
        11
    ),
    (
        236,
        2,
        2,
        55,
        2,
        '2025-10-04 10:00:11.000000',
        'Deluxe Room 1201',
        320000,
        'Deluxe',
        '2025-10-04 11:00:22.000000',
        0,
        11
    ),
    (
        237,
        1,
        1,
        48,
        1,
        '2025-10-04 11:15:33.000000',
        'Standard Room 1202',
        310000,
        'Standard',
        '2025-10-04 12:10:44.000000',
        0,
        11
    ),
    (
        238,
        3,
        3,
        60,
        2,
        '2025-10-04 12:30:11.000000',
        'King Room 1203',
        330000,
        'King',
        '2025-10-04 13:20:22.000000',
        0,
        11
    ),
    (
        239,
        2,
        2,
        65,
        2,
        '2025-10-04 13:40:11.000000',
        'Vip Room 1204',
        325000,
        'Presidential Suite',
        '2025-10-04 14:30:22.000000',
        0,
        11
    ),
    (
        240,
        1,
        1,
        52,
        1,
        '2025-10-04 14:50:33.000000',
        'Deluxe Room 1205',
        320000,
        'Deluxe',
        '2025-10-04 15:40:44.000000',
        0,
        11
    ),
    (
        241,
        3,
        3,
        58,
        3,
        '2025-10-04 15:55:11.000000',
        'Standard Room 1206',
        310000,
        'Standard',
        '2025-10-04 16:50:22.000000',
        0,
        11
    ),
    (
        242,
        2,
        2,
        62,
        2,
        '2025-10-04 17:05:33.000000',
        'King Room 1207',
        330000,
        'King',
        '2025-10-04 18:00:44.000000',
        0,
        11
    ),
    (
        243,
        1,
        1,
        50,
        1,
        '2025-10-04 18:10:11.000000',
        'Vip Room 1208',
        325000,
        'Suite',
        '2025-10-04 19:00:22.000000',
        0,
        11
    ),
    (
        244,
        2,
        2,
        55,
        2,
        '2025-10-05 08:10:11.000000',
        'Deluxe Room 1209',
        320000,
        'Deluxe',
        '2025-10-05 09:00:22.000000',
        0,
        12
    ),
    (
        245,
        3,
        2,
        50,
        2,
        '2025-10-05 09:22:33.000000',
        'Standard Room 1210',
        310000,
        'Standard',
        '2025-10-05 10:15:44.000000',
        0,
        12
    ),
    (
        246,
        2,
        3,
        60,
        3,
        '2025-10-05 10:44:11.000000',
        'King Room 1211',
        330000,
        'King',
        '2025-10-05 11:30:22.000000',
        0,
        12
    ),
    (
        247,
        1,
        1,
        55,
        1,
        '2025-10-05 11:50:22.000000',
        'Vip Room 1212',
        325000,
        'Vip',
        '2025-10-05 12:40:33.000000',
        0,
        12
    ),
    (
        248,
        2,
        2,
        60,
        2,
        '2025-10-05 12:50:11.000000',
        'Deluxe Room 1213',
        320000,
        'Deluxe',
        '2025-10-05 13:40:22.000000',
        0,
        12
    ),
    (
        249,
        1,
        1,
        48,
        2,
        '2025-10-05 13:50:33.000000',
        'Standard Room 1214',
        310000,
        'Standard',
        '2025-10-05 14:40:44.000000',
        0,
        12
    ),
    (
        250,
        3,
        3,
        65,
        3,
        '2025-10-05 14:50:11.000000',
        'King Room 1215',
        330000,
        'King',
        '2025-10-05 15:30:22.000000',
        0,
        12
    ),
    (
        251,
        2,
        2,
        70,
        2,
        '2025-10-05 15:40:11.000000',
        'Vip Room 1216',
        325000,
        'Vip',
        '2025-10-05 16:30:22.000000',
        0,
        12
    ),
    (
        252,
        1,
        1,
        55,
        1,
        '2025-10-05 16:40:11.000000',
        'Deluxe Room 1217',
        320000,
        'Deluxe',
        '2025-10-05 17:30:22.000000',
        0,
        12
    ),
    (
        253,
        2,
        2,
        52,
        2,
        '2025-10-05 17:40:11.000000',
        'Standard Room 1218',
        310000,
        'Standard',
        '2025-10-05 18:30:22.000000',
        0,
        12
    ),
    (
        254,
        3,
        3,
        60,
        2,
        '2025-10-06 08:10:11.000000',
        'King Room 1219',
        330000,
        'King',
        '2025-10-06 09:00:22.000000',
        0,
        12
    ),
    (
        255,
        2,
        2,
        58,
        3,
        '2025-10-06 09:10:11.000000',
        'Vip Room 1220',
        325000,
        'Vip',
        '2025-10-06 10:00:22.000000',
        0,
        12
    ),
    (
        256,
        1,
        1,
        50,
        1,
        '2025-10-06 10:10:11.000000',
        'Deluxe Room 1221',
        320000,
        'Deluxe',
        '2025-10-06 11:00:22.000000',
        0,
        12
    ),
    (
        257,
        2,
        2,
        48,
        2,
        '2025-10-06 11:10:11.000000',
        'Standard Room 1222',
        310000,
        'Standard',
        '2025-10-06 12:00:22.000000',
        0,
        12
    ),
    (
        258,
        3,
        3,
        65,
        2,
        '2025-10-06 12:10:11.000000',
        'King Room 1223',
        330000,
        'King',
        '2025-10-06 13:00:22.000000',
        0,
        12
    ),
    (
        259,
        2,
        2,
        60,
        2,
        '2025-10-06 13:10:11.000000',
        'Vip Room 1224',
        325000,
        'Vip',
        '2025-10-06 14:00:22.000000',
        0,
        12
    ),
    (
        260,
        1,
        1,
        55,
        1,
        '2025-10-06 14:10:11.000000',
        'Deluxe Room 1225',
        320000,
        'Deluxe',
        '2025-10-06 15:00:22.000000',
        0,
        12
    ),
    (
        261,
        2,
        2,
        60,
        3,
        '2025-10-06 15:10:11.000000',
        'Standard Room 1226',
        310000,
        'Standard',
        '2025-10-06 16:00:22.000000',
        0,
        12
    ),
    (
        262,
        2,
        2,
        55,
        2,
        '2025-10-05 12:00:11.000000',
        'Deluxe Room 1301',
        420000,
        'Deluxe',
        '2025-10-05 13:00:22.000000',
        0,
        12
    ),
    (
        263,
        1,
        1,
        48,
        1,
        '2025-10-05 13:15:33.000000',
        'Standard Room 1302',
        400000,
        'Standard',
        '2025-10-05 14:10:44.000000',
        0,
        12
    ),
    (
        264,
        3,
        3,
        60,
        2,
        '2025-10-05 14:30:11.000000',
        'King Room 1303',
        430000,
        'King',
        '2025-10-05 15:20:22.000000',
        0,
        12
    ),
    (
        265,
        2,
        2,
        65,
        2,
        '2025-10-05 15:40:11.000000',
        'Vip Room 1304',
        425000,
        'Standard',
        '2025-10-05 16:30:22.000000',
        0,
        12
    ),
    (
        266,
        1,
        1,
        52,
        1,
        '2025-10-05 16:50:33.000000',
        'Deluxe Room 1305',
        420000,
        'Deluxe',
        '2025-10-05 17:40:44.000000',
        0,
        12
    ),
    (
        267,
        3,
        3,
        58,
        3,
        '2025-10-05 17:55:11.000000',
        'Standard Room 1306',
        400000,
        'Standard',
        '2025-10-05 18:50:22.000000',
        0,
        12
    ),
    (
        268,
        2,
        2,
        62,
        2,
        '2025-10-05 19:05:33.000000',
        'King Room 1307',
        430000,
        'King',
        '2025-10-05 20:00:44.000000',
        0,
        12
    ),
    (
        269,
        1,
        1,
        50,
        1,
        '2025-10-05 20:10:11.000000',
        'Vip Room 1308',
        425000,
        'Suite',
        '2025-10-05 21:00:22.000000',
        0,
        12
    ),
    (
        270,
        2,
        2,
        55,
        2,
        '2025-10-06 08:10:11.000000',
        'Deluxe Room 1309',
        420000,
        'Deluxe',
        '2025-10-06 09:00:22.000000',
        0,
        13
    ),
    (
        271,
        3,
        2,
        50,
        2,
        '2025-10-06 09:22:33.000000',
        'Standard Room 1310',
        400000,
        'Standard',
        '2025-10-06 10:15:44.000000',
        0,
        13
    ),
    (
        272,
        2,
        3,
        60,
        3,
        '2025-10-06 10:44:11.000000',
        'King Room 1311',
        430000,
        'King',
        '2025-10-06 11:30:22.000000',
        0,
        13
    ),
    (
        273,
        1,
        1,
        55,
        1,
        '2025-10-06 11:50:22.000000',
        'Vip Room 1312',
        425000,
        'Vip',
        '2025-10-06 12:40:33.000000',
        0,
        13
    ),
    (
        274,
        2,
        2,
        60,
        2,
        '2025-10-06 12:50:11.000000',
        'Deluxe Room 1313',
        420000,
        'Deluxe',
        '2025-10-06 13:40:22.000000',
        0,
        13
    ),
    (
        275,
        1,
        1,
        48,
        2,
        '2025-10-06 13:50:33.000000',
        'Standard Room 1314',
        400000,
        'Standard',
        '2025-10-06 14:40:44.000000',
        0,
        13
    ),
    (
        276,
        3,
        3,
        65,
        3,
        '2025-10-06 14:50:11.000000',
        'King Room 1315',
        430000,
        'King',
        '2025-10-06 15:30:22.000000',
        0,
        13
    ),
    (
        277,
        2,
        2,
        70,
        2,
        '2025-10-06 15:40:11.000000',
        'Vip Room 1316',
        425000,
        'Vip',
        '2025-10-06 16:30:22.000000',
        0,
        13
    ),
    (
        278,
        1,
        1,
        55,
        1,
        '2025-10-06 16:40:11.000000',
        'Deluxe Room 1317',
        420000,
        'Deluxe',
        '2025-10-06 17:30:22.000000',
        0,
        13
    ),
    (
        279,
        2,
        2,
        52,
        2,
        '2025-10-06 17:40:11.000000',
        'Standard Room 1318',
        400000,
        'Standard',
        '2025-10-06 18:30:22.000000',
        0,
        13
    ),
    (
        280,
        3,
        3,
        60,
        2,
        '2025-10-06 18:40:11.000000',
        'King Room 1319',
        430000,
        'King',
        '2025-10-06 19:30:22.000000',
        0,
        13
    ),
    (
        281,
        2,
        2,
        58,
        3,
        '2025-10-06 19:40:11.000000',
        'Vip Room 1320',
        425000,
        'Vip',
        '2025-10-06 20:30:22.000000',
        0,
        13
    ),
    (
        282,
        1,
        1,
        50,
        1,
        '2025-10-06 20:40:11.000000',
        'Deluxe Room 1321',
        420000,
        'Deluxe',
        '2025-10-06 21:30:22.000000',
        0,
        13
    ),
    (
        283,
        2,
        2,
        48,
        2,
        '2025-10-06 21:40:11.000000',
        'Standard Room 1322',
        400000,
        'Standard',
        '2025-10-06 22:30:22.000000',
        0,
        13
    ),
    (
        284,
        3,
        3,
        65,
        2,
        '2025-10-07 08:10:11.000000',
        'King Room 1323',
        430000,
        'King',
        '2025-10-07 09:00:22.000000',
        0,
        13
    ),
    (
        285,
        2,
        2,
        60,
        2,
        '2025-10-07 09:10:11.000000',
        'Vip Room 1324',
        425000,
        'Vip',
        '2025-10-07 10:00:22.000000',
        0,
        13
    ),
    (
        286,
        1,
        1,
        55,
        1,
        '2025-10-07 10:10:11.000000',
        'Deluxe Room 1325',
        420000,
        'Deluxe',
        '2025-10-07 11:00:22.000000',
        0,
        13
    ),
    (
        287,
        2,
        2,
        60,
        3,
        '2025-10-07 11:10:11.000000',
        'Standard Room 1326',
        400000,
        'Standard',
        '2025-10-07 12:00:22.000000',
        0,
        13
    ),
    (
        288,
        3,
        3,
        65,
        2,
        '2025-10-07 12:10:11.000000',
        'King Room 1327',
        430000,
        'King',
        '2025-10-07 13:00:22.000000',
        0,
        13
    ),
    (
        289,
        2,
        2,
        60,
        2,
        '2025-10-07 13:10:11.000000',
        'Vip Room 1328',
        425000,
        'Vip',
        '2025-10-07 14:00:22.000000',
        0,
        13
    ),
    (
        290,
        1,
        1,
        55,
        1,
        '2025-10-07 14:10:11.000000',
        'Deluxe Room 1329',
        420000,
        'Deluxe',
        '2025-10-07 15:00:22.000000',
        0,
        13
    ),
    (
        291,
        2,
        2,
        60,
        3,
        '2025-10-07 15:10:11.000000',
        'Standard Room 1330',
        400000,
        'Standard',
        '2025-10-07 16:00:22.000000',
        0,
        13
    ),
    (
        292,
        2,
        2,
        55,
        2,
        '2025-10-06 10:15:11.000000',
        'Deluxe Room 1401',
        290000,
        'Deluxe',
        '2025-10-06 11:00:22.000000',
        0,
        14
    ),
    (
        293,
        1,
        1,
        48,
        1,
        '2025-10-06 11:10:33.000000',
        'Standard Room 1402',
        280000,
        'Standard',
        '2025-10-06 12:00:44.000000',
        0,
        14
    ),
    (
        294,
        3,
        3,
        60,
        2,
        '2025-10-06 12:15:11.000000',
        'King Room 1403',
        295000,
        'King',
        '2025-10-06 13:00:22.000000',
        0,
        14
    ),
    (
        295,
        2,
        2,
        65,
        2,
        '2025-10-06 13:15:11.000000',
        'Vip Room 1404',
        292000,
        'Vip',
        '2025-10-06 14:00:22.000000',
        0,
        14
    ),
    (
        296,
        1,
        1,
        52,
        1,
        '2025-10-06 14:15:33.000000',
        'Deluxe Room 1405',
        290000,
        'Deluxe',
        '2025-10-06 15:00:44.000000',
        0,
        14
    ),
    (
        297,
        3,
        3,
        58,
        3,
        '2025-10-06 15:15:11.000000',
        'Standard Room 1406',
        280000,
        'Standard',
        '2025-10-06 16:00:22.000000',
        0,
        14
    ),
    (
        298,
        2,
        2,
        62,
        2,
        '2025-10-06 16:15:11.000000',
        'King Room 1407',
        295000,
        'King',
        '2025-10-06 17:00:22.000000',
        0,
        14
    ),
    (
        299,
        1,
        1,
        50,
        1,
        '2025-10-06 17:15:11.000000',
        'Vip Room 1408',
        292000,
        'Vip',
        '2025-10-06 18:00:22.000000',
        0,
        14
    ),
    (
        300,
        2,
        2,
        55,
        2,
        '2025-10-06 18:15:11.000000',
        'Deluxe Room 1409',
        290000,
        'Deluxe',
        '2025-10-06 19:00:22.000000',
        0,
        14
    ),
    (
        301,
        3,
        2,
        50,
        2,
        '2025-10-06 19:15:11.000000',
        'Standard Room 1410',
        280000,
        'Standard',
        '2025-10-06 20:00:22.000000',
        0,
        14
    ),
    (
        302,
        2,
        3,
        60,
        3,
        '2025-10-06 20:15:11.000000',
        'King Room 1411',
        295000,
        'King',
        '2025-10-06 21:00:22.000000',
        0,
        14
    ),
    (
        303,
        1,
        1,
        55,
        1,
        '2025-10-06 21:15:11.000000',
        'Vip Room 1412',
        292000,
        'Vip',
        '2025-10-06 22:00:22.000000',
        0,
        14
    ),
    (
        304,
        2,
        2,
        60,
        2,
        '2025-10-07 08:10:11.000000',
        'Deluxe Room 1413',
        290000,
        'Deluxe',
        '2025-10-07 09:00:22.000000',
        0,
        14
    ),
    (
        305,
        1,
        1,
        48,
        2,
        '2025-10-07 09:10:11.000000',
        'Standard Room 1414',
        280000,
        'Standard',
        '2025-10-07 10:00:22.000000',
        0,
        14
    ),
    (
        306,
        3,
        3,
        65,
        3,
        '2025-10-07 10:10:11.000000',
        'King Room 1415',
        295000,
        'King',
        '2025-10-07 11:00:22.000000',
        0,
        14
    ),
    (
        307,
        2,
        2,
        60,
        2,
        '2025-10-07 11:10:11.000000',
        'Vip Room 1416',
        292000,
        'Vip',
        '2025-10-07 12:00:22.000000',
        0,
        14
    ),
    (
        308,
        2,
        2,
        55,
        2,
        '2025-10-07 12:15:11.000000',
        'Deluxe Room 1501',
        500000,
        'Deluxe',
        '2025-10-07 13:00:22.000000',
        0,
        14
    ),
    (
        309,
        1,
        1,
        48,
        1,
        '2025-10-07 13:15:33.000000',
        'Standard Room 1502',
        480000,
        'Standard',
        '2025-10-07 14:00:44.000000',
        0,
        14
    ),
    (
        310,
        3,
        3,
        60,
        2,
        '2025-10-07 14:15:11.000000',
        'King Room 1503',
        510000,
        'King',
        '2025-10-07 15:00:22.000000',
        0,
        14
    ),
    (
        311,
        2,
        2,
        65,
        2,
        '2025-10-07 15:15:11.000000',
        'Vip Room 1504',
        505000,
        'Vip',
        '2025-10-07 16:00:22.000000',
        0,
        14
    ),
    (
        312,
        1,
        1,
        52,
        1,
        '2025-10-07 16:15:33.000000',
        'Deluxe Room 1505',
        500000,
        'Deluxe',
        '2025-10-07 17:00:44.000000',
        0,
        14
    ),
    (
        313,
        3,
        3,
        58,
        3,
        '2025-10-07 17:15:11.000000',
        'Standard Room 1506',
        480000,
        'Standard',
        '2025-10-07 18:00:22.000000',
        0,
        14
    ),
    (
        314,
        2,
        2,
        62,
        2,
        '2025-10-07 18:15:11.000000',
        'King Room 1507',
        510000,
        'King',
        '2025-10-07 19:00:22.000000',
        0,
        14
    ),
    (
        315,
        1,
        1,
        50,
        1,
        '2025-10-07 19:15:11.000000',
        'Vip Room 1508',
        505000,
        'Vip',
        '2025-10-07 20:00:22.000000',
        0,
        14
    ),
    (
        316,
        2,
        2,
        55,
        2,
        '2025-10-07 20:15:11.000000',
        'Deluxe Room 1509',
        500000,
        'Deluxe',
        '2025-10-07 21:00:22.000000',
        0,
        15
    ),
    (
        317,
        3,
        2,
        50,
        2,
        '2025-10-07 21:15:11.000000',
        'Standard Room 1510',
        480000,
        'Standard',
        '2025-10-07 22:00:22.000000',
        0,
        15
    ),
    (
        318,
        2,
        3,
        60,
        3,
        '2025-10-08 08:15:11.000000',
        'King Room 1511',
        510000,
        'King',
        '2025-10-08 09:00:22.000000',
        0,
        15
    ),
    (
        319,
        1,
        1,
        55,
        1,
        '2025-10-08 09:15:11.000000',
        'Vip Room 1512',
        505000,
        'Vip',
        '2025-10-08 10:00:22.000000',
        0,
        15
    ),
    (
        320,
        2,
        2,
        60,
        2,
        '2025-10-08 10:15:11.000000',
        'Deluxe Room 1513',
        500000,
        'Deluxe',
        '2025-10-08 11:00:22.000000',
        0,
        15
    ),
    (
        321,
        1,
        1,
        48,
        2,
        '2025-10-08 11:15:11.000000',
        'Standard Room 1514',
        480000,
        'Standard',
        '2025-10-08 12:00:22.000000',
        0,
        15
    ),
    (
        322,
        3,
        3,
        65,
        3,
        '2025-10-08 12:15:11.000000',
        'King Room 1515',
        510000,
        'King',
        '2025-10-08 13:00:22.000000',
        0,
        15
    ),
    (
        323,
        2,
        2,
        60,
        2,
        '2025-10-08 13:15:11.000000',
        'Vip Room 1516',
        505000,
        'Vip',
        '2025-10-08 14:00:22.000000',
        0,
        15
    ),
    (
        324,
        1,
        1,
        52,
        1,
        '2025-10-08 14:15:11.000000',
        'Deluxe Room 1517',
        500000,
        'Deluxe',
        '2025-10-08 15:00:22.000000',
        0,
        15
    ),
    (
        325,
        3,
        2,
        55,
        2,
        '2025-10-08 15:15:11.000000',
        'Standard Room 1518',
        480000,
        'Standard',
        '2025-10-08 16:00:22.000000',
        0,
        15
    ),
    (
        326,
        2,
        2,
        62,
        2,
        '2025-10-08 16:15:11.000000',
        'King Room 1519',
        510000,
        'King',
        '2025-10-08 17:00:22.000000',
        0,
        15
    ),
    (
        327,
        1,
        1,
        50,
        1,
        '2025-10-08 17:15:11.000000',
        'Vip Room 1520',
        505000,
        'Vip',
        '2025-10-08 18:00:22.000000',
        0,
        15
    ),
    (
        328,
        2,
        2,
        55,
        2,
        '2025-10-08 18:15:11.000000',
        'Deluxe Room 1521',
        500000,
        'Deluxe',
        '2025-10-08 19:00:22.000000',
        0,
        15
    ),
    (
        329,
        3,
        2,
        50,
        2,
        '2025-10-08 19:15:11.000000',
        'Standard Room 1522',
        480000,
        'Standard',
        '2025-10-08 20:00:22.000000',
        0,
        15
    ),
    (
        330,
        2,
        3,
        60,
        3,
        '2025-10-08 20:15:11.000000',
        'King Room 1523',
        510000,
        'King',
        '2025-10-08 21:00:22.000000',
        0,
        15
    ),
    (
        331,
        1,
        1,
        55,
        1,
        '2025-10-08 21:15:11.000000',
        'Vip Room 1524',
        505000,
        'Vip',
        '2025-10-08 22:00:22.000000',
        0,
        15
    ),
    (
        332,
        2,
        2,
        60,
        2,
        '2025-10-09 08:15:11.000000',
        'Deluxe Room 1525',
        500000,
        'Deluxe',
        '2025-10-09 09:00:22.000000',
        0,
        15
    ),
    (
        333,
        1,
        1,
        48,
        2,
        '2025-10-09 09:15:11.000000',
        'Standard Room 1526',
        480000,
        'Standard',
        '2025-10-09 10:00:22.000000',
        0,
        15
    ),
    (
        334,
        3,
        3,
        65,
        3,
        '2025-10-09 10:15:11.000000',
        'King Room 1527',
        510000,
        'King',
        '2025-10-09 11:00:22.000000',
        0,
        15
    ),
    (
        335,
        2,
        2,
        60,
        2,
        '2025-10-09 11:15:11.000000',
        'Vip Room 1528',
        505000,
        'Vip',
        '2025-10-09 12:00:22.000000',
        0,
        15
    ),
    (
        336,
        1,
        1,
        52,
        1,
        '2025-10-09 12:15:11.000000',
        'Deluxe Room 1529',
        500000,
        'Deluxe',
        '2025-10-09 13:00:22.000000',
        0,
        15
    );
/*!40000 ALTER TABLE `room` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `room_seq`
--

DROP TABLE IF EXISTS `room_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `room_seq` (
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `room_seq`
--

LOCK TABLES `room_seq` WRITE;
/*!40000 ALTER TABLE `room_seq` DISABLE KEYS */
;
INSERT INTO `room_seq` VALUES (1);
/*!40000 ALTER TABLE `room_seq` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `user` (
    `id` int NOT NULL,
    `avatar` varchar(255) DEFAULT NULL,
    `create_at` datetime(6) DEFAULT NULL,
    `date_of_birth` date DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `first_name` varchar(255) DEFAULT NULL,
    `is_delete` int NOT NULL,
    `last_name` varchar(255) DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    `phone` varchar(255) DEFAULT NULL,
    `provider` enum(
        'FACEBOOK',
        'GOOGLE',
        'LOCATION'
    ) DEFAULT NULL,
    `status` int NOT NULL,
    `update_at` datetime(6) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */
;
INSERT INTO
    `user`
VALUES (
        1,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764166707/avatar/ld68v8l1tceftl0hxp03.jpg',
        '2025-11-26 18:05:57.948775',
        '2005-07-27',
        'admin@gmail.com',
        'Quản Trị',
        0,
        'Viên',
        '$2a$10$FgrFlyvvvhxXkqNys9G2uOopgo0SR6WPzBrDdkqXmzD4Ch6HdLG7S',
        '0905676889',
        NULL,
        0,
        '2025-11-27 03:44:50.479907'
    ),
    (
        2,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764174597/avatar/yrowrgn4gjzyzkcq0qzf.jpg',
        '2025-11-26 23:16:36.602039',
        '1994-09-26',
        'customer1@gmail.com',
        'John',
        0,
        'Smith',
        '$2a$10$cJohes0uxGoi1R4O3gs0neL/rqGbFASF8GfDWjofIDAclvcx6X2PG',
        '09056768895',
        NULL,
        0,
        '2025-11-26 23:29:58.015626'
    ),
    (
        3,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764174753/avatar/dgcnebl5uqetrq6zd3jp.jpg',
        '2025-11-26 23:31:34.073381',
        '1979-04-12',
        'customer2@gmail.com',
        'Elon',
        0,
        'Musk',
        '$2a$10$un43yeY1K/xHr7eXB3ZLYer0mcRnV4N.hGZeiG.urT7PzuulTaRQC',
        '0955676889',
        NULL,
        0,
        '2025-11-26 23:32:33.827152'
    ),
    (
        4,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764174938/avatar/b97midndwssqz6decgpr.jpg',
        '2025-11-26 23:35:00.264401',
        '1988-05-26',
        'customer3@gmail.com',
        'Nick',
        0,
        'Hy',
        '$2a$10$RQQ9PhcfySx1dKrCPKGn2eaRG2tVqVYki3zKeqTWarSM.KGCm6jFe',
        '0842557232',
        NULL,
        0,
        '2025-11-27 00:24:16.033463'
    ),
    (
        5,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764175038/avatar/wx4uwwiecjhyez2dlpds.jpg',
        '2025-11-26 23:36:04.623737',
        '2000-06-14',
        'customer4@gmail.com',
        'John',
        0,
        'Wick',
        '$2a$10$IHM2nl1SaHlMxpMFQN71DOPCDdvq9UWNaY6niRADTWAON45qZVcya',
        '0126312976',
        NULL,
        0,
        '2025-11-26 23:37:19.169881'
    ),
    (
        6,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764175132/avatar/frdbrpoa6fstyr8m09q8.jpg',
        '2025-11-26 23:37:48.312084',
        '1988-03-08',
        'customer5@gmail.com',
        'Mike',
        0,
        'Smith',
        '$2a$10$znoIcwScvPNhBUJXAB1HYOVnmhIHVzM6fcBngpjoddz721j6jNCSe',
        '077487597',
        NULL,
        0,
        '2025-11-26 23:38:53.598559'
    ),
    (
        7,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764175443/avatar/q5pz34ms4btqtgsiz1u2.jpg',
        '2025-11-26 23:39:53.262327',
        '1960-03-11',
        'customer6@gmail.com',
        'Satya',
        0,
        'Nadella',
        '$2a$10$ucDq10XPjZQput2T2h8t7uHeMPUL4qPX.Dv8NyO22G1T0CPdyVpra',
        '060922143',
        NULL,
        0,
        '2025-11-26 23:44:03.462377'
    ),
    (
        8,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764175543/avatar/emmjhlflfgwqdzlymowv.jpg',
        '2025-11-26 23:39:53.266780',
        '1958-06-05',
        'customer7@gmail.com',
        'Jeff',
        0,
        'Bezos',
        '$2a$10$8yt.a7R1JexWJpvcBhCEj.S1UWvpOiisfRB8Ysg1xCShLDlT0kg/K',
        '097923516',
        NULL,
        0,
        '2025-11-26 23:45:43.347353'
    ),
    (
        9,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764175619/avatar/fncelrxjkfwpqeqgnr8p.jpg',
        '2025-11-26 23:46:22.863576',
        '1955-07-22',
        'customer8@gmail.com',
        'Bill',
        0,
        'Gate',
        '$2a$10$JoB.50Czz54yLJUZzXrTTuC6ftVK99ZftWwzK0Ziko6MubQ5eIxx.',
        '011642896',
        NULL,
        0,
        '2025-11-26 23:46:59.220365'
    ),
    (
        10,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764175688/avatar/xceerlavckzq8bzcbkpf.jpg',
        '2025-11-26 23:47:22.648590',
        '1967-12-08',
        'customer9@gmail.com',
        'Shark',
        0,
        'Bình',
        '$2a$10$Y4F6MF.sd5iRH.RcyV5q0eXh9pEMyviAnk4eBPJQ26Gnjh8Y.EGze',
        '0506739852',
        NULL,
        0,
        '2025-11-26 23:48:08.490951'
    ),
    (
        11,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764176017/avatar/vlduwd2ibssqd1ksfhcf.jpg',
        '2025-11-26 23:53:01.305863',
        '1981-02-21',
        'customer10@gmail.com',
        'Jensen',
        0,
        'Huang',
        '$2a$10$9veoIxygYorPMsPUk569BeE9NZMJyu/c3enZxXtVUS9IdHOKPLK2q',
        '0112548454',
        NULL,
        0,
        '2025-11-26 23:53:38.145083'
    ),
    (
        12,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764176163/avatar/zsa5qqhyozt1gquwljxf.jpg',
        '2025-11-26 23:55:27.764379',
        '1979-05-04',
        'customer11@gmail.com',
        'Trấn',
        0,
        'Thành',
        '$2a$10$8sIbYx0kIXW4zm4w.ZmDTuRsQpRiLcJ27AhRybXwjAxiVm0Z/yhPS',
        '0775238765',
        NULL,
        0,
        '2025-11-26 23:56:03.454565'
    ),
    (
        13,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764176282/avatar/okhga8jreaiapsdwbt3k.jpg',
        '2025-11-26 23:56:29.239456',
        '1989-09-18',
        'customer12@gmail.com',
        'Sơn',
        0,
        'Tùng',
        '$2a$10$nj/ZO37zBT4uDRC46VnZd.Tuscxo9cfajgm36K2Ynpqto4Wgjoi0i',
        '0439057583',
        NULL,
        0,
        '2025-11-26 23:58:02.323497'
    ),
    (
        14,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764176398/avatar/aigp6fc5esvmj4wdhhq5.jpg',
        '2025-11-26 23:56:29.244645',
        '1986-07-07',
        'customer13@gmail.com',
        'Văn',
        0,
        'Khoa',
        '$2a$10$qChzc2R7QuvpT80.ZeF5SOUQeHLJCX1ARr9CdB7guAj1ar3zREXLy',
        '0565689891',
        NULL,
        0,
        '2025-11-26 23:59:58.903856'
    ),
    (
        15,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764176489/avatar/jbyai3sxbs21vyqaplsg.jpg',
        '2025-11-26 23:58:34.819222',
        '1985-11-13',
        'customer14@gmail.com',
        'Châu',
        0,
        'Bùi',
        '$2a$10$2mlscjhB93VlQlcchBD5Helx9Q6feie4UawPmfwQUObUQR5QRmPEK',
        '0874556132',
        NULL,
        0,
        '2025-11-27 00:01:30.101650'
    ),
    (
        16,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764177330/avatar/cypsqrwtaak3nzc9snag.jpg',
        '2025-11-27 00:08:34.741717',
        '1977-04-23',
        'customer15@gmail.com',
        'Phan Mạnh',
        0,
        'Quỳnh',
        '$2a$10$KGgJY.6kcu1NGEyiG.Crw.AYIdWorfaNy1gLJNHmxfDqYo6K6SS3m',
        '0905613434',
        NULL,
        0,
        '2025-11-27 00:15:30.932692'
    ),
    (
        17,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764177381/avatar/kabgiwyxf4cvh4kifr3y.jpg',
        '2025-11-27 00:09:19.532111',
        '1994-07-15',
        'customer16@gmail.com',
        'Trung',
        0,
        'Thành',
        '$2a$10$DEKke4h0UphKN5pAiYIAf.UrQ3c2VjbpXxMzggmJZkC/Hupx3oNfK',
        '0332154678',
        NULL,
        0,
        '2025-11-27 00:16:21.602151'
    ),
    (
        18,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764177522/avatar/rbhuwxyfpukakscpv49p.jpg',
        '2025-11-27 00:10:01.738560',
        '1992-08-06',
        'customer17@gmail.com',
        'Phước',
        0,
        'Thịnh',
        '$2a$10$pSuU2ZUfc..mx4ljI.xsTONHa2G1kUsGnRQ..FXaw2Ejf5f7uW33C',
        '0905676889',
        NULL,
        0,
        '2025-11-27 00:18:42.449281'
    ),
    (
        19,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764177967/avatar/zyosul0qzynp5ukkjoym.jpg',
        '2025-11-27 00:10:01.747086',
        '1977-02-01',
        'customer23@gmail.com',
        'Hòa',
        0,
        'Minzy',
        '$2a$10$/.zwIrlSycQ2pv4hVzKW/OPlxl8LMReUnGNGLucCCVvCS8WbZSlmu',
        '0444510922',
        NULL,
        0,
        '2025-11-27 00:26:07.552791'
    ),
    (
        20,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764177577/avatar/bf9kgje1h9kfdt6lep2r.jpg',
        '2025-11-27 00:10:47.768357',
        '1981-07-27',
        'customer18@gmail.com',
        'Mỹ',
        0,
        'Tâm',
        '$2a$10$OVuV4PnCST9JP7g.gWqkZ.tsaWbHs.3CxRBqPljx/Jr3bSm7d2W5e',
        '0329883721',
        NULL,
        0,
        '2025-11-27 00:19:38.098832'
    ),
    (
        21,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764177623/avatar/jt4grhgnivj9r2quaqiy.jpg',
        '2025-11-27 00:11:04.920395',
        '1885-11-17',
        'customer19@gmail.com',
        'Đông',
        0,
        'Nhi',
        '$2a$10$n2gCWofxlZv9pf1d0WWtmOKmZg.AMFPMDd/Ud3Eg1Puv3nnAWywLO',
        '0934886709',
        NULL,
        0,
        '2025-11-27 00:20:24.017712'
    ),
    (
        22,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764177678/avatar/agnvq190ibydmlfcqudd.jpg',
        '2025-11-27 00:12:21.955615',
        '1985-06-16',
        'customer20@gmail.com',
        'Nguyễn Khoa',
        0,
        'Tóc Tiên',
        '$2a$10$vX/8DnHbAK0u6/bOdMhMN.Yux3nk2fySY1IxzHCFpJrqrk8bVsoLi',
        '0154676889',
        NULL,
        0,
        '2025-11-27 00:21:19.078840'
    ),
    (
        23,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764177717/avatar/or0egbl5ajpbjpnu1dsn.jpg',
        '2025-11-27 00:13:01.652166',
        '1975-07-31',
        'customer21@gmail.com',
        'Hà Anh',
        0,
        'Tuấn',
        '$2a$10$J/wwpTNxsOPoAFaNCgaLNuGmx2dw06XM.17BM7C77A.Yjz6a0FiBy',
        '0905676821',
        NULL,
        0,
        '2025-11-27 00:21:58.264008'
    ),
    (
        24,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764177774/avatar/dis7f3kfmyhlknzsqkoc.jpg',
        '2025-11-27 00:13:41.432201',
        '1995-02-22',
        'customer22@gmail.com',
        'Nguyễn Hoàng',
        0,
        'Dũng',
        '$2a$10$tPuiylbZIPiEjjjIjNxYBO0b7/IzQeaY/Mavm9Q0i4okhsN406CWG',
        '0326737834',
        NULL,
        0,
        '2025-11-27 00:22:54.871092'
    ),
    (
        25,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764178391/avatar/b8behxqpsoluzhvl06zl.jpg',
        '2025-11-27 00:28:07.394394',
        '2000-03-21',
        'customer24@gmail.com',
        'Khoai',
        0,
        'Lang Thang',
        '$2a$10$0eX.63Y6yQGqmX3h/gzr5.f5fRQADbv/gZYYkaoUru1r9gLCIE.pe',
        '0454876972',
        NULL,
        0,
        '2025-11-27 00:33:12.140377'
    ),
    (
        26,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764178446/avatar/jmedwge3nonbmkscfmi0.jpg',
        '2025-11-27 00:29:08.874608',
        '1988-02-03',
        'customer25@gmail.com',
        'Nguyễn Công',
        0,
        'Phượng',
        '$2a$10$aoaNZNPAOoGUmVTeuMUaLOHxlHu.seac2HYg/pWS50NIebXCp.jPO',
        '0865676889',
        NULL,
        0,
        '2025-11-27 00:34:06.987548'
    ),
    (
        27,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764178488/avatar/owlgn6udd4kimtdpstgy.jpg',
        '2025-11-27 00:29:52.836138',
        '1977-03-21',
        'customer26@gmail.com',
        'Đặng',
        0,
        'Văn Lâm',
        '$2a$10$2w45h3G4BvE7KKSVeeWKFu4wf7L2EYIXmAiKVSbBSMeCjN.nUlqkK',
        '0993287124',
        NULL,
        0,
        '2025-11-27 00:34:49.198103'
    ),
    (
        28,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764178548/avatar/e8fqhtxneekpiwjyetqj.jpg',
        '2025-11-27 00:30:59.544747',
        '1962-06-16',
        'customer27@gmail.com',
        'Phạm Nhật',
        0,
        'Vượng',
        '$2a$10$IP/SgX4Yio8/OpLaybGj.uZdoZc/e/pnKrevLE34Ni0Yvv2cdTKZ6',
        '0536489960',
        NULL,
        0,
        '2025-11-27 00:35:49.101618'
    ),
    (
        29,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764178804/avatar/pjaucoc7pnoz1enqpscb.jpg',
        '2025-11-27 00:31:52.637339',
        '1996-02-09',
        'customer28@gmail.com',
        'James',
        0,
        'PaterSon',
        '$2a$10$narZEZzUKdDg2lRaOmaB5OT7eoKAD.XLxELKNKkNc0IqbPXZv./uK',
        '0992375688',
        NULL,
        0,
        '2025-11-27 00:40:04.569646'
    ),
    (
        30,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764179024/avatar/i4hc1ewuje9xdyjxpfmd.jpg',
        '2025-11-27 00:41:50.626405',
        '1959-03-13',
        'customer29@gmail.com',
        'Steven',
        0,
        'Spilberg',
        '$2a$10$2rLfhxyo.Q1tjGB9xEgvlOVo1ioabTMPR/OdOYHt8gPyAhXKHeEhG',
        '0778321798',
        NULL,
        0,
        '2025-11-27 00:43:45.141588'
    ),
    (
        31,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764179764/avatar/xvmw5pokrd5imewbbch2.jpg',
        '2025-11-27 00:44:16.661039',
        '2005-04-22',
        'user1@gmail.com',
        'Ngô Thanh',
        0,
        'Hiếu',
        '$2a$10$cjOQyD1hdaFl/NwdoIXEXuut3j7JCLcBQCEpD0a3Ks67yrKcGSyuq',
        '0884167989',
        NULL,
        0,
        '2025-11-27 00:56:04.389003'
    ),
    (
        32,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764179819/avatar/wbqwymlewpdph4orgzj7.jpg',
        '2025-11-27 00:44:41.872267',
        '2005-07-11',
        'user2@gmail.com',
        'Trần Thế',
        0,
        'Hùng',
        '$2a$10$W65QRGHUo1cEpzZdun//guCG2z1DDzWXBuEkntbIQNSQmeYvxuM12',
        '0676898324',
        NULL,
        0,
        '2025-11-27 00:57:00.159257'
    ),
    (
        33,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764179857/avatar/rcqi1ce4vwc414efx2ws.jpg',
        '2025-11-27 00:44:58.911828',
        '2005-05-21',
        'user3@gmail.com',
        'Hoàng Anh',
        0,
        'Huy',
        '$2a$10$qKsjwOokIXKZPPfMbOstbOEgAFTRrWcxPKgEVl0ZL.z3/nTPEOnAm',
        '0334776456',
        NULL,
        0,
        '2025-11-27 00:57:37.826487'
    ),
    (
        34,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764179892/avatar/x403ol4qnoib3f13oqbk.jpg',
        '2025-11-27 00:45:34.589680',
        '0005-05-22',
        'user4@gmail.com',
        'Nguyễn Nhật',
        0,
        'Hào',
        '$2a$10$nTCwOCLG7MwMu6uFyuWnk.FzDub8H7cETJtrs00p6MAsyTgJumCTq',
        '0221646587',
        NULL,
        0,
        '2025-11-27 00:58:12.759892'
    ),
    (
        35,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764179958/avatar/r6bqfmlxq6rtd0wopqnn.jpg',
        '2025-11-27 00:45:57.368866',
        '2005-04-14',
        'user5@gmail.com',
        'Nguyễn Anh',
        0,
        'Quân',
        '$2a$10$rMiDMKuT.ZpNXKiHvSiBleSUuoscE4vQPGwl9cNc7EFuuNr0AYEPe',
        '0445886789',
        NULL,
        0,
        '2025-11-27 00:59:19.447140'
    ),
    (
        36,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180011/avatar/qoywsfm3juhg4misijep.jpg',
        '2025-11-27 00:46:11.289134',
        '2005-06-21',
        'user6@gmail.com',
        'Lý Tấn',
        0,
        'Thành',
        '$2a$10$zau76S9yEh3GBQOzLr9oSuICIkRpOMrVqioHeATFkPCG8r5srGGQO',
        '0977789213',
        NULL,
        0,
        '2025-11-27 01:00:12.106911'
    ),
    (
        37,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180285/avatar/ffqlykvwmcpi8xptophy.jpg',
        '2025-11-27 00:46:25.073601',
        '2005-04-27',
        'user7@gmail.com',
        'Nguyễn Duy',
        0,
        'Thành',
        '$2a$10$DPNe2NhCBRMKgNX9im6SXOzkCN7BDvzGJyR80i6Z4JeYpVl6ACvzm',
        '0876567210',
        NULL,
        0,
        '2025-11-27 01:04:46.087453'
    ),
    (
        38,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180353/avatar/brekl4ptbartzuggy4pp.jpg',
        '2025-11-27 00:46:43.654880',
        '2005-01-11',
        'user8@gmail.com',
        'Tạ Hữu',
        0,
        'Thành',
        '$2a$10$28k1NGUtsEn2rby6mhGxte6KIMbsOTbDu0dEBPvgwrInfkQc0kg3K',
        '0455789214',
        NULL,
        0,
        '2025-11-27 01:05:54.768657'
    ),
    (
        39,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180397/avatar/p4jc4xijzfejxiy9vtdg.jpg',
        '2025-11-27 00:47:05.802336',
        '2005-04-03',
        'user9@gmail.com',
        'Nguyễn Đăng',
        0,
        'Đoàn',
        '$2a$10$VIjy0iL3Mz/Jj6aJKj8ASOxM88jzSDtanFKEYkdjEb6LGC8JE7J8W',
        '088543687',
        NULL,
        0,
        '2025-11-27 01:15:00.221528'
    ),
    (
        40,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180434/avatar/z8dyyqquurcoxyi1gpow.jpg',
        '2025-11-27 00:47:24.271634',
        '2004-12-12',
        'user10@gmail.com',
        'Nguyễn Phương',
        0,
        'Nguyên',
        '$2a$10$dzA5PKC4EhJfxb/jQgXXHusgjEMZ3085P1WG9II8ghhCrH9DbmZXC',
        '0799232467',
        NULL,
        0,
        '2025-11-27 01:07:14.858921'
    ),
    (
        41,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180471/avatar/a0gml2fgmzyidp0vk5zx.jpg',
        '2025-11-27 00:51:27.977161',
        '2005-04-03',
        'user11@gmail.com',
        'Huỳnh Xuân',
        0,
        'Thiện',
        '$2a$10$ztP0flWFhm9q1jn1B8I5JOPTt2BhlBNJl5gnEtG4Z6Co4OW3wLF2i',
        '099756221',
        NULL,
        0,
        '2025-11-27 01:07:51.714801'
    ),
    (
        42,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180509/avatar/sxnhpwvkatxuiki4m8sb.jpg',
        '2025-11-27 00:51:51.675245',
        '2005-04-23',
        'user12@gmail.com',
        'Phạm Nguyễn',
        0,
        'Phú Thành',
        '$2a$10$Tf1o1EvW07M1nUJTktp3S.V49qNSJQy/SJEDoqDm7p2PFE1TMvlM2',
        '022366709',
        NULL,
        0,
        '2025-11-27 01:08:30.283209'
    ),
    (
        43,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180550/avatar/mk0eqikb1cm37prx5lsz.jpg',
        '2025-11-27 00:52:12.592244',
        '2005-07-26',
        'user13@gmail.com',
        'Nguyễn Toàn',
        0,
        'Thắng',
        '$2a$10$/lCPyFn.lj9Wb2qCPvj/CeBwLbTKV2L78N7I4suXvTKL84zbeSVXq',
        '0477849886',
        NULL,
        0,
        '2025-11-27 01:09:11.064721'
    ),
    (
        44,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180589/avatar/o0p7kjnhdaxzn7ligpkp.jpg',
        '2025-11-27 00:52:25.677410',
        '2004-03-13',
        'user14@gmail.com',
        'Nguyễn Văn',
        0,
        'Triển',
        '$2a$10$xaCi3I5R9Wc.QX/O8QupC.1gj5W2OAMfBiEh60e7oNfVkbDKUJs/W',
        '0556224556',
        NULL,
        0,
        '2025-11-27 01:09:49.900982'
    ),
    (
        45,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180642/avatar/kjlkvtffe0jcrxqubh37.jpg',
        '2025-11-27 00:52:40.319907',
        '2005-04-12',
        'user15@gmail.com',
        'Nguyễn Ngọc',
        0,
        'Thiện',
        '$2a$10$Mxb3xPbymytLX8SqUpjygOAqbHzyrd1wQ93nCvnlYl333UWlXb9t.',
        '0989565332',
        NULL,
        0,
        '2025-11-27 01:10:42.680464'
    ),
    (
        46,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180682/avatar/usdaz4ckukq8upsiillg.jpg',
        '2025-11-27 00:53:08.108876',
        '2005-08-07',
        'user16@gmail.com',
        'Phạm Thị',
        0,
        'Yến Nhi',
        '$2a$10$Xlanysgj7AU1cuKwNoBtmuOKrNgRb6yx.SN6WQkXZwzwBxIybQlwC',
        '0886405522',
        NULL,
        0,
        '2025-11-27 01:11:22.685387'
    ),
    (
        47,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180743/avatar/yep6xeuohxk92mkqp571.jpg',
        '2025-11-27 00:53:21.453404',
        '2005-10-11',
        'user17@gmail.com',
        'Dương Xuân',
        0,
        'Ánh',
        '$2a$10$avjZ3J4cVmlxEDJyW6WfT.QW9N8vVwsE43GVvXkRKw/Q/tG4zktmu',
        '0865798514',
        NULL,
        0,
        '2025-11-27 01:12:24.163328'
    ),
    (
        48,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180782/avatar/croiuzjrtur7mtkerrsb.jpg',
        '2025-11-27 00:53:40.380699',
        '2005-03-27',
        'user18@gmail.com',
        'Mai Trần Khánh',
        0,
        'An',
        '$2a$10$gQWhguWwXtwyiojm9huTAO3cANgGAYdWJiMK.KI4LSQyF92cjDg7u',
        '0887447809',
        NULL,
        0,
        '2025-11-27 01:13:03.220215'
    ),
    (
        49,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180815/avatar/jqvetbhytyjn08lkvmbx.jpg',
        '2025-11-27 00:54:07.828350',
        '2005-04-22',
        'user19@gmail.com',
        'Nguyễn Tấn',
        0,
        'Lộc',
        '$2a$10$GLS9DScQpdCsGhlOnqB9uuOiZv7DrsD16wmpSuNcna12B12704ggW',
        '0993456608',
        NULL,
        0,
        '2025-11-27 01:13:35.817890'
    ),
    (
        50,
        'https://res.cloudinary.com/dcmko66fp/image/upload/v1764180861/avatar/wxtnhzqcdytxazkwllre.jpg',
        '2025-11-27 00:55:02.050608',
        '2005-05-11',
        'user20@gmail.com',
        'Nguyễn Minh',
        0,
        'Thành',
        '$2a$10$cNT08H0pBnMWOXMe0e6igOuBHe0yXKdZF4cwinXWUgLyMgx5RVF4i',
        '0872213557',
        NULL,
        0,
        '2025-11-27 01:14:21.924270'
    ),
    (
        52,
        'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1989549268251908&height=50&width=50&ext=1766808036&hash=AT9rDKpuqwPnVf63qcjI-tl2',
        '2025-11-27 04:00:56.094277',
        NULL,
        'facebook_1989549268251908@example.com',
        'Nguyễn Nhật ',
        0,
        'Hào',
        NULL,
        '',
        'FACEBOOK',
        0,
        '2025-11-27 04:01:10.101192'
    ),
    (
        53,
        'https://lh3.googleusercontent.com/a/ACg8ocLA7AOA6VoMh6cW_CfCmje9CC_u28dNLY8ujtZM94grJqX_7sA=s96-c',
        '2025-11-27 04:03:13.528562',
        NULL,
        'hao362k5@gmail.com',
        'Hào',
        0,
        'Nguyễn',
        NULL,
        '',
        'GOOGLE',
        0,
        '2025-11-27 04:03:25.631151'
    );
/*!40000 ALTER TABLE `user` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `user_roles` (
    `user_id` int NOT NULL,
    `roles_name` varchar(255) NOT NULL,
    PRIMARY KEY (`user_id`, `roles_name`),
    KEY `FK6pmbiap985ue1c0qjic44pxlc` (`roles_name`),
    CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `FK6pmbiap985ue1c0qjic44pxlc` FOREIGN KEY (`roles_name`) REFERENCES `role` (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */
;
INSERT INTO
    `user_roles`
VALUES (1, 'ADMIN'),
    (1, 'CHAT'),
    (2, 'CHAT'),
    (3, 'CHAT'),
    (4, 'CHAT'),
    (5, 'CHAT'),
    (6, 'CHAT'),
    (7, 'CHAT'),
    (8, 'CHAT'),
    (9, 'CHAT'),
    (10, 'CHAT'),
    (11, 'CHAT'),
    (12, 'CHAT'),
    (13, 'CHAT'),
    (14, 'CHAT'),
    (15, 'CHAT'),
    (16, 'CHAT'),
    (17, 'CHAT'),
    (18, 'CHAT'),
    (19, 'CHAT'),
    (20, 'CHAT'),
    (21, 'CHAT'),
    (22, 'CHAT'),
    (23, 'CHAT'),
    (24, 'CHAT'),
    (25, 'CHAT'),
    (26, 'CHAT'),
    (27, 'CHAT'),
    (28, 'CHAT'),
    (29, 'CHAT'),
    (30, 'CHAT'),
    (1, 'CUSTOMER'),
    (2, 'CUSTOMER'),
    (3, 'CUSTOMER'),
    (4, 'CUSTOMER'),
    (5, 'CUSTOMER'),
    (6, 'CUSTOMER'),
    (7, 'CUSTOMER'),
    (8, 'CUSTOMER'),
    (9, 'CUSTOMER'),
    (10, 'CUSTOMER'),
    (11, 'CUSTOMER'),
    (12, 'CUSTOMER'),
    (13, 'CUSTOMER'),
    (14, 'CUSTOMER'),
    (15, 'CUSTOMER'),
    (16, 'CUSTOMER'),
    (17, 'CUSTOMER'),
    (18, 'CUSTOMER'),
    (19, 'CUSTOMER'),
    (20, 'CUSTOMER'),
    (21, 'CUSTOMER'),
    (22, 'CUSTOMER'),
    (23, 'CUSTOMER'),
    (24, 'CUSTOMER'),
    (25, 'CUSTOMER'),
    (26, 'CUSTOMER'),
    (27, 'CUSTOMER'),
    (28, 'CUSTOMER'),
    (29, 'CUSTOMER'),
    (30, 'CUSTOMER'),
    (1, 'HOTEL'),
    (2, 'HOTEL'),
    (3, 'HOTEL'),
    (4, 'HOTEL'),
    (5, 'HOTEL'),
    (6, 'HOTEL'),
    (7, 'HOTEL'),
    (8, 'HOTEL'),
    (9, 'HOTEL'),
    (10, 'HOTEL'),
    (11, 'HOTEL'),
    (12, 'HOTEL'),
    (13, 'HOTEL'),
    (14, 'HOTEL'),
    (15, 'HOTEL'),
    (16, 'HOTEL'),
    (17, 'HOTEL'),
    (18, 'HOTEL'),
    (19, 'HOTEL'),
    (20, 'HOTEL'),
    (21, 'HOTEL'),
    (22, 'HOTEL'),
    (23, 'HOTEL'),
    (24, 'HOTEL'),
    (25, 'HOTEL'),
    (26, 'HOTEL'),
    (27, 'HOTEL'),
    (28, 'HOTEL'),
    (29, 'HOTEL'),
    (30, 'HOTEL'),
    (1, 'INVOICE'),
    (1, 'INVOICE_(2)'),
    (2, 'INVOICE_(2)'),
    (3, 'INVOICE_(2)'),
    (4, 'INVOICE_(2)'),
    (5, 'INVOICE_(2)'),
    (6, 'INVOICE_(2)'),
    (7, 'INVOICE_(2)'),
    (8, 'INVOICE_(2)'),
    (9, 'INVOICE_(2)'),
    (10, 'INVOICE_(2)'),
    (11, 'INVOICE_(2)'),
    (12, 'INVOICE_(2)'),
    (13, 'INVOICE_(2)'),
    (14, 'INVOICE_(2)'),
    (15, 'INVOICE_(2)'),
    (16, 'INVOICE_(2)'),
    (17, 'INVOICE_(2)'),
    (18, 'INVOICE_(2)'),
    (19, 'INVOICE_(2)'),
    (20, 'INVOICE_(2)'),
    (21, 'INVOICE_(2)'),
    (22, 'INVOICE_(2)'),
    (23, 'INVOICE_(2)'),
    (24, 'INVOICE_(2)'),
    (25, 'INVOICE_(2)'),
    (26, 'INVOICE_(2)'),
    (27, 'INVOICE_(2)'),
    (28, 'INVOICE_(2)'),
    (29, 'INVOICE_(2)'),
    (30, 'INVOICE_(2)'),
    (1, 'ROLE'),
    (1, 'ROOM'),
    (2, 'ROOM'),
    (3, 'ROOM'),
    (4, 'ROOM'),
    (5, 'ROOM'),
    (6, 'ROOM'),
    (7, 'ROOM'),
    (8, 'ROOM'),
    (9, 'ROOM'),
    (10, 'ROOM'),
    (11, 'ROOM'),
    (12, 'ROOM'),
    (13, 'ROOM'),
    (14, 'ROOM'),
    (15, 'ROOM'),
    (16, 'ROOM'),
    (17, 'ROOM'),
    (18, 'ROOM'),
    (19, 'ROOM'),
    (20, 'ROOM'),
    (21, 'ROOM'),
    (22, 'ROOM'),
    (23, 'ROOM'),
    (24, 'ROOM'),
    (25, 'ROOM'),
    (26, 'ROOM'),
    (27, 'ROOM'),
    (28, 'ROOM'),
    (29, 'ROOM'),
    (30, 'ROOM'),
    (1, 'USER'),
    (2, 'USER'),
    (3, 'USER'),
    (4, 'USER'),
    (5, 'USER'),
    (6, 'USER'),
    (7, 'USER'),
    (8, 'USER'),
    (9, 'USER'),
    (10, 'USER'),
    (11, 'USER'),
    (12, 'USER'),
    (13, 'USER'),
    (14, 'USER'),
    (15, 'USER'),
    (16, 'USER'),
    (17, 'USER'),
    (18, 'USER'),
    (19, 'USER'),
    (20, 'USER'),
    (21, 'USER'),
    (22, 'USER'),
    (23, 'USER'),
    (24, 'USER'),
    (25, 'USER'),
    (26, 'USER'),
    (27, 'USER'),
    (28, 'USER'),
    (29, 'USER'),
    (30, 'USER'),
    (31, 'USER'),
    (32, 'USER'),
    (33, 'USER'),
    (34, 'USER'),
    (35, 'USER'),
    (36, 'USER'),
    (37, 'USER'),
    (38, 'USER'),
    (39, 'USER'),
    (40, 'USER'),
    (41, 'USER'),
    (42, 'USER'),
    (43, 'USER'),
    (44, 'USER'),
    (45, 'USER'),
    (46, 'USER'),
    (47, 'USER'),
    (48, 'USER'),
    (49, 'USER'),
    (50, 'USER'),
    (52, 'USER'),
    (53, 'USER');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */
;
UNLOCK TABLES;

--
-- Table structure for table `user_seq`
--

DROP TABLE IF EXISTS `user_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `user_seq` (
    `next_val` bigint DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `user_seq`
--

LOCK TABLES `user_seq` WRITE;
/*!40000 ALTER TABLE `user_seq` DISABLE KEYS */
;
INSERT INTO `user_seq` VALUES (151);
/*!40000 ALTER TABLE `user_seq` ENABLE KEYS */
;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2025-11-27 11:40:55