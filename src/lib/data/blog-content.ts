export interface BlogArticle {
  id: number;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export const blogData = (): BlogArticle[] => [
  {
    id: 1,
    title: "Mastering Next.js 15 App Router & Server Components",
    description: "Discover modern patterns for building fast, SEO-optimized web applications with Next.js 15.",
    content: "Next.js 15 introduces powerful enhancements to App Router, React Server Components, and streaming. In this article, we explore architectural patterns for scalable full-stack web applications...",
    category: "Next.js",
    author: "Rakib Hassan",
    date: "July 24, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
  },
  {
    id: 2,
    title: "Building Scalable REST APIs with Express & Mongoose",
    description: "Learn how to structure enterprise-level Express backends with validation and service layers.",
    content: "Architecture matters when scaling Node.js backends. In this post, we discuss controller-service separation, validation middleware, and MongoDB schema design...",
    category: "Backend",
    author: "Rakib Hassan",
    date: "July 20, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800",
  },
  {
    id: 3,
    title: "State Management with TanStack Query v5 in React",
    description: "Simplify server state fetching, caching, and optimistic updates without boilerplate.",
    content: "TanStack Query v5 changes how frontend applications manage remote state. Learn how to leverage custom query hooks and mutations for a smooth user experience...",
    category: "React",
    author: "Rakib Hassan",
    date: "July 15, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
  },
];
