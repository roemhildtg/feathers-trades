import { feathers } from '@feathersjs/feathers'
import PgBoss from 'pg-boss'

import type { Application } from '../declarations'
import { configurationValidator } from '../schemas/configuration'
import configuration from '@feathersjs/configuration'
import { logger } from '../logger'



async function main(){
    const app: Application = feathers() as any;

    // Load our app configuration (see config/ folder)
    app.configure(configuration(configurationValidator))
    
    
    const boss = new PgBoss(app.get('postgresql')?.connection as string)
    boss.on('error', error => logger.error(error));

    boss.work('ocr-document', async (job) => {
      return new Promise((resolve) => {
        logger.info({msg: 'working on job', job})
        setTimeout(() => {
          resolve({ job: 'success' })
        }, 1000)
      })
    })

    logger.info('starting pg-boss runner')
    await boss.start()
    .then(() => logger.info('boss started'))
    .catch(e => logger.error(e))
}

main();