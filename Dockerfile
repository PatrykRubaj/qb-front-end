FROM node:14 as build

# Create app directory
WORKDIR /usr/src/quantumbudget

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run build

CMD [ "npm", "start" ]
EXPOSE 80
