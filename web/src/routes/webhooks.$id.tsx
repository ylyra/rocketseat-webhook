import {
  CodeBlock,
  CodeBlockCopyButton,
} from "@/components/ai-elements/code-block";
import { WebhookDataTable } from "@/components/webhook-data-table";
import { WebhookDetailHeader } from "@/components/webhook-detail-header";
import { WebhookSectionTitle } from "@/components/webhook-section-title";
import { webhookDetailSchema } from "@/http/schemas/webhooks";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/webhooks/$id")({
  component: RouteComponent,
  loader: async ({ params, abortController }) => {
    const response = await fetch(
      `http://localhost:3333/webhooks/${params.id}`,
      {
        signal: abortController.signal,
      }
    );
    const data = await response.json();
    const parsedData = webhookDetailSchema.parse(data);

    if ("message" in parsedData) {
      throw redirect({
        to: "/",
        search: {
          message: parsedData.message,
        },
      });
    }

    return parsedData;
  },
});

function RouteComponent() {
  const webhook = Route.useLoaderData();
  const overviewData = [
    {
      key: "method",
      label: "Method",
      value: webhook.method,
    },
    {
      key: "status",
      label: "Status",
      value: webhook.statusCode.toString(),
    },
    {
      key: "content-type",
      label: "Content Type",
      value: webhook.contentType ?? "application/json",
    },
    {
      key: "content-length",
      label: "Content Length",
      value: webhook.contentLength?.toString() ?? "0",
    },
  ];
  const queryParamsData = Object.entries(webhook.queryParams ?? {}).map(
    ([key, value]) => ({
      key,
      label: key,
      value,
    })
  );
  const headersData = Object.entries(webhook.headers ?? {}).map(
    ([key, value]) => ({
      key,
      label: key,
      value,
    })
  );
  const body = webhook.body;

  return (
    <div className="flex h-dvh flex-col">
      <WebhookDetailHeader webhook={webhook} />

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          <div className="space-y-4">
            <WebhookSectionTitle>Request Overview</WebhookSectionTitle>

            <WebhookDataTable data={overviewData} />
          </div>

          <div className="space-y-4">
            <WebhookSectionTitle>Headers</WebhookSectionTitle>

            <WebhookDataTable data={headersData} />
          </div>

          {queryParamsData.length > 0 && (
            <div className="space-y-4">
              <WebhookSectionTitle>Query Parameters</WebhookSectionTitle>

              <WebhookDataTable data={queryParamsData} />
            </div>
          )}

          {!!body && (
            <div className="space-y-4">
              <WebhookSectionTitle>Request Body</WebhookSectionTitle>

              <CodeBlock code={body} language="json" showLineNumbers>
                <CodeBlockCopyButton
                  onCopy={() => console.log("Copied code to clipboard")}
                  onError={() =>
                    console.error("Failed to copy code to clipboard")
                  }
                />
              </CodeBlock>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
