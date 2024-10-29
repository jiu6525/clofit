FROM node:20 AS build

RUN mkdir /next

WORKDIR /next

COPY . .

# RUN npm install --legacy-peer-deps
RUN npm install

RUN npm run build
RUN npm run start

# RUN ls

# FROM nginx:latest

# WORKDIR /

# COPY --from=build /react/build /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf

# COPY nginx/nginx.conf /etc/nginx/conf.d

# # EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]