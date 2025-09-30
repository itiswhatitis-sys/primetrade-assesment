  'use client';

  import { useEffect, useState } from 'react';
  import { Button } from '@/components/ui/button';
  import { useRouter } from 'next/navigation';
  import { ArrowRight } from 'lucide-react';
  import { Header } from './components/common/Header';
import { ThemeToggle } from './components/common/ThemeToggle';

  export default function LandingPage() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      return null;
    }

    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-32 px-4 flex-grow flex items-center overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-black dark:via-gray-950 dark:to-black"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-100/50 to-transparent dark:from-gray-800/20 dark:to-transparent transform rotate-12 translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-tr from-purple-100/50 to-transparent dark:from-gray-900/20 dark:to-transparent transform -rotate-12 -translate-x-1/4 translate-y-1/4"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}></div>
          </div>
          
          {/* Diagonal Lines */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent dark:via-gray-600 transform rotate-12"></div>
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent dark:via-gray-700 transform -rotate-12"></div>
          </div>
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center space-y-8">
              <div className="space-y-6">
                {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-black/50 text-black dark:text-white text-sm font-medium border border-gray-200 dark:border-gray-800"> */}
                 <a 
                  href="https://github.com/itiswhatitis-sys/primetrade-assesment" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 dark:bg-black/50 text-black dark:text-white text-sm font-medium border border-gray-200 dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="w-2 h-2 bg-black dark:bg-white rounded-full mr-2 animate-pulse"></span>
                  For API Docs visit GitHub
                </a>
                {/* </div> */}
               <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-950 via-gray-800 to-stone-950 dark:from-white dark:via-white dark:to-white bg-clip-text text-transparent">
                Boost Your
                <br />
                <span className="bg-gradient-to-r from-stone-950 to-gray-900 dark:from-white dark:to-white bg-clip-text text-transparent">
                  Task Management
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-white max-w-2xl mx-auto leading-relaxed">
                Track, organize, and prioritize your daily tasks effortlessly. 
                <br className="hidden sm:block" />
                This is the Primetrade Assessment project — a sleek, intuitive tasks logger to optimize productivity.
              </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button 
                    size="lg" 
                    onClick={() => router.push('/signup')}
                    className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={() => router.push('/login')}
                    className="border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                  >
                    Sign In
                  </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <div className="p-4 border-t mt-auto flex flex-col md:flex-row justify-between items-center bg-gray-50 dark:bg-gray-950">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} PRIMETRADE. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">Made with ❤️ by Murali</span>
          {/* <ThemeToggle /> */}
          <Button variant="ghost" size="icon">
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      </div>
    );
  }