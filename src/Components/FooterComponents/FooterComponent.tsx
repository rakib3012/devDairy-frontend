import React from "react";
import Link from "next/link";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiGithub,
} from "react-icons/fi";

 

const FooterComponent = ( ) => {
  return (
    <footer className="bg-[#0B0F19] text-gray-300 mt-8 pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">
              DevBairy
            </h2>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              We build modern, scalable, and high-performance digital solutions
              for businesses and startups worldwide.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-5">
              <a href="#" className="hover:text-primary transition">
                <FiFacebook size={18} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <FiTwitter size={18} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <FiInstagram size={18} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <FiGithub size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary">Home</Link></li>
              <li><Link href="#" className="hover:text-primary">About</Link></li>
              <li><Link href="#" className="hover:text-primary">Projects</Link></li>
              <li><Link href="#" className="hover:text-primary">Blog</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary">Web Development</Link></li>
              <li><Link href="#" className="hover:text-primary">UI/UX Design</Link></li>
              <li><Link href="#" className="hover:text-primary">Backend API</Link></li>
              <li><Link href="#" className="hover:text-primary">E-commerce</Link></li>
              <li><Link href="#" className="hover:text-primary">Consulting</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get latest updates and news.
            </p>

            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md bg-[#111827] border border-gray-700 text-sm focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark transition text-white py-2 rounded-md font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} DevBairy. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;