# Use an official Nginx image as the base image
FROM nginx

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y nodejs npm &&\
    rm -rf /var/lib/apt/lists/*

#Install PM2 manager globally
RUN npm install pm2@latest -g

# Set the working directory to /app
WORKDIR /app

# Copy PM2 configuration file
COPY ecosystem.config.js ./

# Copy Nginx configuration and template files
COPY ./nginx/nginx.conf /etc/nginx/
COPY ./nginx/conf.d/ /etc/nginx/templates/

# Clone ElfinConnectWeb repository
RUN git clone --branch development https://github.com/Aranyalma2/elfinConnectWeb.git

# Clone ElfinConnectServer repository
RUN git clone --branch development https://github.com/Aranyalma2/elfinConnectServer.git

WORKDIR /app/elfinConnectWeb
# Install app dependencies
RUN npm install

WORKDIR /app/elfinConnectServer
# Install app dependencies
RUN npm install

# Expose port 80,443,8080,8443
EXPOSE 80
EXPOSE 8080
EXPOSE 443
EXPOSE 8443

WORKDIR /
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

# PM2
WORKDIR /app 

CMD ["sh", "-c", "nginx && pm2-runtime start ecosystem.config.js --env development"]