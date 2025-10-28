import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const listWebhooks: FastifyPluginAsyncZod = async (app) => {
	app.get(
		'/webhooks',
		{
			schema: {
				summary: 'List webhooks',
				tags: ['webhooks'],
				querystring: z.object({
					limit: z.coerce.number().min(1).max(100).default(20),
				}),
				response: {
					200: z.array(
						z.object({
							id: z.uuid(),
							method: z.string(),
						}),
					),
				},
			},
		},
		async (request, reply) => {
			const { limit } = request.query

			return [
				{
					id: '7ad5ce0f-8df3-4c39-b347-eee1ba77cdaf',
					method: 'POST',
				},
			]
		},
	)
}
