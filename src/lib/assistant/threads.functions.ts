import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { validateUIMessages } from "ai";

const idSchema = z.object({ threadId: z.string().uuid() }).strict();

export const listThreads = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data, error } = await context.supabase.from("assistant_threads").select("id,title,updated_at").eq("user_id", context.userId).order("updated_at", { ascending: false }).limit(100);
  if (error) throw new Error("Could not load conversations.");
  return data;
});

export const createThread = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data, error } = await context.supabase.from("assistant_threads").insert({ user_id: context.userId }).select("id").single();
  if (error || !data) throw new Error("Could not create a conversation.");
  return data;
});

export const getThread = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).inputValidator((input: { threadId: string }) => idSchema.parse(input)).handler(async ({ context, data }) => {
  const thread = await context.supabase.from("assistant_threads").select("id,title").eq("id", data.threadId).eq("user_id", context.userId).single();
  if (thread.error || !thread.data) throw new Error("Conversation not found.");
  const messages = await context.supabase.from("assistant_messages").select("message").eq("thread_id", data.threadId).eq("user_id", context.userId).order("created_at").order("id").limit(1000);
  if (messages.error) throw new Error("Could not load conversation messages.");
  const validated = await validateUIMessages({ messages: messages.data.map((row) => row.message) });
  return { thread: thread.data, messagesJson: JSON.stringify(validated) };
});

export const deleteThread = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input: { threadId: string }) => idSchema.parse(input)).handler(async ({ context, data }) => {
  const result = await context.supabase.from("assistant_threads").delete().eq("id", data.threadId).eq("user_id", context.userId).select("id");
  if (result.error || !result.data?.length) throw new Error("Could not delete this conversation.");
  return { deleted: true };
});