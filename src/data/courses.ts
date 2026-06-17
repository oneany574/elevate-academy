import computing from "@/assets/course-computing.jpg";
import business from "@/assets/course-business.jpg";
import cyber from "@/assets/course-cyber.jpg";
import hospitality from "@/assets/course-hospitality.jpg";

export type CourseLevel = "Foundation" | "Undergraduate" | "Postgraduate";

export interface Course {
  slug: string;
  title: string;
  level: CourseLevel;
  duration: string;
  awardingBody: string;
  category: "Computing" | "Business" | "Security" | "Hospitality" | "Design";
  description: string;
  image: string;
}

export const courses: Course[] = [
  {
    slug: "bsc-computing",
    title: "BSc (Hons) Computing",
    level: "Undergraduate",
    duration: "3 Years",
    awardingBody: "University of the West of England",
    category: "Computing",
    description:
      "Engineer the systems that power tomorrow — from full-stack platforms to AI-driven products.",
    image: computing,
  },
  {
    slug: "bba",
    title: "Bachelor of Business Administration",
    level: "Undergraduate",
    duration: "4 Years",
    awardingBody: "Leeds Beckett University",
    category: "Business",
    description:
      "Build the strategic, financial and leadership fluency to steer modern organisations.",
    image: business,
  },
  {
    slug: "mba",
    title: "Master of Business Administration",
    level: "Postgraduate",
    duration: "18 Months",
    awardingBody: "Keele University",
    category: "Business",
    description:
      "An executive-grade MBA designed around real strategy, real teams and real outcomes.",
    image: business,
  },
  {
    slug: "msc-advanced-computing",
    title: "MSc Advanced Computing",
    level: "Postgraduate",
    duration: "1 Year",
    awardingBody: "University of the West of England",
    category: "Computing",
    description:
      "Specialise in distributed systems, machine intelligence and applied research.",
    image: computing,
  },
  {
    slug: "cyber-security",
    title: "Cyber Security & Digital Forensics",
    level: "Undergraduate",
    duration: "3 Years",
    awardingBody: "Leeds Beckett University",
    category: "Security",
    description:
      "Defend critical infrastructure with hands-on labs, red-teaming and forensic investigation.",
    image: cyber,
  },
  {
    slug: "hospitality",
    title: "BA (Hons) Hospitality Management",
    level: "Undergraduate",
    duration: "3 Years",
    awardingBody: "Keele University",
    category: "Hospitality",
    description:
      "Lead world-class hospitality brands through service design, operations and experience.",
    image: hospitality,
  },
];
