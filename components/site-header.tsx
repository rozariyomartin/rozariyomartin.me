import Link from "next/link";
import { BriefcaseBusiness, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "CTF", href: "/#ctf" },
  { label: "Projects", href: "/#projects" },
  { label: "Writeups", href: "/writeups" },
  { label: "Contact", href: "/#contact" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-normal text-foreground">
          Martin Rozariyo
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" aria-label="GitHub">
            <a href="https://github.com/rozariyomartin" target="_blank" rel="noreferrer">
              <Code2 className="size-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
            <a
              href="https://www.linkedin.com/in/martin-rozariyo-i-b47b6b288/"
              target="_blank"
              rel="noreferrer"
            >
              <BriefcaseBusiness className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>
      <nav
        className="mx-auto flex w-full max-w-6xl gap-5 overflow-x-auto border-t px-5 py-2 text-sm md:hidden"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground hover:underline"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
