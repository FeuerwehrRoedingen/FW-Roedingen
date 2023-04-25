#!/bin/bash

# This script is run after the build process is complete.
# It is run in the context of the build container.

rm -rf .next/standalone/shared
rm .next/standalone/package.json

mv .next/standalone/apps/internal/.next .next/standalone
mv .next/standalone/apps/internal/package.json .next/standalone
mv .next/standalone/apps/internal/server.js .next/standalone
mv .next/standalone/apps/internal/.env .next/standalone

rm -rf .next/standalone/apps 

cp -R public .next/standalone/public
cp -R .next/static .next/standalone/.next/static
