import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, getMorePosts, type BlogBlock, type BlogPost } from "@/lib/blog";
import BlogCard from "./BlogCard";
import { LinkButton } from "./ui/Button";
import { ArrowIcon } from "./ui/icons";

function renderBlock(block: BlogBlock, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={index} className="mt-12 font-serif text-2xl leading-tight tracking-tight text-forest sm:text-3xl">
          {block.text}
        </h2>
      );
    case "list":
      return (
        <ul key={index} className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.8] text-muted sm:text-[17px]">
              <span className="mt-[0.8em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <figure key={index} className="mt-9 border-l-2 border-gold pl-5 sm:pl-6">
          <blockquote className="font-serif text-xl italic leading-snug text-forest sm:text-2xl">
            &ldquo;{block.text}&rdquo;
          </blockquote>
          {block.cite && (
            <figcaption className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {block.cite}
            </figcaption>
          )}
        </figure>
      );
    case "callout":
      return (
        <aside key={index} className="mt-9 rounded-xl border border-gold/25 bg-gold/[0.06] px-5 py-4 sm:px-6 sm:py-5">
          <p className="font-serif text-lg text-forest">{block.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-forest/80 sm:text-base">{block.text}</p>
        </aside>
      );
    default:
      return (
        <p key={index} className="mt-5 text-[15px] leading-[1.8] text-muted sm:text-[17px] sm:leading-[1.85]">
          {block.text}
        </p>
      );
  }
}

/**
 * One article: a photo hero in the same style as the destination pages
 * (light edge gradients, back button, pills, serif title), a single readable
 * column of long-form copy, then "plan it" links, more reading and a closing
 * call to action.
 */
export default function BlogPostPage({ post }: { post: BlogPost }) {
  const more = getMorePosts(post, 3);

  return (
    <main className="bg-cream">
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-forest">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/45 via-forest/10 to-forest/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-center px-5 pb-14 pt-32 sm:min-h-[74svh] sm:px-6 sm:pb-16 lg:px-8">
          <LinkButton
            href="/blog"
            variant="dark"
            className="group mb-6 w-fit gap-2 text-[11px] uppercase tracking-[0.12em]"
          >
            <span className="rotate-180 transition-transform duration-300 ease-out group-hover:-translate-x-1">
              <ArrowIcon size={13} />
            </span>
            Back to the blog
          </LinkButton>

          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-cream/95 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-green sm:text-xs">
              {post.category}
            </span>

            <h1 className="mt-5 font-serif text-[32px] font-semibold leading-[1.1] tracking-tight text-cream [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] sm:text-5xl md:text-[56px]">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-cream/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-base md:text-lg">
              {post.excerpt}
            </p>

            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-semibold text-cream/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
              <time dateTime={post.publishDate}>{formatBlogDate(post.publishDate)}</time>
              <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
              <span>{post.readTime}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Article ---------------- */}
      <article className="pb-6 pt-12 sm:pt-14 lg:pt-16">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-6 lg:px-8">
          <div className="-mt-5">{post.body.map(renderBlock)}</div>

          {post.related.length > 0 && (
            <div className="mt-14 rounded-[22px] border border-forest/10 bg-white p-5 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Plan it</p>
              <ul className="mt-4 divide-y divide-forest/10">
                {post.related.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between gap-4 py-3.5 outline-none focus-visible:ring-2 focus-visible:ring-green"
                    >
                      <span>
                        <span className="block font-serif text-lg text-forest transition-colors duration-300 group-hover:text-green">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block text-sm leading-relaxed text-muted">{link.description}</span>
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-forest transition-colors duration-300 group-hover:bg-green group-hover:text-white">
                        <ArrowIcon size={14} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      {/* ---------------- More reading ---------------- */}
      {more.length > 0 && (
        <section className="pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-24">
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
              <span className="h-px w-8 bg-muted/60" />
              Keep reading
            </div>
            <h2 className="font-serif text-3xl leading-[1.1] tracking-tight text-forest sm:text-4xl">
              More from the <span className="text-green">blog</span>
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((item, index) => (
                <BlogCard key={item.slug} post={item} delay={index * 90} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- Closing CTA ---------------- */}
      <section className="relative isolate overflow-hidden bg-night py-16 sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-3xl px-5 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Ready when you are</p>
          <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-cream sm:text-4xl">
            Turn the reading into a <span className="text-gold">journey</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/70 sm:text-base">
            Tell us when you want to go and what you want to see — our local guides will take it from there.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <LinkButton href="/plan-your-trip" className="group">
              Plan Your Trip
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                <ArrowIcon size={14} />
              </span>
            </LinkButton>
            <LinkButton href="/blog" variant="outline">
              All articles
            </LinkButton>
          </div>
        </div>
      </section>
    </main>
  );
}
