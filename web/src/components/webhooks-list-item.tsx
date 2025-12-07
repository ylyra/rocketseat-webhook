import type { webhooksListItemSchema } from "@/http/schemas/webhooks";
import { queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import type z from "zod";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { DeleteIcon } from "./ui/delete";

type Props = {
  webhook: z.infer<typeof webhooksListItemSchema>;
};

export function WebhooksListItem({ webhook }: Props) {
  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `http://localhost:3333/webhooks/${webhook.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete webhook");
      }

      queryClient.invalidateQueries({ queryKey: ["webhooks"] });
    },
  });

  return (
    <div className="rounded-lg transition-colors duration-150 hover:bg-zinc-700/30 group">
      <div className="flex items-start gap-3 px-4 py-2.5">
        <Checkbox />

        <Link
          to="/webhooks/$id"
          params={{ id: webhook.id }}
          className="flex flex-1 min-w-0 items-start gap-3"
        >
          <span className="w-12 shrink-0 font-mono text-xs font-semibold text-zinc-300 text-right">
            {webhook.method}
          </span>

          <div className="flex-1 min-w-0">
            <p className="truncate text-xs text-zinc-200 leading-tight font-mono">
              {webhook.pathname}
            </p>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              {formatDistanceToNow(webhook.createdAt, { addSuffix: true })}
            </p>
          </div>

          <Button
            size="icon-sm"
            variant="ghost"
            className="group-hover:opacity-100 transition-all transition-discrete duration-200 translate-x-4 group-hover:translate-x-0 opacity-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              mutate();
            }}
          >
            <DeleteIcon className="size-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
