'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '../common/ThemeToggle';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // send cookies if your backend uses them
      });

      if (res.ok) {
        router.push('/login'); // redirect to login page
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const NavItem = ({ path, label, icon: Icon }: { path: string; label: string; icon: React.ElementType }) => (
    <Link
      href={path}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive(path) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">PRIMETRADE</span>
        </Link>
      </div>

      <div className="flex-1 py-6 px-4">
        <NavItem path="/dashboard" label="Dashboard" icon={LayoutDashboard} />
      </div>

      <div className="p-4 border-t mt-auto flex items-center justify-between">
        <ThemeToggle />
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r bg-background z-10">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden border-b bg-background sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">INTERAIN</span>
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <NavContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
}
