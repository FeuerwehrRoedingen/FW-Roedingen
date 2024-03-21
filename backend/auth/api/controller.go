package api

import (
	"FW-Roedingen/backend/common"
	"FW-Roedingen/backend/auth/api/handler"
	"log/slog"
	"os"
	
	"github.com/gin-gonic/gin"
)

// Create new gin controller
func CreateController(router *gin.RouterGroup) {

	// create new Validator
	validator, err := common.NewValidator()
	if err != nil {
		slog.Error("Error creating validator", "error", err)
		os.Exit(1)
	}

	// create new handler
	// TODO

	// Secure the routes
	publicRoutes := router.Group("/")
	privateRoutes := router.Group("/")
	privateRoutes.Use(validator.Auth0Middleware())

	// TODO add routes here

	publicRoutes.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World",
		})
	})
}