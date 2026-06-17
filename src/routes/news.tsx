import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsNew } from "@/components/site/WhatsNew";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Events — Cambridge Heights College" },
      { name: "description", content: "Announcements, events and student stories from Cambridge Heights." },
      { property: "og:title", content: "News & Events — Cambridge Heights College" },
      { property: "og:url", content: "/news" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <main>
      <Header />
      <div className="pt-32" />
      <WhatsNew />
      <Footer />
    </main>
  );
}
