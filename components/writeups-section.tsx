import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { WriteupCard } from "@/components/writeup-card";
import type { Writeup } from "@/lib/github";

type WriteupsSectionProps = {
  writeups: Writeup[];
};

export function WriteupsSection({ writeups }: WriteupsSectionProps) {
  return (
    <MotionSection id="writeups" className="border-t">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Writeups"
          title="Notes from writeup repositories"
          description="Writeups are discovered at build time from CTF_Writeups/2026 and L3m0nCTF2025-Writeups, then rendered from raw GitHub markdown into static pages."
        />
        <Button asChild variant="outline" className="w-fit">
          <Link href="/writeups">
            View all
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>

      {writeups.length > 0 ? (
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {writeups.map((writeup) => (
            <WriteupCard key={writeup.slug} writeup={writeup} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-lg border bg-muted/50 p-6 text-sm text-muted-foreground">
          No configured raw markdown writeups were found.
        </div>
      )}
    </MotionSection>
  );
}
