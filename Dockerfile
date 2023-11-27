FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --silent
RUN npm install -g typescript
RUN npm install -g sequelize-cli
RUN npm install -g sequelize-typescript
COPY . /usr/src/app
RUN npm run build
CMD ["npm", "run", "start"]