"use client";

import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import ArticlesComponent from "./ArticlesComponent";
import { blogData } from "@/lib/data/blog-content";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

const HomeComponent = () => {
  const articles = blogData();

  return (
    <div className="space-y-24 max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* HERO SECTION */}
      <section className="pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* LEFT CONTENT */}
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30 px-3.5 py-1 text-xs font-bold rounded-full"
            >
              🚀 Welcome to DevDairy Platform
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
              Share Your <span className="text-[#3897ff]">Dev Journey</span> With The World
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl font-medium">
              Document your technical breakthroughs, explore modern web development, and connect with a global community of developers building the future.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/blogs">
                <Button className="bg-[#3897ff] hover:bg-[#2887ef] text-white font-extrabold h-11 px-7 shadow-lg shadow-blue-500/25 rounded-xl gap-2 cursor-pointer transition-all hover:scale-[1.02] border-none">
                  Explore Blogs <BsArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link href="/about">
                <Button variant="outline" className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold h-11 px-6 rounded-xl shadow-xs cursor-pointer transition-all">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* STATS BADGES */}
            <div className="flex flex-wrap gap-6 pt-6 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80">
              <p className="flex items-center gap-2">🔥 <span className="text-slate-900 dark:text-white font-bold">100+</span> Articles</p>
              <p className="flex items-center gap-2">🚀 <span className="text-slate-900 dark:text-white font-bold">Fast</span> Community</p>
              <p className="flex items-center gap-2">💡 <span className="text-slate-900 dark:text-white font-bold">Developer</span> Focused</p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative group">
              <div className="absolute -inset-1 bg-[#3897ff] rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-900">
                <Image
                  src="/images/hero.png"
                  width={550}
                  height={450}
                  alt="DevDairy Platform Preview"
                  className="rounded-2xl object-cover hover:scale-[1.02] transition duration-500"
                />
              </div>

              {/* FLOATING BADGE */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl px-4 py-2 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                ⚡ Built with Next.js 15 & Express
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="space-y-6">
        <ArticlesComponent articles={articles} />
      </section>
    </div>
  );
};

export default HomeComponent;