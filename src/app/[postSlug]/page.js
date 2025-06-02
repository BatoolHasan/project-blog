import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

import { loadBlogPost } from "@/helpers/file-helpers";

import { MDXRemote } from "next-mdx-remote/rsc";

import CodeSnippet from "@/components/CodeSnippet";

const DivisionGroupsDemo = React.lazy(() =>
  import("@/components/DivisionGroupsDemo")
);

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const { content } = await getBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero title="Example post!" publishedOn={new Date()} />
      <div className={styles.page}>
        <MDXRemote
          source={content}
          components={{ pre: CodeSnippet, DivisionGroupsDemo }}
          lazy
        />
      </div>
    </article>
  );
}
export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const { frontmatter } = await getBlogPost(postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}
export default BlogPost;

export const getBlogPost = React.cache(async (postSlug) => {
  const blogPost = await loadBlogPost(postSlug);

  return blogPost;
});
