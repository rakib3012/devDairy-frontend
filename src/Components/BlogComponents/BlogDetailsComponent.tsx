 
import { blogData } from "@/lib/data/blog-content";
import Image from "next/image";

type Props = {
    id: string;
};

const BlogDetailsPage = ({ id }: Props) => {
    const blogs = blogData();

    console.log(blogs, "Blogs in Details Page");
    console.log(id, "ID in Detailscomponent>>>>>>>>");
    
    const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return <div className="text-center py-20">Blog not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      
      {/* Image */}
      <div className="relative w-full h-80 mb-6">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* Meta */}
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>{blog.category}</span>
        <span>{blog.readTime}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">
        {blog.title}
      </h1>

      {/* Date */}
      <p className="text-gray-400 text-sm mb-6">
        {blog.date}
      </p>

      {/* Description */}
      <p className="text-gray-700 leading-7">
        {blog.description}
      </p>

    </div>
  );
};

export default BlogDetailsPage;