/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Users = "users",
	WikiPosts = "wiki_posts",
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

export type WikiPostsRecord<Tdata = unknown> = {
	data?: null | Tdata
	wiki_id?: RecordIdString
}

export type WikisRecord = {
	description: string
	name: string
	user_id: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type WikiPostsResponse<Tdata = unknown, Texpand = unknown> = Required<WikiPostsRecord<Tdata>> & BaseSystemFields<Texpand>
export type WikisResponse<Texpand = unknown> = Required<WikisRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	users: UsersRecord
	wiki_posts: WikiPostsRecord
	wikis: WikisRecord
}

export type CollectionResponses = {
	users: UsersResponse
	wiki_posts: WikiPostsResponse
	wikis: WikisResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'wiki_posts'): RecordService<WikiPostsResponse>
	collection(idOrName: 'wikis'): RecordService<WikisResponse>
}
