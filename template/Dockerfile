FROM node:alpine
MAINTAINER {{ author }}

ADD . /usr/src/app

RUN apk add --no-cache bash \
    && cd /usr/src/app && npm i \
    && npm run build && npm prune --production

WORKDIR /usr/src/app

CMD ["npm", "run", "start"]
