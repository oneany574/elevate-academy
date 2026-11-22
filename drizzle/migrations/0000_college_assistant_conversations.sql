CREATE TABLE public.assistant_threads (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL DEFAULT auth.uid(), title text NOT NULL DEFAULT 'New conversation', created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assistant_threads TO authenticated;
GRANT ALL ON public.assistant_threads TO service_role;
ALTER TABLE public.assistant_threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own assistant threads" ON public.assistant_threads FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE INDEX assistant_threads_owner ON public.assistant_threads(user_id, updated_at DESC);
CREATE TABLE public.assistant_messages (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), thread_id uuid NOT NULL REFERENCES public.assistant_threads(id) ON DELETE CASCADE, user_id uuid NOT NULL DEFAULT auth.uid(), sdk_id text NOT NULL, message jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(thread_id, sdk_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.assistant_messages TO authenticated;
GRANT ALL ON public.assistant_messages TO service_role;
ALTER TABLE public.assistant_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own assistant messages" ON public.assistant_messages FOR ALL TO authenticated USING (user_id = auth.uid() AND EXISTS (SELECT 1 FROM public.assistant_threads t WHERE t.id = thread_id AND t.user_id = auth.uid())) WITH CHECK (user_id = auth.uid() AND EXISTS (SELECT 1 FROM public.assistant_threads t WHERE t.id = thread_id AND t.user_id = auth.uid()));
CREATE INDEX assistant_messages_order ON public.assistant_messages(thread_id, created_at, id);
CREATE TABLE public.assistant_runs (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), thread_id uuid REFERENCES public.assistant_threads(id) ON DELETE SET NULL, user_id uuid NOT NULL DEFAULT auth.uid(), status text NOT NULL DEFAULT 'running', started_at timestamptz NOT NULL DEFAULT now(), finished_at timestamptz, model text NOT NULL DEFAULT 'openai/gpt-6-astra', input_tokens integer, output_tokens integer, tool_names text[] NOT NULL DEFAULT '{}'
);
GRANT SELECT ON public.assistant_runs TO authenticated;
GRANT ALL ON public.assistant_runs TO service_role;
ALTER TABLE public.assistant_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own assistant activity" ON public.assistant_runs FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE INDEX assistant_runs_rate ON public.assistant_runs(user_id, started_at DESC);
CREATE TABLE public.assistant_access (
 id boolean PRIMARY KEY DEFAULT true CHECK (id), status integer NOT NULL, reason text NOT NULL, blocked_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.assistant_access TO authenticated;
GRANT ALL ON public.assistant_access TO service_role;
ALTER TABLE public.assistant_access ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read assistant service availability" ON public.assistant_access FOR SELECT TO authenticated USING (true);
CREATE FUNCTION public.claim_assistant_run(p_thread_id uuid) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE actor uuid := auth.uid(); run_id uuid; recent_count integer;
BEGIN
 IF actor IS NULL THEN RAISE EXCEPTION 'Sign in to use the assistant'; END IF;
 PERFORM pg_advisory_xact_lock(hashtextextended(actor::text, 0));
 IF NOT EXISTS(SELECT 1 FROM public.assistant_threads WHERE id = p_thread_id AND user_id = actor) THEN RAISE EXCEPTION 'Conversation not found'; END IF;
 SELECT count(*) INTO recent_count FROM public.assistant_runs WHERE user_id = actor AND started_at > now() - interval '1 minute';
 IF recent_count >= 10 THEN RAISE EXCEPTION 'Please wait a minute before sending more messages'; END IF;
 IF EXISTS(SELECT 1 FROM public.assistant_runs WHERE thread_id = p_thread_id AND status = 'running' AND started_at > now() - interval '10 minutes') THEN RAISE EXCEPTION 'A response is already running in this conversation'; END IF;
 INSERT INTO public.assistant_runs(thread_id, user_id) VALUES(p_thread_id, actor) RETURNING id INTO run_id;
 RETURN run_id;
END; $$;
REVOKE ALL ON FUNCTION public.claim_assistant_run(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_assistant_run(uuid) TO authenticated;
CREATE FUNCTION public.finish_assistant_run(p_run_id uuid, p_status text, p_input_tokens integer, p_output_tokens integer, p_tool_names text[]) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF p_status NOT IN ('completed', 'cancelled', 'failed') THEN RAISE EXCEPTION 'Invalid request status'; END IF;
 UPDATE public.assistant_runs SET status=p_status, finished_at=now(), input_tokens=p_input_tokens, output_tokens=p_output_tokens, tool_names=p_tool_names WHERE id=p_run_id AND user_id=auth.uid();
 IF NOT FOUND THEN RAISE EXCEPTION 'Request not found'; END IF;
END; $$;
REVOKE ALL ON FUNCTION public.finish_assistant_run(uuid,text,integer,integer,text[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.finish_assistant_run(uuid,text,integer,integer,text[]) TO authenticated;