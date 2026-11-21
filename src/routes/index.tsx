import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroVideoSection } from "@/components/site/HeroVideoSection";
import { SearchTabs } from "@/components/site/SearchTabs";
import { MoreThanCollege } from "@/components/site/MoreThanCollege";
import { FeaturedCourses } from "@/components/site/FeaturedCourses";
import { LifeBento } from "@/components/site/LifeBento";
import { VirtualTour } from "@/components/site/VirtualTour";
import { GlobalExperience } from "@/components/site/GlobalExperience";
import { PartnerMarquee } from "@/components/site/PartnerMarquee";
import { WhatsNew } from "@/components/site/WhatsNew";
import { TestimonialSlider } from "@/components/site/TestimonialSlider";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cambridge Heights College — A Global Education" },
      {
        name: "description",
        content:
          "Premium UK-accredited degrees in computing, business, security and hospitality. Vibrant student life, international mobility, 94% employability.",
      },
      { property: "og:title", content: "Cambridge Heights College" },
      {
        property: "og:description",
        content:
          "Shape your future with a global education at Cambridge Heights College. Apply for Autumn 2026.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          name: "Cambridge Heights College",
          url: "/",
          foundingDate: "1894",
          description:
            "An independent college offering UK-accredited undergraduate and postgraduate degrees.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "42 Trinity Lane",
            addressLocality: "Cambridge Heights",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Header />
      <HeroVideoSection />
      <SearchTabs />
      <MoreThanCollege />
      <FeaturedCourses />
      <LifeBento />
      <VirtualTour />
      <GlobalExperience />
      <PartnerMarquee />
      <WhatsNew />
      <TestimonialSlider />
      <CTASection />
      <Footer />
    </main>
  );
}
