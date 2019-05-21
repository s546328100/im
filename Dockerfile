FROM node:lts-alpine
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn config set registry 'https://registry.npm.taobao.org'&&yarn
EXPOSE 3001
CMD [ "yarn", "start" ]