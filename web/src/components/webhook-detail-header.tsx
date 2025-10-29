import { Separator } from './ui/separator'

export function WebhookDetailHeader() {
	return (
		<div className="space-y-4 border-b border-zinc-700 p-6">
			<div className="flex items-center gap-3">
				<span className="px-3 py-1 rounded-lg border font-mono text-sm font-semibold border-zinc-600 bg-zinc-800 text-zinc-100">
					POST
				</span>

				<span className="text-lg font-medium text-zinc-300">/video/status</span>
			</div>

			<div className="flex items-center gap-2">
				<div className="flex items-center gap-2 text-sm text-zinc-400">
					<span>From IP</span>
					<span className="font-mono text-zinc-200 underline underline-offset-4">
						127.0.0.1
					</span>
				</div>

				<Separator orientation="vertical" className="h-4! w-px" />

				<div className="flex items-center gap-2 text-sm text-zinc-400">
					<span>At</span>
					<span className="font-mono text-zinc-200">April 10th, 14pm</span>
				</div>
			</div>
		</div>
	)
}
