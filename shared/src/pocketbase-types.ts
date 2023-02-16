/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	AuthRequest = "authRequest",
	Token = "token",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthRequestRecord = {
	code: string
	user: RecordIdString
	expires: IsoDateString
}

export type TokenRecord = {
	access_token?: string
	refresh_token?: string
	access_expires?: IsoDateString
	refresh_expires?: IsoDateString
	user: RecordIdString
}

export type UsersRecord = {
	name?: string
	avatar?: string
	messageToken?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AuthRequestResponse<Texpand = unknown> = AuthRequestRecord & BaseSystemFields<Texpand>
export type TokenResponse<Texpand = unknown> = TokenRecord & BaseSystemFields<Texpand>
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	authRequest: AuthRequestRecord
	token: TokenRecord
	users: UsersRecord
}