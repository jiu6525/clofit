소개
📖 개요
👏 SSAFY 11기 2학기 자율 프로젝트 👏
2023.10.14 ~ 2023.11.19 (6주)

(깃허브 메인 이동 버튼 추가)

💡 프로젝트 기획

배경
________________________________________


(깃허브 메인 이동 버튼 추가)

🌵 빌드 환경
FrontEnd	BackEnd	Database	Infra
React 18.2.0	Java 17 (Azul Zulu version 17.0.8)	MySQL 8.0.33	Vultr EC2 (Ubuntu 20.04 LTS)
Next.js 13.5.4	Spring Boot 3.1.4	Redis 7.2.1	Vultr Kubernetes 1.27.6
TypeScript 5.2.2	Gradle 8.2.1	Elasticsearch 8.7.1	Nginx 1.18.0
Recoil 0.7.7	Spring Data JPA		Jenkins 2.427
React-Query 5.0.5	IntelliJ IDEA 2023.1.3
(Ultimate Edition)		Docker latest
ModuleCSS	lombok		LoadBalancer
HTML5	JWT		
yarn berry 3.6.4			
node 18.17.1 LTS			


(깃허브 메인 이동 버튼 추가)

구현
🎯 주요 페이지 및 기능
메인 페이지

소셜 로그인 & 회원가입 & 닉네임 검사



(깃허브 메인 이동 버튼 추가)

(상세 기능 추가)



(깃허브 메인 이동 버튼 추가)

👀 산출물
요구사항명세서


API 명세서	API 명세서(세부)
	

ERD


시스템 구조도	지라 이슈
	
지라 번다운 차트
1주차 스프린트	2주차 스프린트	3주차 스프린트
		

4주차 스프린트	5주차 스프린트	6주차 스프린트
		
최종발표 PPT



(깃허브 메인 이동 버튼 추가)

📚 파일 구조도
FrontEnd
📦frontend
 ┣ 📂.next
 ┣ 📂.storybook
 ┣ 📂public
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂form
 ┃ ┃ ┣ 📂login
 ┣ 📂src
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂(main)
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┃ ┣ 📂KakaoLoginButton
 ┃ ┃ ┃ ┃ ┃ ┗ 📂NaverLoginButton
 ┃ ┃ ┃ ┣ 📂nickname
 ┃ ┃ ┃ ┗ 📂redirect
 ┃ ┃ ┣ 📂create
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📂test
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┃ ┣ 📂CreateButton
 ┃ ┃ ┃ ┣ 📂DeleteButton
 ┃ ┃ ┃ ┣ 📂IndexButton
 ┃ ┃ ┃ ┣ 📂LikeButton
 ┃ ┃ ┃ ┣ 📂LogoutButton
 ┃ ┃ ┃ ┣ 📂PaginationButton
 ┃ ┃ ┃ ┣ 📂ReportButton
 ┃ ┃ ┃ ┣ 📂RouteButton
 ┃ ┃ ┃ ┣ 📂ShareButton
 ┃ ┃ ┃ ┣ 📂VoteButton
 ┃ ┃ ┃ ┣ 📂WordVoteButton
 ┃ ┃ ┣ 📂Card
 ┃ ┃ ┣ 📂Form
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┣ 📂Input
 ┃ ┃ ┃ ┣ 📂SearchInput
 ┃ ┃ ┃ ┗ 📂ValueInput
 ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📂Skeleton
 ┃ ┃ ┗ 📂Textarea
 ┃ ┣ 📂context
 ┃ ┣ 📂store
 ┃ ┣ 📂stories
 ┃ ┃ ┗ 📂assets
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📂loader
 ┃ ┗ 📂vendor
 ┗ 📜yarn.lock

BackEnd

📦backend/memetionary
 ┣ 📂gradle
 ┃ ┗ 📂wrapper
 ┃ ┃ ┣ 📜gradle-wrapper.jar
 ┃ ┃ ┗ 📜gradle-wrapper.properties
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂ssafy
 ┃ ┃ ┃ ┃ ┃ ┗ 📂memetionary
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂declaration
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂hashtag
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂link
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂member
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂oauth2
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂filter
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂handler
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂token
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂util
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂word
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂wordes
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂document
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┗ 📂resources
 ┃ ┃ ┃ ┣ 📂elasticsearch
 ┃ ┗ 📂test
 ┃ ┃ ┗ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂ssafy
 ┃ ┃ ┃ ┃ ┃ ┗ 📂memetionary
 ┣ 📜build.gradle
 ┣ 📜Dockerfile



(깃허브 메인 이동 버튼 추가)

마치며
👦 팀원
(웹 페이지 등록)

팀원 역할 상세


(깃허브 메인 이동 버튼 추가)

📣 소감

😊 강현후
😎 손유진
🍇 김성현

🏡 임 권
🥳  김연동
👶 강지우

🌱 회고 기록

