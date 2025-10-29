import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { DeleteIcon } from './ui/delete'

export function WebhooksListItem() {
	return (
		<div className="rounded-lg transition-colors duration-150 hover:bg-zinc-700/30 group">
			<div className="flex items-start gap-3 px-4 py-2.5">
				<Checkbox />

				<Link to="/" className="flex flex-1 min-w-0 items-start gap-3">
					<span className="w-12 shrink-0 font-mono text-xs font-semibold text-zinc-300 text-right">
						POST
					</span>

					<div className="flex-1 min-w-0">
						<p className="truncate text-xs text-zinc-200 leading-tight font-mono">
							/video/status
						</p>
						<p className="text-xs text-zinc-500 font-medium mt-1">
							1 minute ago
						</p>
					</div>

					<Button
						size="icon-sm"
						variant="ghost"
						className="group-hover:opacity-100 transition-all transition-discrete duration-200 translate-x-4 group-hover:translate-x-0 opacity-0"
					>
						<DeleteIcon className="size-3.5" />
					</Button>
				</Link>
			</div>
		</div>
	)
}
