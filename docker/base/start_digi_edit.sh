#!/bin/bash

#DEFAULT_GATEWAY=`ip route show | grep "default via" | grep -E -o "[0-9]+\.[0-9]+\.[0-9]+\.[0-9]"`
#
#sed -i -e "s#trusted_proxy =.*#trusted_proxy = ${DEFAULT_GATEWAY}#g" \
#       /etc/digi-edit/production.ini

# Setup the database
digi_edit -c /etc/digi-edit/production.ini init-db
while [ $? -ne 0 ]
do
    sleep 10
    digi_edit -c /etc/digi-edit/production.ini init-db
done

# Run the web application
pserve /etc/digi-edit/production.ini
