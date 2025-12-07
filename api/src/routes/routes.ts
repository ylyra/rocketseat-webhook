import type { FastifyInstance } from 'fastify'
import { captureWebhook } from './captureWebhook'
import { deleteWebhook } from './delete-webhook'
import { getWebhook } from './get-webhook'
import { listWebhooks } from './list-webhooks'

export const routes = async (app: FastifyInstance) => {
	app.register(listWebhooks)
	app.register(getWebhook)
	app.register(deleteWebhook)
	app.register(captureWebhook)
}
