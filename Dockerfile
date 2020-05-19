FROM node:13-alpine
# Create app directory
WORKDIR /app
# Installing dependencies
COPY package* ./
RUN npm install --production
# Copying source files
COPY . .
# Building app
RUN npm run build
EXPOSE 3000
CMD ["npm", "run start"]