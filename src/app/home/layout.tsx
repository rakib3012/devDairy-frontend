import NavbarComponent from "@/Components/HeaderComponents/NavbarComponent";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const HomePageLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen ">
     <div>
       <NavbarComponent />
     </div>
     <div className="max-w-6xl mx-auto ">
       {children}
     </div>
    </main>
  );
};

export default HomePageLayout;
