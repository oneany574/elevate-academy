import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import { lovable } from "@/integrations/lovable";
import { Button } from "@/components/ui/button";
import { CollegeMark } from "@/components/assistant/CollegeMark";
import { useAssistantAccount } from "@/components/assistant/AccountContext";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Sign in — Cambridge Heights College Assistant" },
    { name: "description", content: "Sign in to return to your private college assistant conversations." },
    { property: "og:title", content: "Sign in — Cambridge Heights College Assistant" },
    { property: "og:description", content: "Private conversations about Cambridge Heights programmes, news and events." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  validateSearch: (search: Record<string, unknown>) => ({ redirect: typeof search["redirect"] === "string" && search["redirect"].startsWith("/assistant") && !search["redirect"].startsWith("//") ? search["redirect"] : "/assistant" }),
  component: AuthPage,
});

function AuthPage() {
  const { signedIn } = useAssistantAccount();
  const navigate = useNavigate();
  const search = Route.useSearch();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  useEffect(() => {
    if (!signedIn) return;
    const destination = sessionStorage.getItem("assistant-return-to") ?? search.redirect;
    sessionStorage.removeItem("assistant-return-to");
    if (destination.startsWith("/assistant/") && !destination.startsWith("//")) {
      const threadId = destination.split("/")[2];
      if (threadId && /^[0-9a-f-]{36}$/i.test(threadId)) { void navigate({ to: "/assistant/$threadId", params: { threadId }, replace: true }); return; }
    }
    void navigate({ to: "/assistant", replace: true });
  }, [signedIn, navigate, search.redirect]);
  async function signIn(provider: "google" | "lovable") {
    setPending(true); setError(null);
    sessionStorage.setItem("assistant-return-to", search.redirect);
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth` });
      if (result.error) setError(result.error.message);
    } catch { setError("Sign-in could not be completed. Please try again."); }
    finally { setPending(false); }
  }
  return <main className="grid min-h-dvh place-items-center bg-background px-5 py-12"><div className="w-full max-w-md">
    <CollegeMark className="mb-7 size-14 text-primary" /><p className="mb-3 text-xs font-medium uppercase text-muted-foreground">Cambridge Heights College</p><h1 className="text-display text-4xl text-primary">Welcome back.</h1><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Your college conversations, wherever you are.</p>
    <div className="mt-9 space-y-3">
      <Button onClick={() => void signIn("google")} disabled={pending} variant="outline" className="google-sign-in h-12 w-full gap-2.5 font-medium">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px]"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>Continue with Google
      </Button>
      <Button onClick={() => void signIn("lovable")} disabled={pending} variant="outline" className="h-12 w-full font-medium"><LovableMark className="size-[18px]" />Continue with Lovable</Button>
    </div>
    {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
    <Button asChild variant="link" className="mt-7 px-0"><a href="/">Back to the college</a></Button>
  </div></main>;
}