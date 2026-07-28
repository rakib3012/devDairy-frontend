"use client";

import { blogData } from "@/lib/data/blog-content";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { AiOutlineArrowLeft } from "react-icons/ai";

type Props = {
  id: string;
};

const BlogDetailsPage = ({ id }: Props) => {
  const blogs = blogData();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto py-24 px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Article Not Found</h2>
        <Link href="/blogs">
          <Button variant="outline" className="border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            ← Back to Articles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <Link href="/blogs" className="inline-block mb-6">
        <Button variant="ghost" size="sm" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 gap-2 font-semibold">
          <AiOutlineArrowLeft className="h-4 w-4" /> Back to Articles
        </Button>
      </Link>

      <Card className="bg-white/90 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 backdrop-blur-md overflow-hidden shadow-2xl text-slate-900 dark:text-slate-100 p-6 sm:p-8 space-y-6">
        {/* Hero Image */}
        <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <Image src={blog.image} alt={blog.title} fill className="object-cover" />
          <Badge className="absolute top-4 right-4 bg-white/90 dark:bg-slate-950/80 text-cyan-600 dark:text-cyan-400 border-slate-200 dark:border-slate-700 font-bold">
            {blog.category}
          </Badge>
        </div>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-4 gap-2 font-medium">
          <span>Published on {blog.date}</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-bold">{blog.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
          {blog.title}
        </h1>

        {/* Description / Content */}
        <CardContent className="p-0 text-slate-700 dark:text-slate-300 leading-8 text-base space-y-4 pt-2 font-medium">
          <p className="text-lg text-slate-800 dark:text-slate-200 font-semibold leading-relaxed">
            {blog.description}
          </p>
          <p>
            Modern software engineering requires continuous learning and adaptability. In this deep dive, we explore best practices, structural design decisions, and strategies for building resilient applications.
          </p>
        </CardContent>
      </Card>
    </article>
  );
};

export default BlogDetailsPage;