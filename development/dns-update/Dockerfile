FROM alpine:latest

# Install required packages
RUN apk --no-cache add bash curl

# Copy your bash script into the container
COPY dynamic-dns-ping.sh /usr/local/bin/dynamic-dns-ping.sh

# Give execute permissions to the script
RUN chmod +x /usr/local/bin/dynamic-dns-ping.sh

# Add a cron job
# Add a cron job directly in the Dockerfile
RUN echo "* * * * * /usr/local/bin/dynamic-dns-ping.sh 2>&1" > /etc/crontabs/root


# Start cron in the foreground
CMD crond -f
