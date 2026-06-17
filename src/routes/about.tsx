import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Cambridge Heights College" },
      { name: "description", content: "Our story, mission and the people behind Cambridge Heights College." },
      { property: "og:title", content: "About — Cambridge Heights College" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <Header />
      <section className="px-5 pb-24 pt-40 lg:px-8 lg:pt-48">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="About the College"
            title="A 130-year commitment to a different kind of learning."
            description="The full About page — history, leadership, accreditation and campus life — is coming in the next pass. The homepage links live so you can navigate the full architecture today."
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
