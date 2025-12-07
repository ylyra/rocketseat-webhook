import type { Webhook } from "@/http/schemas/webhooks";
import { formatDate } from "date-fns";
import { Separator } from "./ui/separator";

export function WebhookDetailHeader({ webhook }: { webhook: Webhook }) {
  return (
    <div className="space-y-4 border-b border-zinc-700 p-6">
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 rounded-lg border font-mono text-sm font-semibold border-zinc-600 bg-zinc-800 text-zinc-100">
          {webhook.method}
        </span>

        <span className="text-lg font-medium text-zinc-300">
          {webhook.pathname}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>From IP</span>
          <span className="font-mono text-zinc-200 underline underline-offset-4">
            {webhook.ip}
          </span>
        </div>

        <Separator orientation="vertical" className="h-4! w-px" />

        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>At</span>
          <span className="font-mono text-zinc-200">
            {formatDate(webhook.createdAt, "MMMM d, yyyy, h:mm a")}
          </span>
        </div>
      </div>
    </div>
  );
}
