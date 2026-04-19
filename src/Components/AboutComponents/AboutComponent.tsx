"use client";

import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

type Writer = {
  id: string;
  name: string;
  logo?: string;
  username: string;
  image: string;
  bio: string;
  role: "admin" | "user"| "writer";
  postsCount: number;
  social?: {
    github?: string;
    linkedin?: string;
  };
};

const writers: Writer[] = [
  {
    id: "1",
    name: "Rakib Uzzaman",
    username: "rakibdev",
    image: "/images/user1.jpg",
    bio: "Full-stack developer & tech writer. Loves Next.js & AI.",
    role: "admin",
    postsCount: 24,
    social: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
  },
    {
    id: "2",
    name: "Tanimul Islam",
    username: "tanimuldev",
    image: "/images/user2.jpg",
    bio: "Full-stack developer & tech writer. Loves Next.js & AI.",
    role: "writer",
    postsCount: 24,
    social: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
  },
    {
    id: "3",
    name: "Shafin",
    username: "shafindev",
    logo :"shafin",
    image: "/images/user3.jpg",
    bio: "Full-stack developer & tech writer. Loves Next.js & AI.",
    role: "writer",
    postsCount: 24,
    social: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
  },
  {
    id: "4",
    name: "Ekram",
    username: "ekramuldev",
    logo :"ekram",
    image: "/images/user4.jpg",
    bio: "Full-stack developer & tech writer. Loves Next.js & AI.",
    role: "writer",
    postsCount: 24,
    social: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
    },
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen px-6 py-16">

      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About DevDairy
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          DevDairy is a community-driven blogging platform where developers share knowledge,
          experiences, and ideas. Discover talented writers and explore their journeys.
        </p>
      </div>

      {/* Writers Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Our Writers</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {writers.map((writer) => (
            <motion.div
              key={writer.id}
              whileHover={{ scale: 1.01}}
              className="bg-white/5 backdrop-blur-lg border border-gray-200 rounded-2xl p-5 shadow-xl transition duration-300"
            >
              {/* Avatar */}
              <div className="flex flex-col items-center text-center">
                <Image
                  src={writer.image}
                  alt={writer.name}
                  width={80}
                  height={80}
                  className="rounded-full mb-4 border-2 border-primary/50"
                />

                <h3 className="text-lg font-semibold">{writer.name}</h3>
                <p className="text-sm text-gray-400">@{writer.username}</p>

                {/* Role */}
                <span className={`mt-2 text-xs px-3 py-1 rounded-full ${
                  writer.role === "admin"
                    ? "bg-primary/20 text-primary"
                    : "bg-fuchsia-200 text-fuchsia-600"
                }`}>
                  {writer.role}
                </span>

                {/* Bio */}
                <p className="text-sm text-gray-400 mt-3 line-clamp-3">
                  {writer.bio}
                </p>

                {/* Stats */}
                <div className="mt-4 text-sm text-gray-300">
                  {writer.postsCount} Posts
                </div>

                {/* Social */}
                <div className="flex gap-4 mt-4 text-lg">
                  {writer.social?.github && (
                    <a href={writer.social.github} target="_blank">
                      <FaGithub />
                    </a>
                  )}
                  {writer.social?.linkedin && (
                    <a href={writer.social.linkedin} target="_blank">
                      <FaLinkedin />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;