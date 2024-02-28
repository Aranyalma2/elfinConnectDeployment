#!/bin/bash

if [ -z "$DYNAMIC_DNS_URL" ]; then
  echo "DYNAMIC_DNS_URL not defined. Skipping ping."
else
  echo "Pinging $DYNAMIC_DNS_URL"
  curl $DYNAMIC_DNS_URL
fi
