#!/bin/sh

if [ ! -f /etc/asterisk/modules.conf ]; then
    # Installing Asterisk basic configuration files
    echo "ERROR: /etc/asterisk/modules.conf not found"
    cd /usr/src/asterisk-20.5.2
    make basic-pbx
fi

if [ "$1" = "" ]; then
  # This works if CMD is empty or not specified in Dockerfile
  exec asterisk -vvvc -U root 
else
  exec "$@"
fi
