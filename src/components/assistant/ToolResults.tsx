import { z } from "zod";
import { Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { csvCell } from "@/lib/assistant/catalogue";

const resultSchema = z.object({ records: z.array(z.object({ title: z.string(), category: z.string(), duration: z.string().optional(), level: z.string().optional(), date: z.string().optional() })) });
export function ToolResults({ output, toolName }: { output: unknown; toolName: string }) {
  const parsed = resultSchema.safeParse(output);
  if (!parsed.success) return null;
  const records = parsed.data.records;
  function download() {
    const csv = [["Title", "Category", "Level", "Duration", "Date"], ...records.map((record) => [record.title, record.category, record.level ?? "", record.duration ?? "", record.date ?? ""])].map((row) => row.map(csvCell).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "college-results.csv"; link.click(); URL.revokeObjectURL(url);
  }
  return <div className="w-full space-y-3">
    <div className="flex items-center justify-between gap-3"><p className="text-xs text-muted-foreground">{records.length} published {toolName === "searchCourses" ? "programmes" : "items"}</p><Button variant="ghost" size="icon-sm" title="Export results as CSV" aria-label="Export results as CSV" onClick={download}><Download className="size-4" /></Button></div>
    {records.length === 0 ? <p className="text-sm">No matching published information.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead><tr className="border-b border-border"><th className="p-2 font-medium">Title</th><th className="p-2 font-medium">Category</th><th className="p-2 font-medium">{toolName === "searchCourses" ? "Duration" : "Date"}</th></tr></thead><tbody>{records.map((record, i) => <tr key={i} className="border-b border-border"><td className="min-w-40 p-2"><Link to={toolName === "searchCourses" ? "/courses" : "/news"} className="text-primary underline underline-offset-2">{record.title}</Link>{record.level && <p className="mt-1 text-muted-foreground">{record.level}</p>}</td><td className="p-2">{record.category}</td><td className="whitespace-nowrap p-2">{record.duration ?? record.date}</td></tr>)}</tbody></table></div>}
  </div>;
}