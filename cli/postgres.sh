#!/bin/bash

# -----------------------------------------------
# Postgres
# -----------------------------------------------

# get the sql statement
database=$1
sql_statement=$2

# execute the sql statement
psql postgresql://postgres:password@localhost:5432/$database -c "$sql_statement" || {
    echo "Failed to execute the sql statement"
    exit 1
}
