/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Chat = "chat",
	Group = "group",
	Hosts = "hosts",
	Message = "message",
	Profiles = "profiles",
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

export type ChatRecord = {
	user1: RecordIdString
	user2: RecordIdString
	messages?: RecordIdString[]
}

export type GroupRecord = {
	member?: RecordIdString[]
	admin: RecordIdString
	messages?: RecordIdString[]
}

export type HostsRecord = {
	name: string
	host: string
}

export type MessageRecord = {
	timestamp: IsoDateString
	body: string
}

export type ProfilesRecord = {
	userId: RecordIdString
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ChatResponse = ChatRecord & BaseSystemFields
export type GroupResponse = GroupRecord & BaseSystemFields
export type HostsResponse = HostsRecord & BaseSystemFields
export type MessageResponse = MessageRecord & BaseSystemFields
export type ProfilesResponse = ProfilesRecord & BaseSystemFields

export type CollectionRecords = {
	chat: ChatRecord
	group: GroupRecord
	hosts: HostsRecord
	message: MessageRecord
	profiles: ProfilesRecord
}