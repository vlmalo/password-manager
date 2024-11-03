FROM openjdk:17 AS build

WORKDIR /app
COPY target/backend.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
