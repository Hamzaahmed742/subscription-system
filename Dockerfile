FROM node:12.13.0-alpine
RUN mkdir -p /service/
ADD package.json yarn.lock /service/

RUN cd /service/ && yarn
COPY . /service
WORKDIR /service

ENV FORCE_COLOR=1
CMD ["yarn", "start"]
