/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	AuthRequest = "authRequest",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export type AuthRequestRecord = {
	code: string
	user: RecordIdString
}

export type UsersRecord = {
	name?: string
	avatar?: string
	access_token?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AuthRequestResponse = AuthRequestRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	authRequest: AuthRequestRecord
	users: UsersRecord
}