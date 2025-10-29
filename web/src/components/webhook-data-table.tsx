import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type WebhookDataTableProps = ComponentProps<'div'> & {
	data: {
		key: string
		label: string
		value: string
	}[]
}

export function WebhookDataTable({
	className,
	data,
	...args
}: WebhookDataTableProps) {
	return (
		<div
			className={cn(
				'overflow-hidden rounded-lg border border-zinc-700',
				className,
			)}
			{...args}
		>
			<table className="w-full">
				{data.map((item) => (
					<tr
						key={item.key}
						className="border-b border-zinc-700 last:border-b-0 [&_td]:p-3 [&_td]:text-sm"
					>
						<td className="font-medium text-zinc-400 bg-zinc-800/50 border-r border-zinc-700">
							{item.label}
						</td>
						<td className="text-zinc-300 font-mono">{item.value}</td>
					</tr>
				))}
			</table>
		</div>
	)
}
