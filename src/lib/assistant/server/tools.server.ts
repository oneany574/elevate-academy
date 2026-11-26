import { tool } from "ai";
import { z } from "zod";
import { courses } from "@/data/courses";
import { news } from "@/data/news";
import { searchRecords, searchEditorialRecords, searchSchema } from "../catalogue";

const courseOutput = z.object({
  records: z.array(
    z.object({
      slug: z.string(),
      title: z.string(),
      level: z.string(),
      duration: z.string(),
      awardingBody: z.string(),
      category: z.string(),
      description: z.string(),
      url: z.string(),
    }),
  ),
  total: z.number(),
});
const newsOutput = z.object({
  records: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      type: z.string(),
      date: z.string(),
      category: z.string(),
      excerpt: z.string(),
      url: z.string(),
    }),
  ),
  total: z.number(),
});

export function createCatalogueTools(onActivity: (name: string) => void) {
  return {
    searchCourses: tool({
      description:
        "Search and compare the college's published programmes. Null filters return all available courses. No tuition fees, entry requirements or student records are available.",
      inputSchema: searchSchema,
      execute: async (input) => {
        onActivity("searchCourses");
        const records = searchRecords(courses, input).map(({ image: _image, ...course }) => ({
          ...course,
          url: "/courses",
        }));
        return courseOutput.parse({ records, total: records.length });
      },
    }),
    searchNews: tool({
      description:
        "Search published college news, event listings and blog excerpts. Category accepts news, blogs, events, or an editorial category. Article bodies and event registrations are unavailable. Use null for level.",
      inputSchema: searchSchema,
      execute: async (input) => {
        onActivity("searchNews");
        const records = searchEditorialRecords(news, input).map(
          ({ image: _image, featured: _featured, ...item }) => ({ ...item, url: "/news" }),
        );
        return newsOutput.parse({ records, total: records.length });
      },
    }),
  };
}
