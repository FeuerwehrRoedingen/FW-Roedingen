package common

import (
	"context"
	"fmt"
	"log/slog"
	"net/url"
	"os"
	"slices"
	"strings"
	"time"

	"github.com/auth0/go-jwt-middleware/v2/jwks"
	"github.com/auth0/go-jwt-middleware/v2/validator"
	"github.com/gin-gonic/gin"
)

// CustomClaims contains custom data we want from the token.
type CustomClaims struct {
	Scope string `json:"scope"`
}

// Validate does nothing for this example, but we need
// it to satisfy validator.CustomClaims interface.
func (c CustomClaims) Validate(ctx context.Context) error {
	return nil
}

// HasScope checks whether our claims have a specific scope.
func (c CustomClaims) HasScope(expectedScope string) bool {
	result := strings.Split(c.Scope, " ")
	for i := range result {
		if result[i] == expectedScope {
			return true
		}
	}

	return false
}

// Validator struct to validate the JWT token
type Validator struct {
	jwtValidator *validator.Validator
}

// NewValidator creates a new JWT validator
func NewValidator() (Validator, error) {
	issuerURL, err := url.Parse("https://" + os.Getenv("AUTH0_DOMAIN") + "/")
	if err != nil {
		return Validator{}, fmt.Errorf("failed to parse the issuer url: %w", err)
	}

	provider := jwks.NewCachingProvider(issuerURL, 5*time.Minute)

	jwtValidator, err := validator.New(
		provider.KeyFunc,
		validator.RS256,
		issuerURL.String(),
		[]string{os.Getenv("AUTH0_AUDIENCE")},
		validator.WithCustomClaims(
			func() validator.CustomClaims {
				return &CustomClaims{}
			},
		),
		validator.WithAllowedClockSkew(time.Minute),
	)
	if err != nil {
		return Validator{}, fmt.Errorf("failed to create the JWT validator: %w", err)
	}

	return Validator{jwtValidator}, nil
}

func (v *Validator) validateToken(ctx *gin.Context) (*CustomClaims, validator.RegisteredClaims, error) {
	authHeader := ctx.Request.Header["Authorization"]
	if len(authHeader) == 0 {
		return &CustomClaims{}, validator.RegisteredClaims{}, nil
	}

	token := strings.Split(authHeader[0], "Bearer ")[1]

	claims, err := v.jwtValidator.ValidateToken(ctx, token)
	if err != nil {
		slog.Error("Failed to validate the JWT", "error", err)
		return &CustomClaims{}, validator.RegisteredClaims{}, err
	}

	return claims.(*validator.ValidatedClaims).CustomClaims.(*CustomClaims), claims.(*validator.ValidatedClaims).RegisteredClaims, nil
}

// Auth0Middleware requires the user to have a valid JWT token
func (v Validator) Auth0Middleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		_, registeredClaims, err := v.validateToken(c)
		if err != nil {
			c.JSON(401, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// check if audience includes our audience
		if !slices.Contains(registeredClaims.Audience, os.Getenv("AUTH0_AUDIENCE")) {
			c.JSON(403, gin.H{"error": "wrong audience"})
			c.Abort()
			return
		}

		// continue with the request
		c.Next()
	}
}

// Auth0RBACMiddleware requires the user to have a valid JWT token and the correct permissions
func (v Validator) Auth0RBACMiddleware(expectedScope string) gin.HandlerFunc {
	return func(c *gin.Context) {
		customClaims, _, err := v.validateToken(c)
		if err != nil {
			c.JSON(401, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// check if the user has the required scope
		if !customClaims.HasScope(expectedScope) {
			c.JSON(403, gin.H{"error": "Insufficient permissions"})
			c.Abort()
			return
		}

		// continue with the request
		c.Next()
	}
}
