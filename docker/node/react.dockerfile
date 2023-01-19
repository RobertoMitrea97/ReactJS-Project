FROM node:lts-bullseye

WORKDIR /var/www

RUN apt-get update

RUN apt-get install -y nano mc

CMD ["npm", "start"]
