import { ArrowUpRight } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    title: "Secure Password Manager",
    stack: ["AES-GCM", "Argon2/bcrypt", "Python"],
    description:
      "Password management project focused on authenticated encryption, password-derived keys, and secure storage fundamentals.",
    href: "https://github.com/rozariyomartin/password-manager"
  },
  {
    title: "IoT Server Room Monitoring System",
    stack: ["IoT", "Sensors", "Monitoring"],
    description:
      "Monitoring system for server room conditions with emphasis on practical telemetry and reliability for physical infrastructure.",
    href: "https://github.com/rozariyomartin/IoT"
  }
];

export function ProjectsSection() {
  return (
    <MotionSection id="projects" className="border-t">
      <SectionHeading
        eyebrow="Projects"
        title="Applied security and systems work"
        description="Selected projects that connect security concepts with implementation and operational context."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.title} className="group shadow-none transition-colors hover:border-gray-300">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-start justify-between gap-4">
                <CardTitle>{project.title}</CardTitle>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  aria-label={`${project.title} GitHub repository`}
                >
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <Badge key={item} variant="subtle">
                    {item}
                  </Badge>
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </MotionSection>
  );
}
