# ReadMe

## 소개

### 📖 개요  
👏 SSAFY 11기 2학기 자율 프로젝트 👏  
**2024.10.14 ~ 2024.11.19 (6주)**  

**(깃허브 메인 이동 버튼 추가)**  

### 💡 프로젝트 기획

#### 배경  
---  
**(깃허브 메인 이동 버튼 추가)**  

---

## 🌵 빌드 환경

| **FrontEnd**       | **BackEnd**                        | **Database**       | **Infra**               | **AI**                   |
|---------------------|------------------------------------|--------------------|-------------------------|--------------------------|
| Next.js 14.2.6      | Java 21 (Amazon Corretto 21)      | MySQL 8.0.37       | AWS EC2 (Ubuntu 20.04)  | OOTDiffusion            |
| Node.js 20          | Spring Boot 3.3.5                | Redis 7.2.1        | Nginx 1.26.2            | YoLo v8 - Deepfashion   |
| TypeScript 5.6.3    | Gradle 8.10.2                    |                    | Jenkins 2.462.3         |                          |
| React 18.3.1        | Spring Data JPA                  |                    | Docker 27.3.1           |                          |
| Zustand 5.0.1       | IntelliJ IDEA 2024.1.4           |                    | Docker Compose 2.29.2   |                          |
| Tailwind CSS        | lombok                           |                    | AWS S3                  |                          |
|                     | JWT                              |                    |                         |                          |
|                     | Python 3.9                       |                    |                         |                          |
|                     | fastAPI 0.115.4                  |                    |                         |                          |
|                     | selenium                         |                    |                         |                          |

**(깃허브 메인 이동 버튼 추가)**  

---

## 구현

### 🎯 주요 페이지 및 기능

