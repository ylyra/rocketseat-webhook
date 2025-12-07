import { z } from 'zod'

export const webhooksListItemSchema = z.object({
	id: z.uuidv7(),
	method: z.string(),
	pathname: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
})

export const webhooksListSchema = z.object({
	webhooks: z.array(webhooksListItemSchema),
	cursor: z.string().nullable(),
})

export const webhookDetailItemSchema = z.object({
	id: z.uuidv7(),
	method: z.string(),
	pathname: z.string(),
	ip: z.string(),
	statusCode: z.number(),
	contentType: z.string().nullable(),
	contentLength: z.number().nullable(),
	queryParams: z.record(z.string(), z.string()).nullable(),
	headers: z.record(z.string(), z.string()),
	body: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
})

export type Webhook = z.infer<typeof webhookDetailItemSchema>

export const webhookDetailSchema = z.union([
	webhookDetailItemSchema,
	z.object({
		message: z.string(),
	}),
])
