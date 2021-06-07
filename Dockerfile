FROM node:12-alpine As build
RUN apk add --no-cache bash nano
WORKDIR /home/node/app
COPY package*.json ./
RUN npm set progress=false
RUN npm install
COPY . .
RUN npm run build

FROM node:12-alpine As deploy
RUN apk --no-cache add bash nano
SHELL ["/bin/bash", "-c"]
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /home/node/app
COPY package*.json ./
RUN npm set progress=false
RUN npm install --only=production
COPY . .
COPY --from=build /home/node/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main"]
