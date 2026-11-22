<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep assistant tools limited to existing editorial catalogue data and supported application services; this prevents inventing operational capabilities.
- Use route-derived conversation IDs and owner-scoped Cloud persistence for separate assistant conversations; this prevents history mixing and cross-account access.
- Compose chat messages, tools, loading and input with installed AI Elements; this preserves the AI SDK transport and accessible interaction primitives.
