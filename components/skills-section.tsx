import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skillGroups = [
  {
    title: "Web Security",
    items: ["XSS", "SSRF", "IDOR", "Auth bypass"]
  },
  {
    title: "Tools",
    items: ["Burp Suite", "Nmap", "Wireshark"]
  },
  {
    title: "Programming",
    items: ["Python", "JavaScript", "Bash"]
  },
  {
    title: "Concepts",
    items: ["OWASP Top 10", "Networking"]
  }
];

export function SkillsSection() {
  return (
    <MotionSection id="skills" className="border-t">
      <SectionHeading
        eyebrow="Skills"
        title="Focused security toolkit"
        description="A compact set of practical skills used across CTFs, labs, and security-focused engineering projects."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <Card key={group.title} className="shadow-none">
            <CardHeader className="p-5 pb-3">
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 p-5 pt-0">
              {group.items.map((item) => (
                <Badge key={item} variant="subtle">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </MotionSection>
  );
}
