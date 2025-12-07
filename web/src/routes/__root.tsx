import { TanStackDevtools } from '@tanstack/react-devtools'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { Sidebar } from '@/components/sidebar'
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Providers } from '@/providers'

export const Route = createRootRoute({
	component: () => (
		<Providers>
			<div className="h-dvh bg-background">
				<ResizablePanelGroup direction="horizontal">
					<ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
						<Sidebar />
					</ResizablePanel>

					<ResizableHandle withHandle />

					<ResizablePanel defaultSize={80} minSize={60}>
						<Outlet />
					</ResizablePanel>
				</ResizablePanelGroup>
			</div>
			<TanStackDevtools
				config={{
					position: 'bottom-right',
				}}
				plugins={[
					{
						name: 'Tanstack Router',
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</Providers>
	),
})
