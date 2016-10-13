FROM node:argon

RUN mkdir /app
WORKDIR /app

# install packages
ADD .npmrc /app/.npmrc
ADD package.json /app/package.json
RUN npm install

# babel-node config
ADD webpack.config.js /app/webpack.config.js
ADD .babelrc /app/.babelrc
ADD server.js /app/server.js
ADD index.html /app/index.html

EXPOSE 3000

CMD ["npm", "start"]
