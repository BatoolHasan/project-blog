import React from "react";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";

import { loadBlogPost } from "@/helpers/file-helpers";

import { MDXRemote } from "next-mdx-remote/rsc";

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const { content } = await loadBlogPost(postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero title="Example post!" publishedOn={new Date()} />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
