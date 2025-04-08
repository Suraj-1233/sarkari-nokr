FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

RUN mvn dependency:go-offline
# Build the application
RUN mvn clean package -DskipTests

# Use OpenJDK for running the application
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built JAR file from the previous stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]

