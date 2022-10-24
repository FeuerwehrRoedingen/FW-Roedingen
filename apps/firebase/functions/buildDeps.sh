cd ../../..
npx turbo run build --filter=fw-roedingen-backend --filter=fw-roedingen-oauth
cd apps/firebase/functions

if [ -d "lib" ]; then
  rm -rf lib
fi

mkdir lib

cp -R ../../api/dist lib/api
cp -R ../../oauth/dist lib/oauth
