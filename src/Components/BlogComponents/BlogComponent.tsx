import Image from "next/image";
import Link from "next/link";
import { Blogs } from "@/lib/types/blogTypes";
import { blogData } from "@/lib/data/blog-content";

const BlogComponent = () => {
  const blogs: Blogs[] = blogData();
  return (
    <section className="py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Latest Blogs
        </h2>
        <p className="text-gray-500 mt-3">
          Insights, tutorials and updates from our team
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-52 overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                  {blog.category}
                </span>
                <span>{blog.readTime}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition">
                {blog.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {blog.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                <span>{blog.date}</span>

                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-primary font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogComponent;
