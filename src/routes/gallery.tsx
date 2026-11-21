import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Cambridge Heights College" },
      { name: "description", content: "Moments from campus — events, ceremonies and student life." },
      { property: "og:title", content: "Gallery — Cambridge Heights College" },
      { property: "og:description", content: "Moments from campus — events, ceremonies and student life." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <main>
      <Header />
      <section className="px-5 pb-24 pt-40 lg:px-8 lg:pt-48">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Gallery"
            title="Moments from the campus."
            description="A full masonry photo gallery and video archive will land in the next pass."
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
