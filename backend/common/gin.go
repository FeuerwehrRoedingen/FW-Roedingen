package common

import (
	"strings"

	"github.com/gin-gonic/gin"
	ginprometheus "github.com/kadaan/go-gin-prometheus"
	"github.com/prometheus/client_golang/prometheus"
)

func InitGinPrometheusMetrics(ginEngine *gin.Engine) {
	counter := prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Subsystem: "gin",
			Name:      "requests_total",
			Help:      "How many HTTP requests processed, partitioned by status code and HTTP method.",
		},
		[]string{"code", "method", "url"},
	)
	duration := prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Subsystem: "gin",
			Name:      "request_duration_seconds",
			Help:      "The HTTP request latencies in seconds.",
			Buckets:   prometheus.ExponentialBuckets(0.001, 2, 16),
		},
		[]string{"code", "method", "url"},
	)
	requestSize := prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Subsystem: "gin",
			Name:      "request_size_bytes",
			Help:      "The HTTP request sizes in bytes.",
			Buckets:   prometheus.ExponentialBuckets(64, 4, 8),
		},
		[]string{"code", "method", "url"},
	)
	responseSize := prometheus.NewHistogramVec(
		prometheus.HistogramOpts{
			Subsystem: "gin",
			Name:      "response_size_bytes",
			Help:      "The HTTP response sizes in bytes.",
			Buckets:   prometheus.ExponentialBuckets(64, 4, 8),
		},
		[]string{"code", "method", "url"},
	)
	prometheus.MustRegister(counter, duration, requestSize, responseSize)

	p := ginprometheus.NewBuilder().Counter(counter).Duration(duration).RequestSize(requestSize).ResponseSize(responseSize)
	p.UrlMapping(func(c *gin.Context) string {
		url := c.Request.URL.Path
		for _, p := range c.Params {
			url = strings.Replace(url, p.Value, ":"+p.Key, 1)
		}
		return url
	})
	p.Use(ginEngine)
}
