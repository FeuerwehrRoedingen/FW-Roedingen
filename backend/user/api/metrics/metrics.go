package metrics

import (
	"FW-Roedingen/backend/common"

	"github.com/gin-gonic/gin"
	//"github.com/prometheus/client_golang/prometheus"
)

const (
	namespace = "user"
)

var (
// TODO add metrics here
)

func InitPrometheusMetrics(ginEngine *gin.Engine) {
	// TODO add metrics here

	common.InitGinPrometheusMetrics(ginEngine)
}
