FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
# CMD ["nodemon", "--watch", ".", "--ext", "ts,js,json", "src/server.ts"]
