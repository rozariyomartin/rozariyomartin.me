import { ArrowUpRight } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CtftimeStats } from "@/lib/ctftime";

type AchievementsSectionProps = {
  stats: CtftimeStats;
};

export function AchievementsSection({ stats }: AchievementsSectionProps) {
  const cards = [
    {
      label: "Ranking",
      value: stats.globalRank ?? "Available on CTFtime",
      detail: stats.countryRank ? `Country rank ${stats.countryRank}` : "Public profile ranking"
    },
    {
      label: "Participation",
      value: stats.events ?? "Event history",
      detail: "CTFtime profile activity"
    },
    {
      label: "Rating",
      value: stats.rating ?? "Live profile",
      detail: stats.status === "live" ? "Fetched from CTFtime" : "Linked from CTFtime"
    }
  ];

  return (
    <MotionSection id="ctf" className="border-t">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="CTF & Achievements"
          title="Competitive security practice"
          description="CTFtime integration is cached and kept intentionally simple: ranking, participation context, and a direct profile link."
        />
        <Button asChild variant="outline" className="w-fit">
          <a href={stats.profileUrl} target="_blank" rel="noreferrer">
            Open CTFtime
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label} className="shadow-none">
            <CardContent className="p-5">
              <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
              <p className="mt-3 text-2xl font-semibold text-foreground">{card.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </MotionSection>
  );
}
