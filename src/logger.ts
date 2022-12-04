import type { HookContext, NextFunction } from './declarations'
import pino from 'pino';

// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
export const logger = pino();

export const logErrorHook = async (context: HookContext, next: NextFunction) => {
  try {
    await next()
  } catch (error: any) {
    logger.error(error.stack)

    // Log validation errors
    if (error.data) {
      logger.error(error.data)
    }

    throw error
  }
}
