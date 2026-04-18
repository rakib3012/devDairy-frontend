import Image from "next/image";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";

type Article = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const ArticlesComponent = ({ articles }: { articles: Article[] }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Latest Articles
          </h2>
          <p className="text-gray-500">
            Explore tutorials, guides, and insights from developers
          </p>
        </div>
        <div className="flex gap-1 items-center">
          <Link href="/blogs" className="flex gap-1 items-center text-primary">
            view all posts
            <AiOutlineRight />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Only show the first 3 articles on the home page .  first a arry ta slice method er madhhomy length onujae slice koray netase 0 number position  thakay 3 number position porjonto data gula nea alada array paitase   then map koray oi 3 ta data dakhaitase */}
        {articles.slice(0, 3).map((article, id) => (
          <div
            key={id}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
          >
            <div className="relative w-full h-52 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover  hover:scale-110 transition duration-300"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <Link
                href={`/blogs/${article.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-primary transition"
              >
                {article.title}
              </Link>

              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {article.description}
              </p>
              <div className="mt-auto pt-4">
                <Link
                  href={`/blogs/${article.id}`}
                  className="text-primary font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesComponent;
