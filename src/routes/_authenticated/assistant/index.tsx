import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { createThread } from "@/lib/assistant/threads.functions";
import { Button } from "@/components/ui/button";
import { CollegeMark } from "@/components/assistant/CollegeMark";

export const Route = createFileRoute("/_authenticated/assistant/")({
  head: () => ({ meta: [
    { title: "Your Assistant — Cambridge Heights College" },
    { name: "description", content: "Your private conversations about college programmes and news." },
    { property: "og:title", content: "Your Assistant — Cambridge Heights College" },
    { property: "og:description", content: "Explore published programmes and college news with your college assistant." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: AssistantHome,
});
function AssistantHome() {
  const [pending, setPending] = useState(false);
  const create = useServerFn(createThread);
  const navigate = useNavigate();
  const client = useQueryClient();
  async function start() {
    setPending(true);
    try {
      const thread = await create();
      await client.invalidateQueries({ queryKey: ["assistant-threads"] });
      await navigate({ to: "/assistant/$threadId", params: { threadId: thread.id } });
    } catch (error) { toast.error(error instanceof Error ? error.message : "Could not start a conversation."); }
    finally { setPending(false); }
  }
  return <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-14"><CollegeMark className="mb-8 size-16 text-primary" /><p className="mb-3 text-xs uppercase text-muted-foreground">Cambridge Heights College</p><h1 className="text-display text-4xl text-primary sm:text-5xl">Your next chapter<br />starts with a question.</h1><div className="mt-9"><Button onClick={() => void start()} disabled={pending} className="h-11"><Plus className="size-4" />{pending ? "Creating…" : "Start a conversation"}</Button></div></div>;
}