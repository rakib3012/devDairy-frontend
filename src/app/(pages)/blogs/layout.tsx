import FooterComponent from '@/Components/FooterComponents/FooterComponent'
import NavbarComponent from '@/Components/HeaderComponents/NavbarComponent'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const BlogPageLayout = ({children}: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <NavbarComponent />
      </header>

      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-4">{children}</div>
      </main>

      <footer>
        <FooterComponent />
      </footer>
    </div>
  )
}

export default BlogPageLayout;