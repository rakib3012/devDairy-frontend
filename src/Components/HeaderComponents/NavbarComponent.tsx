import Link from 'next/link';
import React from 'react'

 

const NavbarComponent = ( ) => {
    const navItems = [
        { name: "Home", link: "/home" },
        { name: "Blog", link: "/blog" },
        { name: "About", link: "/about" },
    ];
  return (
    <div >
        <nav className='bg-gray-800 text-white p-4'>
            <ul className='flex justify-center space-x-4'>
                {navItems.map((item, index) => (
                    <li  key={index}>
                        <Link href={item.link}>{item.name}</Link>
                    </li>
                ))}

            </ul>
        </nav>
    </div>
  )
}

export default NavbarComponent