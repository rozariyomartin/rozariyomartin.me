import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { MdxContent } from "@/components/mdx-content";
import { Button } from "@/components/ui/button";
import { getRawMarkdown, getWriteupBySlug, getWriteups } from "@/lib/github";

export const dynamic = "force-static";
export const dynamicParams = false;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const writeups = await getWriteups();

  if (writeups.length === 0) {
    throw new Error(
      "No writeups were discovered. For GitHub Pages builds, pass GITHUB_TOKEN to npm run build so the GitHub API can enumerate the configured writeup repositories."
    );
  }

  return writeups.slice(0, 24).map((writeup) => ({
    slug: writeup.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const writeup = await getWriteupBySlug(slug);

  if (!writeup) {
    return {
      title: "Writeup Not Found"
    };
  }

  return {
    title: writeup.title,
    description: writeup.preview,
    alternates: {
      canonical: `/writeups/${writeup.slug}`
    },
    openGraph: {
      title: writeup.title,
      description: writeup.preview,
      type: "article",
      url: `/writeups/${writeup.slug}`
    }
  };
}

export default async function WriteupPage({ params }: PageProps) {
  const { slug } = await params;
  const writeup = await getWriteupBySlug(slug);

  if (!writeup) {
    notFound();
  }

  const source = await getRawMarkdown(writeup);

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 border-b pb-8 sm:flex-row sm:items-center sm:justify-between">
        <Button asChild variant="ghost" className="-ml-3 w-fit">
          <Link href="/writeups">
            <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
            Back to writeups
          </Link>
        </Button>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="outline" className="w-fit">
            <a href={writeup.rawUrl} target="_blank" rel="noreferrer">
              Raw Markdown
              <ExternalLink className="ml-2 size-4" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild variant="outline" className="w-fit">
            <a href={writeup.htmlUrl} target="_blank" rel="noreferrer">
              View on GitHub
              <ExternalLink className="ml-2 size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      <article>
        <header className="mb-10">
          <p className="text-sm font-medium text-primary">{writeup.repo}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
            {writeup.title}
          </h1>
          <p className="mt-4 font-mono text-xs text-muted-foreground">{writeup.path}</p>
        </header>
        <MdxContent source={source} />
      </article>
    </main>
  );
}
