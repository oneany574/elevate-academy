import s1 from "@/assets/student-1.jpg";
import s2 from "@/assets/student-2.jpg";
import s3 from "@/assets/student-3.jpg";

export interface Testimonial {
  name: string;
  course: string;
  year: string;
  image: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Anika Tamang",
    course: "MSc Advanced Computing",
    year: "Class of 2025",
    image: s1,
    quote:
      "The research culture here is unlike anything I expected. My supervisor pushed me to publish — and now I'm starting a PhD at ETH Zürich.",
  },
  {
    name: "Rohan Shrestha",
    course: "BBA, Class of 2024",
    year: "Now at Deloitte London",
    image: s2,
    quote:
      "The international mobility programme sent me to Leeds for a semester. That trip basically wrote my CV — and led directly to my first role.",
  },
  {
    name: "Adaeze Okafor",
    course: "BA Hospitality Management",
    year: "Class of 2026",
    image: s3,
    quote:
      "From day one, the faculty treated us like future leaders, not just students. The teaching kitchens, the case studies, the placements — everything is set up for you to actually do the work.",
  },
];
