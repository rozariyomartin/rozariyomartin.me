import type { Metadata } from "next";
import { WriteupCard } from "@/components/writeup-card";
import { getWriteups } from "@/lib/github";

export const metadata: Metadata = {
  title: "Writeups",
  description: "GitHub-hosted security and CTF writeups by Martin Rozariyo."
};

export default async function WriteupsPage() {
  const writeups = await getWriteups();

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Writeups</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
          Security notes and CTF writeups
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground">
          Markdown writeups discovered at build time from CTF_Writeups/2026 and
          L3m0nCTF2025-Writeups, then rendered from raw GitHub markdown into static
          pages.
        </p>
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
    </main>
  );
}
