FROM node:latest
WORKDIR /server
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
EXPOSE 8080 
EXPOSE 6868
CMD ["npm","start"]
