package common

import (
	"context"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func WaitForShutdown(httpServer *http.Server, isShuttingDown *bool) {
	quit := make(chan os.Signal, 1)

	// syscall.SIGINT  --> kill -2 --> CTRL-C
	// syscall.SIGTERM --> kill -9 --> k8s
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	// create context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// and let's go!
	slog.Info("shutdown: started")
	*isShuttingDown = true

	// shutdown http-server
	if httpServer != nil {
		err := httpServer.Shutdown(ctx)
		if err != nil {
			slog.Error("gin: %s", "error", err)
		}
		slog.Info("gin: shutdown completed")
	}

	slog.Info("shutdown: completed")
}
