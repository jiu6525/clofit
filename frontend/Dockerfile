FROM node:20 AS build

RUN mkdir /next

WORKDIR /next

COPY . .

# RUN npm install --legacy-peer-deps
RUN npm install

RUN npm run build

# 컨테이너 실행 시 서버 시작, RUN으로 실행 시 빌드 무한루프 발생
CMD [ "npm", "run", "start" ]

# RUN ls

# FROM nginx:latest

# WORKDIR /

# COPY --from=build /react/build /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf

# COPY nginx/nginx.conf /etc/nginx/conf.d

# # EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]