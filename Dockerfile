FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/*.jar springbootfirst.jar
EXPOSE 8085
ENTRYPOINT ["java","-jar","telemedicine_consultation.jar"]