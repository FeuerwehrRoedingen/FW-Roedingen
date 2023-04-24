#!/bin/bash

# This script is run after the build process is complete.
# It is run in the context of the build container.

mv .next/standalone/apps/server/internal/.next .next/standalone
mv -f .next/standalone/apps/server/internal/package.json .next/standalone
mv .next/standalone/apps/server/internal/server.js .next/standalone
mv .next/standalone/apps/server/node_modules .next/standalone

rm -rf .next/standalone/apps
rm -rf .next/standalone/shared
