import { Application, feathers } from '@feathersjs/feathers'
import type { TransportConnection, Params } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { Items, ItemsData, ItemsQuery, ItemsService } from './services/items/items'
export type { Items, ItemsData, ItemsQuery }

import type { Files, FilesData, FilesQuery, FilesService } from './services/files/files'
export type { Files, FilesData, FilesQuery }

import type { Jobs, JobsData, JobsQuery, JobsService } from './services/jobs/jobs'
export type { Jobs, JobsData, JobsQuery }

import type { AuthenticationService } from '@feathersjs/authentication'

import type { User, UserData, UserQuery, UserService } from './services/users/users'
export type { User, UserData, UserQuery }

import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

const userServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type UserClientService = Pick<UserService<Params<UserQuery>>, typeof userServiceMethods[number]>

const jobsServiceMethods = ['get', 'create'] as const
type JobsClientService = Pick<JobsService, typeof jobsServiceMethods[number]>

const filesServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type FilesClientService = Pick<FilesService, typeof filesServiceMethods[number]>

const itemsServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type ItemsClientService = Pick<ItemsService<Params<ItemsQuery>>, typeof itemsServiceMethods[number]>

export interface ServiceTypes {
  items: ItemsClientService
  files: FilesClientService
  jobs: JobsClientService
  authentication: Pick<AuthenticationService, 'create' | 'remove'>
  users: UserClientService
  //
}

/**
 * Returns a typed client for the feathers-tasks app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
): Application<ServiceTypes, Configuration> => {
  const client = feathers<ServiceTypes, Configuration>()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))

  client.use('users', connection.service('users'), {
    methods: userServiceMethods
  })
  client.use('jobs', connection.service('jobs'), {
    methods: jobsServiceMethods
  })
  client.use('files', connection.service('files'), {
    methods: filesServiceMethods
  })
  client.use('items', connection.service('items'), {
    methods: itemsServiceMethods
  })
  return client
}
