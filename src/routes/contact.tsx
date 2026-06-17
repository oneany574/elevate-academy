import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import { MapPin, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Cambridge Heights College" },
      { name: "description", content: "Get in touch with admissions, faculty or campus services." },
      { property: "og:title", content: "Contact — Cambridge Heights College" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main>
      <Header />
      <section className="px-5 pb-24 pt-40 lg:px-8 lg:pt-48">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Get in touch"
            title="We're here, whenever you're ready."
            description="A full contact form, campus map and live chat will arrive in the next pass."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              { Icon: MapPin, title: "Visit", text: "42 Trinity Lane, Cambridge Heights Campus" },
              { Icon: Phone, title: "Call", text: "+44 (0)20 7946 0000" },
              { Icon: Mail, title: "Email", text: "admissions@cambridgeheights.edu" },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <Icon className="size-5 text-accent" />
                <p className="text-display mt-4 text-xl text-primary">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
