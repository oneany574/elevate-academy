import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LifeBento } from "@/components/site/LifeBento";
import { TestimonialSlider } from "@/components/site/TestimonialSlider";

export const Route = createFileRoute("/life")({
  head: () => ({
    meta: [
      { title: "Life at College — Cambridge Heights" },
      { name: "description", content: "Clubs, sports, events and student life at Cambridge Heights College." },
      { property: "og:title", content: "Life at College — Cambridge Heights" },
      { property: "og:url", content: "/life" },
    ],
    links: [{ rel: "canonical", href: "/life" }],
  }),
  component: LifePage,
});

function LifePage() {
  return (
    <main>
      <Header />
      <div className="pt-32" />
      <LifeBento />
      <TestimonialSlider />
      <Footer />
    </main>
  );
}
