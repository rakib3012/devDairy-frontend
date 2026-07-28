"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";

type Article = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const ArticlesComponent = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Articles
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            Explore guides, tutorials, and engineering insights from top developers
          </p>
        </div>
        <Link href="/blogs">
          <Button variant="ghost" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-cyan-500/10 gap-1.5 p-0 sm:px-3 font-bold">
            View All Posts <AiOutlineRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((article) => (
          <Card
            key={article.id}
            className="bg-white/90 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 backdrop-blur-md overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition duration-300 flex flex-col group shadow-lg"
          >
            <div className="relative w-full h-48 overflow-hidden bg-slate-100 dark:bg-slate-950">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
              <Badge className="absolute top-3 right-3 bg-white/90 dark:bg-slate-950/80 text-cyan-600 dark:text-cyan-400 border-slate-200 dark:border-slate-700 text-[11px] font-bold">
                Engineering
              </Badge>
            </div>

            <CardHeader className="p-5 pb-2">
              <Link href={`/blogs/${article.id}`}>
                <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition line-clamp-2 leading-snug">
                  {article.title}
                </CardTitle>
              </Link>
            </CardHeader>

            <CardContent className="px-5 py-0 flex-1">
              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed font-medium">
                {article.description}
              </p>
            </CardContent>

            <CardFooter className="p-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-auto">
              <Link href={`/blogs/${article.id}`} className="w-full">
                <Button variant="outline" className="w-full text-xs font-bold">
                  Read Article →
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticlesComponent;
