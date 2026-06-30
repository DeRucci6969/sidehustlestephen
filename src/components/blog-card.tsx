import Link from "next/link";
import { ArrowRight, BookOpenText } from "lucide-react";
import type { BlogPost } from "@/data/blog";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="glass-soft group flex h-full min-h-[310px] flex-col rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/78 hover:shadow-[0_22px_54px_rgba(22,32,50,0.14)] sm:p-6"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--orange-glass)] px-3 py-1 text-xs font-black uppercase tracking-[0.13em] text-[var(--safety-orange)]">
            {post.category}
          </span>
          {featured ? (
            <span className="rounded-full border border-[rgba(22,32,50,0.1)] bg-white/74 px-3 py-1 text-xs font-bold text-[var(--graphite)]">
              Start here
            </span>
          ) : null}
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--obsidian)] text-white transition group-hover:rotate-6">
          <BookOpenText size={17} />
        </span>
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--graphite)]">
        {post.readingTime} - Updated {post.updatedAt}
      </p>
      <h3 className="mt-3 text-2xl font-bold leading-[1.05] tracking-normal text-[var(--navy-ink)] sm:text-3xl">
        {post.title}
      </h3>
      <p className="mt-4 text-sm font-semibold leading-6 text-[var(--text-primary)]">{post.description}</p>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[rgba(22,32,50,0.1)] pt-5">
        <span className="text-xs font-bold text-[var(--graphite)]">Practical guide</span>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-[var(--safety-orange)]">
          Read
          <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
