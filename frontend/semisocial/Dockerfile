### STAGE 1: Build ###
FROM node:16-alpine AS node
WORKDIR /frontend
COPY . .
RUN npm install 
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.21.6-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /frontend/dist/ /usr/share/nginx/html
EXPOSE 80
