FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 8081

# ให้ Metro เปิดออกนอกคอนเทนเนอร์
CMD ["npx", "react-native", "start", "--host", "0.0.0.0", "--port", "8081"]
