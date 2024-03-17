package services

import (
	"FW-Roedingen/backend/common"
	"context"
)

type UserService struct{}

func NewUserService() UserService {
	return UserService{}
}

func (service UserService) CreateUser(user User) error {
	pool, err := common.GetPool(DatabaseName)
	if err != nil {
		return err
	}

	_, err = pool.Exec(context.Background(),
		`
		INSERT INTO users 
			(username, given_name, family_name, email, created_at, auth0_id)
		VALUES ($1, $2, $3, $4, $5, $6)
		`,
		user.Username, user.GivenName, user.FamilyName, user.Email, user.CreatedAt, user.Auth0ID,
	)
	return err
}

func (service UserService) GetUser(id int) (User, error) {
	pool, err := common.GetPool(DatabaseName)
	if err != nil {
		return User{}, err
	}

	var user User

	err = pool.QueryRow(
		context.Background(),
		`
		SELECT id, username, given_name, family_name, email, created_at, auth0_id
		FROM users
		WHERE id = $1
		`,
		id,
	).Scan(&user.ID, &user.Username, &user.GivenName, &user.FamilyName, &user.Email, &user.CreatedAt, &user.Auth0ID)
	if err != nil {
		return User{}, err
	}

	return user, nil
}

func (service UserService) GetUserFromName(name string) (User, error) {
	pool, err := common.GetPool(DatabaseName)
	if err != nil {
		return User{}, err
	}

	var user User

	err = pool.QueryRow(
		context.Background(),
		`
		SELECT id, username, given_name, family_name, email, created_at, auth0_id
		FROM users
		WHERE username = $1
		`,
		name,
	).Scan(&user.ID, &user.Username, &user.GivenName, &user.FamilyName, &user.Email, &user.CreatedAt, &user.Auth0ID)
	if err != nil {
		return User{}, err
	}

	return user, nil
}

func (service UserService) UpdateUser(id int64, user User) error {
	pool, err := common.GetPool(DatabaseName)
	if err != nil {
		return err
	}

	_, err = pool.Exec(
		context.Background(),
		`
		UPDATE users
		SET username = $1, given_name = $2, family_name = $3, email = $4, created_at = $5, auth0_id = $6
		WHERE id = $7
		`,
		user.Username, user.GivenName, user.FamilyName, user.Email, user.CreatedAt, user.Auth0ID, user.ID,
	)

	return err
}

func (service UserService) DeleteUser(id int64) error {
	pool, err := common.GetPool(DatabaseName)
	if err != nil {
		return err
	}

	_, err = pool.Exec(
		context.Background(),
		`
		DELETE FROM users
		WHERE id = $1
		`,
		id,
	)

	return err
}
