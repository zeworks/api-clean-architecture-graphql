# stage 1 building the code
FROM node as builder
WORKDIR /usr/app
COPY package*.json .env ./
RUN npm install
COPY . .
RUN npm run build

# stage 2
FROM node
WORKDIR /usr/app
COPY package*.json .env ./
RUN npm install --production

COPY --from=builder /usr/app/dist ./dist

COPY .env .

EXPOSE 4000
CMD node dist/src/server.js
