import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { remarkStripUnsafeMdx } from "@/lib/markdown";

type MdxContentProps = {
  source: string;
};

const components = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // GitHub-uploaded markdown images are arbitrary remote assets, so keep them as plain img tags.
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} loading="lazy" decoding="async" />
  )
};

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "img"],
  attributes: {
    ...defaultSchema.attributes,
    img: [
      ...(defaultSchema.attributes?.img ?? []),
      "src",
      "alt",
      "title",
      "width",
      "height",
      "loading",
      "decoding"
    ]
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ["http", "https"]
  }
};

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="reading">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkStripUnsafeMdx],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                  properties: {
                    className: ["no-underline"]
                  }
                }
              ],
              rehypeRaw,
              [rehypeSanitize, sanitizeSchema],
              [
                rehypePrettyCode,
                {
                  theme: "github-light",
                  keepBackground: false
                }
              ]
            ],
            format: "md"
          }
        }}
      />
    </div>
  );
}
