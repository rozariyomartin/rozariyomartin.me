import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-5 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-normal text-foreground">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground">
        The page may have moved, or the referenced writeup is no longer available from GitHub.
      </p>
      <Button asChild className="mt-8 w-fit">
        <Link href="/">Return home</Link>
      </Button>
    </main>
  );
}
