import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isToolUIPart, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Copy, Download, RotateCcw, ArrowUpRight, BookOpen, Newspaper } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse, MessageActions, MessageAction } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@/components/ai-elements/tool";
import { CollegeMark } from "./CollegeMark";
import { ToolResults } from "./ToolResults";

export function ChatWindow({ threadId, initialMessages, title }: { threadId: string; initialMessages: UIMessage[]; title: string }) {
  const queryClient = useQueryClient();
  const composer = useRef<HTMLTextAreaElement>(null);
  const [blocked, setBlocked] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const transport = useMemo(() => new DefaultChatTransport({
    api: "/api/assistant",
    body: () => ({ threadId, pageContext: sessionStorage.getItem("assistant-page-context") ?? "/" }),
    fetch: async (input, init) => {
      const { data } = await supabase.auth.getSession();
      const headers = new Headers(init?.headers);
      if (data.session) headers.set("Authorization", `Bearer ${data.session.access_token}`);
      const response = await fetch(input, { ...init, headers });
      if (!response.ok) {
        const errorBody: unknown = await response.json().catch(() => null);
        const message = errorBody && typeof errorBody === "object" && "message" in errorBody && typeof errorBody.message === "string" ? errorBody.message : "The request could not be completed.";
        if (response.status === 402 || response.status === 403) setBlocked(true);
        throw new Error(message);
      }
      return response;
    },
  }), [threadId]);
  const { messages, sendMessage, status, stop, regenerate, error } = useChat({
    id: threadId, messages: initialMessages, transport,
    onError: (reason) => { setFailure(reason.message); toast.error(reason.message); },
    onFinish: () => {
      void queryClient.invalidateQueries({ queryKey: ["assistant-threads"] });
      void queryClient.invalidateQueries({ queryKey: ["assistant-thread", threadId] });
    },
  });
  const busy = status === "submitted" || status === "streaming";
  useEffect(() => {
    if (!busy && !(document.activeElement instanceof HTMLInputElement)) composer.current?.focus();
  }, [busy, threadId]);
  async function send(text: string) {
    if (!text.trim() || busy || blocked) return;
    setFailure(null);
    const request = sendMessage({ text: text.trim() });
    composer.current?.focus();
    await request;
  }
  function exportConversation() {
    const text = messages.map((message) => `${message.role.toUpperCase()}\n${message.parts.filter((part) => part.type === "text").map((part) => part.text).join("\n")}`).join("\n\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/markdown" }));
    const link = document.createElement("a"); link.href = url; link.download = "college-conversation.md"; link.click(); URL.revokeObjectURL(url);
  }
  const suggestions = [
    { icon: BookOpen, text: "Compare the undergraduate computing and business programmes" },
    { icon: BookOpen, text: "Which postgraduate programmes are available?" },
    { icon: Newspaper, text: "What college events are listed?" },
  ];
  return <div className="flex min-h-0 flex-1 flex-col">
    <div className="mx-auto flex w-full max-w-4xl shrink-0 items-center justify-between gap-3 px-5 py-5"><h1 className="truncate text-display text-lg text-primary">{title === "New conversation" ? "Your next chapter" : title}</h1><Button variant="ghost" size="icon-sm" aria-label="Export conversation" title="Export conversation" onClick={exportConversation} disabled={!messages.length}><Download className="size-4" /></Button></div>
    <Conversation className="min-h-0" data-lenis-prevent>
      <ConversationContent className="mx-auto w-full max-w-4xl gap-8 px-5 pb-10 sm:px-8">
        {!messages.length && <div className="mx-auto w-full max-w-2xl py-12 sm:py-20"><CollegeMark className="mb-7 size-16 text-primary" /><p className="mb-3 text-xs font-medium uppercase text-muted-foreground">Cambridge Heights College</p><h2 className="text-display text-4xl leading-tight text-primary">Where would you like<br />to begin?</h2><div className="mt-10 grid gap-3">{suggestions.map(({ icon: Icon, text }) => <Button key={text} variant="outline" className="h-auto min-h-14 justify-start whitespace-normal bg-card px-4 py-4 text-left font-normal" onClick={() => void send(text)} disabled={busy || blocked}><Icon className="size-4 shrink-0 text-muted-foreground" /><span className="flex-1">{text}</span><ArrowUpRight className="size-4 shrink-0 text-muted-foreground" /></Button>)}</div></div>}
        {messages.map((message) => <Message key={message.id} from={message.role} className="max-w-full">
          {message.role === "assistant" && <div className="mb-1 flex items-center gap-2 text-xs font-medium text-muted-foreground"><CollegeMark className="size-5 text-primary" />College assistant</div>}
          <MessageContent className={message.role === "user" ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground" : "w-full bg-transparent text-foreground"}>
            {message.parts.map((part, index) => {
              if (part.type === "text") return <MessageResponse key={index} isAnimating={busy && message.id === messages.at(-1)?.id} className="break-words [overflow-wrap:anywhere]">{part.text}</MessageResponse>;
              if (isToolUIPart(part)) {
                const toolName = part.type === "dynamic-tool" ? part.toolName : part.type.slice(5);
                const label = toolName === "searchCourses" ? "Searching programmes" : "Retrieving college news";
                return <Tool key={index} defaultOpen={false} className="max-w-full"><ToolHeader type="dynamic-tool" toolName={toolName} state={part.state} title={label} /><ToolContent><ToolInput input={part.input} /><ToolOutput output={part.state === "output-available" ? <ToolResults output={part.output} toolName={toolName} /> : null} errorText={part.state === "output-error" ? part.errorText : undefined} /></ToolContent></Tool>;
              }
              // Reasoning remains in persisted context but is not displayed as internal thought.
              return null;
            })}
          </MessageContent>
          {message.role === "assistant" && !busy && <MessageActions><MessageAction tooltip="Copy reply" onClick={() => { void navigator.clipboard.writeText(message.parts.filter((part) => part.type === "text").map((part) => part.text).join("\n")).then(() => toast.success("Reply copied."), () => toast.error("Could not copy this reply.")); }}><Copy className="size-4" /></MessageAction></MessageActions>}
        </Message>)}
        {status === "submitted" && <div role="status" className="flex items-center gap-2 text-sm text-muted-foreground"><CollegeMark className="size-5" /><Shimmer>Consulting the college catalogue…</Shimmer></div>}
      </ConversationContent><ConversationScrollButton />
    </Conversation>
    <div className="mx-auto w-full max-w-4xl shrink-0 px-5 pb-5 sm:px-8">
      {(failure || error) && <div role="alert" className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"><p className="min-w-0 flex-1 break-words">{failure ?? error?.message}</p>{!blocked && <Button size="sm" variant="ghost" disabled={busy} onClick={() => { setFailure(null); void regenerate(); }}><RotateCcw className="size-4" />Retry</Button>}</div>}
      <PromptInput onSubmit={({ text }) => send(text)} className="bg-card" maxFiles={0}>
        <PromptInputTextarea ref={composer} autoFocus aria-label="Message college assistant" placeholder="Ask about programmes, news or events…" maxLength={6000} disabled={blocked} className="min-h-20 px-4 text-sm" />
        <PromptInputFooter className="justify-end px-3 pb-3"><PromptInputSubmit status={status} onStop={() => { stop(); composer.current?.focus(); }} disabled={blocked} title={busy ? "Stop response" : "Send message"} className="size-9 rounded-md" /></PromptInputFooter>
      </PromptInput>
    </div>
  </div>;
}