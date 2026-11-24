import { Outlet, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Plus, Trash2, LogOut, Menu, ArrowLeft, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { threadsOptions } from "@/lib/assistant/queries";
import { createThread, deleteThread } from "@/lib/assistant/threads.functions";
import { CollegeMark } from "./CollegeMark";
import { cn } from "@/lib/utils";

export function AssistantShell() {
  const { data: threads } = useSuspenseQuery(threadsOptions());
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const create = useServerFn(createThread);
  const remove = useServerFn(deleteThread);
  const [creating, setCreating] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  async function newConversation() {
    setCreating(true);
    try {
      const thread = await create();
      await queryClient.invalidateQueries({ queryKey: ["assistant-threads"] });
      setMobileOpen(false);
      await navigate({ to: "/assistant/$threadId", params: { threadId: thread.id } });
    } catch (error) { toast.error(error instanceof Error ? error.message : "Could not create a conversation."); }
    finally { setCreating(false); }
  }
  async function confirmDelete() {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await remove({ data: { threadId: pendingDelete.id } });
      queryClient.removeQueries({ queryKey: ["assistant-thread", pendingDelete.id] });
      await queryClient.invalidateQueries({ queryKey: ["assistant-threads"] });
      if (params["threadId"] === pendingDelete.id) await navigate({ to: "/assistant" });
      setPendingDelete(null);
    } catch (error) { toast.error(error instanceof Error ? error.message : "Could not delete conversation."); }
    finally { setDeleting(false); }
  }
  async function signOut() {
    await queryClient.cancelQueries(); queryClient.clear();
    await supabase.auth.signOut(); await navigate({ to: "/auth", search: { redirect: "/assistant" }, replace: true });
  }
  const navigation = <div className="flex h-full flex-col">
    <Link to="/" className="flex items-center gap-3 border-b border-border px-5 py-6"><CollegeMark className="size-9 text-primary" /><div><p className="text-display text-lg text-primary">Cambridge Heights</p><p className="text-xs text-muted-foreground">College assistant</p></div></Link>
    <div className="p-4"><Button onClick={newConversation} disabled={creating} className="w-full justify-start"><Plus className="size-4" />{creating ? "Creating…" : "New conversation"}</Button></div>
    <p className="px-5 pb-3 text-xs font-medium uppercase text-muted-foreground">Conversations</p>
    <nav className="min-h-0 flex-1 overflow-y-auto px-3" aria-label="Conversations" data-lenis-prevent>
      {threads.length === 0 && <p className="px-2 py-4 text-sm text-muted-foreground">No conversations yet.</p>}
      {threads.map((thread) => <div key={thread.id} className={cn("mb-1 flex items-center rounded-md", params["threadId"] === thread.id ? "bg-muted" : "hover:bg-muted/50")}>
        <Button asChild variant="ghost" className="min-w-0 flex-1 justify-start px-2 hover:bg-transparent"><Link to="/assistant/$threadId" params={{ threadId: thread.id }} onClick={() => setMobileOpen(false)}><MessageSquare className="size-4 shrink-0" /><span className="truncate">{thread.title}</span></Link></Button>
        <Button variant="ghost" size="icon-sm" title={`Delete ${thread.title}`} aria-label={`Delete ${thread.title}`} onClick={() => setPendingDelete(thread)}><Trash2 className="size-3.5" /></Button>
      </div>)}
    </nav>
    <div className="space-y-2 border-t border-border p-4"><p className="px-2 text-xs text-muted-foreground">Signed in · Private conversations</p><Button variant="ghost" onClick={signOut} className="w-full justify-start"><LogOut className="size-4" />Sign out</Button></div>
  </div>;
  return <main className="flex h-dvh overflow-hidden bg-background text-foreground" data-lenis-prevent>
    <aside className="hidden w-72 shrink-0 border-r border-border bg-card md:block">{navigation}</aside>
    <div className="flex min-w-0 flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4 sm:px-7">
        <div className="flex min-w-0 items-center gap-3"><Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetTrigger asChild><Button size="icon" variant="ghost" aria-label="Open conversations" className="md:hidden"><Menu className="size-5" /></Button></SheetTrigger><SheetContent side="left" className="w-80 p-0"><SheetTitle className="sr-only">Conversations</SheetTitle>{navigation}</SheetContent></Sheet>
        <p className="truncate text-sm font-medium">College assistant</p></div>
        <Button asChild variant="ghost" size="sm"><Link to="/"><ArrowLeft className="size-4" /><span>College website</span></Link></Button>
      </header>
      <Outlet />
    </div>
    <AlertDialog open={Boolean(pendingDelete)} onOpenChange={(open) => { if (!open && !deleting) setPendingDelete(null); }}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete this conversation?</AlertDialogTitle><AlertDialogDescription>“{pendingDelete?.title}” and all its messages will be permanently deleted from your account.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel><AlertDialogAction disabled={deleting} onClick={(event) => { event.preventDefault(); void confirmDelete(); }}>{deleting ? "Deleting…" : "Delete conversation"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </main>;
}