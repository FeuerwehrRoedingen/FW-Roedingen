npx turbo-ignore fw-roedingen-backend

if [ $? -eq 0 ] ; then
  exit 0
fi

npm run build:api
