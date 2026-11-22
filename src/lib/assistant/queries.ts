import { queryOptions } from "@tanstack/react-query";
import { getThread, listThreads } from "./threads.functions";

export const threadsOptions = () => queryOptions({ queryKey: ["assistant-threads"], queryFn: () => listThreads() });
export const threadOptions = (threadId: string) => queryOptions({ queryKey: ["assistant-thread", threadId], queryFn: () => getThread({ data: { threadId } }) });