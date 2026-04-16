import NavbarComponent from '@/Components/HeaderComponents/NavbarComponent'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const BlogPageLayout = ({children}: Props) => {
  return (
    <div>
     <div>
       <NavbarComponent />
     </div>
     <div>
       {children}
     </div>
    </div>
  )
}

export default BlogPageLayout;