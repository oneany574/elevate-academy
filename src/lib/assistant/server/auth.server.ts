import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export async function authenticateAssistant(request: Request) {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  const bearer = request.headers.get("authorization");
  if (!url || !key) throw new Error("Account service is not configured.");
  if (!bearer?.startsWith("Bearer ")) return null;
  const token = bearer.slice(7);
  const client = createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: bearer }, fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      headers.set("apikey", key);
      if (headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) return null;
  return { client, userId: data.user.id };
}