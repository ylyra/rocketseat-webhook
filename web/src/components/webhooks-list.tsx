import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { webhooksListSchema } from '@/http/schemas/webhooks'
import { WebhooksListItem } from './webhooks-list-item'

export function WebhookList() {
	const loadMoreRef = useRef<HTMLDivElement>(null)
	const intersectionObserverRef = useRef<IntersectionObserver | null>(null)
	const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
		useSuspenseInfiniteQuery({
			queryKey: ['webhooks'],
			queryFn: async ({ signal, pageParam }) => {
				const url = new URL('http://localhost:3333/webhooks')
				if (pageParam) {
					url.searchParams.set('cursor', pageParam)
				}

				url.searchParams.set('limit', '10')
				const response = await fetch(url.toString(), { signal })
				const data = await response.json()

				return webhooksListSchema.parse(data)
			},
			getNextPageParam: (lastPage) => lastPage.cursor ?? undefined,
			initialPageParam: undefined as string | undefined,
		})

	useEffect(() => {
		intersectionObserverRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
						fetchNextPage()
					}
				})
			},
			{
				threshold: 0.1,
			},
		)

		if (loadMoreRef.current) {
			intersectionObserverRef.current.observe(loadMoreRef.current)
		}

		return () => {
			intersectionObserverRef.current?.disconnect()
		}
	}, [fetchNextPage, hasNextPage, isFetchingNextPage])

	return (
		<div className="flex-1 overflow-y-auto">
			<div className="space-y-1 p-2">
				{data?.pages
					.flatMap((page) => page.webhooks)
					.map((webhook) => (
						<WebhooksListItem key={webhook.id} webhook={webhook} />
					))}
			</div>

			{hasNextPage && (
				<div className="p-2" ref={loadMoreRef}>
					{isFetchingNextPage && (
						<div className="flex items-center justify-center py-2">
							<Loader className="size-5 animate-spin text-zinc-500" />
						</div>
					)}
				</div>
			)}
		</div>
	)
}
