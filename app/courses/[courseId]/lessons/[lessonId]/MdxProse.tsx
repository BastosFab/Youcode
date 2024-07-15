import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";

import React from "react";
import { Spoiler } from "../../../../admin/courses/[courseId]/lessons/[lessonId]/content/custom/Spoiler";

export type MdxProseProps = {
  markdown: string;
};

const components = { Spoiler };

export const MdxProse = ({ markdown }: MdxProseProps) => {
  return (
    <article className="prose m-auto dark:prose-invert xl:prose-xl">
      <MDXRemote
        source={markdown}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypePrism],
          },
        }}
        components={components}
      />
    </article>
  );
};
