import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Params } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { Jobs, JobsData, JobsQuery, JobsService } from './services/jobs/jobs'
export type { Jobs, JobsData, JobsQuery }

import type { Tasks, TasksData, TasksQuery, TasksService } from './services/tasks/tasks'
export type { Tasks, TasksData, TasksQuery }

import type { AuthenticationService } from '@feathersjs/authentication'

import type { User, UserData, UserQuery, UserService } from './services/users/users'
export type { User, UserData, UserQuery }

import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

const userServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type UserClientService = Pick<UserService<Params<UserQuery>>, typeof userServiceMethods[number]>

const tasksServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type TasksClientService = Pick<TasksService<Params<TasksQuery>>, typeof tasksServiceMethods[number]>

const jobsServiceMethods = ['find', 'get', 'create', 'update', 'patch', 'remove'] as const
type JobsClientService = Pick<JobsService, typeof jobsServiceMethods[number]>

export interface ServiceTypes {
  jobs: JobsClientService
  tasks: TasksClientService
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
) => {
  const client = feathers<ServiceTypes, Configuration>()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))

  client.use('users', connection.service('users'), {
    methods: userServiceMethods
  })
  client.use('tasks', connection.service('tasks'), {
    methods: tasksServiceMethods
  })
  client.use('jobs', connection.service('jobs'), {
    methods: jobsServiceMethods
  })
  return client
}
