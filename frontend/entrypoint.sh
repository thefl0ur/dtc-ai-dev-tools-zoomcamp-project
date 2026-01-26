#!/bin/sh
# entrypoint.sh

# Ensure VUE_APP_API_URL is set, otherwise use a default value
if [ -z "$VUE_APP_API_URL" ]; then
  echo "Warning: VUE_APP_API_URL is not set, using default value"
  export VUE_APP_API_URL="http://localhost:8000"
fi

# Extract the host from VUE_APP_API_URL for use in nginx config
export VUE_APP_API_URL_HOST=$(echo "$VUE_APP_API_URL" | sed -e 's|^[^/]*//||' -e 's|/.*$||')

# Replace environment variables in the nginx config template
envsubst '$VUE_APP_API_URL,$VUE_APP_API_URL_HOST' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Output the generated config for debugging
echo "Generated nginx config:"
cat /etc/nginx/conf.d/default.conf

# Start nginx
exec "$@"