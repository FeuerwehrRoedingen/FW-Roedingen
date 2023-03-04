#!/bin/bash

cd app && \
configurable-http-proxy \
  --ip=10.21.21.221 \
  --port=8020 \
  --api-ip=127.0.0.1 \
  --api-port=8021 \
  --default-target=http://localhost:8080 \
  --error-target=http://localhost:8080/hub/error \
