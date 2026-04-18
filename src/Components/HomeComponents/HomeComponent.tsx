import Button from "@/utils/Button";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import ArticlesComponent from "./ArticlesComponent";
import { blogData } from "@/lib/data/blog-content";

const HomeComponent = () => {
  const articles = blogData();

  return (
    <div className="space-y-20">

      {/* HERO SECTION */}
      <section className="pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

          {/* LEFT CONTENT */}
          <div className="space-y-6">

            <span className="inline-block text-sm font-medium text-primary bg-blue-50 border border-blue-100 px-4 py-1 rounded-full">
              Welcome to DevDairy
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              Share Your <span className="text-primary">Dev Journey</span> With the World
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              Document your technical breakthroughs, explore modern web development,
              and connect with a global community of developers building the future.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-4 pt-2">

              <Link href="/blogs">
                <Button
                  className="px-5 py-3 flex items-center gap-2 text-base"
                  variant="primary"
                >
                  Explore Blogs <BsArrowRight />
                </Button>
              </Link>

              <Button
                className="px-5 py-3 text-base border border-gray-300 hover:border-primary"
                variant="light"
              >
                How It Works
              </Button>

            </div>

            {/* SMALL STATS */}
            <div className="flex gap-6 pt-6 text-sm text-gray-500">
              <p>🔥 100+ Articles</p>
              <p>🚀 Fast Growing Community</p>
              <p>💡 Developer Focused</p>
            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/images/hero.png"
                width={550}
                height={450}
                alt="Home Hero Image"
                className="rounded-2xl shadow-xl border border-gray-200 hover:scale-[1.02] transition duration-300"
              />

              {/* floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white shadow-md px-4 py-2 rounded-lg text-sm">
                ⚡ Built with Next.js
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