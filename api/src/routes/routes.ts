import type { FastifyInstance } from 'fastify'
import { listWebhooks } from './list-webhooks'

export const routes = async (app: FastifyInstance) => {
	app.register(listWebhooks)
}
