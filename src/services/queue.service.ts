import {Channel} from 'amqplib';
import { getChannel } from '../config/rabbitmq';
import { logger } from '../utils/logger'; 

 export const queueService = {
	publish :async(queue:any,message:any):Promise<void> =>{
		const channel = getChannel();
		if(!channel)  throw new Error('RabbitMQ channel not initialiised');
		await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)),{persistent:true});
		logger.info(`Published to ${queue}:${JSON.stringify(message)}`);

	},
	consume :async(queue :string,callback: (msg:any)=> void):Promise<void> =>{
		const channel = getChannel();
		if(!channel) throw new Error('RabbitMQ Not initialized ');
		await channel.consume(queue,(msg) =>{
			if(msg)
			{
				callback(JSON.parse(msg.content.toString()));
				channel.ack(msg);
			}
		});
	}
 }
