# Elfin Connect deployment process
Deploy the service in Docker. Has certificate generation method with certbot, or use already genereted certificate.

------------

## Installation in Production Enviroment

Elfin connect server side requires docker and docker compose.

Build the *elfin-production* container:

```sh
cd production
mkdir -p certbot/conf && mkdir -p certbot/www
docker build -t elfin-production:latest .
```

### Generate new certificate
Start a mock webserver for certificate generation.

```sh
docker run -d \
  --name mock-nginx \
  -p 80:80 \
  -p 443:443 \
  -e NGINX_HOST='[YOUR_DOMAIN]' \
  -v /mock/conf:/etc/nginx/conf.d \
  -v ./certbot/www:/var/www/certbot \
  -v ./certbot/conf:/etc/letsencrypt \
  nginx:latest
```

Run *certbot* for certificate generate.

```sh
docker run -it --rm \
  --name certbot \
  -v ./certbot/www:/var/www/certbot \
  -v ./certbot/conf:/etc/letsencrypt \
  certbot/certbot:latest \
  certonly --webroot --webroot-path /var/www/certbot/ -d test.remoteconnect.hu
```
After a valid certificate, delete the mock webserver.

```sh
docker rm mock-nginx
```

### Place existing certificate
> (Ignore this if you used upper certbot method)

The webserver container will pull the certificate files under the **./certbot/conf/[YOUR_DOMAIN]/** NGNIX need **ssl_certificate** and **ssl_certificate_key values**.

- ssl_certificate from: ./certbot/conf/[YOUR_DOMAIN]/fullchain.pem;
- ssl_certificate_key from: ./certbot/conf/[YOUR_DOMAIN]/privkey.pem;

## Start Elfin Connect Service
Set your domain name in docker-compose.yml (line 23).

```yml
    environment:
      - NGINX_HOST=[YOUR-DOMAIN]
```
Create and run compose stack:

```sh
docker compose up -d
```