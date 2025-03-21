import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Temporary homepage structure - will be replaced with the actual landing page design later */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-600">Murph</div>
          <nav className="space-x-6 hidden md:flex">
            <span className="text-gray-600 hover:text-primary-600 transition cursor-pointer">
              About
            </span>
            <span className="text-gray-600 hover:text-primary-600 transition cursor-pointer">
              How It Works
            </span>
            <span className="text-gray-600 hover:text-primary-600 transition cursor-pointer">
              Contact
            </span>
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

      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
            Medical guidance when you need it most
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-700 max-w-3xl mx-auto">
            Connect with medical students for accessible explanations and advice
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/auth/register" 
              className="bg-primary-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-600 transition shadow-sm"
            >
              Get Started
            </Link>
            <span 
              className="border border-primary-500 text-primary-500 px-6 py-3 rounded-md text-lg font-medium hover:bg-primary-50 transition cursor-pointer"
            >
              Learn More
            </span>
          </div>
        </div>
      </section>

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
                  <span className="text-gray-300 hover:text-white transition cursor-pointer">
                    About
                  </span>
                </li>
                <li>
                  <span className="text-gray-300 hover:text-white transition cursor-pointer">
                    How It Works
                  </span>
                </li>
                <li>
                  <span className="text-gray-300 hover:text-white transition cursor-pointer">
                    Contact
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-gray-300 hover:text-white transition cursor-pointer">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="text-gray-300 hover:text-white transition cursor-pointer">
                    Terms of Service
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} Murph. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
