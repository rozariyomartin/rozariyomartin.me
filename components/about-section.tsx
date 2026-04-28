import { ExternalLink } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const focusAreas = ["Web Security", "CTFs", "Red Team fundamentals"];

export function AboutSection() {
  return (
    <MotionSection id="about" className="border-t">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="About"
          title="Security learning with practical depth"
          description="Martin is a 3rd year BTech cybersecurity student building experience through applied web security, competitive CTF work, and foundational red team practice."
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {focusAreas.map((area) => (
            <Card key={area} className="shadow-none">
              <CardContent className="p-5">
                <p className="text-sm font-medium text-muted-foreground">Focus</p>
                <p className="mt-2 text-lg font-semibold text-foreground">{area}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="shadow-none sm:col-span-3">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-muted-foreground">Team</p>
              <a
                href="https://team-hunter.tech"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-lg font-semibold text-foreground underline decoration-border transition-colors hover:text-primary hover:decoration-primary"
              >
                Cofounder of Team Hunter
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </MotionSection>
  );
}
