import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { threadOptions } from "@/lib/assistant/queries";
import { ChatWindow } from "@/components/assistant/ChatWindow";
import type { UIMessage } from "ai";

export const Route = createFileRoute("/_authenticated/assistant/$threadId")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(threadOptions(params.threadId)),
  head: () => ({ meta: [
    { title: "College Conversation — Cambridge Heights Assistant" },
    { name: "description", content: "A private conversation grounded in published Cambridge Heights programmes and news." },
    { property: "og:title", content: "College Conversation — Cambridge Heights Assistant" },
    { property: "og:description", content: "Your ongoing college assistant conversation." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ThreadPage,
});
function ThreadPage() {
  const { threadId } = Route.useParams();
  const { data } = useSuspenseQuery(threadOptions(threadId));
  return <ChatWindow key={threadId} threadId={threadId} initialMessages={JSON.parse(data.messagesJson) as UIMessage[]} title={data.thread.title} />;
}