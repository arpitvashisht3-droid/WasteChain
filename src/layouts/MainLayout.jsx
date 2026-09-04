import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import Footer from './Footer';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <div className="flex flex-1 max-w-[1600px] w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 mb-16 lg:mb-0 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <MobileNav />
      <Footer />
    </div>
  );
};

export default MainLayout;
