package common

import (
	"log/slog"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// GinLogging logs incoming requests and adds information from gin as additional fields.
// Logs will be generated as Info, except for client errors (4xx, warning) and server errors (5xx, error).
func GinLogging() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()

		attrs := []slog.Attr{
			slog.Group(
				"request",
				slog.Int("status", c.Writer.Status()),
				slog.String("method", c.Request.Method),
				slog.String("path", c.Request.URL.Path),
				slog.String("ip", c.ClientIP()),
				slog.Duration("latency", time.Since(start)),
				slog.String("user-agent", c.Request.UserAgent()),
			),
		}

		level := slog.LevelDebug
		if c.Writer.Status() >= http.StatusBadRequest && c.Writer.Status() < http.StatusInternalServerError {
			level = slog.LevelWarn
		} else if c.Writer.Status() >= http.StatusInternalServerError {
			level = slog.LevelError
		}

		slog.LogAttrs(c.Request.Context(), level, "http request", attrs...)
	}
}
