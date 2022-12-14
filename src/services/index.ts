import { items } from './items/items'
import { files } from './files/files'
import { jobs } from './jobs/jobs'
import { user } from './users/users'
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(items)
  app.configure(files)
  app.configure(jobs)
  app.configure(user)
  // All services will be registered here
}
