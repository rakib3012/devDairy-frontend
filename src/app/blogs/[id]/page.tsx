import BlogDetailsComponent from '@/Components/BlogComponents/BlogDetailsComponent';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function BlogDetails({ params }: Props) {
  const { id } = await params;
  
  console.log(id, "Params in BlogDetails Page>>>>>>>>");
  return (
    <BlogDetailsComponent id={id} />
  );
}

export default BlogDetails;