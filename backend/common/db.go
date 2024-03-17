package common

import (
	"database/sql"
	"fmt"
	"log/slog"
	"os"
	"sync"
)

var (
	// databases is a map of database connections
	databases = make(map[string]*sql.DB, 0)
	// Mutex for db
	databaseLock sync.Mutex
	// maxConnections is the maximum number of connections to the database
	MaxConnections = 5
)

func GetDB(name string) (*sql.DB, error) {
	databaseLock.Lock()
	defer databaseLock.Unlock()

	// Check if the database is already in the map
	if db, ok := databases[name]; ok {
		return db, nil
	}

	// Get the database connection string
	database, err := sql.Open("postgres", DB_ConnectionString(name))
	if err != nil {
		slog.Error("Error opening database", "error", err)
		return nil, err
	}

	// Set the maximum number of connections
	database.SetMaxOpenConns(MaxConnections)
	database.SetMaxIdleConns(MaxConnections / 2)

	// Add the database to the map
	databases[name] = database

	return database, nil
}

// ------------------------------------
// Get stuff from Env
// ------------------------------------

// DB_HOST returns the database host
func DB_HOST() string {
	value, ok := os.LookupEnv("DB_HOST")
	if !ok {
		return "localhost"
	}
	return value
}

// DB_HOST_RO returns the database host read only
func DB_HOST_RO() string {
	value, ok := os.LookupEnv("DB_HOST_RO")
	if !ok {
		return "localhost"
	}
	return value
}

// DB_PORT returns the database port
func DB_PORT() string {
	value, ok := os.LookupEnv("DB_PORT")
	if !ok {
		return "5432"
	}
	return value
}

// DB_PORT_RO returns the database port read only
func DB_PORT_RO() string {
	value, ok := os.LookupEnv("DB_PORT_RO")
	if !ok {
		return "5432"
	}
	return value
}

// DB_USER returns the database user
func DB_USER() string {
	value, ok := os.LookupEnv("DB_USER")
	if !ok {
		return "postgres"
	}
	return value
}

// DB_PASSWORD returns the database password
func DB_PASSWORD() string {
	value, ok := os.LookupEnv("DB_PASSWORD")
	if !ok {
		return "password"
	}
	return value
}

// DB_SSL
func DB_SSL() string {
	value, ok := os.LookupEnv("DB_SSL")
	if !ok {
		return "disable"
	}
	return value
}

// ------------------------------------
// helpers
// ------------------------------------

// DB_ConnectionString returns the connection string for the database
func DB_ConnectionString(name string) string {
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?timezone=UTC&sslmode=%s", DB_USER(), DB_PASSWORD(), DB_HOST(), DB_PORT(), name, DB_SSL())
}

// DB_ConnectionStringReadOnly
func DB_ConnectionStringReadOnly(name string) string {
	return fmt.Sprintf("postgres://%s:%s@%s:%s/%s?timezone=UTC&sslmode=%s", DB_USER(), DB_PASSWORD(), DB_HOST_RO(), DB_PORT_RO(), name, DB_SSL())
}
