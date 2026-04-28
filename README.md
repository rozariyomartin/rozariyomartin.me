# Martin Rozariyo Portfolio

Production-grade personal portfolio for a cybersecurity student, built with Next.js App Router, TailwindCSS, shadcn/ui-style components, Framer Motion, and MDX rendering for GitHub-hosted writeups.

## Development

```bash
npm install
npm run dev
```

## Static Deployment

The app is configured for static export and can be deployed to GitHub Pages from the generated `out/` directory.

```bash
npm run build
```

The GitHub Actions workflow passes GitHub's built-in `GITHUB_TOKEN` during the build so writeup discovery can use the GitHub API without a personal access token. The deployed site is still static HTML.

For project Pages deployments, set `NEXT_PUBLIC_BASE_PATH=/repository-name`. The included GitHub Actions workflow does this automatically.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```
