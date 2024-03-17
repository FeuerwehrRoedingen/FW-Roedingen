package handler

import (
	"FW-Roedingen/backend/user/api/services"
	"errors"
	"fmt"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

// UserCRUDHandler is the handler for the user CRUD operations
type UserCRUDHandler struct {
	userService services.UserService
}

// NewUserCRUDHandler creates a new UserCRUDHandler
func NewUserCRUDHandler() *UserCRUDHandler {
	return &UserCRUDHandler{
		userService: services.NewUserService(),
	}
}

// CreateUser creates a new user
func (handler UserCRUDHandler) CreateUser(c *gin.Context) {
	var user services.User

	err := c.Bind(&user)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid user",
		})
		return
	}

	err = handler.userService.CreateUser(user)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			// Check if the error is a unique constraint violation
			if pgErr.Code == "23505" {
				switch pgErr.ConstraintName {
				case "users_username_key":
					c.JSON(400, gin.H{
						"error": fmt.Sprintf("Username %s already exists", user.Username),
					})
					return
				case "users_email_key":
					c.JSON(400, gin.H{
						"error": fmt.Sprintf("Email %s already exists", user.Email),
					})
					return
				case "users_auth0_id_key":
					c.JSON(400, gin.H{
						"error": fmt.Sprintf("Auth0 ID %s already exists", user.Auth0ID),
					})
					return
				}
			}

			// TODO check for other pg errors
		}
		c.JSON(500, gin.H{
			"error": "Error creating user",
		})
		return
	}

	user, err = handler.userService.GetUserFromName(user.Username)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "Error getting user",
		})
		return
	}

	c.JSON(200, user)
}

// GetUser gets a user
func (handler UserCRUDHandler) GetUser(c *gin.Context) {
	id := c.Param("id")

	id_int, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid id",
		})
		return
	}

	user, err := handler.userService.GetUser(int(id_int))
	if err == pgx.ErrNoRows {
		c.JSON(404, gin.H{
			"error": "User not found",
		})
		return
	}
	if err != nil {
		c.JSON(500, gin.H{
			"error": "Error getting user",
		})
		return
	}

	c.JSON(200, user)
}

// UpdateUser updates a user
func (handler UserCRUDHandler) UpdateUser(c *gin.Context) {
	id := c.Param("id")

	id_int, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid id",
		})
		return
	}

	user, err := handler.userService.GetUser(int(id_int))
	if err == pgx.ErrNoRows {
		c.JSON(404, gin.H{
			"error": "User not found",
		})
		return
	}
	if err != nil {
		c.JSON(500, gin.H{
			"error": "Error getting user",
		})
		return
	}
	err = c.Bind(&user)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid user",
		})
		return
	}

	err = handler.userService.UpdateUser(id_int, user)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			// Check if the error is a unique constraint violation
			if pgErr.Code == "23505" {
				switch pgErr.ConstraintName {
				case "users_username_key":
					c.JSON(400, gin.H{
						"error": fmt.Sprintf("Username %s already exists", user.Username),
					})
					return
				case "users_email_key":
					c.JSON(400, gin.H{
						"error": fmt.Sprintf("Email %s already exists", user.Email),
					})
					return
				case "users_auth0_id_key":
					c.JSON(400, gin.H{
						"error": fmt.Sprintf("Auth0 ID %s already exists", user.Auth0ID),
					})
					return
				}
			}

			// TODO check for other pg errors
		}
		c.JSON(500, gin.H{
			"error": "Error updating user",
		})
		return
	}

	user, err = handler.userService.GetUser(int(id_int))
	if err != nil {
		c.JSON(500, gin.H{
			"error": "Error getting user",
		})
		return
	}

	c.JSON(200, user)
}

// DeleteUser deletes a user
func (handler UserCRUDHandler) DeleteUser(c *gin.Context) {
	id := c.Param("id")

	id_int, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid id",
		})
		return
	}

	err = handler.userService.DeleteUser(id_int)
	if err != nil {
		c.JSON(500, gin.H{
			"error": "Error deleting user",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "User deleted",
	})
}
