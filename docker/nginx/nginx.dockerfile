FROM nginx

ARG VHOST_FILE

WORKDIR /var/www

COPY ./docker/nginx/vhost_dev.conf /etc/nginx/conf.d/custom.conf

RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

RUN apt-get update

RUN apt-get install -y nano mc
