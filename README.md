# Hotel Booking Management System

Hệ thống quản lý đặt phòng khách sạn — nền tảng trực tuyến hiện đại giúp tối ưu hóa toàn bộ hoạt động của khách sạn, từ vận hành nội bộ đến các chức năng tương tác trực tiếp với khách hàng. Hệ thống được thiết kế theo mô hình **client–server**: frontend phục vụ người dùng, backend đảm nhận xử lý dữ liệu, bảo mật, logic nghiệp vụ và đồng bộ qua API.

---

## Mục lục

- [Thành viên thực hiện](#thành-viên-thực-hiện-authors)
- [Tính năng chính](#tính-năng-chính-features)
- [Hướng dẫn chạy dự án](#hướng-dẫn-chạy-dự-án)

---

## Thành viên thực hiện (Authors)

Dự án được thực hiện bởi nhóm sinh viên Khoa Công nghệ Thông tin — Trường Đại học Sài Gòn:

- Nguyễn Nhật Hào
- Hoàng Anh Huy
- Phan Lập Thành
- Võ Thành Huynh

---

## Tính năng chính (Features)

### 1. Dành cho Khách hàng (Customers)
- **Tìm kiếm & Lọc**: Tìm kiếm khách sạn theo tỉnh thành và lọc kết quả.
- **Xem thông tin chi tiết**: Xem chi tiết phòng, giá cả, hình ảnh, tiện ích và tình trạng phòng trống thực tế.
- **Đặt phòng trực tuyến (Booking)**: Tự động tính tổng tiền dựa trên ngày nhận và trả phòng.
- **Thanh toán điện tử**: Tích hợp cổng thanh toán **VNPAY**.
- **Chat thời gian thực**: Nhắn tin trực tiếp với chủ khách sạn qua **WebSocket**, không độ trễ.
- **Đánh giá & Phản hồi**: Gửi feedback kèm số sao sau khi trải nghiệm dịch vụ, hiển thị công khai.
- **Quản lý tài khoản**: Đăng ký, đăng nhập (hỗ trợ đăng nhập nhanh qua **Google OAuth2**), chỉnh sửa thông tin cá nhân.

### 2. Dành cho Chủ khách sạn (Hotel Managers)
- **Đăng ký hợp tác**: Gửi hồ sơ khách sạn mới (tên, vị trí, tiện ích, phòng, giá, ảnh) để chờ Admin phê duyệt.
- **Quản lý cơ sở lưu trú**: Quản lý danh sách phòng, tiện ích, dịch vụ và thông tin khách sạn.
- **Quản lý đặt phòng**: Theo dõi tình trạng thanh toán, lịch sử giao dịch, xử lý đơn hàng.
- **Nhận thông báo thời gian thực**: Nhận thông báo tức thời qua WebSocket khi có đơn đặt phòng mới.
- **Hỗ trợ khách hàng**: Nhắn tin trực tiếp để xử lý yêu cầu.
- **Xem đánh giá**: Theo dõi feedback từ khách hàng.
- **Báo cáo & Thống kê**: Biểu đồ doanh thu, hóa đơn, lịch sử dịch vụ.

### 3. Hệ thống Quản trị (Admin Panel)
- **Phê duyệt đối tác**: Duyệt hồ sơ đăng ký khách sạn mới.
- **Quản lý người dùng**: Phân quyền, kiểm soát/khóa tài khoản khách hàng và chủ khách sạn.
- **Quản lý dữ liệu hệ thống**: Kiểm soát dữ liệu khách hàng, khách sạn, phòng, đơn đặt phòng.
- **Giám sát & Quản lý chất lượng**: Giám sát vận hành, xử lý phản hồi, thống kê tổng quan và hóa đơn từng khách sạn.

---

## Công nghệ sử dụng (Tech Stack)

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Thư viện chính**:
  - `react-router-dom` — điều hướng (routing)
  - `redux-toolkit` — quản lý trạng thái (state management)
  - `axios` — gọi HTTP request tới backend

### Backend
- **Kiến trúc**: Monolithic (nguyên khối)
- **Framework chính**: Spring Boot (Java / J2EE)
- **Thành phần & thư viện**:
  - **Spring Security & JWT** — xác thực, phân quyền (Admin, Chủ khách sạn, Khách hàng)
  - **OAuth2** — đăng nhập nhanh qua Google, tự động đồng bộ tài khoản
  - **Spring Data JPA** — ORM, truy vấn và kết nối MySQL
  - **WebSocket** — kết nối hai chiều thời gian thực cho Chat & thông báo
  - **Cloudinary** — lưu trữ, tối ưu hóa hình ảnh tải lên
  - **VNPAY** — cổng thanh toán và kiểm tra trạng thái giao dịch
  - **Spring Test** — unit test & integration test
  - **Docker** — đóng gói ứng dụng backend

### Cơ sở dữ liệu
- **MySQL 8.0**

---

## Hướng dẫn chạy dự án

Dự án được đóng gói bằng Docker Compose, gồm 3 container: `hotel_booking_db` (MySQL), `hotel_booking_be` (Spring Boot, port `8080`), `hotel_booking_fe` (React + Nginx, port `5173`).

### 1. Yêu cầu hệ thống

- [Docker](https://www.docker.com/) >= 20.x
- [Docker Compose](https://docs.docker.com/compose/) >= 2.x
- Git

> Không cần cài JDK, Node.js hay MySQL trên máy — toàn bộ ứng dụng chạy trong container.

### 2. Clone dự án

```bash
git clone https://github.com/nguyennhathao438/hotel-booking-management.git
cd hotel-booking-management
```

### 3. Tạo file cấu hình cho backend

Backend nạp thêm biến môi trường từ `backend/.env` (khai báo qua `env_file` trong `docker-compose.yml`). Tạo file này trước khi chạy:

```bash
mkdir -p backend
touch backend/.env
```

Thêm các biến cần thiết, ví dụ:

```env
# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000

# Google OAuth2
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# VNPAY
VNPAY_TMN_CODE=your_tmn_code
VNPAY_HASH_SECRET=your_hash_secret
VNPAY_RETURN_URL=http://localhost:8080/api/payment/vnpay-return
```

> ⚠️ Danh sách biến trên được suy ra từ các tính năng OAuth2, Cloudinary và VNPAY trong dự án — hãy đối chiếu với `application.properties`/`application.yml` trong mã nguồn backend để lấy đúng tên biến thực tế.

### 4. Build & chạy toàn bộ hệ thống

```bash
docker-compose up -d
```

Lệnh này sẽ:
1. Khởi tạo container **`hotel_booking_db`** (MySQL 8.0), tạo database `hotel_booking_management` và tự động chạy `init.sql`.
2. Kéo image backend **`hao438/hotel_booking_be:0.1.3`**, khởi động container **`hotel_booking_be`**, kết nối MySQL qua `jdbc:mysql://db:3306/hotel_booking_management`.
3. Build image frontend từ thư mục `./frontend`, khởi động container **`hotel_booking_fe`** chạy qua Nginx.

### 5. Kiểm tra trạng thái & log

```bash
docker-compose ps
```

Xem log (dùng đúng tên service khai báo trong `docker-compose.yml`, không phải `container_name`):

```bash
docker-compose logs -f db
docker-compose logs -f app       # backend
docker-compose logs -f frontend
```

### 6. Truy cập ứng dụng

| Thành phần   | URL |
|--------------|-----|
| Frontend     | http://localhost:5173 |
| Backend API  | http://localhost:8080 |
| Database     | `localhost:3306` (user: `root`, password: `123456`) |

### 7. Build lại backend từ source (tuỳ chọn)

Mặc định compose dùng image có sẵn trên Docker Hub. Nếu bạn sửa code backend và muốn build lại:

```bash
cd backend
docker build -t hao438/hotel_booking_be:0.1.3 .
cd ..
docker-compose up -d --force-recreate app
```

### 8. Dừng hệ thống

```bash
docker-compose down
```

Xoá luôn dữ liệu database (volume `db-hotel_booking`):

```bash
docker-compose down -v
```

---

> ⚠️ **Lưu ý bảo mật**: File cấu hình mẫu ở trên dùng mật khẩu/thông tin demo (`123456`, khóa mẫu...) chỉ phục vụ chạy thử local. Trước khi triển khai production, hãy thay bằng biến môi trường an toàn (`.env` không commit lên Git) và đổi toàn bộ mật khẩu, secret key.
