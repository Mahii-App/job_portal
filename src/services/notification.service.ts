import { queueService } from '../services/queue.service';
import { logger } from '../utils/logger';

export const notificationService = {
  sendEmail: async (email: string, subject: string, message: string): Promise<void> => {
    await queueService.publish('email_queue', { email, subject, message });
    logger.info(`Email notification queued for ${email}`);
  },

  scheduleReminder: async (email: string, subject: string, message: string, scheduledAt: Date): Promise<void> => {
    await queueService.publish('scheduler_queue', { email, subject, message, scheduledAt });
    logger.info(`Reminder queued for ${email}`);
  },
};