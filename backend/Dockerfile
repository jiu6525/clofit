FROM amazoncorretto:21-alpine AS build

WORKDIR /app

# 의존성 설치 및 빌드
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
COPY src ./src
RUN ./gradlew build --no-daemon

# 빌드 결과물을 실행 이미지로 복사
FROM amazoncorretto:21-alpine

WORKDIR /app

COPY --from=build /app/build/libs/clofit-0.0.1-SNAPSHOT.jar /app/clofit-0.0.1-SNAPSHOT.jar

CMD ["java", "-jar", "/app/clofit-0.0.1-SNAPSHOT.jar"]