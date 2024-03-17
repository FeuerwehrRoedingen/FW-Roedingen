#!/bin/bash

directory=$(dirname -- $(readlink -fn -- "$0"))

# -----------------------------------------------
# Create a new microservice in the backend folder
# -----------------------------------------------

# Print the usage
usage() {
  echo "
    Create a new microservice in the backend folder

    Usage: create_microservice.sh [-g] -n <microservice name>

    Options:
    -g  Create a GraphQL datasource
    -n  The name of the microservice
    -h  Display this help message"
    exit 0
} 

# Flags
n_flag=""      # microservice name
g_flag=false   # create graphql datasource

# Parse the flags
while getopts 'ghn:' flag; do
  case "${flag}" in
    g) g_flag=true ;;
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

# Check if the microservice name is already in use
if [ -d "backend/$microserviceName" ]; then
    echo "Microservice $microserviceName already exists"
    exit 1
fi

echo "Creating microservice $microserviceName"

# Create the new microservice folders
mkdir -p backend/$microserviceName
mkdir -p backend/$microserviceName/.kubernetes
mkdir -p backend/$microserviceName/.sql
mkdir -p backend/$microserviceName/.sql/migrations
mkdir -p backend/$microserviceName/api
mkdir -p backend/$microserviceName/api/handlers
mkdir -p backend/$microserviceName/api/services
mkdir -p backend/$microserviceName/api/metrics

# Create the new microservice files
touch backend/$microserviceName/main.go
touch backend/$microserviceName/api/services/$microserviceName.go

touch backend/$microserviceName/Dockerfile
touch backend/$microserviceName/.env

touch backend/$microserviceName/.kubernetes/deployment.yaml
touch backend/$microserviceName/.kubernetes/service.yaml
touch backend/$microserviceName/.kubernetes/ingress.yaml

touch backend/$microserviceName/.sql/schema.sql
touch backend/$microserviceName/.sql/migrations/0_initalize.sql

# Copy main.go template and replace the microservice name
cp ${directory}/.template/main.gotmpl backend/$microserviceName/main.go
sed -i '' "s/{{NAME}}/$microserviceName/g" backend/$microserviceName/main.go

# Copy controller template and replace the microservice name
cp ${directory}/.template/controller.gotmpl backend/$microserviceName/api/controller.go
sed -i '' "s/{{NAME}}/$microserviceName/g" backend/$microserviceName/api/controller.go

# Copy metrics template and replace the microservice name
cp ${directory}/.template/metrics.gotmpl backend/$microserviceName/api/metrics/metrics.go
sed -i '' "s/{{NAME}}/$microserviceName/g" backend/$microserviceName/api/metrics/metrics.go

# Add package name to service file
echo "package services" > backend/$microserviceName/api/services/$microserviceName.go

# Copy Dockerfile template
cp ${directory}/.template/Dockerfile backend/$microserviceName/Dockerfile

# Copy sql setup template and replace the microservice name
cp ${directory}/.template/setup.sqltmpl backend/$microserviceName/.sql/setup.sql
sed -i '' "s/{{NAME}}/$microserviceName/g" backend/$microserviceName/.sql/setup.sql

# fix go module file
cd backend
go mod tidy
cd ..

# check if the g_flag is set
if [ "$g_flag" = true ]; then
    # create graphql datasource
    createQraphQL="y"
else
    read -p "Create GraphQL DataSource?: (y/N) " createQraphQL
fi

if [ "$createQraphQL" == "y" ]; then
    # check if the graphql folder exists
    if [ ! -d "graphql/src/datasources" ]; then
       mkdir -p graphql/src/datasources
    fi

    # Create the new graphql datasource
    echo "Creating graphql datasource for $microserviceName"

    lowercase="$(tr '[:upper:]' '[:lower:]' <<< ${microserviceName:0:1})${microserviceName:1}"
    uppercase="$(tr '[:lower:]' '[:upper:]' <<< ${microserviceName:0:1})${microserviceName:1}"

    # Copy the graphql template
    cp ${directory}/.template/datasource.ts graphql/src/datasources/$lowercase.ts
    sed -i '' "s/__NAME__/$uppercase/g" graphql/src/datasources/$lowercase.ts

    # Add the new datasource to the Context type
    sed -i '' "s#// datasource imports#// datasources\nimport \{ ${uppercase}API \} from \'dataSources/${lowercase}.ts\'#g" graphql/src/context.d.ts

    # Add the new datasource to the Context object
    sed -i '' "s/datasources: {/datasources: {\n        "${lowercase}API": "${uppercase}API"/g" graphql/src/context.d.ts
fi
