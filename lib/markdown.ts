import { visit } from "unist-util-visit";
import type { Node, Parent } from "unist";

const UNSAFE_MDX_NODE_TYPES = new Set([
  "mdxjsEsm",
  "mdxFlowExpression",
  "mdxTextExpression",
  "mdxJsxFlowElement",
  "mdxJsxTextElement"
]);

export function remarkStripUnsafeMdx() {
  return (tree: Node) => {
    visit(tree, (node: Node, index, parent: Parent | undefined) => {
      if (typeof index !== "number" || !parent?.children) {
        return;
      }

      if (UNSAFE_MDX_NODE_TYPES.has(node.type)) {
        parent.children.splice(index, 1);
        return index;
      }

      return undefined;
    });
  };
}
