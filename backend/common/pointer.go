package common

import "time"

// CreateBool creates a pointer to a bool with a given value for one-line usage.
func CreateBool(value bool) *bool {
	return &value
}

// CreateInt32 creates a pointer to an int32 with a given value for one-line usage.
func CreateInt32(value int32) *int32 {
	return &value
}

// CreateInt64 creates a pointer to an int64 with a given value for one-line usage.
func CreateInt64(value int64) *int64 {
	return &value
}

// CreateString creates a pointer to a string with a given value for one-line usage.
func CreateString(value string) *string {
	return &value
}

// CreateTimestamp creates a pointer to a time.Time with a given value for one-line usage.
func CreateTimestamp(value time.Time) *time.Time {
	return &value
}
