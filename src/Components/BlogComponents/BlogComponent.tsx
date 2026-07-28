"use client";

import Image from "next/image";
import Link from "next/link";
import { blogData } from "@/lib/data/blog-content";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";

const BlogComponent = () => {
  const allBlogs = blogData();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = allBlogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header & Search */}
      <div className="flex flex-col items-center text-center space-y-4 mb-12">
        <Badge variant="outline" className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 px-3.5 py-1 text-xs font-semibold rounded-full">
          Explore Insights
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Developer Articles & Guides
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-base max-w-2xl font-medium">
          Deep dives into modern web development, backend architecture, cloud engineering, and frontend mastery.
        </p>

        {/* Search Input */}
        <div className="relative w-full max-w-md mt-4">
          <AiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search articles by keyword or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-100 dark:bg-slate-900/90 border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 pl-10 h-11 focus-visible:ring-cyan-500 rounded-xl"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-16 text-slate-500 dark:text-slate-400">
          No articles match your search criteria.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="bg-white/90 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 backdrop-blur-md overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition duration-300 flex flex-col group shadow-lg"
            >
              {/* Image */}
              <div className="relative w-full h-52 overflow-hidden bg-slate-100 dark:bg-slate-950">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <Badge className="absolute top-3 right-3 bg-white/90 dark:bg-slate-950/80 text-cyan-600 dark:text-cyan-400 border-slate-200 dark:border-slate-700 text-[11px] font-bold">
                  {blog.category}
                </Badge>
              </div>

              {/* Title & Metadata */}
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
                  <span>{blog.date}</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{blog.readTime}</span>
                </div>
                <Link href={`/blogs/${blog.id}`}>
                  <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition line-clamp-2 leading-snug">
                    {blog.title}
                  </CardTitle>
                </Link>
              </CardHeader>

              {/* Description */}
              <CardContent className="px-5 py-0 flex-1">
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed font-medium">
                  {blog.description}
                </p>
              </CardContent>

              {/* Footer Button */}
              <CardFooter className="p-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-auto">
                <Link href={`/blogs/${blog.id}`} className="w-full">
                  <Button variant="outline" className="w-full text-xs font-bold">
                    Read Article →
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default BlogComponent;
