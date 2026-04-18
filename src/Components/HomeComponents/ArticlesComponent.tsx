import Button from '@/utils/Button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'

type Article = {
    title: string;
    description: string;
    image: string;
}
 
const ArticlesComponent = ({ articles }: { articles: Article[] }) => {
  return (
    <div>
         <div className="flex justify-between items-center mb-6">
       <div>
         <h2 className="text-5xl font-bold ">Latest Articles</h2>
      <span className="text-gray-500">
        Discover the latest articles and insights from our community of developers.
      </span>
       </div>
       <div className="flex gap-1 items-center">
        <Link href="/blogs" className="flex gap-1 items-center text-primary">
          view all posts
          <AiOutlineRight />
        </Link>
       </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
  key={index}
  className="rounded-t-lg bg-white shadow-md flex flex-col h-full"
>
  <Image
    src={article.image}
    width={400}
    height={200}
    alt={article.title}
    className="rounded-lg w-full object-cover"
  />

  <div className="p-4 flex flex-col flex-1">
    <h3 className="text-xl font-semibold">{article.title}</h3>
    <p className="text-gray-600 mt-2">{article.description}</p>

    
    <div className="mt-auto pt-4">
      <Button
        className="px-4 py-1 flex items-center gap-2 text-sm w-fit"
        variant="primary"
      >
        Read More <AiOutlineRight />
      </Button>
    </div>
  </div>
</div>
        ))}

      </div>

    </div>
  )
}

export default ArticlesComponent