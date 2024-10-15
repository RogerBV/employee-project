FROM node:18.20.3

WORKDIR /app
COPY ./backend/package.json /app/

RUN npm install

COPY backend/ /app/

RUN npm run prisma:generate

EXPOSE 3000

CMD npm run start
