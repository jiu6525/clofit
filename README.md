|                   logo                   |
| ![logo](https://github.com/user-attachments/assets/61486427-9e8e-4731-9e3d-766b3ed24511) |


### 목차

| [소개](#소개)                               | [구현](#구현)                                           | [마치며](#마치며)                           |
| :------------------------------------------ | :------------------------------------------------------ | :------------------------------------------ |
| [:book: 개요](#book-개요)                   | [:dart: 주요 페이지 및 기능](#dart-주요-페이지-및-기능) | [:boy: 팀원](#boy-팀원)                     |
| [:bulb: 프로젝트 기획](#bulb-프로젝트-기획) | [:books: 파일 구조도](#books-파일-구조도)                   | [:mega: 소감](#mega-소감)                   |
| [:cactus: 빌드 환경](#cactus-빌드-환경)     | [:eyes: 산출물](#eyes-산출물)                           | [:seedling: 회고 기록](#seedling-회고-기록) |


# 소개

## :book: 개요  
👏 SSAFY 11기 2학기 자율 프로젝트 👏  
>2024.10.14 ~ 2024.11.19 (6주)

**Project. Clofit**
(Team. FitTeam)

<br/>

[🔼 목차로 돌아가기](#목차)

<br/>

## :bulb: 프로젝트 기획
현대의 소비자들은 자신의 스타일과 취향에 맞는 의류를 선택하는 데 많은 시간을 투자하고 있으며, 다양한 패션 아이템을 쉽게 찾고, 적합한 스타일을 추천받고자 하는 욕구가 커지고 있습니다. 특히, 온라인 쇼핑에서는 다양한 상품을 선택할 수 있는 장점이 있지만, 실제 착용감을 확인할 수 없다는 단점이 존재합니다. 이러한 문제를 해결하기 위해, 우리는 AI 딥러닝 모델을 사용한 가상 피팅을 통해 의류의 착용감을 시각적으로 확인하여 소비자에게 차별화된 가치를 제공하는 웹애플리케이션 프로젝트를 진행하였습니다.

<br/>

[🔼 목차로 돌아가기](#목차)

<br/>

## :cactus: 빌드 환경

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

<br/>

[🔼 목차로 돌아가기](#목차)

<br/>

---

# 구현

## :dart: 주요 페이지 및 기능

### 메인화면  
<img src="https://github.com/user-attachments/assets/79d6eff8-f460-4bbe-b248-4a6eb6b02a40" width="300" height="500">

### 개인의류 등록  
<div style="display: flex;">
    <img src="https://github.com/user-attachments/assets/040a6993-1fe7-4ab4-957e-45cfb2a20bcd" width="300" height="500">
    <img src="https://github.com/user-attachments/assets/163da62a-6556-4247-950f-94f37914deec" width="300" height="500">
</div>

### 상품 상세보기  
<img src="https://github.com/user-attachments/assets/b32eceec-5e3c-4378-a373-8c9e79d70a01" width="300" height="500">

### 색상 필터링 및 색상 기반 추천
<img src="https://github.com/user-attachments/assets/ac9d2289-0bd4-4db7-9c74-e07cdb7a3ec7" width="300" height="500">
<img src="https://github.com/user-attachments/assets/edbc92a7-2536-4caf-b34e-52a63be7b9d8" width="300" height="500">

### 옷장 개인 의류 추가 (개인 의류 추가 전 후)
<div style="display: flex;">
    <img src="https://github.com/user-attachments/assets/d9284649-6e30-49f2-92d5-50e9c9765b98" width="300" height="500">
    <img src="https://github.com/user-attachments/assets/1b456b37-6541-4a70-bdb6-fc744ec137fc" width="300" height="500">
</div>

### 좋아요한 피팅
<img src="https://github.com/user-attachments/assets/2b6406da-c8ed-4be7-ad37-edd4a8747913" width="300" height="500">

### 피드
<img src="https://github.com/user-attachments/assets/71e74cc1-3f81-46b0-9a73-c4b83a8d3925" width="300" height="500">

### 피팅 (합성, 결과 상세보기, 결과) 화면
 
<div style="display: flex;">
    <img src="https://github.com/user-attachments/assets/5a880585-6667-4fe5-ba14-4d86a31b63c8" width="300" height="500">
    <img src="https://github.com/user-attachments/assets/f9734246-3d39-4733-99a0-7051cf230acc" width="300" height="500">
    <img src="https://github.com/user-attachments/assets/990c2dc0-39e8-4f3f-819b-8648635b1abc" width="300" height="500">
</div>

<br/>

[🔼 목차로 돌아가기](#목차)

<br/>

## :eyes: 산출물

|                  API명세서1                  |                  API명세서2                  |
| :----------------------------------------------: | :----------------------------------------------: |
| ![API명세서](https://github.com/user-attachments/assets/b52d462c-7d8a-4abf-98af-5b984128dccf) | ![API 상세](https://github.com/user-attachments/assets/1689e9be-2e43-4ced-a5f7-039438f0c481) |



---

|             ERD              |
| :--------------------------: |
| ![ERD](https://github.com/user-attachments/assets/fb581247-0d29-4533-ab7c-428e60bd394f) |

---

|                   시스템 구조도                   |
| :-----------------------------------------------: |
| ![시스템구조도](https://github.com/user-attachments/assets/5616e06c-c850-4163-8fe1-b11781cc107a) |

---

## 지라 번다운 차트
|                 1주차 스프린트                  |                 2주차 스프린트                  |                 3주차 스프린트                  |
| :---------------------------------------------: | :---------------------------------------------: | :---------------------------------------------: |
| ![번다운차트2](https://github.com/user-attachments/assets/635865b2-63f5-4fce-8e4d-1260f168d481) | ![번다운차트3](https://github.com/user-attachments/assets/448df425-81bf-4d10-affc-c9839067255e) | ![번다운차트4](https://github.com/user-attachments/assets/b50c76f7-cc55-4a4d-b569-64c1aeaae0ca) |

|                  4주차 스프린트                  |                  5주차 스프린트                  |
| :----------------------------------------------: | :----------------------------------------------: |
| ![번다운차트2](https://github.com/user-attachments/assets/65b7ec37-5982-4fc9-9589-171a55c59c81) | ![번다운차트3](https://github.com/user-attachments/assets/c154df6e-b446-4539-8105-dbe3e1d726ea) |

<br>

[🔼 목차로 돌아가기](#목차)

<br/>

## :books: 파일 구조도

### FrontEnd

```
📦 frontend
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

```

### BackEnd

```
📦 backend/memetionary
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
```
<br>

[🔼 목차로 돌아가기](#목차)

<br/>

### 마치며

## :boy: 팀원
<table>
    <tr>
        <td height="140px" align="center"> <a href="https://github.com/kkkhhh4930">
            <img src="https://github.com/user-attachments/assets/9244bfd2-8f59-4b96-960e-a6d7c740dbd6" width="140px" /> <br><br> 👑 강현후<br>(팀장/Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/yjjj1612">
            <img src="https://github.com/user-attachments/assets/aaf3be42-4628-4dac-b8ef-9e5bc6cb0201" width="140px" /> <br><br> 🎀 손유진<br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/jiu6525">
            <img src="https://github.com/user-attachments/assets/506c294d-750c-41cd-8f54-474e1774c55d" width="140px" /> <br><br> 🐲 강지우<br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/kinterlocked">
            <img src="https://github.com/user-attachments/assets/67ce3b54-8f22-4435-a43d-7faf220ffd52" width="140px" /> <br><br> 🌳 김연동<br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/Al17OTON">
            <img src="https://github.com/user-attachments/assets/d1b3e393-1753-4763-91ee-b35996aec8d3" width="140px" /> <br><br> 🧸 임 권<br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/hyungorithm">
            <img src="https://github.com/user-attachments/assets/beb7be4a-b265-4530-8059-3bb3c7990eb7" width="140px" /> <br><br> 🦦 김성현<br>(Back-End) </a> <br></td>
    </tr>
</table>

## :mega: 소감

😊 강현후  
😎 손유진  
🍇 김성현  
🏡 임 권  
🥳 김연동  
👶 강지우  

## :seedling: 회고 기록

