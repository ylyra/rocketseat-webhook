import { uuidv7 } from 'uuidv7'
import { db } from './index'
import { webhooks } from './schema/webhooks'

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const
const STATUS_CODES = [
	200, 201, 204, 400, 401, 403, 404, 422, 500, 502, 503,
] as const
const CONTENT_TYPES = [
	'application/json',
	'application/xml',
	'text/plain',
	'application/x-www-form-urlencoded',
	'multipart/form-data',
] as const

const PATHNAMES = [
	'/api/webhooks/payment',
	'/api/webhooks/github',
	'/api/webhooks/stripe',
	'/api/webhooks/paypal',
	'/api/webhooks/slack',
	'/api/webhooks/discord',
	'/api/webhooks/email',
	'/api/webhooks/sms',
	'/api/webhooks/notification',
	'/api/webhooks/event',
	'/api/webhooks/callback',
	'/api/webhooks/status',
	'/api/webhooks/update',
	'/api/webhooks/create',
	'/api/webhooks/delete',
] as const

const USER_AGENTS = [
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
	'Stripe/1.0',
	'GitHub-Hookshot/2.0',
	'PostmanRuntime/7.32.0',
	'curl/7.68.0',
	'CustomClient/1.0',
	'Node-Fetch/3.0.0',
] as const

function randomElement<T>(array: readonly T[]): T {
	return array[Math.floor(Math.random() * array.length)]
}

function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomIP(): string {
	return `${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}.${randomInt(1, 255)}`
}

function generateQueryParams(): Record<string, string> | undefined {
	if (Math.random() < 0.4) {
		// 40% chance of having query params
		const params: Record<string, string> = {}
		const paramKeys = [
			'id',
			'source',
			'version',
			'token',
			'action',
			'type',
			'page',
			'limit',
		]
		const numParams = randomInt(1, 3)
		for (let i = 0; i < numParams; i++) {
			const key = randomElement(paramKeys)
			params[key] = Math.random().toString(36).substring(7)
		}
		return params
	}
	return undefined
}

function generateHeaders(contentType: string): Record<string, string> {
	const headers: Record<string, string> = {
		'content-type': contentType,
		'user-agent': randomElement(USER_AGENTS),
	}

	// Randomly add additional headers
	if (Math.random() < 0.6) {
		headers['x-forwarded-for'] = randomIP()
	}
	if (Math.random() < 0.3) {
		headers['authorization'] =
			`Bearer ${Math.random().toString(36).substring(7)}`
	}
	if (Math.random() < 0.2) {
		headers['x-api-key'] = Math.random().toString(36).substring(7)
	}
	if (Math.random() < 0.15) {
		headers['x-github-event'] = randomElement([
			'push',
			'pull_request',
			'issue',
			'release',
		])
	}
	if (Math.random() < 0.1) {
		headers['x-request-id'] = Math.random().toString(36).substring(7)
	}

	return headers
}

function generateBody(method: string, contentType: string): string | undefined {
	// GET and DELETE usually don't have bodies
	if (method === 'GET' || method === 'DELETE') {
		return Math.random() < 0.1 ? JSON.stringify({}) : undefined
	}

	// Other methods have bodies based on content type
	if (contentType.includes('json')) {
		const bodyTypes = [
			{
				type: 'payment',
				data: { amount: randomInt(100, 10000), currency: 'usd' },
			},
			{
				type: 'event',
				data: { id: randomInt(1, 10000), timestamp: Date.now() },
			},
			{
				type: 'notification',
				data: { message: 'Test notification', priority: 'high' },
			},
			{ type: 'webhook', data: { action: 'created', resource: 'user' } },
			{ type: 'update', data: { id: randomInt(1, 1000), status: 'active' } },
		]
		return JSON.stringify(randomElement(bodyTypes), null, 2)
	}

	if (contentType.includes('form')) {
		return 'key1=value1&key2=value2&key3=value3'
	}

	return Math.random() < 0.5 ? 'Sample text content' : undefined
}

function generateWebhook() {
	const method = randomElement(METHODS)
	const pathname = randomElement(PATHNAMES)
	const statusCode = randomElement(STATUS_CODES)
	const contentType = randomElement(CONTENT_TYPES)
	const contentLength = randomInt(64, 2048)
	const queryParams = generateQueryParams()
	const headers = generateHeaders(contentType)
	const body = generateBody(method, contentType)

	return {
		id: uuidv7(), // Explicitly generate unique ID to avoid collisions
		method,
		pathname,
		ip: randomIP(),
		statusCode,
		contentType,
		contentLength: body ? contentLength : undefined,
		queryParams: queryParams as Record<string, string> | undefined,
		headers: headers as Record<string, string>,
		body,
	}
}

async function seed() {
	const TOTAL_WEBHOOKS = 100
	const BATCH_SIZE = 100

	console.log(`🌱 Seeding database with ${TOTAL_WEBHOOKS} webhooks...`)

	try {
		await db.delete(webhooks)

		let totalInserted = 0

		for (let i = 0; i < TOTAL_WEBHOOKS; i += BATCH_SIZE) {
			const batchSize = Math.min(BATCH_SIZE, TOTAL_WEBHOOKS - i)
			const batch = Array.from({ length: batchSize }, () => generateWebhook())

			await db.insert(webhooks).values(batch)

			totalInserted += batchSize
			const progress = ((totalInserted / TOTAL_WEBHOOKS) * 100).toFixed(1)
			console.log(
				`📦 Inserted ${totalInserted}/${TOTAL_WEBHOOKS} webhooks (${progress}%)`,
			)
		}

		console.log(`✅ Successfully seeded ${totalInserted} webhooks`)
	} catch (error) {
		console.error('❌ Error seeding database:', error)
		process.exit(1)
	}
}

// Run seed if this file is executed directly
if (require.main === module) {
	seed()
		.then(() => {
			console.log('✨ Seed completed!')
			process.exit(0)
		})
		.catch((error) => {
			console.error('💥 Seed failed:', error)
			process.exit(1)
		})
}

export { seed }
