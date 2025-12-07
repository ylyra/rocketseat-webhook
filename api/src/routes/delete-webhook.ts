import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '@/db'
import { webhooks } from '@/db/schema/webhooks'
import { getErrorMessage } from '@/errors/get-message'

export const deleteWebhook: FastifyPluginAsyncZod = async (app) => {
	app.delete(
		'/webhooks/:id',
		{
			schema: {
				summary: 'Delete a specific webhook by id',
				tags: ['webhooks'],
				params: z.object({
					id: z.uuidv7(),
				}),
				headers: z.object({
					locale: z.string().default('en'),
				}),
				response: {
					204: z.void(),
					404: z.object({
						message: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { id } = request.params

			const result = await db
				.delete(webhooks)
				.where(eq(webhooks.id, id))
				.returning()

			if (!result) {
				return reply.status(404).send({
					message: getErrorMessage(
						'NOT_FOUND',
						'webhooks',
						request.headers.locale,
					),
				})
			}

			return reply.status(204).send()
		},
	)
}
