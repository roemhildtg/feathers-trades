import { jobs } from './jobs/jobs'
import { user } from './users/users'
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(jobs)
  app.configure(user)
  // All services will be registered here
}
