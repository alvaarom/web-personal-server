FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 3977

CMD ["yarn", "start"]