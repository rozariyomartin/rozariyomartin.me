import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Writeup } from "@/lib/github";

type WriteupCardProps = {
  writeup: Writeup;
};

export function WriteupCard({ writeup }: WriteupCardProps) {
  const sourceLabel =
    writeup.source === "github" ? `${writeup.repo}/${writeup.path}` : "Notion embedded writeup";

  return (
    <Card className="group shadow-none transition-colors hover:border-gray-300">
      <CardContent className="p-5">
        <p className="font-mono text-xs text-muted-foreground">{sourceLabel}</p>
        <h3 className="mt-3 text-lg font-semibold leading-7 text-foreground">{writeup.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">{writeup.preview}</p>
        <Link
          href={`/writeups/${writeup.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary underline decoration-transparent transition-colors group-hover:decoration-primary"
        >
          Read writeup
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}
