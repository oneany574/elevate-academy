# College AI assistant integration

## 1. Existing architecture
- React 19 and TanStack Start file routes, React Query, Tailwind v4, shadcn/ui, Framer Motion, GSAP and Lenis.
- The homepage and seven inner pages are a public college website. Several inner pages are scaffolds.
- Courses and news are bundled editorial arrays, not operational records. Homepage student counts are presentation copy, not queryable statistics.
- No connected database, accounts, roles, organizations, student records, finance services, attendance services, CRUD APIs or AI integration exists.
- Existing server entry and middleware handle rendering errors; they do not provide application services.

## 2. Recommended agent and reuse map
The confirmed target is this college website, with separate conversations. Build an assistant grounded only in the site's available information.

| Source | Proposed read-only tool | Boundary |
| --- | --- | --- |
| `src/data/courses.ts` | Search, retrieve and compare programmes | Six editorial programmes; no enrollment or student data |
| `src/data/news.ts` | Search news and events | Published site content only |
| Existing route files | Link to relevant pages | Do not interpret unfinished admissions pages as application services |

Use a server-only provider configuration, streaming orchestrator and validated tool registry. Resolve model support through Lovable AI Gateway; use the workspace default for new calls without a model preference. Maintain full conversation context and complete tool-result pairs. Bound tool steps and use deterministic code for comparisons and calculations.

Do not invent student, finance or attendance tools: these are outside this website's available functionality.

## 3. Security
- Derive user identity and organization membership server-side for private operations; never accept model-selected identities or organization IDs.
- Tool availability and execution authorization are enforced in application code, never by model judgment.
- No arbitrary SQL, arbitrary code execution, unrestricted database tools or browser-exposed credentials.
- Treat retrieved content as untrusted data; return only permitted fields and enforce query bounds.
- Expose no modification tools until genuine application services, permissions and policies exist.
- When those services exist, require explicit confirmation for high-impact operations. Bind confirmations to validated immutable actions, recheck permissions, enforce idempotency, and record audit results. Never claim completion before a successful service result.

## 4. Storage and API changes
Separate conversations and private account-backed history are confirmed. Enable Lovable Cloud for identity and persistence.
- Account storage: enable Lovable Cloud, configure sign-in, and create owner-scoped conversations/messages with RLS. Add organization scoping only when an actual organization model exists.
- Browser storage: persist per-conversation UI messages locally; model calls still run server-side. No cloud database for history.
- No storage: current-session messages only; do not imply that conversations survive a reload.
- Separate conversations: dedicated `/assistant/$threadId` page, route-derived active ID, new/switch/delete controls and reload restoration for the chosen persistent storage.
- Streaming calls stay behind an authenticated server boundary when account-backed; public calls require validated inputs and abuse controls. Use TanStack server functions for internal nonstreaming operations and a server streaming route where the AI SDK transport requires it.
- Add durable usage, rate-limit and audit storage only for the accepted scope, not invented operational tables.

## 5. Frontend
Integrate a persistent assistant entry and dedicated page consistent with the college design. Use AI Elements for messages, composer, loading and collapsed tool activity; render Markdown, real programme/news links, structured comparisons, copy/export and errors. Show optimistic user messages, streaming output and Stop. Pass current-page context as a validated hint, not authorization. Keep internal reasoning out of the interface.

## 6. Phases and verification
1. Repository assessment, website target, separate conversations and account-backed storage are confirmed; enable Cloud.
2. Configure the selected server boundary, provider, identity/storage and validated read-only tools.
3. Build assistant entry, dedicated conversation page(s), streaming transport and tool-result display.
4. Verify a real course search, comparison and follow-up end-to-end; exercise Stop, invalid input and unavailable student data. Verify storage reloads and isolation; for threads create and reload two distinct conversations.
5. Add operational actions only after existing management services are available. Test permissions, tenant isolation, confirmation/cancellation, idempotency and audit reads against those services.
6. Run targeted tests and lint, inspect automatic build results, and document configuration and deployment. Verify a live gateway response before claiming AI works; surface account, credit or provider blockers without switching models silently.

## Files expected after scope confirmation
- `src/lib/assistant/`: schemas, tool registry, orchestrator and adjacent tests.
- `src/lib/assistant/server/`: server-only provider and gateway helpers.
- `src/components/assistant/`: AI Elements-based chat and tool-result views.
- `src/routes/assistant*`: conversation page(s), each with unique metadata.
- Appropriate streaming server route and internal server-function modules.
- `src/routes/__root.tsx`: shared assistant entry and any necessary auth subscription.
- Cloud migrations and generated integration files only if account-backed storage is chosen.
- `AGENTS.md`: accepted architecture rules; deployment documentation with server-only environment variables.

## Current blockers
Lovable Cloud must be enabled before implementing server-side AI, sign-in and account-backed conversations. Student CRUD, fees, attendance, organization permissions and administrative workflows are outside this website's supported scope. No AI feature has been implemented or tested yet.