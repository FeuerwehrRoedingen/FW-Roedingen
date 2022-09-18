npx turbo-ignore fw-roedingen-backend
npm run build:api

if [ $? -eq 0 ] ; then
  exit 0
fi

exit 0 