#### 메인화면  
![메인](https://github.com/user-attachments/assets/79d6eff8-f460-4bbe-b248-4a6eb6b02a40)

#### 개인의류 등록  
<div style="display: flex;">
    <img src="%25EA%25B0%259C%25EC%259D%25B8%25EC%259D%2598%25EB%25A5%2598%25EB%2593%25B1%25EB%25A1%259D.png" width="50%">
    <img src="%25EC%2583%2581%25ED%2592%2588%25EC%2583%2581%25EC%2584%25B8%25EB%25B3%25B4%25EA%25B8%25B0.png" width="50%">
</div>

#### 상품 상세보기  
![상품 상세보기](%25EC%2583%2581%25ED%2592%2588_%25EC%2583%2581%25EC%2584%25B8%25EB%25B3%25B4%25EA%25B8%25B0.png)

  
# 색상 필터링 및 색상 기반 추천

![색상 필터링](%EC%83%89%EC%83%81_%ED%95%84%ED%84%B0%EB%A7%81.png)  
![색상 추천](%EC%83%89%EC%83%81%ED%95%84%ED%84%B0%EB%A7%81_%EC%B6%94%EC%B2%9C.png)

---

# 옷장 개인 의류 추가

### 상의만 추가 화면  
![상의만 추가](%EC%98%B7%EC%9E%A5_%EC%83%81%EC%9D%98%EB%A7%8C.png)  

### 개인 의류 추가 전  
![추가 전](%EC%98%B7%EC%9E%A5_%EA%B0%9C%EC%9D%B8%EC%9D%98%EB%A5%98%EC%B6%94%EA%B0%80%EC%A0%84.png)  

### 개인 의류 추가 후  
![상의만 추가 후](%EC%98%B7%EC%9E%A5_%EC%83%81%EC%9D%98%EB%A7%8C%201.png)  

---

# 좋아요한 피팅

![좋아요한 피팅](%EC%A2%8B%EC%95%84%EC%9A%94%ED%95%9C%ED%94%BC%ED%8C%85.png)

---

# 피드

![피드](%ED%94%BC%EB%93%9C.png)

---

# 피팅

### 피팅 합성 화면  
![피팅 합성](%ED%94%BC%ED%8C%85_%ED%95%A9%EC%84%B1.png)

### 피팅 결과 상세보기  
![결과 상세](%ED%94%BC%ED%8C%85%EA%B2%B0%EA%B3%BC%EC%83%81%EC%84%B8%EB%B3%B4%EA%B8%B0.png)

### 피팅 결과 화면  
![결과 화면](%ED%94%BC%ED%8C%85%EA%B2%B0%EA%B3%BC%ED%99%94%EB%A9%B4.png)

---

  
## 👀 산출물

### 요구사항명세서

---

### API 명세서
- API 명세서(세부)

![이미지1](image.png)
![이미지2](image%201.png)

---

### ERD
![ERD](5971cfa6-9e85-4bf2-92ff-b77b3b24744b.png)

---

### 시스템 구조도
![시스템 구조도](image%202.png)

---

### 지라 번다운 차트
| 1주차 스프린트 | 2주차 스프린트 | 3주차 스프린트 |
| -------------- | -------------- | -------------- |
|                |                |                |

![번다운 차트1](image%203.png)
![번다운 차트2](image%204.png)
![번다운 차트3](image%205.png)

| 4주차 스프린트 | 5주차 스프린트 | 6주차 스프린트 |
| -------------- | -------------- | -------------- |
|                |                |                |

![번다운 차트4](image%206.png)
![번다운 차트5](image%207.png)

---

### 최종발표 PPT
    
### (깃허브 메인 이동 버튼 추가)

📚 파일 구조도

## FrontEnd

### 📦 frontend
- 📂 .next
- 📂 .storybook
- 📂 public
  - 📂 assets
    - 📂 form
    - 📂 login
  - 📂 src
    - 📂 app
      - 📂 (main)
      - 📂 auth
        - 📂 login
          - 📂 _components
            - 📂 KakaoLoginButton
            - 📂 NaverLoginButton
        - 📂 nickname
        - 📂 redirect
      - 📂 create
      - 📂 fonts
      - 📂 test
    - 📂 components
      - 📂 Button
        - 📂 CreateButton
        - 📂 DeleteButton
        - 📂 IndexButton
        - 📂 LikeButton
        - 📂 LogoutButton
        - 📂 PaginationButton
        - 📂 ReportButton
        - 📂 RouteButton
        - 📂 ShareButton
        - 📂 VoteButton
        - 📂 WordVoteButton
      - 📂 Card
      - 📂 Form
      - 📂 Header
      - 📂 Input
        - 📂 SearchInput
        - 📂 ValueInput
      - 📂 Modal
      - 📂 Skeleton
      - 📂 Textarea
    - 📂 context
    - 📂 store
    - 📂 stories
      - 📂 assets
    - 📂 utils
      - 📂 loader
    - 📂 vendor
  - 📜 yarn.lock

## BackEnd
### 📦 backend/memetionary
- 📂 gradle
  - 📂 wrapper
    - 📜 gradle-wrapper.jar
    - 📜 gradle-wrapper.properties
- 📂 src
  - 📂 main
    - 📂 java
      - 📂 com
        - 📂 ssafy
          - 📂 memetionary
            - 📂 common
              - 📂 controller
              - 📂 dto
              - 📂 entity
              - 📂 exception
              - 📂 config
              - 📂 declaration
                - 📂 controller
                - 📂 dto
                - 📂 entity
                - 📂 repository
                - 📂 service
            - 📂 hashtag
              - 📂 entity
              - 📂 repository
              - 📂 service
            - 📂 link
              - 📂 entity
              - 📂 repository
              - 📂 service
            - 📂 member
              - 📂 controller
              - 📂 dto
              - 📂 entity
              - 📂 repository
              - 📂 service
            - 📂 oauth2
              - 📂 domain
              - 📂 dto
              - 📂 filter
              - 📂 handler
              - 📂 repository
              - 📂 service
              - 📂 token
            - 📂 util
              - 📂 word
                - 📂 controller
                - 📂 dto
                - 📂 entity
                - 📂 repository
                - 📂 service
              - 📂 wordes
                - 📂 controller
                - 📂 document
                - 📂 dto
                - 📂 repository
                - 📂 service
            - 📂 resources


## (깃허브 메인 이동 버튼 추가)

### 마치며

👦 팀원

(웹 페이지 등록)

### 팀원 역할 상세

(깃허브 메인 이동 버튼 추가)

### 📣 소감

😊 강현후  
😎 손유진  
🍇 김성현  
🏡 임 권  
🥳 김연동  
👶 강지우  

### 🌱 회고

