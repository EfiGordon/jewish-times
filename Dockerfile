FROM node:13-alpine

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app
#RUN npm run build
EXPOSE 3000

# Running the app - change this to CMD "npm" "start" on production
CMD "npm" "run" "dev"