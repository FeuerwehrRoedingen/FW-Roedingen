package services

import "time"

const (
	DatabaseName = "users"
)

type User struct {
	ID         int        `json:"id"`
	Username   string     `json:"username"`
	GivenName  string     `json:"given_name"`
	FamilyName string     `json:"family_name"`
	Email      string     `json:"email"`
	CreatedAt  *time.Time `json:"created_at"`
	Auth0ID    string     `json:"auth0_id"`
}

type Admin struct {
	UserID int64 `json:"user_id"`
}
