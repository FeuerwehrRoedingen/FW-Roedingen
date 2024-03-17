package common

import (
	"context"
	"log/slog"

	"github.com/jackc/pgx/v5/tracelog"
)

// PGXLogger is a wrapper around slog.Logger to satisfy the pgx.Logger interface
type PGXLogger struct {
	l *slog.Logger
}

// NewPGXLogger returns a new PGXLogger
func NewPGXLogger(l *slog.Logger) *PGXLogger {
	return &PGXLogger{l: l}
}

// Log delegates the logging request to the wrapped slog.Logger
func (l *PGXLogger) Log(_ context.Context, level tracelog.LogLevel, msg string, data map[string]any) {
	attrs := make([]slog.Attr, 0, len(data))
	for k, v := range data {
		attrs = append(attrs, slog.Any(k, v))
	}

	var lvl slog.Level
	switch level {
	case tracelog.LogLevelTrace:
		lvl = slog.LevelDebug - 1
		attrs = append(attrs, slog.Any("PGX_LOG_LEVEL", level))
	case tracelog.LogLevelDebug:
		lvl = slog.LevelDebug
	case tracelog.LogLevelInfo:
		lvl = slog.LevelInfo
	case tracelog.LogLevelWarn:
		lvl = slog.LevelWarn
	case tracelog.LogLevelError:
		lvl = slog.LevelError
	default:
		lvl = slog.LevelError
		attrs = append(attrs, slog.Any("INVALID_PGX_LOG_LEVEL", level))
	}
	l.l.LogAttrs(context.Background(), lvl, msg, attrs...)
}
