import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTASection } from "@/components/site/CTASection";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Cambridge Heights College" },
      { name: "description", content: "Apply for Autumn 2026. Requirements, deadlines and scholarships." },
      { property: "og:title", content: "Admissions — Cambridge Heights College" },
      { property: "og:url", content: "/admissions" },
    ],
    links: [{ rel: "canonical", href: "/admissions" }],
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  return (
    <main>
      <Header />
      <section className="px-5 pb-24 pt-40 lg:px-8 lg:pt-48">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Admissions"
            title="Apply for Autumn 2026."
            description="Step-by-step application guidance, scholarships and entry requirements arrive in the next pass."
          />
        </div>
      </section>
      <CTASection />
      <Footer />
    </main>
  );
}
