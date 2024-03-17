#!/bin/bash

set -e

# -----------------------------------------------
# Run a microservice
# -----------------------------------------------

# Print the usage
usage() {
  echo "
    Run a microservice

    Usage: run.sh -n <microservice name>

    Options:
    -n  The name of the microservice
    -h  Display this help message"
    exit 0
}

# Flags
n_flag=""      # microservice name

# Parse the flags
while getopts 'hn:' flag; do
  case "${flag}" in
    h) usage ;;
    n) n_flag="${OPTARG}" ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done

# Check if the microservice name is empty
microserviceName=$n_flag
if [ -z "$microserviceName" ]; then
    echo "Microservice name is required"
    exit 1
fi

# Check if the microservice name exists
if [ ! -d "backend/$microserviceName" ]; then
    echo "Microservice $microserviceName does not exist"
    exit 1
fi

# Run the sql setup
psql postgresql://postgres:password@localhost:5432/postgres -f backend/$microserviceName/.sql/setup.sql || {
    echo "Failed to run the sql setup"
    exit 1
}


echo "Running microservice $microserviceName"

# Run the microservice
cd backend/$microserviceName
npx nodemon --ext go --exec go run main.go --signal SIGTERM --watch api --watch main.go
