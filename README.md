# Martin Rozariyo Portfolio

Production-grade personal portfolio for a cybersecurity student, built with Next.js App Router, TailwindCSS, shadcn/ui-style components, Framer Motion, and MDX rendering for GitHub-hosted writeups.

## Development

```bash
npm install
npm run dev
```

## Static Deployment

The app is configured for static export and GitHub Pages deployment with the `rozariyomartin.me` custom domain.

```bash
npm run build
```

The GitHub Actions workflow passes GitHub's built-in `GITHUB_TOKEN` during the build so writeup discovery can use the GitHub API without a personal access token. The deployed site is still static HTML.

For project Pages deployments without a custom domain, set `NEXT_PUBLIC_BASE_PATH=/repository-name`. The included GitHub Actions workflow does this automatically when no `CNAME` file is present.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```
