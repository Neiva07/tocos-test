FROM node:latest
WORKDIR /server
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["npm","start"]
