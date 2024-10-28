'use client';
import Link from 'next/link'
import { AlignJustify, User, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function NavbarComponent() {
  //const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navItems = [
    { name: 'Events', href: '/events' },
    { name: 'Community', href: '/community' },
    { name: 'Resources', href: '/resources' },
    { name: 'Recognition Program', href: '/recognition' },
  ]

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-black hover:text-blue-600 transition-colors">
          {item.name}
        </Link>
      ))}
    </>
  )

  return (
    (<nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/gdg-logo.png" alt="GDG Logo" />
              <span className="ml-2 text-xl font-bold text-blue-600">GDGoC APSIT</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-black">John Doe</span>
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="sr-only">User profile</span>
                </Button>
              </Link>
            </div>
            <div className="flex md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-black">
                    <AlignJustify className="h-6 w-6" />
                    <span className="sr-only">Open sidebar menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4">
                      <Link href="/" className="flex items-center">
                        <img className="h-8 w-auto" src="/gdg-logo.png" alt="GDG Logo" />
                        <span className="ml-2 text-xl font-bold text-blue-600">GDGoC APSIT</span>
                      </Link>
                      
                    </div>
                    <div className="flex flex-col space-y-4 p-4">
                      <NavLinks />
                    </div>
                    <div className="mt-auto p-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <span className="text-black">John Doe</span>
                        <Link href="/profile">
                          <Button variant="ghost" size="icon">
                            <User className="h-5 w-5 text-gray-600" />
                            <span className="sr-only">User profile</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>)
  );
}