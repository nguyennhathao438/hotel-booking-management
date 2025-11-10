# 1️⃣ Stage 1: Build React app
FROM node:22.19.0 AS build
WORKDIR /app

# Copy package files và cài đặt dependencies
COPY package*.json ./
RUN npm install
RUN npm install @rollup/rollup-linux-x64-musl --save-optional
# Copy toàn bộ source vào container
COPY . .

# Build app (tạo thư mục build/)
ENV CI=true
RUN npm run build

# 2️⃣ Stage 2: Dùng Nginx để serve
FROM nginx:alpine

# Copy nginx.conf của bạn vào container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static files từ giai đoạn build sang
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Chạy nginx khi container start
CMD ["nginx", "-g", "daemon off;"]
