FROM node:21
WORKDIR /noti
COPY . /noti
RUN yarn 
CMD yarn start:dev