# Elfin Connect deployment process
Deploy the service in Docker. Support certificate generation method with certbot, or use already genereted certificate. Support Dynamic-DNS updating by HTTP fetch.

------------

## Install and Deploy in Production Enviroment

Elfin connect server side requires docker and docker compose.

Build the *elfin:production* container:

```sh
cd production
mkdir -p certbot/conf && mkdir -p certbot/www
docker build -t elfin:production .
```

### Generate new certificate
Start a mock webserver for http based certifaction.

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

Run *certbot* for generate certificate, change [YOUR_DOMAIN].

```sh
docker run -it --rm \
  --name certbot \
  -v ./certbot/www:/var/www/certbot \
  -v ./certbot/conf:/etc/letsencrypt \
  certbot/certbot:latest \
  certonly --webroot --webroot-path /var/www/certbot/ -d [YOUR_DOMAIN]
```
After a valid certificate, delete the mock webserver conatainer.

```sh
docker rm mock-nginx
```

### Place existing certificate
> (Ignore this if you used the upper certbot method)

The webserver container will pull the certificate files under the **./certbot/conf/[YOUR_DOMAIN]/** NGNIX need **ssl_certificate** and **ssl_certificate_key values**.

- ssl_certificate from: ./certbot/conf/[YOUR_DOMAIN]/fullchain.pem;
- ssl_certificate_key from: ./certbot/conf/[YOUR_DOMAIN]/privkey.pem;

## How to start Elfin Connect Service
> [!IMPORTANT]
>Set your domain name in docker-compose.yml (line 24).

```yml
    environment:
      - NGINX_HOST=[YOUR-DOMAIN]
```

#### Optional dynamic dns
If your public DNS provider use dynamic DNS update by HTTP fetching.
* Build dns-update image.
```sh
cd dns-update
docker build -t dns-update:latest .
```
* Uncomment dynamic-dns service (line 28-32).
```yml
  dynamic-dns:
    image: dns-update
    restart: always
    environment:
      - DYNAMIC_DNS_URL=[PUBLIC_DNS_PROVIDER_ADDRESS]
```
* Set URL in docker-compose.yml (line 32).

```yml
    environment:
      - DYNAMIC_DNS_URL=[PUBLIC_DNS_PROVIDER_ADDRESS]
```

### Create and run compose stack

```sh
docker compose up -d
```

> [!CAUTION]
> Certbot method use Let's Encrypt certifacte only valid for 3 month, you have to renew it for proper working.
```sh
docker run -it --rm --name certbot -v ./certbot/www:/var/www/certbot -v ./certbot/conf:/etc/letsencrypt certbot/certbot:latest renew
```