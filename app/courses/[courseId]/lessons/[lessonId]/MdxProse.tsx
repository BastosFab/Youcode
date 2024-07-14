import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";

import React from "react";

export type MdxProseProps = {
  markdown: string;
};

export const MdxProse = ({ markdown }: MdxProseProps) => {
  return (
    <div className="prose m-auto dark:prose-invert xl:prose-xl">
      <MDXRemote
        source={markdown}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypePrism],
          },
        }}
      />
      ;
    </div>
  );
};
