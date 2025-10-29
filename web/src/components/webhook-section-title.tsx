import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function WebhookSectionTitle({
	className,
	...args
}: ComponentProps<'h3'>) {
	return (
		<h3 className={cn('font-semibold text-zinc-100', className)} {...args} />
	)
}
