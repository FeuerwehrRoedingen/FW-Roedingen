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

// AdminCRUDHandler is the handler for the user CRUD operations
type AdminCRUDHandler struct {
	adminService services.AdminService
	userService  services.UserService
}

// NewAdminCRUDHandler creates a new AdminCRUDHandler
func NewAdminCRUDHandler() AdminCRUDHandler {
	return AdminCRUDHandler{
		adminService: services.NewAdminService(),
		userService:  services.NewUserService(),
	}
}

// CreateAdmin creates a new admin
func (handler AdminCRUDHandler) CreateAdmin(c *gin.Context) {
	// get the id from the context
	id := c.Param("id")

	id_int, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid id",
		})
		return
	}

	err = handler.adminService.CreateAdmin(services.Admin{UserID: id_int})
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			// Check if the error is a unique constraint violation
			if pgErr.Code == "23505" {
				switch pgErr.ConstraintName {
				case "admins_user_id_key":
					c.JSON(400, gin.H{
						"error": fmt.Sprintf("Admin with user id %d already exists", id_int),
					})
					return
				}
			}

			// TODO check for other pg errors
		}
		c.JSON(500, gin.H{
			"error": "Error creating admin",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Admin created",
	})
}

// GetAdmin gets a admin
func (handler AdminCRUDHandler) GetAdmin(c *gin.Context) {
	id := c.Param("id")

	id_int, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid id",
		})
		return
	}

	admin, err := handler.adminService.GetAdmin(id_int)
	if err == pgx.ErrNoRows {
		c.JSON(404, gin.H{
			"error": "Admin not found",
		})
		return
	}
	if err != nil {
		c.JSON(500, gin.H{
			"error": "Error getting admin",
		})
		return
	}

	c.JSON(200, admin)
}

// DeleteAdmin deletes a admin
func (handler AdminCRUDHandler) DeleteAdmin(c *gin.Context) {
	id := c.Param("id")

	id_int, err := strconv.ParseInt(id, 10, 64)
	if err != nil {
		c.JSON(400, gin.H{
			"error": "Invalid id",
		})
		return
	}

	_, err = handler.userService.GetUser(int(id_int))
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

	err = handler.adminService.DeleteAdmin(id_int)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) {
			// Check if the error is a foreign key constraint violation
			if pgErr.Code == "23503" {
				switch pgErr.ConstraintName {
				case "admins_user_id_fkey":
					c.JSON(400, gin.H{
						"error": fmt.Sprintf("User with user id %d does not exist", id_int),
					})
					return
				}
			}
			if pgErr.Code == "42703" {
				c.JSON(400, gin.H{
					"error": fmt.Sprintf("Admin with user id %d does not exist", id_int),
				})
				return
			}
		}
		c.JSON(500, gin.H{
			"error": "Error deleting admin",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Admin deleted",
	})
}
