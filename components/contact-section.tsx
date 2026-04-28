import { BriefcaseBusiness, Code2, Mail } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/rozariyomartin",
    icon: Code2
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/martin-rozariyo-i-b47b6b288/",
    icon: BriefcaseBusiness
  },
  {
    label: "Email",
    href: "mailto:martin.rozariyo@example.com",
    icon: Mail
  }
];

export function ContactSection() {
  return (
    <MotionSection id="contact" className="border-t pb-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Contact"
          title="Direct links"
          description="Minimal contact surface for security collaboration, CTF work, and project discussions."
        />
        <div className="flex flex-wrap gap-3">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Button key={link.href} asChild variant={link.label === "Email" ? "default" : "outline"}>
                <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <Icon className="size-4" aria-hidden="true" />
                  {link.label}
                </a>
              </Button>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
