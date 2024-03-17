package services

import (
	"FW-Roedingen/backend/common"
	"context"
)

type AdminService struct{}

func NewAdminService() AdminService {
	return AdminService{}
}

func (service AdminService) CreateAdmin(admin Admin) error {
	pool, err := common.GetPool(DatabaseName)
	if err != nil {
		return err
	}

	_, err = pool.Exec(
		context.Background(),
		`
		INSERT INTO admins 
			(user_id)
		VALUES ($1)
		`,
		admin.UserID,
	)
	return err
}

func (service AdminService) GetAdmin(id int64) (Admin, error) {
	pool, err := common.GetPool(DatabaseName)
	if err != nil {
		return Admin{}, err
	}

	var admin Admin

	err = pool.QueryRow(
		context.Background(),
		`
		SELECT user_id
		FROM admins
		WHERE user_id = $1
		`,
		id,
	).Scan(&admin.UserID)
	if err != nil {
		return Admin{}, err
	}

	return admin, nil
}

func (service AdminService) DeleteAdmin(id int64) error {
	pool, err := common.GetPool(DatabaseName)
	if err != nil {
		return err
	}

	_, err = pool.Exec(
		context.Background(),
		`
		DELETE FROM admins
		WHERE user_id = $1
		`,
		id,
	)

	return err
}
