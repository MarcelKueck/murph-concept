/**
 * Main layout component
 * Provides consistent layout structure for all pages
 */
import React from 'react';
import Link from 'next/link';

interface MainLayoutProps {
  /**
   * Page content
   */
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-600">Murph</div>
          <nav className="space-x-6 hidden md:flex">
            <Link href="/about" className="text-gray-600 hover:text-primary-600 transition">
              About
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition">
              How It Works
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-primary-600 transition">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link 
              href="/auth/login" 
              className="text-primary-600 hover:text-primary-700 transition"
            >
              Log In
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Murph</h3>
              <p className="text-gray-300">
                Making medical information accessible and understandable for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-gray-300 hover:text-white transition">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="text-gray-300 hover:text-white transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} Murph. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
