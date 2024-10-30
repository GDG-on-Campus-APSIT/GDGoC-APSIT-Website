'use client';
import { useState } from 'react'
import Link from 'next/link'
import { AlignJustify, User, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

export function NavbarComponent({ isAdmin = true }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navItems = [
    { name: 'Events', href: '/events' },
    { name: 'Resources', href: '/resources' },
    { name: 'Community', href: '/community' },
    { name: 'Recognition Program', href: '/recognition' },
    { name: 'Blog', href: '/blog' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Contact', href: '/contact' },
  ]

  const adminRoutes = [
    //{ name: 'Dashboard', href: '/admin' },
    { name: 'Event Management', href: '/admin/events' },
    { name: 'Member Management', href: '/admin/members' },
    { name: 'Content Management', href: '/admin/content' },
    { name: 'Recognition Program', href: '/admin/recognition' },
    { name: 'Settings', href: '/admin/settings' },
  ]

  const NavLinks = ({ items }) => (
    <>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-black hover:text-blue-600 transition-colors flex items-center h-16">
          {item.name}
        </Link>
      ))}
    </>
  )

  return (
    (<nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img className="h-8 w-auto" src="/gdg-logo.png" alt="GDG Logo" />
              <span className="ml-2 text-xl font-bold text-blue-600">GDGoC APSIT</span>
            </Link>
          </div>

          {/* Navigation Links - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-4">
              <NavLinks items={navItems} />
              {isAdmin && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-16 flex items-center">
                      Admin <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {adminRoutes.map((route) => (
                      <DropdownMenuItem key={route.name} asChild>
                        <Link href={route.href}>{route.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {/* User Profile - Right */}
          <div className="hidden lg:flex items-center h-16">
            <span className="text-black mr-2">John Doe</span>
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5 text-gray-600" />
                <span className="sr-only">User profile</span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black">
                  <AlignJustify className="h-6 w-6" />
                  <span className="sr-only">Open sidebar menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4">
                    <Link
                      href="/"
                      className="flex items-center"
                      onClick={() => setIsSidebarOpen(false)}>
                      <img className="h-8 w-auto" src="/gdg-logo.png" alt="GDG Logo" />
                      <span className="ml-2 text-xl font-bold text-blue-600">GDGoC APSIT</span>
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-4 p-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-black hover:text-blue-600 transition-colors"
                        onClick={() => setIsSidebarOpen(false)}>
                        {item.name}
                      </Link>
                    ))}
                    {isAdmin && (
                      <>
                        <Separator className="my-2" />
                        {adminRoutes.map((route) => (
                          <Link
                            key={route.name}
                            href={route.href}
                            className="text-black hover:text-blue-600 transition-colors"
                            onClick={() => setIsSidebarOpen(false)}>
                            {route.name}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                  <div className="mt-auto p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <span className="text-black">John Doe</span>
                      <Link href="/profile" onClick={() => setIsSidebarOpen(false)}>
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
    </nav>)
  );
}