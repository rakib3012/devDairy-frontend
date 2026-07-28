// Static/mock blog (home & blogs listing)
export interface Blogs {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

// API blog (dashboard / backend)
export interface BlogAuthor {
  _id: string;
  name: string;
  email: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  tags: string[];
  status: "draft" | "published";
  author: BlogAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPagination {
  totalBlogs: number;
  currentPage: number;
  totalPages: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BlogsResponse {
  status: string;
  message: string;
  data: {
    blogs: Blog[];
    pagination?: BlogPagination;
    total?: number;
    page?: number;
    limit?: number;
  };
}
