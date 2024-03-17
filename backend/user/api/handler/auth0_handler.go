package handler

import (
	"FW-Roedingen/backend/user/api/services"

	"github.com/gin-gonic/gin"
)

type Auth0Handler struct {
	auth0Service services.Auth0Service
}

func NewAuth0Handler() Auth0Handler {
	return Auth0Handler{
		auth0Service: services.NewAuth0Service(),
	}
}

func (h *Auth0Handler) GetAuth0(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Hello World",
	})
}
