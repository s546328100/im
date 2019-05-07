FROM node:lts-alpine
RUN mkdir app
COPY . /app
WORKDIR /app
RUN yarn config set registry 'https://registry.npm.taobao.org'&&yarn
EXPOSE 3001