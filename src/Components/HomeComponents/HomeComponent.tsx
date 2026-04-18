import Button from "@/utils/Button";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import ArticlesComponent from "./ArticlesComponent";
const HomeComponent = () => {


  const articles = [
    {
    title: "How to Build a Next.js Blog with Markdown",
      description: "Learn how to create a powerful blog using Next.js and Markdown.",
      image: "/images/img-1.webp",
    },
    {
      title: "10 Essential VS Code Extensions for Developers",
      description: "Boost your productivity with these must-have VS Code extensions.",
      image: "/images/img-2.webp",
    },
    {
        title: "Getting Started with React Hooks",
        description: "Learn how to use React Hooks to simplify your component logic.",
        image: "/images/img-3.webp",
      }

  ];

  return (
   <>
    <section className="mt-16">
      <div className="flex gap-4 ">
        <div>
          <h4 className="inline-block text-base text-primary font-semibold rounded-full  bg-blue-50 border border-blue-200 px-4 py-0.5 mb-2">
            Welcome to DevDairy
          </h4>
          <h1 className="text-uppercase text-5xl font-bold  ">DevDairy</h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl">
            Share your development journey, document your technical
            breakthroughs, and connect with a community of expert builders.
          </p>
          <div className="mt-2 flex gap-4">
           <Link href="/blogs" className="flex gap-1 items-center text-primary">
              <Button
              className="px-4 py-1 flex items-center gap-2 text-xl"
              variant="primary"
            >
              Explore Blogs <BsArrowRight />
            </Button>
            </Link>
            <Button
              className="px-4 py-1 flex items-center gap-2 text-lg border border-gray-300"
              variant="light"
            >
              How It Works 
            </Button>
          </div>
        </div>

        <div className="">
          <Image
            src="/images/hero.png"
            width={500}
            height={200}
            alt="Home Hero Image"
            className="rounded-lg border border-gray-300"
          />
        </div>
      </div>
    </section>
    <section className="mt-10">
     <ArticlesComponent articles={articles} />
    </section>
   </>
  );
};

export default HomeComponent;
