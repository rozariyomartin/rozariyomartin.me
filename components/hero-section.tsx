import { ArrowUpRight, BriefcaseBusiness, Code2 } from "lucide-react";
import { MotionSection } from "@/components/motion-section";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <MotionSection className="grid min-h-[calc(100vh-4rem)] items-center gap-12 py-20 md:grid-cols-[1.08fr_0.92fr]">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Cybersecurity Portfolio
        </p>
        <h1 className="mt-5 text-5xl font-semibold tracking-normal text-foreground sm:text-6xl">
          Martin Rozariyo
        </h1>
        <p className="mt-5 text-xl font-medium text-foreground">
          Cybersecurity Student | CTF Player | Web Security Enthusiast
        </p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
          Practical security learner focused on web vulnerability research, CTF problem solving,
          and building reliable security-aware software.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href="https://github.com/rozariyomartin" target="_blank" rel="noreferrer">
              <Code2 className="size-4" aria-hidden="true" />
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://www.linkedin.com/in/martin-rozariyo-i-b47b6b288/"
              target="_blank"
              rel="noreferrer"
            >
              <BriefcaseBusiness className="size-4" aria-hidden="true" />
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="ghost">
            <a href="https://ctftime.org/user/221722" target="_blank" rel="noreferrer">
              CTFtime
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      <TerminalCard />
    </MotionSection>
  );
}
