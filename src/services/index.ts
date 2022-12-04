import { tasks } from './tasks/tasks'
import { user } from './users/users'
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(tasks)
  app.configure(user)
  // All services will be registered here
}
