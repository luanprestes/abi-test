FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN rm -rf infra && mkdir infra

EXPOSE 3000

CMD ["npm", "run", "deploy"]
