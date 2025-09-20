import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

 function Header() {
  return (
    <>
      {/* Notification Bar */}
      <div className="bg-[#5271ff] text-white py-2 px-4 text-center text-sm">
        <span className="inline-flex items-center">
          <Badge variant="secondary" className="mr-2 bg-white text-blue-600">
            New
          </Badge>
          Get a Guaranteed Developer within 24 working hours. <span className='hover:underline cursor-pointer'>Hire candidates</span>.          
        </span>
        <button className="ml-64 float-right text-white hover:text-gray-200">×</button>
      </div>
      <header className="border-b border-gray-200 sticky top-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-bg-[#5271ff]">Talrn</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Why
              </a>
              <div className="relative group">
                <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center">
                  Industries <ChevronDown className="inline-block w-4 h-4 ml-1"/>
                </a>
                <div className="absolute hidden group-hover:block w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 mt-2">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Travel</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Automotive</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Banking</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Capital Markets</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Healthcare</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Digital Commerce</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">View All</a>
                </div>
              </div>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Find iOS Dev
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Apply as Vendor
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button className="bg-[#5271ff] hover:bg-blue-700 text-white">Hire iOS Dev</Button>
              <a href="register" className="text-gray-700 hover:text-blue-600">
                Login
              </a>
            </div>
          </div>
        </div>
      </header>
      </>
  );
}

export default Header;