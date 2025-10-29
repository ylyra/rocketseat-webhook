import { createFileRoute } from "@tanstack/react-router";
import {
  CodeBlock,
  CodeBlockCopyButton,
} from "@/components/ai-elements/code-block";
import { Sidebar } from "@/components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WebhookDataTable } from "@/components/webhook-data-table";
import { WebhookDetailHeader } from "@/components/webhook-detail-header";
import { WebhookSectionTitle } from "@/components/webhook-section-title";

export const Route = createFileRoute("/")({
  component: App,
});

const requestBody = `
{
	"name": "John Doe",
	"email": "john.doe@example.com"
}
`.trim();

function App() {
  const overviewData = [
    {
      key: "method",
      label: "Method",
      value: "POST",
    },
    {
      key: "status",
      label: "Status",
      value: "200",
    },
    {
      key: "content-type",
      label: "Content Type",
      value: "application/json",
    },
    {
      key: "content-length",
      label: "Content Length",
      value: "123",
    },
  ];

  return (
    <div className="h-dvh bg-background">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
          <Sidebar />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={80} minSize={60}>
          <div className="flex h-dvh flex-col">
            <WebhookDetailHeader />

            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6 p-6">
                <div className="space-y-4">
                  <WebhookSectionTitle>Request Overview</WebhookSectionTitle>

                  <WebhookDataTable data={overviewData} />
                </div>

                <div className="space-y-4">
                  <WebhookSectionTitle>Query Parameters</WebhookSectionTitle>

                  <WebhookDataTable data={overviewData} />
                </div>

                <div className="space-y-4">
                  <WebhookSectionTitle>Headers</WebhookSectionTitle>

                  <WebhookDataTable data={overviewData} />
                </div>

                <div className="space-y-4">
                  <WebhookSectionTitle>Request Body</WebhookSectionTitle>

                  <CodeBlock code={requestBody} language="json" showLineNumbers>
                    <CodeBlockCopyButton
                      onCopy={() => console.log("Copied code to clipboard")}
                      onError={() =>
                        console.error("Failed to copy code to clipboard")
                      }
                    />
                  </CodeBlock>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
