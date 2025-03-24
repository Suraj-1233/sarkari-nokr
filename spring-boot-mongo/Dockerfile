# Use Maven to build the application
FROM maven:3.8.6-openjdk-17 AS build

WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use OpenJDK for running the application
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built JAR file from the previous stage
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
