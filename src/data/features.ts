import {
  Cpu,
  HeartHandshake,
  GraduationCap,
  Lightbulb,
  Leaf,
  Globe2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const features: Feature[] = [
  {
    title: "Modern Computer Lab",
    description:
      "GPU workstations, secure pentest networks and 24-hour study suites built for serious work.",
    Icon: Cpu,
  },
  {
    title: "Counselling & Wellbeing",
    description:
      "Confidential, on-campus support from licensed counsellors — because your mind matters.",
    Icon: HeartHandshake,
  },
  {
    title: "Academic Success Centre",
    description:
      "One-to-one writing, research and study coaching from our team of academic mentors.",
    Icon: GraduationCap,
  },
  {
    title: "Innovation & Incubation",
    description:
      "Funding, mentorship and lab space to take your idea from sketch to startup.",
    Icon: Lightbulb,
  },
  {
    title: "Sustainability Unit",
    description:
      "Carbon-neutral campus by 2028 — embedded across curriculum, operations and research.",
    Icon: Leaf,
  },
  {
    title: "International Mobility",
    description:
      "Study abroad semesters and dual-degree pathways with our global partner network.",
    Icon: Globe2,
  },
];
