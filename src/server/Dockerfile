FROM node:16-alpine as builder

ENV PORT=5500 

RUN mkdir /app
COPY ./package.json /app
COPY ./yarn.lock /app
WORKDIR /app
RUN yarn install
RUN npx prisma generate
COPY . .

CMD ["yarn", "dev"]
EXPOSE 5500
