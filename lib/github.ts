import "server-only";
import { createHash } from "node:crypto";

const OWNER = "rozariyomartin";
const API_ROOT = "https://api.github.com";
const RAW_ROOT = "https://raw.githubusercontent.com";

type GitHubRepo = {
  name: string;
  fork: boolean;
  private: boolean;
  default_branch: string;
  description: string | null;
  html_url: string;
};

type GitTreeResponse = {
  tree: Array<{
    path: string;
    type: "blob" | "tree" | "commit";
  }>;
};

type WriteupSource = {
  repo: string;
  branch?: string;
  pathPrefix?: string;
};

type BaseWriteup = {
  slug: string;
  title: string;
  preview: string;
  repo: string;
  path: string;
  htmlUrl: string;
};

export type GitHubWriteup = BaseWriteup & {
  source: "github";
  branch: string;
  rawUrl: string;
};

export type NotionWriteup = BaseWriteup & {
  source: "notion";
  embedUrl: string;
};

export type Writeup = GitHubWriteup | NotionWriteup;

const WRITEUP_SOURCES: WriteupSource[] = [
  {
    repo: "CTF_Writeups",
    branch: "main",
    pathPrefix: "2026/"
  },
  {
    repo: "L3m0nCTF2025-Writeups",
    branch: "main"
  }
];

const NOTION_WRITEUPS: NotionWriteup[] = [
  {
    source: "notion",
    slug: "ramunchers-ctf-writeups-r0z4r1y0",
    title: "RAMunchers CTF - Writeups",
    preview: "RAMunchers CTF writeups hosted on Notion and embedded as a static writeup page.",
    repo: "Notion",
    path: "36341764502f80b5a8efe9e018912bdb",
    htmlUrl: "https://rozariyomartin.notion.site/36341764502f80b5a8efe9e018912bdb",
    embedUrl: "https://rozariyomartin.notion.site/ebd/36341764502f80b5a8efe9e018912bdb"
  }
];

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "martin-rozariyo-portfolio",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: githubHeaders(),
      cache: "force-cache"
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/plain; charset=utf-8",
        "User-Agent": "martin-rozariyo-portfolio"
      },
      cache: "force-cache"
    });

    if (!response.ok) {
      return null;
    }

    return response.text();
  } catch {
    return null;
  }
}

function encodePath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

function rawMarkdownUrl(repo: string, path: string, branch: string) {
  return `${RAW_ROOT}/${OWNER}/${encodeURIComponent(repo)}/${encodeURIComponent(branch)}/${encodePath(path)}`;
}

function htmlUrl(repo: GitHubRepo, path: string, branch: string) {
  return `${repo.html_url}/blob/${encodeURIComponent(branch)}/${encodePath(path)}`;
}

function isInSourcePath(path: string, source: WriteupSource) {
  return source.pathPrefix ? path.startsWith(source.pathPrefix) : true;
}

function isMarkdownWriteupPath(path: string, source: WriteupSource) {
  const lowerPath = path.toLowerCase();
  const fileName = lowerPath.split("/").pop() ?? "";
  const isMarkdown = /\.(md|mdx|markdown)$/.test(lowerPath);
  const isRootReadme = !path.includes("/") && /^readme\.(md|mdx|markdown)$/.test(fileName);

  if (!isMarkdown || isRootReadme || !isInSourcePath(path, source)) {
    return false;
  }

  return !(
    lowerPath.includes("node_modules/") ||
    lowerPath.includes(".github/") ||
    lowerPath.includes("vendor/") ||
    lowerPath.includes("license") ||
    lowerPath.includes("contributing") ||
    lowerPath.includes("code_of_conduct")
  );
}

function titleFromPath(repoName: string, path: string) {
  const parts = path.split("/");
  const file = parts.at(-1) ?? repoName;
  const stem = file.replace(/\.(md|mdx|markdown)$/i, "");
  const rawTitle = /^(readme|writeup)$/i.test(stem) ? parts.at(-2) ?? repoName : stem;

  return rawTitle
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function extractTitle(markdown: string, fallback: string) {
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (!heading) {
    return fallback;
  }

  return heading.replace(/[`*_~[\]]/g, "").slice(0, 100);
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>#-]/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractPreview(markdown: string, fallback: string) {
  const text = stripMarkdown(markdown);
  if (!text) {
    return fallback;
  }

  return text.length > 180 ? `${text.slice(0, 177).trim()}...` : text;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function makeSlug(repo: string, path: string) {
  const readable = slugify(`${repo}-${path.replace(/\.(md|mdx|markdown)$/i, "")}`);
  const hash = createHash("sha1").update(`${repo}:${path}`).digest("hex").slice(0, 8);
  return `${readable}-${hash}`;
}

async function getWriteupRepositories() {
  const repos = await Promise.all(
    WRITEUP_SOURCES.map((source) =>
      fetchJson<GitHubRepo>(`${API_ROOT}/repos/${OWNER}/${source.repo}`)
    )
  );

  const entries: Array<{ repo: GitHubRepo; source: WriteupSource }> = [];

  repos.forEach((repo, index) => {
    if (repo && !repo.fork && !repo.private) {
      entries.push({ repo, source: WRITEUP_SOURCES[index] });
    }
  });

  return entries;
}

async function getRepoTree(repo: GitHubRepo, branch: string) {
  return fetchJson<GitTreeResponse>(
    `${API_ROOT}/repos/${OWNER}/${repo.name}/git/trees/${encodeURIComponent(branch)}?recursive=1`
  );
}

async function getMarkdownText(repo: string, path: string, branch: string) {
  return fetchText(rawMarkdownUrl(repo, path, branch));
}

export async function getWriteups(): Promise<Writeup[]> {
  const repositories = await getWriteupRepositories();

  const nestedWriteups = await Promise.all(
    repositories.map(async ({ repo, source }) => {
      const branch = source.branch ?? repo.default_branch;
      const tree = await getRepoTree(repo, branch);

      if (!tree?.tree?.length) {
        return [];
      }

      const paths = tree.tree
        .filter((item) => item.type === "blob" && isMarkdownWriteupPath(item.path, source))
        .map((item) => item.path)
        .sort((a, b) => a.localeCompare(b));

      return Promise.all(
        paths.map(async (path) => {
          const markdown = await getMarkdownText(repo.name, path, branch);
          const fallbackTitle = titleFromPath(repo.name, path);

          return {
            source: "github",
            slug: makeSlug(repo.name, path),
            title: extractTitle(markdown ?? "", fallbackTitle),
            preview: extractPreview(markdown ?? "", repo.description ?? "CTF writeup."),
            repo: repo.name,
            path,
            branch,
            htmlUrl: htmlUrl(repo, path, branch),
            rawUrl: rawMarkdownUrl(repo.name, path, branch)
          } satisfies GitHubWriteup;
        })
      );
    })
  );

  const githubWriteups = nestedWriteups
    .flat()
    .sort((a, b) => `${a.repo}/${a.path}`.localeCompare(`${b.repo}/${b.path}`));

  return [...NOTION_WRITEUPS, ...githubWriteups];
}

export async function getWriteupBySlug(slug: string) {
  const writeups = await getWriteups();
  return writeups.find((writeup) => writeup.slug === slug) ?? null;
}

export async function getRawMarkdown(writeup: GitHubWriteup) {
  const markdown = await getMarkdownText(writeup.repo, writeup.path, writeup.branch);
  return (
    markdown ??
    `# ${writeup.title}\n\nThis writeup could not be loaded from the raw GitHub link. View the original file on GitHub: [${writeup.repo}/${writeup.path}](${writeup.htmlUrl}).`
  );
}
