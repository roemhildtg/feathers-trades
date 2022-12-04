import PgBoss from "pg-boss";
import { Application } from "./declarations";
import { logger } from "./logger";

export async function queue(app: Application) {
    const boss = new PgBoss(app.get('postgresql')?.connection as string);
    app.set('queue', boss);
    boss.on('error', (error: Error) => logger.error(error));
    await boss.start();
}