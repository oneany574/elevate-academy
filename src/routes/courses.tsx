import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FeaturedCourses } from "@/components/site/FeaturedCourses";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Cambridge Heights College" },
      { name: "description", content: "Explore UK-accredited undergraduate and postgraduate programmes." },
      { property: "og:title", content: "Courses — Cambridge Heights College" },
      { property: "og:description", content: "Explore UK-accredited undergraduate and postgraduate programmes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  return (
    <main>
      <Header />
      <section className="px-5 pb-12 pt-40 lg:px-8 lg:pt-48">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Programmes"
            title="Choose the route that fits you."
            description="Foundation, undergraduate and postgraduate — delivered with our UK university partners."
          />
        </div>
      </section>
      <FeaturedCourses />
      <Footer />
    </main>
  );
}
