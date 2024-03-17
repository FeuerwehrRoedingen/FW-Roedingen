package api

import (
	"FW-Roedingen/backend/common"
	"FW-Roedingen/backend/user/api/handler"
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

	// Create new handler
	adminService := handler.NewAdminCRUDHandler()
	userService := handler.NewUserCRUDHandler()

	// Secure the routes
	publicRoutes := router.Group("/")
	privateRoutes := router.Group("/")
	privateRoutes.Use(validator.Auth0Middleware())

	publicRoutes.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Welcome to the user API",
		})
	})

	// User routes
	privateRoutes.Use(validator.Auth0RBACMiddleware("create:user")).POST("/", userService.CreateUser)
	privateRoutes.Use(validator.Auth0RBACMiddleware("read:user")).GET("/:id", userService.GetUser)
	privateRoutes.Use(validator.Auth0RBACMiddleware("update:user")).PUT("/:id", userService.UpdateUser)
	privateRoutes.Use(validator.Auth0RBACMiddleware("delete:user")).DELETE("/:id", userService.DeleteUser)

	// Admin routes
	privateRoutes.Use(validator.Auth0RBACMiddleware("create:admin")).POST("/admin/:id", adminService.CreateAdmin)
	privateRoutes.Use(validator.Auth0RBACMiddleware("read:admin")).GET("/admin/:id", adminService.GetAdmin)
	privateRoutes.Use(validator.Auth0RBACMiddleware("delete:admin")).DELETE("/admin/:id", adminService.DeleteAdmin)
}
