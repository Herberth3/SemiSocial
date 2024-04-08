FROM node:18-alpine
COPY . /app
WORKDIR /app/dist
RUN npm install
EXPOSE 5000
CMD ["npm","start"]
