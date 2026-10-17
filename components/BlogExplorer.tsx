"use client";

import { useMemo, useState } from "react";
import { BLOG_CATEGORIES, type BlogCategory, type BlogPost } from "@/lib/blog";
import SectionHeader from "./ui/SectionHeader";
import BlogCard from "./BlogCard";
import Slider from "./ui/Slider";

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
    <section className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 section-y">
      <SectionHeader
        eyebrow="Latest articles"
        heading={
          <>
            Read before you <span className="text-green">go</span>
          </>
        }
        note={
          <span role="status">
            <span className="font-semibold text-forest">{visible.length}</span>{" "}
            {visible.length === 1 ? "article" : "articles"}
            {activeCategory ? ` in ${activeCategory}` : ""}
          </span>
        }
        actions={
        <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            aria-pressed={activeCategory === null}
            className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-[0.8125rem] lg:min-h-0 font-medium transition-colors duration-300 ${
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
                className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-[0.8125rem] lg:min-h-0 font-medium transition-colors duration-300 ${
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
        }
      />

      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[1.375rem] border border-dashed border-forest/15 bg-white py-16 text-center">
          <p className="font-serif text-xl text-forest">No articles here yet</p>
          <p className="mt-2 max-w-sm text-sm text-muted">Try another category — or head back to all articles.</p>
        </div>
      ) : (
        <>
          <Slider as="div" label="articles" className="card-grid-loose">
            {showFeatured && <BlogCard key={lead.slug} post={lead} featured />}
            {gridPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} delay={(index % 6) * 90} />
            ))}
          </Slider>
        </>
      )}
    </section>
  );
}
