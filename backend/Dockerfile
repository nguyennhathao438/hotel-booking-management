FROM maven:3.9.11-amazoncorretto-25 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests -X

FROM amazoncorretto:25.0.1
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar","app.jar"]