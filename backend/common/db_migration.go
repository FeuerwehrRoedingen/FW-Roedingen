package common

import (
	"fmt"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func DBMigration(databaseName string, migrationFilesPath string) error {
	migration, err := migrate.New(migrationFilesPath, DB_ConnectionString(databaseName))
	if err != nil {
		return fmt.Errorf("connecting to database: %s", err)
	}

	err = migration.Up()
	if err != nil {
		if err == migrate.ErrNoChange {
			return nil
		}
		return fmt.Errorf("running migration: %s", err)
	}
	return nil
}
