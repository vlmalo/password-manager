FROM maven:3.9.3-eclipse-temurin-17 AS build

# Set working directory
WORKDIR /app

# Copy only the pom.xml to leverage Docker's caching mechanism
COPY pom.xml .

# Pre-fetch dependencies
RUN mvn dependency:go-offline

# Copy the remaining project files
COPY . .

# Build the application
RUN mvn clean package -DskipTests

# Use a lightweight JRE image for the runtime
FROM eclipse-temurin:17-jre

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar /app/app.jar

# Expose the backend's port
EXPOSE 8080

# Run the Spring Boot application
CMD ["java", "-jar", "/app/app.jar"]
