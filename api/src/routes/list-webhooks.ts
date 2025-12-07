import { db } from '@/db'
import { webhooks } from '@/db/schema/webhooks'
import { and, desc, lt } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-zod'
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
					cursor: z.string().optional(),
				}),
				headers: z.object({
					locale: z.string().default('en'),
				}),
				response: {
					200: z.object({
						webhooks: z.array(
							createSelectSchema(webhooks).pick({
								id: true,
								method: true,
								pathname: true,
								createdAt: true,
								updatedAt: true,
							}),
						),
						cursor: z.string().nullable(),
					}),
				},
			},
		},
		async (request) => {
			const { limit, cursor } = request.query

			const result = await db.query.webhooks.findMany({
				columns: {
					id: true,
					method: true,
					pathname: true,
					createdAt: true,
					updatedAt: true,
				},
				where: and(cursor ? lt(webhooks.id, cursor) : undefined),
				orderBy: [desc(webhooks.id)],
				limit: limit + 1,
			})

			const hasMore = result.length > limit
			const nextCursor = hasMore ? result[result.length - 1].id : null

			return {
				webhooks: result.slice(0, limit),
				cursor: nextCursor,
			}
		},
	)
}
