import Button from '@/utils/Button';
import Link from 'next/link';
import React from 'react'

 

const NavbarComponent = ( ) => {
    const navItems = [
        // {name: "devDairy", link: "/home"},
        { name: "Home", link: "/home" },
        { name: "Blogs", link: "/blogs" },
        { name: "About", link: "/about" },
    ];
  return (
    <div className='bg-white border-b border-gray-200'>
        <nav className='max-w-6xl mx-auto  flex justify-between items-center text-black px-2 py-4'>
          <div>
              <Link href="/home" className='text-2xl font-bold text-blackcursor-pointer hover:text-primary transform duration-300'>DevDairy</Link>
          </div>
            <ul className='flex justify-center space-x-4 '>
                {navItems.map((item, index) => (
                    <li className='text-base  hover:text-primary transition duration-300 ' key={index}>
                        <Link href={item.link}>{item.name}</Link>
                    </li>
                ))}

            </ul>
            <div>
                <Button className=' px-4 py-1' variant="light">Login</Button>
                <Button variant="primary" className="ml-2 px-4 py-1 rounded-full">
                  Register
                </Button>
            </div>
        </nav>
    </div>
  )
}

export default NavbarComponent