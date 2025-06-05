FROM node:22-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json tsconfig.json nest-cli.json ./
COPY src ./src
RUN npm install --silent
RUN npm run build
EXPOSE 3002
CMD ["node", "dist/main.js"]
