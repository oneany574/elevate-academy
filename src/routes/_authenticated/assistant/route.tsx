import { createFileRoute } from "@tanstack/react-router";
import { threadsOptions } from "@/lib/assistant/queries";
import { AssistantShell } from "@/components/assistant/AssistantShell";

export const Route = createFileRoute("/_authenticated/assistant")({
  loader: ({ context }) => context.queryClient.ensureQueryData(threadsOptions()),
  component: AssistantShell,
});