/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Users = "users",
	Wikis = "wikis",
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

export type UsersRecord = {
	avatar?: string
	name?: string
	role?: string
}

export type WikisRecord<Tcontent = unknown> = {
	author_id?: RecordIdString
	content?: null | Tcontent
	description?: string
	file?: string[]
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type WikisResponse<Tcontent = unknown, Texpand = unknown> = Required<WikisRecord<Tcontent>> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	users: UsersRecord
	wikis: WikisRecord
}

export type CollectionResponses = {
	users: UsersResponse
	wikis: WikisResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'wikis'): RecordService<WikisResponse>
}
