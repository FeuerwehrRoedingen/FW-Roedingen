npx browserify src/components/hydrateLogin.ts -p [ tsify -p tsconfig.build.json ] > public/js/bundle_login.js
npx browserify src/components/hydrateSignup.ts -p [ tsify -p tsconfig.build.json ] > public/js/bundle_signup.js
