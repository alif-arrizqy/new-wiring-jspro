FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --silent
RUN npm install typescript -g
COPY . /usr/src/app
RUN npm run build
CMD ["npm", "run", "start"]