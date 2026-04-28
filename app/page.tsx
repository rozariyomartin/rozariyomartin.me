import { AboutSection } from "@/components/about-section";
import { AchievementsSection } from "@/components/achievements-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { WriteupsSection } from "@/components/writeups-section";
import { getCtftimeStats } from "@/lib/ctftime";
import { getWriteups } from "@/lib/github";

export default async function Home() {
  const [writeups, ctftimeStats] = await Promise.all([getWriteups(), getCtftimeStats()]);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <AchievementsSection stats={ctftimeStats} />
      <ProjectsSection />
      <WriteupsSection writeups={writeups.slice(0, 6)} />
      <ContactSection />
    </main>
  );
}
