import type { schema } from '@/db/schema'
import { MESSAGES } from './messages'

export const getErrorMessage = (
	code: keyof typeof MESSAGES,
	table: keyof typeof schema,
	language: string = 'en',
) => {
	const messages = MESSAGES[code]
	const message = messages?.[language as keyof typeof messages]?.[table]
	return message ?? `${code} not found`
}
