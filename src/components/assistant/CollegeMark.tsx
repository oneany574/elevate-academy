export function CollegeMark({ className = "size-10" }: { className?: string }) {
  return <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
    <path d="M24 4 40 10v17c0 8-9 14-16 17C17 41 8 35 8 27V10L24 4Z" stroke="currentColor" strokeWidth="1.6" />
    <path d="M13 18c4-2 7-2 11 0 4-2 7-2 11 0v13c-4-2-7-2-11 0-4-2-7-2-11 0V18Z" stroke="currentColor" strokeWidth="1.6" />
    <path d="M24 18v13M17 22h3m-3 4h3m8-4h3m-3 4h3" stroke="currentColor" strokeWidth="1.6" />
  </svg>;
}