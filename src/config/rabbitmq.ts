import amqp from 'amqplib';
import { logger } from '../utils/logger';

let channel: amqp.Channel | null = null;

export const connectRabbitMQ = async (): Promise<void> => {
  try {
    const rabbitMQUrl = process.env.RABBITMQ_URL;
    if (!rabbitMQUrl) {
      throw new Error('RABBITMQ_URL is not defined in environment variables');
    }
    if (!rabbitMQUrl.startsWith('amqp://') && !rabbitMQUrl.startsWith('amqps://')) {
      throw new Error(`Invalid RABBITMQ_URL: Expected amqp:// or amqps://, got ${rabbitMQUrl}`);
    }
    const connection = await amqp.connect(rabbitMQUrl);
    channel = await connection.createChannel();
    await channel.assertQueue(process.env.QUEUE_NAME || 'job-portal_queue');
    logger.info('Connected to RabbitMQ');
  } catch (error: any) {
    logger.error(`RabbitMQ connection error: ${error.message}`);
    throw error;
  }
};

export const getChannel = (): amqp.Channel | null => channel;