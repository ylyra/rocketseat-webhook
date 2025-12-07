import { eq } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db'
import { webhooks } from '@/db/schema/webhooks'
import { getErrorMessage } from '@/errors/get-message'

export const getWebhook: FastifyPluginAsyncZod = async (app) => {
	app.get(
		'/webhooks/:id',
		{
			schema: {
				summary: 'Get a specific webhook by id',
				tags: ['webhooks'],
				params: z.object({
					id: z.uuidv7(),
				}),
				headers: z.object({
					locale: z.string().default('en'),
				}),
				response: {
					200: createSelectSchema(webhooks),
					404: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params

			const result = await db.query.webhooks.findFirst({
				where: eq(webhooks.id, id),
			})

			if (!result) {
				return reply.status(404).send({
					message: getErrorMessage(
						'NOT_FOUND',
						'webhooks',
						request.headers.locale,
					),
				})
			}

			return result
		},
	)
}
