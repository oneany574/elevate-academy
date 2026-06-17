import library from "@/assets/life-library.jpg";
import innovation from "@/assets/life-innovation.jpg";
import grad from "@/assets/life-graduation.jpg";
import sports from "@/assets/life-sports.jpg";

export interface NewsItem {
  id: string;
  type: "news" | "blog" | "event";
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  featured?: boolean;
}

export const news: NewsItem[] = [
  {
    id: "1",
    type: "news",
    category: "Announcement",
    date: "June 12, 2026",
    title: "Cambridge Heights opens £14M Innovation & Incubation Centre",
    excerpt:
      "A 4,200 sqm space for student startups, applied research and industry partnerships — opening this autumn.",
    image: innovation,
    featured: true,
  },
  {
    id: "2",
    type: "news",
    category: "Partnership",
    date: "May 30, 2026",
    title: "New dual-degree pathway with Leeds Beckett University",
    excerpt: "Selected undergraduate students can now spend their final year in Leeds.",
    image: library,
  },
  {
    id: "3",
    type: "blog",
    category: "Student Voice",
    date: "May 22, 2026",
    title: "From foundation year to Google internship — Priya's story",
    excerpt: "How an MSc student turned a side project into a Mountain View summer.",
    image: grad,
  },
  {
    id: "4",
    type: "event",
    category: "Open Day",
    date: "July 06, 2026",
    title: "Summer Open Campus — meet the faculty",
    excerpt: "Tour the campus, sit in on a class, and talk to admissions one-to-one.",
    image: sports,
  },
  {
    id: "5",
    type: "blog",
    category: "Research",
    date: "May 14, 2026",
    title: "Why ethical AI belongs in every degree, not just computing",
    excerpt: "Dr. Aluwihare on weaving responsibility through the curriculum.",
    image: innovation,
  },
  {
    id: "6",
    type: "event",
    category: "Conference",
    date: "August 18, 2026",
    title: "Global Education Summit 2026",
    excerpt: "Three days of talks, panels and workshops with international leaders.",
    image: library,
  },
];
