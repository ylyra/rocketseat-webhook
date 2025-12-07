import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-4xl font-bold">Webhooks</h1>
        <p className="text-sm text-muted-foreground">
          Webhooks are a way to get notified when something happens.
        </p>
      </div>
    </div>
  );
}
