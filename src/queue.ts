import PgBoss from "pg-boss";
import { Application } from "./declarations";
import { logger } from "./logger";

export async function queue(app: Application) {
    const boss = new PgBoss(app.get('postgresql')?.connection as string);
    app.set('queue', boss);
  
    boss.on('error', (error: Error) => logger.error(error));
  
    await boss.start();
  
    // const queue = 'ocr-document';
  
    // let jobId = await boss.send(queue, { document_name: 'foo' })
    // console.log(`created job in queue ${queue}: ${jobId}`);
    // await boss.work(queue, someAsyncJobHandler);
  }
  
//   async function someAsyncJobHandler(job) {
//     console.log(`job ${job.id} received with data:`);
//     console.log(JSON.stringify(job.data));
  
//     await doSomethingAsyncWithThis(job.data);
//   }