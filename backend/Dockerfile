# backend/Dockerfile
FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .

# ติดตั้ง postgresql-client ไว้ ping DB
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

EXPOSE 8000

# รอ DB แล้วค่อย start
CMD ["sh","-c","echo '⏳ Waiting for PostgreSQL at '\"$DB_HOST:$DB_PORT\"' ...'; \
until pg_isready -h\"$DB_HOST\" -p\"$DB_PORT\" -U\"$DB_USER\"; do sleep 2; done; \
echo '✅ PostgreSQL ready'; exec node server.js"]
