FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN sudo npm install 
RUN sudo npm install typescript -g
COPY . /usr/src/app
RUN sudo npm run build
CMD ["npm", "run", "start"]