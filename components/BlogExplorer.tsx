"use client";

import { useMemo, useState } from "react";
import { BLOG_CATEGORIES, type BlogCategory, type BlogPost } from "@/lib/blog";
import BlogCard from "./BlogCard";

/**
 * Listing body: category pills (same pill style as the Festival gallery
 * filter) over a card grid. With "All" selected the newest post leads as a
 * wide featured card; picking a category shows a plain grid of matches.
 */
export default function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | null>(null);

  // Only offer categories that actually have a post.
  const categories = useMemo(
    () =>
      BLOG_CATEGORIES.map((category) => ({
        category,
        count: posts.filter((post) => post.category === category).length,
      })).filter((entry) => entry.count > 0),
    [posts]
  );

  const visible = activeCategory ? posts.filter((post) => post.category === activeCategory) : posts;
  const [lead, ...rest] = visible;
  const showFeatured = activeCategory === null && lead !== undefined;
  const gridPosts = showFeatured ? rest : visible;

  return (
    <section className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28">
      <div className="mb-12 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            <span className="h-px w-8 bg-muted/60" />
            Latest articles
          </div>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-forest sm:text-5xl">
            Read before you <span className="text-green">go</span>
          </h2>
          <p role="status" className="mt-3 text-sm text-muted">
            <span className="font-semibold text-forest">{visible.length}</span>{" "}
            {visible.length === 1 ? "article" : "articles"}
            {activeCategory ? ` in ${activeCategory}` : ""}
          </p>
        </div>

        <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-pressed={activeCategory === null}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
              activeCategory === null
                ? "border-forest bg-forest text-white"
                : "border-forest/12 bg-white text-muted hover:border-forest/25 hover:text-forest"
            }`}
          >
            All
            <span className="ml-1.5 text-xs opacity-60">{posts.length}</span>
          </button>
          {categories.map(({ category, count }) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`inline-flex items-center rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  isActive
                    ? "border-green/30 bg-green/10 text-forest"
                    : "border-forest/12 bg-white text-muted hover:border-forest/25 hover:text-forest"
                }`}
              >
                {category}
                <span className="ml-1.5 text-xs opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[22px] border border-dashed border-forest/15 bg-white py-16 text-center">
          <p className="font-serif text-xl text-forest">No articles here yet</p>
          <p className="mt-2 max-w-sm text-sm text-muted">Try another category — or head back to all articles.</p>
        </div>
      ) : (
        <>
          {showFeatured && (
            <div className="mb-12 sm:mb-14 lg:mb-16">
              <BlogCard key={lead.slug} post={lead} featured />
            </div>
          )}
          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12">
              {gridPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} delay={(index % 6) * 90} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
