package common

import (
	"context"
	"log/slog"
	"sync"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/tracelog"
)

var (
	// pools is a map of database connections
	pools         = make(map[string]*pgxpool.Pool)
	poolsReadOnly = make(map[string]*pgxpool.Pool)

	// locks
	poolLock         sync.Mutex
	poolLockReadOnly sync.Mutex
)

func GetPool(name string) (*pgxpool.Pool, error) {
	poolLock.Lock()
	defer poolLock.Unlock()

	// Check if the database is already in the map
	if db, ok := pools[name]; ok {
		return db, nil
	}

	// Get the pool config
	config, err := pgxpool.ParseConfig(DB_ConnectionString(name))
	if err != nil {
		return nil, err
	}

	// Set options
	config.MaxConns = int32(MaxConnections)
	config.ConnConfig.DefaultQueryExecMode = pgx.QueryExecModeCacheDescribe
	config.ConnConfig.Tracer = &tracelog.TraceLog{
		Logger:   NewPGXLogger(slog.Default()),
		LogLevel: tracelog.LogLevelWarn,
	}

	// Create the pool
	pool, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		return nil, err
	}

	// Add the pool to the map
	pools[name] = pool

	return pool, nil
}

func GetPoolReadOnly(name string) (*pgxpool.Pool, error) {
	poolLockReadOnly.Lock()
	defer poolLockReadOnly.Unlock()

	// Check if the database is already in the map
	if db, ok := poolsReadOnly[name]; ok {
		return db, nil
	}

	// Get the pool config
	config, err := pgxpool.ParseConfig(DB_ConnectionString(name))
	if err != nil {
		return nil, err
	}

	// Set options
	config.MaxConns = int32(MaxConnections)
	config.ConnConfig.DefaultQueryExecMode = pgx.QueryExecModeCacheDescribe
	config.ConnConfig.Tracer = &tracelog.TraceLog{
		Logger:   NewPGXLogger(slog.Default()),
		LogLevel: tracelog.LogLevelWarn,
	}

	// Create the pool
	pool, err := pgxpool.NewWithConfig(context.Background(), config)
	if err != nil {
		return nil, err
	}

	// Add the pool to the map
	poolsReadOnly[name] = pool

	return pool, nil
}
