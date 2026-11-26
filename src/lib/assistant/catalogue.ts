import { z } from "zod";

export const searchSchema = z
  .object({
    query: z.string().nullable(),
    category: z.string().nullable(),
    level: z.string().nullable(),
  })
  .strict();

export function searchRecords<
  T extends {
    title: string;
    description?: string;
    excerpt?: string;
    category: string;
    level?: string;
  },
>(records: readonly T[], input: z.infer<typeof searchSchema>) {
  const normalized = (value: string | null) => (value ?? "").trim().toLowerCase();
  const query = normalized(input.query);
  if (query.length > 200) throw new Error("Search terms must be 200 characters or fewer.");
  return records
    .filter(
      (record) =>
        (!query ||
          `${record.title} ${record.description ?? record.excerpt ?? ""}`
            .toLowerCase()
            .includes(query)) &&
        (!input.category || record.category.toLowerCase() === normalized(input.category)) &&
        (!input.level || record.level?.toLowerCase() === normalized(input.level)),
    )
    .slice(0, 20);
}

export function csvCell(value: string) {
  const safe = /^[=+@\-\t\r]/.test(value) ? `'${value}` : value;
  return `"${safe.replaceAll('"', '""')}"`;
}

export function searchEditorialRecords<
  T extends { title: string; excerpt: string; category: string; type: string },
>(records: readonly T[], input: z.infer<typeof searchSchema>) {
  const category = input.category?.trim().toLowerCase();
  const type =
    category === "events" || category === "event"
      ? "event"
      : category === "blogs" || category === "blog"
        ? "blog"
        : category === "news"
          ? "news"
          : null;
  return searchRecords(type ? records.filter((record) => record.type === type) : records, {
    ...input,
    category: type ? null : input.category,
  });
}
