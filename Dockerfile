FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN mkdir infra
RUN yarn install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "deploy"]
