#!/bin/bash

# This script is run after the build process is complete.
# It is run in the context of the build container.

cp -R public .next/standalone/apps/internal/public
cp -R .next/static .next/standalone/apps/internal/.next/static
