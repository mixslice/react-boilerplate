FROM daocloud.io/zzq889/alpine-node-yarn

RUN mkdir /app
WORKDIR /app

# install packages
COPY package.json /app
COPY yarn.lock /app
RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
