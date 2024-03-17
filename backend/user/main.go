package main

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"strconv"

	"FW-Roedingen/backend/common"
	"FW-Roedingen/backend/user/api"
	"FW-Roedingen/backend/user/api/metrics"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

const (
	// publicBaseURL is the base URL for the public API.
	publicBaseURL = "/api/v1/user"
	// databaseName is the name of the database to use.
	databaseName = "users"
)

var (
	isShuttingDown = common.CreateBool(false)
	port           = os.Getenv("PORT")
)

func main() {
	// Load the .env file
	if err := godotenv.Load(); err != nil {
		slog.Warn("No .env file found")
		os.Exit(1)
	}

	// setup env dependent vars
	poolSize, err := strconv.ParseInt(os.Getenv("DB_POOL_SIZE"), 10, 64)
	if err != nil {
		slog.Error("parsing DB_POOL_SIZE, using default of 5", "error", err)
		poolSize = 5
	}
	common.MaxConnections = int(poolSize)

	// run database migrations
	if err := common.DBMigration(databaseName, "file://.sql/migrations"); err != nil {
		slog.Error("Error running database migrations", "error", err)
		os.Exit(1)
	}

	// get a connection to the database pool
	pool, err := common.GetPool(databaseName)
	if err != nil {
		slog.Error("Error getting database pool", "error", err)
		os.Exit(1)
	}

	// test the database connection
	if err := pool.Ping(context.Background()); err != nil {
		slog.Error("Error pinging database", "error", err)
		os.Exit(1)
	}

	// Set up gin
	g := gin.New()
	g.TrustedPlatform = gin.PlatformCloudflare
	g.Use(common.GinLogging(), gin.Recovery())
	metrics.InitPrometheusMetrics(g)

	v1 := g.Group(publicBaseURL)
	api.CreateController(v1)

	// Set up the http server
	if len(port) == 0 {
		port = "8080"
	}
	httpServer := &http.Server{
		Addr:    fmt.Sprintf(":%s", port),
		Handler: g,
	}

	// Start the server.
	go func() {
		slog.Info("http-server started on http://localhost:" + port)
		if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			slog.Error("listen", "error", err)
			os.Exit(1)
		}
	}()

	// Wait for the server to shut down.
	common.WaitForShutdown(httpServer, isShuttingDown)
	slog.Info("http-server stopped")
}
